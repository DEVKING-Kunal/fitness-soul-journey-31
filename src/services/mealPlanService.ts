
import { 
  collection, 
  query, 
  where, 
  getDocs,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
