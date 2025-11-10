import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { getUserSettings, saveUserSettings, initializeUserSettings } from '@/lib/settings-service';
import { UserSettings, Theme, Language, AIModel, DEFAULT_SETTINGS } from '@/lib/settings-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Palette, 
  Bell, 
  BookOpen, 
  Shield, 
  HelpCircle,
  Mail,
  Globe,
  Brain,
  Save,
  Trash2
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Settings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    loadSettings();
  }, [user, navigate]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      let userSettings = await getUserSettings(user!.id);
      
      if (!userSettings) {
        userSettings = await initializeUserSettings(user!.id);
      }
      
      setSettings(userSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load settings. Using defaults.',
        variant: 'destructive',
      });
      setSettings({
        userId: user!.id,
        ...DEFAULT_SETTINGS,
      } as UserSettings);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    
    try {
      setSaving(true);
      await saveUserSettings(settings);
      toast({
        title: 'Success',
        description: 'Settings saved successfully!',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  const getUserInitial = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.charAt(0).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const getUserAvatar = () => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`;
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Account Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <CardTitle>Account</CardTitle>
              </div>
              <CardDescription>Your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-primary">
                  <AvatarImage src={getUserAvatar()} alt={user?.email} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getUserInitial()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">
                      {user?.user_metadata?.full_name || 'User'}
                    </h3>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Premium
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => updateSetting('theme', value as Theme)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Theme.LIGHT}>Light</SelectItem>
                    <SelectItem value={Theme.DARK}>Dark</SelectItem>
                    <SelectItem value={Theme.SYSTEM}>System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Language
                </Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => updateSetting('language', value as Language)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Language.EN}>English</SelectItem>
                    <SelectItem value={Language.ES}>Español</SelectItem>
                    <SelectItem value={Language.FR}>Français</SelectItem>
                    <SelectItem value={Language.DE}>Deutsch</SelectItem>
                    <SelectItem value={Language.ZH}>中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* AI Configuration Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <CardTitle>AI Configuration</CardTitle>
              </div>
              <CardDescription>Customize AI behavior for your learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>AI Model</Label>
                <Select
                  value={settings.aiModel}
                  onValueChange={(value) => updateSetting('aiModel', value as AIModel)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={AIModel.GEMINI_FLASH}>Gemini 2.5 Flash (Recommended)</SelectItem>
                    <SelectItem value={AIModel.GEMINI_PRO}>Gemini 2.5 Pro</SelectItem>
                    <SelectItem value={AIModel.GPT5_MINI}>GPT-5 Mini</SelectItem>
                    <SelectItem value={AIModel.GPT5}>GPT-5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Temperature</Label>
                  <span className="text-sm text-muted-foreground">{settings.aiTemperature.toFixed(2)}</span>
                </div>
                <Slider
                  value={[settings.aiTemperature]}
                  onValueChange={([value]) => updateSetting('aiTemperature', value)}
                  min={0}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Higher values make output more random, lower values more focused
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Max Tokens</Label>
                  <span className="text-sm text-muted-foreground">{settings.aiMaxTokens}</span>
                </div>
                <Slider
                  value={[settings.aiMaxTokens]}
                  onValueChange={([value]) => updateSetting('aiMaxTokens', value)}
                  min={256}
                  max={4096}
                  step={256}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Maximum length of AI responses
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Manage how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive push notifications in browser
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive tips, updates, and promotions
                  </p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => updateSetting('marketingEmails', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Learning Preferences Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <CardTitle>Learning Preferences</CardTitle>
              </div>
              <CardDescription>Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-save Progress</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically save your course progress
                  </p>
                </div>
                <Switch
                  checked={settings.autoSaveProgress}
                  onCheckedChange={(checked) => updateSetting('autoSaveProgress', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Achievements</Label>
                  <p className="text-xs text-muted-foreground">
                    Display badges and achievements
                  </p>
                </div>
                <Switch
                  checked={settings.showAchievements}
                  onCheckedChange={(checked) => updateSetting('showAchievements', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <CardTitle>Privacy & Security</CardTitle>
              </div>
              <CardDescription>Control your data and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Privacy Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Hide your activity from other users
                  </p>
                </div>
                <Switch
                  checked={settings.privacyMode}
                  onCheckedChange={(checked) => updateSetting('privacyMode', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                <CardTitle>Support</CardTitle>
              </div>
              <CardDescription>Get help and manage your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help Center
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3 sticky bottom-4">
            <Button
              onClick={handleSave}
              disabled={saving}
              size="lg"
              className="shadow-lg"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
