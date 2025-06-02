import type { PropsWithChildren } from 'react';
import { Header } from './header';
import { Toaster } from '@/components/ui/toaster';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
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
