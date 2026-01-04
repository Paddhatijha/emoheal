"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sparkles, RefreshCw, Heart, Star } from "lucide-react"
import { useEffect, useState } from "react"

const quotes = [
  { text: "Every day may not be good, but there's good in every day.", author: "Alice Morse Earle" },
  {
    text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    author: "Anonymous",
  },
  { text: "You are stronger than you think, braver than you believe.", author: "A.A. Milne" },
  { text: "Healing takes time, and asking for help is a courageous step.", author: "Mariska Hargitay" },
  { text: "It's okay to not be okay. It's okay to ask for help.", author: "Anonymous" },
  { text: "Your present circumstances don't determine where you can go.", author: "Abraham Lincoln" },
  { text: "The only way out is through.", author: "Robert Frost" },
  { text: "One small positive thought can change your whole day.", author: "Ziggy" },
  { text: "Be gentle with yourself. You're doing the best you can.", author: "Anonymous" },
  { text: "Progress, not perfection.", author: "Anonymous" },
  { text: "Your mental health journey is valid, no matter where you are.", author: "Anonymous" },
  { text: "Self-care is how you take your power back.", author: "Lalah Delia" },
  {
    text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed.",
    author: "Lori Deschene",
  },
  { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn" },
  {
    text: "The greatest discovery is that a human being can alter his life by altering his attitude.",
    author: "William James",
  },
  { text: "You are enough just as you are.", author: "Meghan Markle" },
  { text: "Take a deep breath. It's just a bad day, not a bad life.", author: "Anonymous" },
  { text: "Your value doesn't decrease based on someone's inability to see your worth.", author: "Anonymous" },
  { text: "Sometimes the bravest thing you can do is ask for help.", author: "Anonymous" },
  { text: "You have survived 100% of your worst days. You're doing great.", author: "Anonymous" },
  { text: "Mental health is not a destination, but a process.", author: "Noam Shpancer" },
  { text: "You are not your illness. You have an individual story to tell.", author: "Julian Seifter" },
  { text: "Small steps in the right direction can turn out to be the biggest step of your life.", author: "Anonymous" },
  { text: "It's okay to rest. It's okay to take a break.", author: "Anonymous" },
  { text: "Your feelings are valid. Your struggles are real.", author: "Anonymous" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Keep your face always toward the sunshine, and shadows will fall behind you.", author: "Walt Whitman" },
  { text: "You are braver than you believe, stronger than you seem.", author: "Christopher Robin" },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
  },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
]

export function DailyQuote() {
  const [quote, setQuote] = useState(quotes[0])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now.getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)

    const selectedQuote = quotes[dayOfYear % quotes.length]
    setQuote(selectedQuote)
    setIsAnimating(true)
  }, [])

  const refreshQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
    setIsAnimating(false)
    setTimeout(() => setIsAnimating(true), 50)
  }

  return (
    <div className="relative group">
      <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse delay-700" />

      <Card
        className={`relative border-2 border-transparent bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-purple-900/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-[1.02] ${isAnimating ? "animate-in fade-in slide-in-from-top-4 duration-700" : ""}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <Star className="w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: "10s" }} />
        </div>
        <div className="absolute bottom-6 left-6 opacity-20 group-hover:opacity-40 transition-opacity">
          <Heart className="w-5 h-5 text-pink-400 animate-bounce" style={{ animationDuration: "3s" }} />
        </div>

        <CardHeader className="pb-3 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-md opacity-50 animate-pulse" />
                <div
                  className="relative w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center animate-bounce"
                  style={{ animationDuration: "2s" }}
                >
                  <Sparkles className="w-5 h-5 text-white animate-spin" style={{ animationDuration: "4s" }} />
                </div>
              </div>
              <h3 className="font-bold text-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Daily Inspiration
              </h3>
            </div>
            <button
              onClick={refreshQuote}
              className="p-2 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 hover:scale-110 transition-transform duration-300 group/btn"
              title="Get random quote"
            >
              <RefreshCw className="w-4 h-4 text-purple-600 group-hover/btn:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative">
          <div className="relative p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 shadow-inner">
            <div className="absolute -left-1 -top-3 text-7xl text-purple-300 dark:text-purple-700 font-serif opacity-50 group-hover:scale-110 transition-transform duration-300">
              "
            </div>
            <blockquote className="relative z-10 text-base font-medium text-foreground leading-relaxed pl-8 pr-6 py-2 animate-in fade-in duration-1000">
              {quote.text}
            </blockquote>
            <div className="absolute -right-1 -bottom-3 text-7xl text-pink-300 dark:text-pink-700 font-serif rotate-180 opacity-50 group-hover:scale-110 transition-transform duration-300">
              "
            </div>
          </div>

          <div className="flex items-center gap-3 pl-2">
            <div className="h-10 w-1.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full shadow-lg group-hover:h-12 transition-all duration-300" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-muted-foreground group-hover:text-purple-600 transition-colors">
                — {quote.author}
              </p>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-yellow-400 fill-yellow-400 animate-in zoom-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center pt-3 border-t border-purple-200 dark:border-purple-800">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40">
              <Sparkles className="w-3 h-3 text-purple-600 animate-pulse" />
              <p className="text-xs font-medium text-purple-700 dark:text-purple-300">
                A new quote every day to inspire your wellness journey
              </p>
              <Sparkles className="w-3 h-3 text-pink-600 animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
