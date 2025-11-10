-- Create enum for theme preference
CREATE TYPE public.theme_preference AS ENUM ('LIGHT', 'DARK', 'SYSTEM');

-- Create enum for language preference
CREATE TYPE public.language_preference AS ENUM ('EN', 'ES', 'FR', 'DE', 'ZH');

-- Create enum for AI model preference
CREATE TYPE public.ai_model_preference AS ENUM ('gemini-2.5-flash', 'gemini-2.5-pro', 'gpt-5-mini', 'gpt-5');

-- Create user_settings table
CREATE TABLE public.user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  theme theme_preference NOT NULL DEFAULT 'SYSTEM',
  language language_preference NOT NULL DEFAULT 'EN',
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  push_notifications BOOLEAN NOT NULL DEFAULT true,
  marketing_emails BOOLEAN NOT NULL DEFAULT false,
  auto_save_progress BOOLEAN NOT NULL DEFAULT true,
  show_achievements BOOLEAN NOT NULL DEFAULT true,
  privacy_mode BOOLEAN NOT NULL DEFAULT false,
  ai_model ai_model_preference NOT NULL DEFAULT 'gemini-2.5-flash',
  ai_temperature NUMERIC(3,2) NOT NULL DEFAULT 0.7 CHECK (ai_temperature >= 0 AND ai_temperature <= 2),
  ai_max_tokens INTEGER NOT NULL DEFAULT 1024 CHECK (ai_max_tokens >= 256 AND ai_max_tokens <= 4096),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own settings"
  ON public.user_settings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
  ON public.user_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON public.user_settings
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own settings"
  ON public.user_settings
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create index for performance
CREATE INDEX idx_user_settings_user_id ON public.user_settings(user_id);