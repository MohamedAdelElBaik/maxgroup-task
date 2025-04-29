import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './ThemeProvider';
import { MobileNav } from '@/components/MobileNav/MobileNav';
import { Sidebar } from '@/components/Sidebar/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Adel Drive Clone',
  description: 'A Google Drive clone built with Next.js',
  openGraph: {
    title: 'Adel Drive Clone',
    description: 'A Google Drive clone built with Next.js',
    url: 'https://maxgroup-task.vercel.app/',
    siteName: 'Adel Drive Clone',
    images: [
      {
        url: 'https://maxgroup-task.vercel.app/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Adel Clone Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:image" content="https://maxgroup-task.vercel.app/og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>

          <div className="flex flex-col h-screen bg-background">
            <MobileNav />

            <div className="flex flex-1 overflow-hidden">
              <Sidebar />

              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
