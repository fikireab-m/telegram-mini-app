"use client"

import { useState } from "react"
import { Users, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import InviteDrawer from "@/components/invite-drawer"

export default function Friends() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const hasInvites = false // This would be connected to your backend

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <>
      <div className="flex flex-col items-center space-y-6 py-8">
        {/* Header Icon */}
        <div className="bg-muted rounded-full p-4">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Friends</p>
            <p className="text-3xl font-bold text-red-500 my-2">0</p>
            <Button variant="outline" size="sm" className="w-24" onClick={openDrawer}>
              Invite
            </Button>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Shared Points</p>
            <p className="text-3xl font-bold text-red-500 my-2">0</p>
            <Button variant="outline" size="sm" className="w-24">
              Claim
            </Button>
          </Card>
        </div>

        {/* Empty State */}
        {!hasInvites && (
          <div className="flex flex-col items-center space-y-4 mt-8">
            <div className="bg-muted rounded-full p-6">
              <UserX className="h-16 w-16 text-muted-foreground" />
            </div>
            <p className="text-red-500 font-medium">You didn't invite anyone yet.</p>
            <p className="text-muted-foreground text-sm text-center">Invite your friends and earn points together</p>
          </div>
        )}

        {/* Invite Button */}
        <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white mt-4" size="lg" onClick={openDrawer}>
          Invite now
        </Button>

        {/* Friends Table - Only shown when there are friends */}
        {hasInvites && (
          <div className="w-full mt-8">
            <div className="rounded-md border">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium">Friend</th>
                    <th className="py-3 px-4 text-right font-medium">Points</th>
                    <th className="py-3 px-4 text-right font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example row - would be populated from your backend */}
                  <tr className="border-t">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted" />
                        <span>John Doe</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">100</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">2 days ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Invite Drawer */}
      <InviteDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  )
}

