// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import localFont from 'next/font/local';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'ALLTOS · Premium Supplements, Vitamins & OTC · UK',
  description: 'Vitality redefined. Shop premium supplements and over-the-counter essentials in the UK.',
};





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}