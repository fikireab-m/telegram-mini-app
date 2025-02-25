import { NextResponse } from "next/server"
import { store } from "@/lib/store"

export async function POST(req: Request) {
  const { telegramId, referralCode } = await req.json()

  let referredBy
  if (referralCode) {
    const referrer = store.getUserByTelegramId(referralCode)
    if (referrer) {
      referredBy = referrer.id
    }
  }

  const existingUser = store.getUserByTelegramId(telegramId)
  if (existingUser) {
    return NextResponse.json(existingUser)
  }

  const newUser = store.createUser(telegramId, referredBy)

  if (referredBy) {
    store.addReferral(referredBy, newUser.id)
  }

  return NextResponse.json(newUser)
}

