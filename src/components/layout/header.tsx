
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building, MessageSquareHeart, Rocket, Sparkles, Tag, Target, LogIn } from "lucide-react" // Updated icons

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { MedWithPurposeLogo } from "@/components/icons/medwithpurpose-logo"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/#why-us", label: "Why Us?", icon: Sparkles },
  { href: "/#success-stories", label: "Success Stories", icon: Rocket },
  { href: "/#impact", label: "Impact", icon: MessageSquareHeart }, // Using MessageSquareHeart for Impact/Our Story
  { href: "/#pricing", label: "Pricing", icon: Tag },
  { href: "/#faq", label: "FAQ", icon: Target }, // Using Target for FAQ
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
                // Basic active state for homepage sections, might need adjustment for exact scroll position
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
            <Link href="/auth/signin"> {/* Placeholder for actual sign-in page */}
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
