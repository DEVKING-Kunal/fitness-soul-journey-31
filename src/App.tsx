
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Create React Query client
const queryClient = new QueryClient();

// Protected route component that checks authentication and profile completion
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isProfileCompleted, loading } = useAuth();
  const location = useLocation();
  
  // If still loading, don't redirect yet
  if (loading) return null;
  
  // If not logged in, redirect to auth page
  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // If profile is not completed and not already on profile page, redirect to profile page
  if (!isProfileCompleted && location.pathname !== '/profile') {
    return <Navigate to="/profile" replace />;
  }
  
  return <>{children}</>;
};

// Profile protection component - only allows access if user is authenticated
const ProfileRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  
  // If still loading, don't redirect yet
  if (loading) return null;
  
  // If not logged in, redirect to auth page
  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Routes component with authentication check
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={
        <ProfileRoute>
          <UserProfile />
        </ProfileRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/:tab" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
