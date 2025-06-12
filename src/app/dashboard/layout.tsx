
import type { PropsWithChildren } from 'react';
// Removed DashboardTopNav import as it's now handled by MainLayout

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col bg-background">
      {/* DashboardTopNav is no longer rendered here, MainLayout handles it */}
      <div className="flex-1"> {/* Ensure main content takes up remaining space */}
        {children}
      </div>
    </div>
  );
}
