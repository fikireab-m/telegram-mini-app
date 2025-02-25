import { NextResponse } from "next/server"
import { store } from "@/lib/store"

const taskRewards: { [key: string]: number } = {
  youtube: 5,
  instagram: 3,
  x: 2,
  facebook: 2,
  tiktok: 4,
}

export async function POST(req: Request) {
  const { userId, task } = await req.json()

  const user = store.getUser(userId)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  if (user.completedTasks.includes(task)) {
    return NextResponse.json({ error: "Task already completed" }, { status: 400 })
  }

  const reward = taskRewards[task]
  if (reward === undefined) {
    return NextResponse.json({ error: "Invalid task" }, { status: 400 })
  }

  user.completedTasks.push(task)
  user.earnings += reward

  const updatedUser = store.updateUser(userId, user)

  return NextResponse.json(updatedUser)
}

