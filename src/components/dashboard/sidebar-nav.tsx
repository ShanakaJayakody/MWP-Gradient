
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, ClipboardList, CalendarDays, TrendingUp, Settings } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { href: "/dashboard/home", label: "Home", icon: Home },
  { href: "/classroom", label: "Classroom", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: ClipboardList },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/progress", label: "Progress", icon: TrendingUp },
];

const adminNavItems = [
    { href: "/admin/create-course", label: "Create Course", icon: Settings },
    // Add more admin links here if needed e.g.
    // { href: "/admin/manage-users", label: "Manage Users", icon: Users },
    // { href: "/admin/settings", label: "Platform Settings", icon: SettingsIcon },
];


export function DashboardSidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    pathname === item.href || (item.href !== "/dashboard/home" && pathname.startsWith(item.href))
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/80"
                  )}
                  tooltip={{
                    children: item.label,
                    className: "bg-primary text-primary-foreground"
                  }}
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      
      {/* Admin Section - Conditionally render this based on user role in a real app */}
      <SidebarGroup className="mt-auto border-t border-sidebar-border pt-2">
        <SidebarGroupLabel>Admin</SidebarGroupLabel>
        <SidebarMenu>
          {adminNavItems.map((item) => (
             <SidebarMenuItem key={item.href}>
             <Link href={item.href} passHref legacyBehavior>
               <SidebarMenuButton
                 asChild
                 className={cn(
                   pathname.startsWith(item.href)
                     ? "bg-sidebar-accent text-sidebar-accent-foreground"
                     : "hover:bg-sidebar-accent/80"
                 )}
                 tooltip={{
                    children: item.label,
                    className: "bg-primary text-primary-foreground"
                  }}
               >
                 <a>
                   <item.icon className="h-5 w-5" />
                   <span>{item.label}</span>
                 </a>
               </SidebarMenuButton>
             </Link>
           </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
