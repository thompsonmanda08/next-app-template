import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              WebbX Template
            </h3>
            <p className="text-sm text-foreground/70 mb-4 max-w-md">
              A modern Next.js template with TypeScript, Tailwind CSS, and comprehensive tooling for building production-ready applications.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-foreground/60 hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-foreground/60 hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-foreground/60 hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-sm text-foreground/70 hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-foreground/70 hover:text-foreground">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-foreground">
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-foreground">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-foreground">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} WebbX Template. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}