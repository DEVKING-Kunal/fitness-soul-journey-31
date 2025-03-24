
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
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
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
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
      toast.error(`Failed to create account: ${error.message}`);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in!");
    } catch (error: any) {
      toast.error(`Failed to log in: ${error.message}`);
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Successfully signed in with Google!");
    } catch (error: any) {
      toast.error(`Failed to sign in with Google: ${error.message}`);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out!");
    } catch (error: any) {
      toast.error(`Failed to log out: ${error.message}`);
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
      toast.error(`Failed to update profile: ${error.message}`);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    googleSignIn,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
