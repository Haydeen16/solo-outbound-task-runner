import './globals.css';
import type { ReactNode } from 'react';
import Header from '../components/Header';

export const metadata = {
  title: 'Solo Outbound Task Runner',
  description: 'Sales task reminder app built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
