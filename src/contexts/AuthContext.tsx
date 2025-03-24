
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  AuthError,
  AuthErrorCodes
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  clearUserData: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (error: any): string => {
  const errorCode = error.code;
  
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already in use. Please try logging in instead.';
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-login-credentials':
      return 'Invalid email or password. Please check your credentials.';
    case 'auth/weak-password':
      return 'Password is too weak. It should be at least 6 characters.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Please try again later.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed. Please try again.';
    default:
      console.error('Unhandled auth error:', error);
      return `An error occurred: ${error.message || 'Unknown error'}`;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in!");
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Successfully signed in with Google!");
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out!");
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateUserProfile = async (displayName: string) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName });
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  };

  // New function to clear user data from localStorage
  const clearUserData = () => {
    localStorage.removeItem('fitnessUserProfile');
    toast.info("User profile data has been reset.");
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    googleSignIn,
    updateUserProfile,
    clearUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
