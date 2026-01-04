"use client"

import { useState, useRef, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import { useMood } from "@/lib/mood-context"
import { useRouter } from "next/navigation"

type MoodType = "happy" | "neutral" | "sad" | "anxious" | "calm"

function FaceDetectionContent() {
  const router = useRouter()
  const { addMoodEntry } = useMood()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectedMood, setDetectedMood] = useState<MoodType | null>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    return () => {
      // Cleanup: stop video stream when component unmounts
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
        setError("")
      }
    } catch (err) {
      setError("Failed to access camera. Please allow camera permissions.")
      console.error("Camera error:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsStreaming(false)
    }
  }

  const analyzeEmotion = async () => {
    setIsAnalyzing(true)

    // Simulate emotion detection (in real app, this would use ML model)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Random emotion for demo - replace with actual ML detection
    const moods: MoodType[] = ["happy", "neutral", "sad", "anxious", "calm"]
    const randomMood = moods[Math.floor(Math.random() * moods.length)]

    setDetectedMood(randomMood)
    addMoodEntry(randomMood, "face")
    setIsAnalyzing(false)

    // Auto redirect after 2 seconds
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="outline"
          className="mb-6 bg-transparent"
          onClick={() => {
            stopCamera()
            router.push("/dashboard")
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Facial Emotion Detection</CardTitle>
                <CardDescription>Detect your current emotional state through facial expressions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Preview */}
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              {!isStreaming && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm">
                  <div className="text-center text-white">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Camera not started</p>
                  </div>
                </div>
              )}
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
              {!isStreaming ? (
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                  onClick={startCamera}
                  size="lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                    onClick={analyzeEmotion}
                    disabled={isAnalyzing || detectedMood !== null}
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Detect Emotion"
                    )}
                  </Button>
                  <Button variant="outline" onClick={stopCamera} size="lg">
                    Stop Camera
                  </Button>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Position your face in the camera frame and click "Detect Emotion" to analyze your current mood
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function FaceDetectionPage() {
  return (
    <ProtectedRoute>
      <FaceDetectionContent />
    </ProtectedRoute>
  )
}
