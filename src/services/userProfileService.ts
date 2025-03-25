
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Type definitions for better type safety
export interface UserProfile {
  id?: string;
  name?: string;
  age?: number;
  sex?: 'male' | 'female' | 'other';
  weight?: number;
  height?: number;
  goal?: string;
  experienceLevel?: string;
  menstrualTracking?: boolean;
  lastPeriodDate?: string;
  cycleDuration?: number;
  profileCompleted?: boolean;
  email?: string;
  createdAt?: any;
  updatedAt?: any;
}

// User Profile Service
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const createUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, {
      ...data,
      profileCompleted: data.profileCompleted ?? true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
