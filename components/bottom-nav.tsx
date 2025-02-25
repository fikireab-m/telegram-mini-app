"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, DollarSign, Users } from "lucide-react"

const BottomNav = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t h-16">
      <div className="container max-w-md mx-auto flex justify-around items-center h-full">
        <Link
          href="/"
          className={`flex flex-col items-center ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Home size={24} />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/tasks"
          className={`flex flex-col items-center ${pathname === "/tasks" ? "text-primary" : "text-muted-foreground"}`}
        >
          <DollarSign size={24} />
          <span className="text-xs">Tasks</span>
        </Link>
        <Link
          href="/friends"
          className={`flex flex-col items-center ${pathname === "/friends" ? "text-primary" : "text-muted-foreground"}`}
        >
          <Users size={24} />
          <span className="text-xs">Friends</span>
        </Link>
      </div>
    </nav>
  )
}

export default BottomNav

