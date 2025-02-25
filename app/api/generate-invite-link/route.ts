import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { userId } = await req.json()

  // In a real app, you'd generate a unique code for each user
  const inviteLink = `https://t.me/YourBotUsername?start=${userId}`

  return NextResponse.json({ inviteLink })
}

