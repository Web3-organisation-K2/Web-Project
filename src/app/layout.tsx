import React from 'react';
import type { Metadata, Viewport } from 'next';
import '@/styles/tailwind.css';
import { Toaster } from 'sonner';
import ThemeController from '@/components/ThemeController';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'EventSync — Real-Time Event & Session Management',
  description: 'EventSync helps conference participants navigate live sessions, interact via Q&A, and build personal schedules in real time.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-accent-theme="green">
      <body>
        <ThemeController />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(10, 22, 40, 0.95)',
              border: '1px solid rgba(14, 165, 233, 0.2)',
              color: '#e2eaf5',
              backdropFilter: 'blur(12px)',
            },
          }}
        />
      </body>
    </html>
  );
}
