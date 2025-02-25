"use client"

import { useState } from "react"
import { Copy, Share, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

interface InviteDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function InviteDrawer({ isOpen, onClose }: InviteDrawerProps) {
  const [referralLink, setReferralLink] = useState("https://t.me/YourBot?start=ref123")

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const shareToTelegram = () => {
    // Check if Telegram Web App is available
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}`)
    } else {
      // Fallback to normal share
      window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}`, "_blank")
    }
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/40" onClick={onClose} />}

      {/* Drawer content */}
      <div className="relative bg-background rounded-t-xl p-6 space-y-4 max-w-md mx-auto">
        {/* Handle bar */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
          <div className="h-1 w-12 bg-muted-foreground/20 rounded-full" />
        </div>

        {/* Close button */}
        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>

        {/* Content */}
        <div className="pt-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Share Referral Link</h3>
            <p className="text-sm text-muted-foreground">Share this link with your friends and earn points together</p>
          </div>

          <div className="flex items-center space-x-2">
            <Input value={referralLink} readOnly className="font-mono text-sm" />
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white" size="lg" onClick={shareToTelegram}>
            <Share className="h-4 w-4 mr-2" />
            Share on Telegram
          </Button>
        </div>
      </div>
    </div>
  )
}

