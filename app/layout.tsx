import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import BottomNav from "@/components/bottom-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Telegram Mini App",
  description: "Complete tasks and earn rewards",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <main className="flex-1 container max-w-md mx-auto p-4 overflow-y-auto">{children}</main>
        <BottomNav />
      </body>
    </html>
  )
}



import './globals.css'