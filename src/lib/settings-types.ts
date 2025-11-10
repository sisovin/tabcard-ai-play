export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  SYSTEM = 'SYSTEM',
}

export enum Language {
  EN = 'EN',
  ES = 'ES',
  FR = 'FR',
  DE = 'DE',
  ZH = 'ZH',
}

export enum AIModel {
  GEMINI_FLASH = 'gemini-2.5-flash',
  GEMINI_PRO = 'gemini-2.5-pro',
  GPT5_MINI = 'gpt-5-mini',
  GPT5 = 'gpt-5',
}

export interface UserSettings {
  id?: string;
  userId: string;
  theme: Theme;
  language: Language;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  autoSaveProgress: boolean;
  showAchievements: boolean;
  privacyMode: boolean;
  aiModel: AIModel;
  aiTemperature: number;
  aiMaxTokens: number;
  createdAt?: string;
  updatedAt?: string;
}

export const DEFAULT_SETTINGS: Partial<UserSettings> = {
  theme: Theme.SYSTEM,
  language: Language.EN,
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  autoSaveProgress: true,
  showAchievements: true,
  privacyMode: false,
  aiModel: AIModel.GEMINI_FLASH,
  aiTemperature: 0.7,
  aiMaxTokens: 1024,
};
