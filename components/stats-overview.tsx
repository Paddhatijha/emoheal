"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Sparkles, Music, Heart } from "lucide-react"
import { useState } from "react"

export function StatsOverview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const stats = [
    {
      label: "Music Sessions",
      value: "24",
      change: "+8 this week",
      trend: "up",
      icon: Music,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      label: "Mood Score",
      value: "8.4",
      change: "+1.2 points",
      trend: "up",
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-500/20 to-rose-500/20",
    },
    {
      label: "Stress Relief",
      value: "92%",
      change: "+15% better",
      trend: "up",
      icon: Sparkles,
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-500/20 to-blue-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
        const isHovered = hoveredIndex === index

        return (
          <Card
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`p-6 border-2 transition-all duration-500 cursor-pointer ${
              isHovered
                ? "shadow-2xl scale-105 border-transparent"
                : "shadow-md border-border/50 hover:border-transparent"
            }`}
            style={{
              background: isHovered
                ? `linear-gradient(135deg, ${stat.gradient.replace("from-", "").replace("to-", ", ")})`
                : undefined,
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className={`text-sm font-medium mb-2 ${isHovered ? "text-white/90" : "text-muted-foreground"}`}>
                  {stat.label}
                </p>
                <p className={`text-4xl font-bold mb-3 ${isHovered ? "text-white" : "text-foreground"}`}>
                  {stat.value}
                </p>
                <div className="flex items-center gap-1.5">
                  <TrendIcon
                    className={`h-4 w-4 ${isHovered ? "text-white" : "text-green-500"} ${isHovered ? "animate-bounce" : ""}`}
                  />
                  <span className={`text-sm font-semibold ${isHovered ? "text-white" : "text-green-500"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.bgGradient} ${
                  isHovered ? "scale-110 shadow-lg" : ""
                } transition-all duration-300`}
              >
                <Icon
                  className={`h-8 w-8 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent ${isHovered ? "animate-pulse-slow" : ""}`}
                />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
