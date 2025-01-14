"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            Studio
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-neutral-900 hover:text-neutral-600">
              Work
            </Link>
            <Link href="/about" className="text-neutral-900 hover:text-neutral-600">
              About
            </Link>
            <Link href="/contact" className="text-neutral-900 hover:text-neutral-600">
              Contact
            </Link>
            <Link href="/blog" className="text-neutral-900 hover:text-neutral-600">
              Blog
            </Link>
            <Link 
              href="/admin" 
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Admin
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-neutral-900 hover:text-neutral-600">
                Work
              </Link>
              <Link href="/about" className="text-neutral-900 hover:text-neutral-600">
                About
              </Link>
              <Link href="/contact" className="text-neutral-900 hover:text-neutral-600">
                Contact
              </Link>
              <Link href="/blog" className="text-neutral-900 hover:text-neutral-600">
                Blog
              </Link>
              <Link 
                href="/admin" 
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors inline-block w-fit"
              >
                Admin
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}