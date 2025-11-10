import { supabase } from '@/integrations/supabase/client';
import { UserSettings, DEFAULT_SETTINGS } from './settings-types';

// Map camelCase to snake_case for database
const toSnakeCase = (settings: Partial<UserSettings>) => ({
  user_id: settings.userId,
  theme: settings.theme,
  language: settings.language,
  email_notifications: settings.emailNotifications,
  push_notifications: settings.pushNotifications,
  marketing_emails: settings.marketingEmails,
  auto_save_progress: settings.autoSaveProgress,
  show_achievements: settings.showAchievements,
  privacy_mode: settings.privacyMode,
  ai_model: settings.aiModel,
  ai_temperature: settings.aiTemperature,
  ai_max_tokens: settings.aiMaxTokens,
});

// Map snake_case to camelCase from database
const toCamelCase = (data: any): UserSettings => ({
  id: data.id,
  userId: data.user_id,
  theme: data.theme,
  language: data.language,
  emailNotifications: data.email_notifications,
  pushNotifications: data.push_notifications,
  marketingEmails: data.marketing_emails,
  autoSaveProgress: data.auto_save_progress,
  showAchievements: data.show_achievements,
  privacyMode: data.privacy_mode,
  aiModel: data.ai_model,
  aiTemperature: parseFloat(data.ai_temperature),
  aiMaxTokens: data.ai_max_tokens,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

export const getUserSettings = async (userId: string): Promise<UserSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return toCamelCase(data);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    throw error;
  }
};

export const saveUserSettings = async (settings: Partial<UserSettings>): Promise<UserSettings> => {
  try {
    const dbSettings = toSnakeCase(settings);
    
    const { data, error } = await supabase
      .from('user_settings')
      .upsert(dbSettings, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;

    return toCamelCase(data);
  } catch (error) {
    console.error('Error saving user settings:', error);
    throw error;
  }
};

export const updateUserSettings = async (
  userId: string,
  updates: Partial<UserSettings>
): Promise<UserSettings> => {
  try {
    const dbUpdates = toSnakeCase({ ...updates, userId });
    
    const { data, error } = await supabase
      .from('user_settings')
      .update(dbUpdates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return toCamelCase(data);
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
};

export const initializeUserSettings = async (userId: string): Promise<UserSettings> => {
  try {
    const defaultSettings: Partial<UserSettings> = {
      userId,
      ...DEFAULT_SETTINGS,
    };

    return await saveUserSettings(defaultSettings);
  } catch (error) {
    console.error('Error initializing user settings:', error);
    throw error;
  }
};
