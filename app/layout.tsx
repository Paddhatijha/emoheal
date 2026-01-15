import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { SettingsProvider } from "@/lib/settings-context"
import { MoodProvider } from "@/lib/mood-context"
import { FeedbackProvider } from "@/lib/feedback-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EmoHeal - Mental Wellness Dashboard",
  description:
    "Track your emotional wellbeing with mood tracking, voice emotion analysis, and facial emotion detection",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <SettingsProvider>
          <AuthProvider>
            <MoodProvider>
              <FeedbackProvider>{children}</FeedbackProvider>
            </MoodProvider>
          </AuthProvider>
        </SettingsProvider>
        <Analytics />
      </body>
    </html>
  )
}
