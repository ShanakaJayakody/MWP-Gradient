
import type {Metadata} from 'next';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {MainLayout} from '@/components/layout/main-layout';

export const metadata: Metadata = {
  title: 'MedWithPurpose – AI-Powered UCAT Preparation & Purpose-Driven Coaching',
  description: 'Achieve your best UCAT score with MedWithPurpose\'s adaptive lessons, expert drills and real-time analytics. Try our purpose-driven platform free today.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen text-foreground" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" 
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
