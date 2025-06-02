"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, CalendarDays, Home, LayoutDashboard, PencilRuler } from "lucide-react"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { UPrepLogo } from "@/components/icons/uprep-logo"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/classroom", label: "Classroom", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: PencilRuler },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/progress", label: "Progress", icon: LayoutDashboard },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <UPrepLogo className="h-6 w-auto text-primary" />
        </Link>
        <nav className="flex flex-1 items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          {/* Placeholder for User Profile/Auth */}
          {/* <Button variant="ghost" size="icon">
            <UserCircle className="h-5 w-5" />
          </Button> */}
        </div>
      </div>
    </header>
  )
}
