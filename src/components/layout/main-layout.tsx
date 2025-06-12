
"use client"; 

import type { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation'; 
import { Header } from './header';
import { Toaster } from '@/components/ui/toaster';
import { DashboardTopNav } from '@/components/dashboard/top-nav'; // Import DashboardTopNav

export function MainLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const dashboardContextPaths = [
    '/dashboard', // Covers /dashboard/home and any other /dashboard/*
    '/classroom',
    '/practice',
    '/calendar',
    '/progress',
    '/admin', // To include admin pages in dashboard context
  ];

  const isDashboardContext = dashboardContextPaths.some(p => pathname.startsWith(p));

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {isDashboardContext ? <DashboardTopNav /> : <Header />}
      <div className="flex-1">{children}</div>
      <Toaster />
      {/* Optional Footer
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} MedWithPurpose. All rights reserved.
          </p>
        </div>
      </footer>
      */}
    </div>
  );
}
