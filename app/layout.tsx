import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Initialize Inter font with required weights
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Minimalist Design Studio',
  description: 'Creating beautiful digital experiences with minimalist design principles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-white antialiased">{children}</body>
    </html>
  );
}