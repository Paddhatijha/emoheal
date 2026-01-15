"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scan, Camera, Upload, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function FaceEmotionCard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const emotions = [
    { label: "Joy", value: 65, gradient: "from-yellow-400 via-orange-400 to-red-400", icon: "😊" },
    { label: "Neutral", value: 20, gradient: "from-blue-400 via-cyan-400 to-teal-400", icon: "😐" },
    { label: "Surprise", value: 10, gradient: "from-purple-400 via-pink-400 to-rose-400", icon: "😮" },
    { label: "Sadness", value: 5, gradient: "from-indigo-400 via-blue-400 to-cyan-400", icon: "😢" },
  ]

  return (
    <Card className="border-2 border-border/50 hover:border-purple-500/50 hover:shadow-2xl transition-all duration-500">
      <CardHeader className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20">
        <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse-slow">
            <Scan className="h-5 w-5 text-white" />
          </div>
          Face Emotion Detection
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Detect emotions through facial expressions</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative group mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl opacity-30 group-hover:opacity-60 blur transition-all duration-500" />
          <div className="relative flex flex-col items-center justify-center py-10 border-2 border-dashed border-border rounded-2xl bg-gradient-to-br from-purple-50/50 to-pink-50/50 hover:from-purple-100/50 hover:to-pink-100/50 transition-all duration-300">
            <div className="relative">
              <Camera className="h-16 w-16 text-purple-500 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-pink-500 animate-pulse" />
            </div>
            <p className="text-sm font-medium text-foreground mb-4">Upload a photo or use camera</p>
            <div className="flex gap-3">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-2 border-purple-500/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 bg-transparent"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="h-1 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            Last Detection Results
          </p>
          {emotions.map((emotion, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 w-32">
                <span className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {emotion.icon}
                </span>
                <span className="text-sm font-medium text-foreground">{emotion.label}</span>
              </div>
              <div className="flex items-center gap-3 flex-1">
                <div className="h-3 flex-1 bg-muted rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${emotion.gradient} transition-all duration-1000 shadow-lg relative`}
                    style={{ width: `${emotion.value}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground w-12 text-right">{emotion.value}%</span>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => setIsAnalyzing(!isAnalyzing)}
          className={`w-full mt-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
            isAnalyzing
              ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          } text-white`}
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Scan className="h-4 w-4 mr-2" />
              Start Analysis
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
