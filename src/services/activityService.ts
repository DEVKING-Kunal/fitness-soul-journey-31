
import { 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  serverTimestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
