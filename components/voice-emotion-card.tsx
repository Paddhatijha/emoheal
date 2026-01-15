"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Play, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function VoiceEmotionCard() {
  const [isRecording, setIsRecording] = useState(false)

  const emotions = [
    { label: "Happy", value: 45, gradient: "from-yellow-400 to-orange-500", icon: "😊" },
    { label: "Calm", value: 35, gradient: "from-blue-400 to-cyan-500", icon: "😌" },
    { label: "Anxious", value: 15, gradient: "from-purple-400 to-pink-500", icon: "😰" },
    { label: "Sad", value: 5, gradient: "from-indigo-400 to-blue-500", icon: "😢" },
  ]

  return (
    <Card className="border-2 border-border/50 hover:border-cyan-500/50 hover:shadow-2xl transition-all duration-500">
      <CardHeader className="bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20">
        <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 animate-pulse-slow">
            <Mic className="h-5 w-5 text-white" />
          </div>
          Voice Emotion Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Analyze emotions through your voice tone</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center py-8 mb-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50">
          <Button
            size="lg"
            onClick={() => setIsRecording(!isRecording)}
            className={`h-28 w-28 rounded-full shadow-2xl transition-all duration-500 ${
              isRecording
                ? "bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse scale-110"
                : "bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover:scale-110"
            }`}
          >
            {isRecording ? (
              <Waves className="h-12 w-12 text-white animate-pulse" />
            ) : (
              <Mic className="h-12 w-12 text-white" />
            )}
          </Button>
          <p
            className={`text-sm font-medium mt-4 ${isRecording ? "text-red-500 animate-pulse" : "text-muted-foreground"}`}
          >
            {isRecording ? "🎤 Recording... Click to stop" : "Click to start voice analysis"}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="h-1 w-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            Recent Analysis
          </p>
          {emotions.map((emotion, index) => (
            <div
              key={index}
              className="group p-3 rounded-xl hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                    {emotion.icon}
                  </span>
                  <span className="font-medium text-foreground">{emotion.label}</span>
                </div>
                <span className="font-bold text-foreground text-base">{emotion.value}%</span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r ${emotion.gradient} transition-all duration-1000 shadow-lg`}
                  style={{ width: `${emotion.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 border-2 border-cyan-500/50 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 bg-transparent"
        >
          <Play className="h-4 w-4 mr-2" />
          View Full History
        </Button>
      </CardContent>
    </Card>
  )
}
