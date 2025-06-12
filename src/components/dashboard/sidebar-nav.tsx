"use client"; // This component now uses usePathname, so it needs to be a client component

import type { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { Header } from './header';
import { Toaster } from '@/components/ui/toaster';

export function MainLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  // Only show the public Header if the current path does NOT start with /dashboard
  const showPublicHeader = !pathname.startsWith('/dashboard');

  return (
    <div className="relative flex min-h-screen flex-col">
      {showPublicHeader && <Header />}
      {/* 'children' will be the page content or a nested layout like DashboardLayout */}
      <div className="flex-1">{children}</div> 
      <Toaster />
      {/* Optional Footer
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} UPrep. All rights reserved.
          </p>
        </div>
      </footer>
      */}
    </div>
  );
}