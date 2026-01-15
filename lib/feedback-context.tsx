"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Feedback {
  id: string
  userId: string
  userName: string
  userRole: string
  rating: number
  comment: string
  date: string
  stars: number // Number of stars given by other users
  starredBy: string[] // User IDs who starred this feedback
}

interface FeedbackContextType {
  feedbacks: Feedback[]
  addFeedback: (userId: string, userName: string, userRole: string, rating: number, comment: string) => void
  toggleStar: (feedbackId: string, userId: string) => void
  deleteFeedback: (feedbackId: string) => void
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined)

// Sample initial feedback data
const initialFeedbacks: Feedback[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah Johnson",
    userRole: "user",
    rating: 5,
    comment: "EmoHeal has been incredible for my mental wellness journey. The face detection is very accurate!",
    date: "2026-01-02",
    stars: 12,
    starredBy: [],
  },
  {
    id: "2",
    userId: "user2",
    userName: "Michael Chen",
    userRole: "user",
    rating: 4,
    comment: "Great app! The voice emotion analysis really helps me understand my feelings better.",
    date: "2026-01-03",
    stars: 8,
    starredBy: [],
  },
  {
    id: "3",
    userId: "admin1",
    userName: "Admin",
    userRole: "admin",
    rating: 5,
    comment: "As an admin, I can see the positive impact this platform has. Highly recommend!",
    date: "2026-01-04",
    stars: 15,
    starredBy: [],
  },
]

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("emoheal_feedbacks")
    if (stored) {
      setFeedbacks(JSON.parse(stored))
    } else {
      setFeedbacks(initialFeedbacks)
      localStorage.setItem("emoheal_feedbacks", JSON.stringify(initialFeedbacks))
    }
  }, [])

  const addFeedback = (userId: string, userName: string, userRole: string, rating: number, comment: string) => {
    const newFeedback: Feedback = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      userName,
      userRole,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
      stars: 0,
      starredBy: [],
    }

    const updated = [newFeedback, ...feedbacks]
    setFeedbacks(updated)
    localStorage.setItem("emoheal_feedbacks", JSON.stringify(updated))
  }

  const toggleStar = (feedbackId: string, userId: string) => {
    const updated = feedbacks.map((fb) => {
      if (fb.id === feedbackId) {
        const hasStarred = fb.starredBy.includes(userId)
        return {
          ...fb,
          stars: hasStarred ? fb.stars - 1 : fb.stars + 1,
          starredBy: hasStarred ? fb.starredBy.filter((id) => id !== userId) : [...fb.starredBy, userId],
        }
      }
      return fb
    })

    setFeedbacks(updated)
    localStorage.setItem("emoheal_feedbacks", JSON.stringify(updated))
  }

  const deleteFeedback = (feedbackId: string) => {
    const updated = feedbacks.filter((fb) => fb.id !== feedbackId)
    setFeedbacks(updated)
    localStorage.setItem("emoheal_feedbacks", JSON.stringify(updated))
  }

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback, toggleStar, deleteFeedback }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export function useFeedback() {
  const context = useContext(FeedbackContext)
  if (context === undefined) {
    throw new Error("useFeedback must be used within a FeedbackProvider")
  }
  return context
}
