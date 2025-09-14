// src/app/layout.tsx
import { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'AI Product Directory',
  description: 'Discover 500+ AI tools with categories, comparisons, and reviews.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}