
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquareHeart, Rocket, Sparkles, Tag, Target, LayoutGrid } from "lucide-react" // Updated LogIn to LayoutGrid

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { MedWithPurposeLogo } from "@/components/icons/medwithpurpose-logo"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/#why-us", label: "Why Us?", icon: Sparkles },
  { href: "/#success-stories", label: "Success Stories", icon: Rocket },
  { href: "/#impact", label: "Impact", icon: MessageSquareHeart },
  { href: "/#pricing", label: "Pricing", icon: Tag },
  { href: "/#faq", label: "FAQ", icon: Target },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <MedWithPurposeLogo height={30} width={120} className="h-auto" />
        </Link>
        <nav className="flex flex-1 items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                (pathname === "/" && typeof window !== "undefined" && window.location.hash === item.href.substring(1)) || (pathname === item.href)
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
          <Button variant="outline" asChild>
            <Link href="/dashboard/home"> {/* Changed href */}
              <LayoutGrid className="mr-2 h-4 w-4" /> {/* Changed icon */}
              Dashboard {/* Changed text */}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
