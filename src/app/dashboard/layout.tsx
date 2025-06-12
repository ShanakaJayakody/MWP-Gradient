
import type { PropsWithChildren } from 'react';
import { DashboardTopNav } from '@/components/dashboard/top-nav';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <DashboardTopNav />
      {/* The main content area for dashboard pages */}
      <div className="flex-1"> {/* Ensure main content takes up remaining space */}
        {children}
      </div>
    </div>
  );
}
