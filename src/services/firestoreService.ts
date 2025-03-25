
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  DocumentData,
  QueryConstraint,
  addDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// User Profile Service
export const getUserProfile = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const createUserProfile = async (userId: string, data: any) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, {
      ...data,
      profileCompleted: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: any) => {
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

// Generic Firestore Service Functions
export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching document from ${collectionName}:`, error);
    throw error;
  }
};

export const createDocument = async (collectionName: string, docId: string | null, data: any) => {
  try {
    if (docId) {
      // Create with custom ID
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docId;
    } else {
      // Create with auto-generated ID
      const collectionRef = collection(db, collectionName);
      const docRef = await addDoc(collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    }
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
};

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

export const queryDocuments = async (
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    const results: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    
    return results;
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    throw error;
  }
};

// Workout-specific functions 
export const getUserWorkouts = async (userId: string) => {
  try {
    const workoutsCollectionRef = collection(db, 'workouts');
    const q = query(workoutsCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const workouts: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() });
    });
    
    return workouts;
  } catch (error) {
    console.error("Error fetching user workouts:", error);
    throw error;
  }
};

// Meal Plan specific functions
export const getUserMealPlans = async (userId: string) => {
  try {
    const mealPlansCollectionRef = collection(db, 'mealPlans');
    const q = query(mealPlansCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const mealPlans: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      mealPlans.push({ id: doc.id, ...doc.data() });
    });
    
    return mealPlans;
  } catch (error) {
    console.error("Error fetching user meal plans:", error);
    throw error;
  }
};

// Activity tracking specific functions
export const logUserActivity = async (userId: string, activityData: any) => {
  try {
    const activitiesCollectionRef = collection(db, 'activities');
    const docRef = await addDoc(activitiesCollectionRef, {
      userId,
      ...activityData,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error logging user activity:", error);
    throw error;
  }
};

export const getUserActivities = async (userId: string) => {
  try {
    const activitiesCollectionRef = collection(db, 'activities');
    const q = query(activitiesCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const activities: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      activities.push({ id: doc.id, ...doc.data() });
    });
    
    return activities;
  } catch (error) {
    console.error("Error fetching user activities:", error);
    throw error;
  }
};
