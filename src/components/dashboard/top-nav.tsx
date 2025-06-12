
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MedWithPurposeLogo } from "@/components/icons/medwithpurpose-logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, ClipboardList, CalendarDays, TrendingUp, LogOut, Settings } from "lucide-react";

const dashboardNavItems = [
  { href: "/dashboard/home", label: "Home", icon: Home },
  { href: "/classroom", label: "Classroom", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: ClipboardList },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/progress", label: "Progress", icon: TrendingUp },
];

// Admin items, can be conditionally rendered based on role in a real app
const adminNavItems = [
    { href: "/admin/create-course", label: "Create Course", icon: Settings },
];

export function DashboardTopNav() {
  const pathname = usePathname();
  // A simple role check placeholder. In a real app, this would come from auth context.
  const userRole = "admin"; // Or "student", "tutor"

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard/home" className="mr-6 flex items-center space-x-2">
          <MedWithPurposeLogo height={30} width={120} />
        </Link>
        <nav className="flex flex-1 items-center space-x-1">
          {dashboardNavItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary px-3 py-2 md:px-4 md:py-2",
                (pathname === item.href || (item.href !== "/dashboard/home" && item.href !== "/" && pathname.startsWith(item.href)))
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-0 h-5 w-5 md:mr-2 md:h-4 md:w-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            </Button>
          ))}
          {/* Conditionally render admin links */}
          {userRole === 'admin' && adminNavItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary px-3 py-2 md:px-4 md:py-2",
                 pathname.startsWith(item.href)
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              <Link href={item.href}>
                <item.icon className="mr-0 h-5 w-5 md:mr-2 md:h-4 md:w-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Button variant="outline" size="icon" asChild title="Logout (placeholder)">
            <Link href="/"> 
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
