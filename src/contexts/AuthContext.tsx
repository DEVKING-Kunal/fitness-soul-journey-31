
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
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  name: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  goal: string;
  experienceLevel: string;
  menstrualTracking?: boolean;
  lastPeriodDate?: string;
  cycleDuration?: number;
  profileCompleted: boolean;
  createdAt: any;
  updatedAt: any;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  profileLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  saveUserProfile: (profileData: Omit<UserProfile, 'profileCompleted' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  isProfileCompleted: boolean;
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const navigate = useNavigate();

  const isProfileCompleted = !!userProfile?.profileCompleted;

  // Fetch user profile from Firestore
  const fetchUserProfile = async (user: User) => {
    if (!user) return null;
    
    setProfileLoading(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const profileData = userDoc.data() as UserProfile;
        setUserProfile(profileData);
        return profileData;
      } else {
        setUserProfile(null);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to load user profile");
      return null;
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        const profile = await fetchUserProfile(user);
        
        // If user is logged in but profile not completed, redirect to profile page
        if (!profile?.profileCompleted) {
          navigate('/profile');
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, [navigate]);

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create initial user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        profileCompleted: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      toast.success("Account created successfully! Please complete your profile.");
      navigate('/profile');
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if profile is completed
      const profile = await fetchUserProfile(userCredential.user);
      
      toast.success("Successfully logged in!");
      
      // Redirect based on profile completion status
      if (!profile?.profileCompleted) {
        navigate('/profile');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Check if user already exists in Firestore
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Create new user document if first time login
        await setDoc(userDocRef, {
          email: userCredential.user.email,
          name: userCredential.user.displayName || '',
          profileCompleted: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        
        toast.success("Successfully signed in with Google! Please complete your profile.");
        navigate('/profile');
      } else {
        // User exists, check profile completion
        const profile = userDoc.data() as UserProfile;
        setUserProfile(profile);
        
        toast.success("Successfully signed in with Google!");
        
        if (!profile.profileCompleted) {
          navigate('/profile');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
      toast.success("Successfully logged out!");
      navigate('/');
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
        
        // Also update the name in Firestore if profile exists
        if (userProfile) {
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          await updateDoc(userDocRef, { 
            name: displayName,
            updatedAt: serverTimestamp()
          });
          
          setUserProfile({
            ...userProfile,
            name: displayName
          });
        }
        
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  };

  const saveUserProfile = async (profileData: Omit<UserProfile, 'profileCompleted' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (!currentUser) {
        toast.error("You must be logged in to save your profile");
        return;
      }
      
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      // Check if document exists
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        // Update existing document
        await updateDoc(userDocRef, {
          ...profileData,
          profileCompleted: true,
          updatedAt: serverTimestamp()
        });
      } else {
        // Create new document
        await setDoc(userDocRef, {
          ...profileData,
          email: currentUser.email,
          profileCompleted: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      
      // Update local state
      setUserProfile({
        ...profileData,
        profileCompleted: true,
        createdAt: userDoc.exists() ? userDoc.data().createdAt : serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      toast.success("Profile saved successfully!");
      return;
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
      throw error;
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    profileLoading,
    login,
    signup,
    logout,
    googleSignIn,
    updateUserProfile,
    saveUserProfile,
    isProfileCompleted
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
