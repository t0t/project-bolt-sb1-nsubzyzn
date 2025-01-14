import { Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-neutral-200">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Studio</h2>
            <p className="text-neutral-600 max-w-md">
              A minimalist design studio focused on creating beautiful digital experiences
              that make a difference.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-600 hover:text-black">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-600 hover:text-black">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-600 hover:text-black">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <a href="mailto:hello@studio.com" className="text-neutral-600 hover:text-black">
              hello@studio.com
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}