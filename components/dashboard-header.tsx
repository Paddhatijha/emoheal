import { Music, Bell, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 backdrop-blur-xl supports-[backdrop-filter]:bg-gradient-to-r">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 shadow-lg animate-glow">
            <Music className="h-8 w-8 text-white animate-pulse-slow" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-2xl leading-none">
              EmoHeal
            </span>
            <span className="text-sm font-medium text-muted-foreground">Therapeutic Music Companion</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-purple-500/20 hover:scale-110 transition-all duration-300"
          >
            <Bell className="h-5 w-5 text-purple-600" />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-500 to-red-500 animate-pulse" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-cyan-500/20 hover:scale-110 transition-all duration-300 rounded-full border-2 border-transparent hover:border-cyan-500/50"
          >
            <User className="h-5 w-5 text-cyan-600" />
          </Button>
        </div>
      </div>
    </header>
  )
}
