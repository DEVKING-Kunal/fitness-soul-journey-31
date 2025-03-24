
import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Toaster } from "@/components/ui/sonner";
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showNavbar = true }) => {
  // Get the current location if we're within a Router context
  let currentPath = '/';
  try {
    // This will throw an error if not in a Router context
    const location = useLocation();
    currentPath = location.pathname;
  } catch (error) {
    // If not in Router context, we'll handle this gracefully
    console.log('Not within Router context, skipping useLocation');
  }

  return (
    <div className="min-h-screen flex flex-col bg-background antialiased">
      {showNavbar && <Navbar key={currentPath} />}
      <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 page-transition">
        {children}
      </main>
      <Toaster position="top-right" />
    </div>
  );
};
