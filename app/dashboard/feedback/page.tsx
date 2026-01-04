"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useFeedback } from "@/lib/feedback-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, Trash2, ArrowLeft, Send } from "lucide-react"

function FeedbackContent() {
  const { user, isGuest, isAdmin } = useAuth()
  const { feedbacks, addFeedback, toggleStar, deleteFeedback } = useFeedback()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!comment.trim() || rating === 0) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    addFeedback(user!.id, user!.name, user!.role, rating, comment)
    setComment("")
    setRating(0)
    setIsSubmitting(false)
  }

  const canSubmitFeedback = !isGuest

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">User Feedback</h1>
              <p className="text-xs text-muted-foreground">Share your EmoHeal experience</p>
            </div>
          </div>
          <Badge variant="outline">{feedbacks.length} Reviews</Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Submit Feedback Section */}
        {canSubmitFeedback && (
          <Card className="mb-8 border-2 border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                Submit Your Feedback
              </CardTitle>
              <CardDescription>Share your experience with EmoHeal community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Rating Stars */}
                <div>
                  <label className="block text-sm font-medium mb-2">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium mb-2">Your Feedback</label>
                  <Textarea
                    placeholder="Share your thoughts about EmoHeal..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!comment.trim() || rating === 0 || isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Guest Notice */}
        {isGuest && (
          <div className="mb-8 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Guest Mode:</strong> You can view feedback but need to{" "}
              <button
                onClick={() => (window.location.href = "/")}
                className="underline font-medium hover:text-yellow-900"
              >
                create an account
              </button>{" "}
              to submit your own feedback and star reviews.
            </p>
          </div>
        )}

        {/* Feedback List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Community Feedback ({feedbacks.length})</h2>

          {feedbacks.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No feedback yet. Be the first to share your experience!</p>
              </CardContent>
            </Card>
          ) : (
            feedbacks.map((feedback) => (
              <Card key={feedback.id} className="border-2 hover:border-purple-300 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{feedback.userName}</CardTitle>
                        <Badge
                          variant={
                            feedback.userRole === "admin"
                              ? "default"
                              : feedback.userRole === "user"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {feedback.userRole}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{feedback.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Star Button */}
                      {!isGuest && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStar(feedback.id, user!.id)}
                          className={`${
                            feedback.starredBy.includes(user!.id)
                              ? "bg-yellow-50 border-yellow-300 hover:bg-yellow-100"
                              : ""
                          }`}
                        >
                          <Star
                            className={`w-4 h-4 mr-1 ${
                              feedback.starredBy.includes(user!.id) ? "fill-yellow-400 text-yellow-400" : ""
                            }`}
                          />
                          {feedback.stars}
                        </Button>
                      )}

                      {/* Delete Button (Admin or Own Feedback) */}
                      {(isAdmin || feedback.userId === user!.id) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this feedback?")) {
                              deleteFeedback(feedback.id)
                            }
                          }}
                          className="text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feedback.comment}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default function FeedbackPage() {
  return (
    <ProtectedRoute>
      <FeedbackContent />
    </ProtectedRoute>
  )
}
