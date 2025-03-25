
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Create React Query client
const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  return <Outlet />;
};

// Profile completion check
const ProfileCompletionCheck = () => {
  const { currentUser, hasCompletedProfile } = useAuth();
  const location = useLocation();
  
  // If user is logged in but hasn't completed profile, redirect to profile page
  if (currentUser && !hasCompletedProfile && location.pathname !== '/profile') {
    return <Navigate to="/profile" replace />;
  }
  
  // If user is logged in and has completed profile, prevent going back to profile page
  if (currentUser && hasCompletedProfile && location.pathname === '/profile') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Outlet />;
};

// Auth route - redirect to dashboard if already logged in
const AuthRoute = () => {
  const { currentUser, hasCompletedProfile } = useAuth();
  
  if (currentUser) {
    return hasCompletedProfile ? 
      <Navigate to="/dashboard" replace /> : 
      <Navigate to="/profile" replace />;
  }
  
  return <Auth />;
};

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthRoute />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<ProfileCompletionCheck />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:tab" element={<Dashboard />} />
              </Route>
              <Route path="/profile" element={<UserProfile />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
