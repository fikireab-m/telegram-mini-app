"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"

const InviteFriends = () => {
  const [inviteLink, setInviteLink] = useState("")

  const generateInviteLink = async () => {
    try {
      const response = await fetch("/api/generate-invite-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "user-id-here" }), // Replace with actual user ID
      })
      const data = await response.json()
      setInviteLink(data.inviteLink)
    } catch (error) {
      console.error("Failed to generate invite link:", error)
      toast.error("Failed to generate invite link. Please try again.")
    }
  }

  return (
    <div>
      <h1>Invite Friends</h1>
      <button onClick={generateInviteLink}>Generate Invite Link</button>
      {inviteLink && (
        <div>
          <p>Your invite link:</p>
          <a href={inviteLink}>{inviteLink}</a>
        </div>
      )}
    </div>
  )
}

export default InviteFriends

