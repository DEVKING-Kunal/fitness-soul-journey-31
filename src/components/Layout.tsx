
import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showNavbar = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background antialiased">
      {showNavbar && <Navbar />}
      <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 page-transition">
        {children}
      </main>
      <Toaster position="top-right" />
    </div>
  );
};
