"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Video, Plus, CheckCircle2, Circle, Music2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function TherapyPlanner() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const sessions = [
    {
      title: "Music Therapy Session",
      therapist: "Dr. Sarah Johnson",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Video Call",
      status: "upcoming",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Sound Healing Experience",
      therapist: "Dr. Michael Chen",
      date: "Jan 8",
      time: "2:30 PM",
      type: "Video Call",
      status: "upcoming",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Relaxation Music Therapy",
      therapist: "Dr. Emily Williams",
      date: "Jan 3",
      time: "11:00 AM",
      type: "Completed",
      status: "completed",
      gradient: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <Card className="border-2 border-border/50 hover:border-pink-500/50 hover:shadow-2xl transition-all duration-500">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse-slow">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              Therapy Planner
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Manage your music therapy sessions</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {sessions.map((session, index) => {
            const isHovered = hoveredIndex === index

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
                  isHovered ? "border-transparent shadow-2xl scale-105" : "border-border/50 shadow-md"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${session.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative flex items-start gap-4 p-5">
                  <div
                    className={`h-full w-1.5 rounded-full bg-gradient-to-b ${session.gradient} absolute left-0 top-0 bottom-0`}
                  />

                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${session.gradient} shadow-lg ${isHovered ? "scale-110" : ""} transition-transform duration-300`}
                  >
                    <Music2 className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-foreground text-lg">{session.title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">{session.therapist}</p>
                      </div>
                      {session.status === "completed" ? (
                        <div className="p-2 rounded-full bg-green-100">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-full bg-purple-100 animate-pulse-slow">
                          <Circle className="h-5 w-5 text-purple-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm flex-wrap">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">{session.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted">
                        <Clock className="h-4 w-4 text-pink-600" />
                        <span className="font-medium">{session.time}</span>
                      </div>
                      {session.status === "upcoming" && (
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${session.gradient} text-white shadow-md`}
                        >
                          <Video className="h-4 w-4" />
                          <span className="font-medium">{session.type}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {session.status === "upcoming" && (
                    <Button
                      size="sm"
                      className={`bg-gradient-to-r ${session.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300`}
                    >
                      Join Now
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 pt-6 border-t-2 border-border/50">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border-2 border-purple-500/20">
            <span className="text-sm font-medium text-muted-foreground">Total Sessions This Month</span>
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              8 sessions
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
