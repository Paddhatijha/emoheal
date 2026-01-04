"use client"

import { useState, useRef } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, ArrowLeft, CheckCircle, Loader2, Radio } from "lucide-react"
import { useMood } from "@/lib/mood-context"
import { useRouter } from "next/navigation"

type MoodType = "happy" | "neutral" | "sad" | "anxious" | "calm"

function VoiceDetectionContent() {
  const router = useRouter()
  const { addMoodEntry } = useMood()
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectedMood, setDetectedMood] = useState<MoodType | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [error, setError] = useState<string>("")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      setError("")

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      setError("Failed to access microphone. Please allow microphone permissions.")
      console.error("Microphone error:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const analyzeVoice = async () => {
    setIsAnalyzing(true)

    // Simulate voice emotion analysis (in real app, this would use ML model)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Random emotion for demo - replace with actual ML detection
    const moods: MoodType[] = ["happy", "neutral", "sad", "anxious", "calm"]
    const randomMood = moods[Math.floor(Math.random() * moods.length)]

    setDetectedMood(randomMood)
    addMoodEntry(randomMood, "voice")
    setIsAnalyzing(false)

    // Auto redirect after 2 seconds
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="outline"
          className="mb-6 bg-transparent"
          onClick={() => {
            stopRecording()
            router.push("/dashboard")
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Voice Emotion Detection</CardTitle>
                <CardDescription>Analyze your emotional state through voice patterns and tone</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recording Visualizer */}
            <div className="relative aspect-[2/1] bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden border-2">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {isRecording ? (
                  <>
                    <div className="relative mb-6">
                      <Radio className="w-20 h-20 text-pink-500 animate-pulse" />
                      <div className="absolute inset-0 animate-ping">
                        <Radio className="w-20 h-20 text-pink-400 opacity-75" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-pink-600 mb-2">{formatTime(recordingTime)}</p>
                    <p className="text-sm text-muted-foreground">Recording in progress...</p>
                  </>
                ) : (
                  <>
                    <Mic className="w-20 h-20 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-muted-foreground">Ready to record</p>
                  </>
                )}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-800 text-sm">{error}</div>
            )}

            {detectedMood && (
              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg text-center animate-in fade-in slide-in-from-bottom-4">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
                <p className="text-lg font-semibold text-green-800 mb-1">Emotion Detected!</p>
                <p className="text-2xl font-bold text-green-900 capitalize">{detectedMood}</p>
                <p className="text-sm text-green-700 mt-2">Saved to your mood calendar</p>
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-3">
              {!isRecording && recordingTime === 0 ? (
                <Button
                  className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                  onClick={startRecording}
                  size="lg"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Start Recording
                </Button>
              ) : isRecording ? (
                <Button
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  onClick={stopRecording}
                  size="lg"
                >
                  Stop Recording
                </Button>
              ) : (
                <>
                  <Button
                    className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                    onClick={analyzeVoice}
                    disabled={isAnalyzing || detectedMood !== null}
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Voice"
                    )}
                  </Button>
                  <Button variant="outline" onClick={startRecording} size="lg">
                    Record Again
                  </Button>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Speak naturally for at least 5 seconds to get accurate emotion detection results
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function VoiceDetectionPage() {
  return (
    <ProtectedRoute>
      <VoiceDetectionContent />
    </ProtectedRoute>
  )
}
