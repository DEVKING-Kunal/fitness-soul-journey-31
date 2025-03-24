
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { currentUser, logout } = useAuth();
  
  // Safely use React Router hooks with error handling
  let location: { pathname: string, hash: string } = { pathname: '/', hash: '' };
  let navigate: (path: string) => void = () => {};
  
  try {
    location = useLocation();
    const navigateFunc = useNavigate();
    navigate = navigateFunc;
  } catch (error) {
    console.log('Router hooks not available, using fallbacks');
  }
  
  const isMobile = useIsMobile();
  const isAuthenticated = !!currentUser; // Use the auth context to determine if user is authenticated
  const isHome = location.pathname === '/';
  const isDashboard = location.pathname.includes('/dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavLinkClick = (path: string) => {
    if (path.startsWith('#')) {
      // Handle anchor links
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (isHome) {
        // If on home page but anchor doesn't exist yet, just stay on page
        return;
      } else {
        try {
          // If not on home page, navigate to home page with anchor
          navigate('/' + path);
        } catch (error) {
          // Fallback for when navigate is not available
          window.location.href = '/' + path;
        }
      }
    } else {
      try {
        // Handle regular navigation with React Router
        navigate(path);
      } catch (error) {
        // Fallback for when navigate is not available
        window.location.href = path;
      }
    }
  };

  const navLinks = isDashboard 
    ? [
        { name: 'Home', path: '/dashboard' },
        { name: 'Exercise', path: '/dashboard/exercise' },
        { name: 'Diet', path: '/dashboard/diet' },
        { name: 'Compete', path: '/dashboard/compete' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'About', path: '#about' },
      ];

  const isActiveLink = (path: string) => {
    if (path.startsWith('#')) {
      // For anchor links, match if we're on home page and hash matches
      return isHome && location.hash === path;
    } else if (path === '/dashboard') {
      // For dashboard home, match exact path
      return location.pathname === path;
    } else if (path.includes('/dashboard/')) {
      // For dashboard tabs, match if current path includes the tab path
      return location.pathname.includes(path);
    }
    // For other paths, exact match
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || !isHome || isDashboard
          ? 'bg-background/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-fitness-400 to-fitness-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">FS</span>
              </span>
              <span className="text-xl font-bold text-gradient">Fitness Soul</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavLinkClick(link.path)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActiveLink(link.path) ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <div className="flex items-center w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              !isDashboard && (
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/auth">Get Started</Link>
                </Button>
              )
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md animate-slide-in">
          <div className="px-4 pt-2 pb-4 space-y-1 border-t">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavLinkClick(link.path)}
                className="block w-full text-left py-3 text-base font-medium text-foreground hover:text-primary"
              >
                {link.name}
              </button>
            ))}
            
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="block w-full text-left py-3 text-base font-medium text-foreground hover:text-destructive flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </button>
            ) : (
              !isDashboard && (
                <Button 
                  asChild 
                  className="w-full mt-3 bg-primary hover:bg-primary/90"
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};
