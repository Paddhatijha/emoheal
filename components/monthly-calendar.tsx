"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Smile, Meh, Frown, Heart, Zap, Calendar, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMood } from "@/lib/mood-context"

type MoodType = "happy" | "neutral" | "sad" | "anxious" | "calm"

const moodIcons = {
  happy: {
    icon: Smile,
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/30",
    gradient: "from-green-400 to-emerald-500",
    ring: "ring-green-500/50",
  },
  neutral: {
    icon: Meh,
    color: "text-gray-500",
    bg: "bg-gray-50 dark:bg-gray-800/30",
    gradient: "from-gray-400 to-slate-500",
    ring: "ring-gray-500/50",
  },
  sad: {
    icon: Frown,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    gradient: "from-blue-400 to-indigo-500",
    ring: "ring-blue-500/50",
  },
  anxious: {
    icon: Zap,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    gradient: "from-orange-400 to-amber-500",
    ring: "ring-orange-500/50",
  },
  calm: {
    icon: Heart,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    gradient: "from-purple-400 to-pink-500",
    ring: "ring-purple-500/50",
  },
}

export function MonthlyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1))
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid")
  const { moodData, addMoodEntry, getAllMoods } = useMood()

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDay(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDay(null)
  }

  const getDayMood = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    const entry = moodData[dateStr]
    return entry?.mood
  }

  const handleDayClick = (day: number) => {
    setSelectedDay(day === selectedDay ? null : day)
  }

  const handleMoodSelect = (day: number, mood: MoodType) => {
    addMoodEntry(mood, "manual")
    setSelectedDay(null)
  }

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const moodStats = Object.values(moodData).reduce(
    (acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1
      return acc
    },
    {} as Record<MoodType, number>,
  )

  return (
    <div className="relative">
      <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse" />
      <div
        className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <Card className="w-full max-w-md shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50 dark:from-purple-950/20 dark:via-transparent dark:to-pink-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 relative border-b-2 border-purple-100 dark:border-purple-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg blur-md opacity-50 animate-pulse" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                {monthNames[month]} {year}
              </CardTitle>
            </div>
            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-white/70 dark:bg-gray-800/70 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:scale-110 transition-all duration-300 border-purple-200 dark:border-purple-800"
                onClick={previousMonth}
              >
                <ChevronLeft className="w-4 h-4 text-purple-600" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-white/70 dark:bg-gray-800/70 hover:bg-pink-100 dark:hover:bg-pink-900/50 hover:scale-110 transition-all duration-300 border-pink-200 dark:border-pink-800"
                onClick={nextMonth}
              >
                <ChevronRight className="w-4 h-4 text-pink-600" />
              </Button>
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Month Progress
              </span>
              <span className="font-semibold">{Math.round((4 / daysInMonth) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 animate-pulse"
                style={{ width: `${(4 / daysInMonth) * 100}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4 relative">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5 mb-4 mt-4">
            {/* Day Headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
              <div key={day} className="text-center font-bold text-xs text-muted-foreground py-2 relative">
                {day}
                {(idx === 0 || idx === 6) && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                )}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map((day, index) => {
              const mood = day ? getDayMood(day) : null
              const MoodIcon = mood ? moodIcons[mood].icon : null
              const isToday = day === 4
              const isSelected = day === selectedDay

              return (
                <div key={index} className="relative group/day">
                  <div
                    onClick={() => day && handleDayClick(day)}
                    className={cn(
                      "aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-300 text-xs relative overflow-hidden",
                      day ? "cursor-pointer hover:scale-110 hover:z-10" : "opacity-0",
                      isToday && "ring-2 ring-purple-500 ring-offset-2 shadow-lg shadow-purple-500/50",
                      isSelected && "scale-110 shadow-xl z-20",
                      mood && moodIcons[mood].bg,
                      mood && "shadow-md hover:shadow-xl",
                      !mood &&
                        "border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950/20 dark:hover:to-pink-950/20",
                    )}
                  >
                    {day && (
                      <>
                        <div
                          className={cn(
                            "absolute inset-0 opacity-0 group-hover/day:opacity-30 transition-opacity duration-300 bg-gradient-to-br",
                            mood ? moodIcons[mood].gradient : "from-purple-400 to-pink-400",
                          )}
                        />

                        {isToday && (
                          <div className="absolute inset-0 rounded-xl border-2 border-purple-400 animate-ping opacity-20" />
                        )}

                        <span
                          className={cn(
                            "text-xs font-semibold mb-0.5 relative z-10 transition-all",
                            isToday && "text-purple-600 font-bold text-sm",
                            mood && "font-bold",
                          )}
                        >
                          {day}
                        </span>

                        {MoodIcon && (
                          <div className="relative">
                            <div className={cn("absolute inset-0 blur-sm opacity-50", mood && moodIcons[mood].color)} />
                            <MoodIcon
                              className={cn(
                                "w-5 h-5 relative z-10 animate-in zoom-in duration-300",
                                moodIcons[mood].color,
                              )}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {isSelected && day && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-2.5 z-50 animate-in slide-in-from-top-4 duration-300 border-2 border-purple-200 dark:border-purple-700">
                      <div className="flex gap-1.5">
                        {Object.entries(moodIcons).map(([moodKey, moodConfig], idx) => {
                          const Icon = moodConfig.icon
                          return (
                            <button
                              key={moodKey}
                              onClick={() => handleMoodSelect(day, moodKey as MoodType)}
                              className={cn(
                                "p-2 rounded-lg transition-all hover:scale-125 animate-in zoom-in",
                                moodConfig.bg,
                                "hover:shadow-lg",
                              )}
                              style={{ animationDelay: `${idx * 50}ms` }}
                              title={moodKey}
                            >
                              <Icon className={cn("w-5 h-5", moodConfig.color)} />
                            </button>
                          )
                        })}
                      </div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-t-2 border-l-2 border-purple-200 dark:border-purple-700 rotate-45" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="space-y-3 pt-4 border-t-2 border-dashed border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mood Legend
              </span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                  {Object.keys(moodData).length} days tracked
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {Object.entries(moodIcons).map(([key, config], idx) => {
                const Icon = config.icon
                const count = moodStats[key as MoodType] || 0
                return (
                  <div
                    key={key}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded-xl transition-all hover:scale-105 cursor-pointer border-2 border-transparent hover:border-opacity-50 animate-in slide-in-from-bottom-4",
                      config.bg,
                      count > 0 && "shadow-md",
                    )}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="relative">
                      <div
                        className={cn("absolute inset-0 blur-md opacity-30 rounded-full", count > 0 && "animate-pulse")}
                      />
                      <Icon className={cn("w-5 h-5 relative z-10", config.color)} />
                      {count > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-purple-600 to-pink-600 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-lg animate-in zoom-in">
                          {count}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold capitalize">{key}</span>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-center gap-2 pt-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent dark:via-purple-700" />
              <p className="text-[10px] text-center text-muted-foreground italic px-2 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30">
                ✨ Click any day to add or change mood ✨
              </p>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent dark:via-pink-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
