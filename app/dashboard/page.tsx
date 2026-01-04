"use client"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Mic, MessageCircle, Brain, LogOut, Shield, Settings, MessageSquarePlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MonthlyCalendar } from "@/components/monthly-calendar"
import { DailyQuote } from "@/components/daily-quote"

function DashboardContent() {
  const { user, logout, isGuest, isAdmin } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-cyan-950/30">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large floating gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        {/* Smaller floating dots */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-500/40 rounded-full animate-pulse-slow" />
        <div
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-pink-500/40 rounded-full animate-pulse-slow"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-cyan-500/40 rounded-full animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-blue-500/40 rounded-full animate-pulse-slow"
          style={{ animationDelay: "2.5s" }}
        />

        {/* Animated gradient mesh */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 animate-gradient"
          style={{ backgroundSize: "200% 200%" }}
        />
      </div>

      {/* Header */}
      <header className="border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-50 shadow-lg relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EmoHeal</h1>
              <p className="text-xs text-muted-foreground">Mental Wellness Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/dashboard/feedback")}>
              <MessageSquarePlus className="w-4 h-4 mr-2" />
              Feedback
            </Button>
            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/dashboard/settings")}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/dashboard/admin")}>
                <Shield className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            )}
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <Badge variant={isGuest ? "secondary" : "default"} className="text-xs">
                {user?.role}
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {isGuest && (
          <div className="mb-8 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Guest Mode:</strong> You're browsing as a guest. Some features may be limited.{" "}
              <button
                onClick={() => (window.location.href = "/")}
                className="underline font-medium hover:text-yellow-900"
              >
                Sign up
              </button>{" "}
              for full access.
            </p>
          </div>
        )}

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent animate-gradient"
            style={{ backgroundSize: "200% auto" }}
          >
            Welcome back, {user?.name}!
          </h2>
          <p className="text-muted-foreground text-lg">Choose how you'd like to track your emotional wellness today</p>
        </div>

        {/* Detection Mode Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Camera Detection */}
          <Card className="border-2 border-purple-200/50 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all cursor-pointer group hover:scale-105 transform bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden">
            {/* Card gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-purple-500/50 animate-glow">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Facial Emotion</CardTitle>
              <CardDescription>Detect emotions through facial expressions</CardDescription>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all"
                onClick={() => (window.location.href = "/dashboard/face-detection")}
              >
                Start Camera
              </Button>
            </CardContent>
          </Card>

          {/* Voice Detection */}
          <Card className="border-2 border-pink-200/50 dark:border-pink-500/30 hover:border-pink-400 dark:hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/20 transition-all cursor-pointer group hover:scale-105 transform bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden">
            {/* Card gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="text-center pb-4 relative z-10">
              <div
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-pink-500/50 animate-glow"
                style={{ animationDelay: "0.7s" }}
              >
                <Mic className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Voice Emotion</CardTitle>
              <CardDescription>Analyze emotions from your voice patterns</CardDescription>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg hover:shadow-xl hover:shadow-pink-500/30 transition-all"
                onClick={() => (window.location.href = "/dashboard/voice-detection")}
              >
                Start Recording
              </Button>
            </CardContent>
          </Card>

          {/* Chatbot */}
          <Card className="border-2 border-cyan-200/50 dark:border-cyan-500/30 hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all cursor-pointer group hover:scale-105 transform bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden">
            {/* Card gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="text-center pb-4 relative z-10">
              <div
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-cyan-500/50 animate-glow"
                style={{ animationDelay: "1.4s" }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">AI Chatbot</CardTitle>
              <CardDescription>Talk to our empathetic AI companion</CardDescription>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
                onClick={() => (window.location.href = "/dashboard/chatbot")}
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Daily Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MonthlyCalendar />
          </div>
          <div>
            <DailyQuote />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
