"use client"

import { useAuth } from "@/lib/auth-context"
import { useSettings } from "@/lib/settings-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, ArrowLeft, Moon, Sun, Monitor, Bell, Volume2, Globe, Type, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function SettingsContent() {
  const { user, isAdmin } = useAuth()
  const {
    settings,
    updateTheme,
    toggleNotifications,
    toggleSoundEffects,
    updateLanguage,
    updateFontSize,
    toggleAnimations,
  } = useSettings()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-gradient">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Settings</h1>
              <p className="text-xs text-muted-foreground">Customize your EmoHeal experience</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{user?.name}</p>
            <Badge variant={isAdmin ? "default" : "secondary"} className="text-xs">
              {user?.role}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the visual appearance of EmoHeal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => updateTheme(value as any)}>
                  <SelectTrigger id="theme" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Choose your preferred color scheme</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select value={settings.fontSize} onValueChange={(value) => updateFontSize(value as any)}>
                  <SelectTrigger id="fontSize" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">
                      <div className="flex items-center gap-2">
                        <Type className="w-3 h-3" />
                        Small
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Medium
                      </div>
                    </SelectItem>
                    <SelectItem value="large">
                      <div className="flex items-center gap-2">
                        <Type className="w-5 h-5" />
                        Large
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Adjust text size for better readability</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Animations
                  </Label>
                  <p className="text-xs text-muted-foreground">Enable smooth transitions and effects</p>
                </div>
                <Switch id="animations" checked={settings.animationsEnabled} onCheckedChange={toggleAnimations} />
              </div>
            </CardContent>
          </Card>

          {/* Notifications Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription>Manage how you receive updates and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive notifications about your wellness activities</p>
                </div>
                <Switch id="notifications" checked={settings.notifications} onCheckedChange={toggleNotifications} />
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Audio
              </CardTitle>
              <CardDescription>Control sound effects and audio feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="soundEffects">Sound Effects</Label>
                  <p className="text-xs text-muted-foreground">Play sounds for interactions and notifications</p>
                </div>
                <Switch id="soundEffects" checked={settings.soundEffects} onCheckedChange={toggleSoundEffects} />
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language & Region
              </CardTitle>
              <CardDescription>Choose your preferred language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={(value) => updateLanguage(value as any)}>
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              Save & Return to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  )
}
