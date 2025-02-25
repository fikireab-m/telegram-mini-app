'use client'
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Youtube, Instagram, Twitter, Facebook, TwitterIcon as TikTok } from "lucide-react"
import InviteFriends from "@/components/invite-friends"
import { toast } from "@/components/ui/use-toast"

const tasks = [
  { name: "Follow on YouTube", icon: Youtube, reward: "$5", id: "youtube" },
  { name: "Follow on Instagram", icon: Instagram, reward: "$3", id: "instagram" },
  { name: "Follow on X", icon: Twitter, reward: "$2", id: "x" },
  { name: "Follow on Facebook", icon: Facebook, reward: "$2", id: "facebook" },
  { name: "Follow on TikTok", icon: TikTok, reward: "$4", id: "tiktok" },
]

export default function Tasks() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const completeTask = async (taskId: string) => {
    try {
      const response = await fetch("/api/complete-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "user-id-here", task: taskId }), // Replace with actual user ID
      })
      const data = await response.json()
      if (response.ok) {
        setCompletedTasks([...completedTasks, taskId])
        toast({
          title: "Task Completed!",
          description: `You earned ${data.reward} for completing this task.`,
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Failed to complete task:", error)
      toast({
        title: "Error",
        description: "Failed to complete task. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Earning Tasks</h1>
      <div className="space-y-4 bottom-48">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center space-x-2">
                <task.icon className="h-6 w-6" />
                <div>
                  <CardTitle>{task.name}</CardTitle>
                  <CardDescription>Earn {task.reward}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => completeTask(task.id)}
                disabled={completedTasks.includes(task.id)}
              >
                {completedTasks.includes(task.id) ? "Completed" : "Complete Task"}
              </Button>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>Invite Friends</CardTitle>
            <CardDescription>Earn $10 per friend who joins</CardDescription>
          </CardHeader>
          <CardContent>
            <InviteFriends />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

