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
  title: 'Notas par acordarme',
  description: 'Bitácora de notas para acordarme de cosas',
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