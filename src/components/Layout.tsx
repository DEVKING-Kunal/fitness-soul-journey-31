
import React, { ReactNode, useEffect } from 'react';
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

  useEffect(() => {
    // Add a small animation when the page loads
    document.body.classList.add('animate-fade-in');
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, [currentPath]);

  return (
    <div className="min-h-screen flex flex-col bg-background antialiased relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-fitness-400/30 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-fitness-600/30 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-fitness-200/40 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {showNavbar && <Navbar key={currentPath} />}
      <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 page-transition relative z-10">
        {children}
      </main>
      <Toaster position="top-right" />
    </div>
  );
};
