
import { 
  collection, 
  query, 
  where, 
  getDocs,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
