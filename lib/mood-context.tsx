"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type MoodType = "happy" | "neutral" | "sad" | "anxious" | "calm"

interface MoodEntry {
  date: string
  mood: MoodType
  source: "face" | "voice" | "manual"
  timestamp: string
}

interface MoodContextType {
  moodData: Record<string, MoodEntry>
  addMoodEntry: (mood: MoodType, source: "face" | "voice" | "manual") => void
  getMoodForDate: (date: string) => MoodEntry | undefined
  getAllMoods: () => Record<string, MoodEntry>
}

const MoodContext = createContext<MoodContextType | undefined>(undefined)

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [moodData, setMoodData] = useState<Record<string, MoodEntry>>({})

  // Load mood data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("emoheal_mood_data")
    if (saved) {
      try {
        setMoodData(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load mood data:", e)
      }
    }
  }, [])

  // Save mood data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("emoheal_mood_data", JSON.stringify(moodData))
  }, [moodData])

  const addMoodEntry = (mood: MoodType, source: "face" | "voice" | "manual") => {
    const now = new Date()
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    const timestamp = now.toISOString()

    setMoodData((prev) => ({
      ...prev,
      [dateStr]: {
        date: dateStr,
        mood,
        source,
        timestamp,
      },
    }))
  }

  const getMoodForDate = (date: string) => {
    return moodData[date]
  }

  const getAllMoods = () => {
    return moodData
  }

  return (
    <MoodContext.Provider value={{ moodData, addMoodEntry, getMoodForDate, getAllMoods }}>
      {children}
    </MoodContext.Provider>
  )
}

export function useMood() {
  const context = useContext(MoodContext)
  if (!context) {
    throw new Error("useMood must be used within MoodProvider")
  }
  return context
}
