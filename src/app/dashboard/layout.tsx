
import type { PropsWithChildren } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import { MedWithPurposeLogo } from '@/components/icons/medwithpurpose-logo';
import { DashboardSidebarNav } from '@/components/dashboard/sidebar-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" side="left" className="border-sidebar-border">
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
            <Link href="/dashboard/home" className="block group-data-[collapsible=icon]:hidden">
                <MedWithPurposeLogo width={130} height={30} />
            </Link>
            <div className="group-data-[collapsible=icon]:hidden">
                 <SidebarRail />
            </div>
            <div className="hidden group-data-[collapsible=icon]:block">
                <SidebarRail />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2 flex-1">
          <DashboardSidebarNav />
        </SidebarContent>
        {/* Optional: Sidebar Footer for user profile or logout */}
        {/* 
        <SidebarFooter className="p-2 border-t border-sidebar-border">
          <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center p-2">
             <LogOut className="h-5 w-5 mr-2 group-data-[collapsible=icon]:mr-0" />
             <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </SidebarFooter>
        */}
      </Sidebar>
      <SidebarInset className="bg-background flex flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/90 px-4 backdrop-blur sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
           <div className="md:hidden"> {/* Only show trigger on mobile/tablet */}
             <SidebarTrigger />
           </div>
           <div className="flex-1">
             {/* Optional: Breadcrumbs or Page Title Area */}
           </div>
           <div className="flex items-center space-x-2">
             <ModeToggle />
             {/* Optional: User Menu Dropdown */}
           </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
