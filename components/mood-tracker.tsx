"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Smile, Meh, Frown, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const moodData = [
  { day: "Mon", mood: 7 },
  { day: "Tue", mood: 6 },
  { day: "Wed", mood: 8 },
  { day: "Thu", mood: 7 },
  { day: "Fri", mood: 9 },
  { day: "Sat", mood: 8 },
  { day: "Sun", mood: 7 },
]

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  return (
    <Card className="overflow-hidden border-2 border-border/50 hover:border-purple-500/50 hover:shadow-2xl transition-all duration-500">
      <CardHeader className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20 backdrop-blur-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Mood Tracker
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Track your emotional journey with music</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={selectedMood === "happy" ? "default" : "outline"}
              className={`gap-2 transition-all duration-300 ${
                selectedMood === "happy"
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white border-0 animate-pulse-slow"
                  : "hover:scale-110 hover:bg-yellow-100"
              }`}
              onClick={() => setSelectedMood(selectedMood === "happy" ? null : "happy")}
            >
              <Smile className="h-4 w-4" />
              Happy
            </Button>
            <Button
              size="sm"
              variant={selectedMood === "neutral" ? "default" : "outline"}
              className={`gap-2 transition-all duration-300 ${
                selectedMood === "neutral"
                  ? "bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white border-0 animate-pulse-slow"
                  : "hover:scale-110 hover:bg-blue-100"
              }`}
              onClick={() => setSelectedMood(selectedMood === "neutral" ? null : "neutral")}
            >
              <Meh className="h-4 w-4" />
              Neutral
            </Button>
            <Button
              size="sm"
              variant={selectedMood === "sad" ? "default" : "outline"}
              className={`gap-2 transition-all duration-300 ${
                selectedMood === "sad"
                  ? "bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white border-0 animate-pulse-slow"
                  : "hover:scale-110 hover:bg-indigo-100"
              }`}
              onClick={() => setSelectedMood(selectedMood === "sad" ? null : "sad")}
            >
              <Frown className="h-4 w-4" />
              Sad
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="rounded-xl bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodData}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgb(168, 85, 247)" />
                  <stop offset="50%" stopColor="rgb(236, 72, 153)" />
                  <stop offset="100%" stopColor="rgb(6, 182, 212)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
              <XAxis dataKey="day" className="text-muted-foreground text-xs" tick={{ fill: "currentColor" }} />
              <YAxis domain={[0, 10]} className="text-muted-foreground text-xs" tick={{ fill: "currentColor" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "2px solid rgb(168, 85, 247)",
                  borderRadius: "1rem",
                  color: "black",
                  boxShadow: "0 10px 40px rgba(168, 85, 247, 0.3)",
                }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="url(#colorMood)"
                strokeWidth={4}
                dot={{ fill: "rgb(236, 72, 153)", r: 6, strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 9, strokeWidth: 3, stroke: "rgb(168, 85, 247)", className: "animate-pulse" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t-2 border-border/50">
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20">
              <p className="text-xs text-muted-foreground mb-1">Average Mood</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                7.4
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/20">
              <p className="text-xs text-muted-foreground mb-1">Best Day</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Fri
              </p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <TrendingUp className="h-4 w-4 mr-2" />
            Log Mood
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
