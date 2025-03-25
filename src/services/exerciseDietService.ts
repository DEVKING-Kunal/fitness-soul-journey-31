
import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Exercise Types
export interface Exercise {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  targetMuscles: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment?: string[];
  instructions: string[];
  duration?: number; // in minutes
  caloriesBurn?: number;
  imageUrl?: string;
  videoUrl?: string;
  tags?: string[];
  createdAt?: any;
  updatedAt?: any;
}

export interface ExerciseSet {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  exercises: ExerciseItem[];
  category?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration?: number; // total duration in minutes
  createdAt?: any;
  updatedAt?: any;
}

export interface ExerciseItem {
  exerciseId: string;
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  restBetweenSets?: number; // in seconds
  weight?: number;
}

// Diet Types
export interface Diet {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  type: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'custom';
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  meals: Meal[];
  restrictions?: string[];
  tags?: string[];
  createdAt?: any;
  updatedAt?: any;
}

export interface Meal {
  id?: string;
  name: string;
  time?: string;
  foods: FoodItem[];
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface FoodItem {
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

// Exercise Service
export const ExerciseService = {
  // Get a specific exercise by ID
  getExercise: async (exerciseId: string): Promise<Exercise | null> => {
    try {
      const docRef = doc(db, 'exercises', exerciseId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Exercise;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching exercise:", error);
      throw error;
    }
  },

  // Get all exercises for a user
  getUserExercises: async (userId: string): Promise<Exercise[]> => {
    try {
      const exercisesCollectionRef = collection(db, 'exercises');
      const q = query(exercisesCollectionRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      
      const exercises: Exercise[] = [];
      querySnapshot.forEach((doc) => {
        exercises.push({ id: doc.id, ...doc.data() } as Exercise);
      });
      
      return exercises;
    } catch (error) {
      console.error("Error fetching user exercises:", error);
      throw error;
    }
  },

  // Create a new exercise
  createExercise: async (exerciseData: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
      const collectionRef = collection(db, 'exercises');
      const docRef = await addDoc(collectionRef, {
        ...exerciseData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating exercise:", error);
      throw error;
    }
  },

  // Update an existing exercise
  updateExercise: async (exerciseId: string, exerciseData: Partial<Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> => {
    try {
      const docRef = doc(db, 'exercises', exerciseId);
      await updateDoc(docRef, {
        ...exerciseData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error("Error updating exercise:", error);
      throw error;
    }
  },

  // Delete an exercise
  deleteExercise: async (exerciseId: string): Promise<boolean> => {
    try {
      const docRef = doc(db, 'exercises', exerciseId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Error deleting exercise:", error);
      throw error;
    }
  },

  // Get exercise sets for a user
  getUserExerciseSets: async (userId: string): Promise<ExerciseSet[]> => {
    try {
      const setsCollectionRef = collection(db, 'exerciseSets');
      const q = query(setsCollectionRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      
      const exerciseSets: ExerciseSet[] = [];
      querySnapshot.forEach((doc) => {
        exerciseSets.push({ id: doc.id, ...doc.data() } as ExerciseSet);
      });
      
      return exerciseSets;
    } catch (error) {
      console.error("Error fetching user exercise sets:", error);
      throw error;
    }
  },

  // Create a new exercise set
  createExerciseSet: async (exerciseSetData: Omit<ExerciseSet, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
      const collectionRef = collection(db, 'exerciseSets');
      const docRef = await addDoc(collectionRef, {
        ...exerciseSetData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating exercise set:", error);
      throw error;
    }
  },

  // Update an existing exercise set
  updateExerciseSet: async (exerciseSetId: string, exerciseSetData: Partial<Omit<ExerciseSet, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> => {
    try {
      const docRef = doc(db, 'exerciseSets', exerciseSetId);
      await updateDoc(docRef, {
        ...exerciseSetData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error("Error updating exercise set:", error);
      throw error;
    }
  },

  // Delete an exercise set
  deleteExerciseSet: async (exerciseSetId: string): Promise<boolean> => {
    try {
      const docRef = doc(db, 'exerciseSets', exerciseSetId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Error deleting exercise set:", error);
      throw error;
    }
  }
};

// Diet Service
export const DietService = {
  // Get a specific diet by ID
  getDiet: async (dietId: string): Promise<Diet | null> => {
    try {
      const docRef = doc(db, 'diets', dietId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Diet;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching diet:", error);
      throw error;
    }
  },

  // Get all diets for a user
  getUserDiets: async (userId: string): Promise<Diet[]> => {
    try {
      const dietsCollectionRef = collection(db, 'diets');
      const q = query(dietsCollectionRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      
      const diets: Diet[] = [];
      querySnapshot.forEach((doc) => {
        diets.push({ id: doc.id, ...doc.data() } as Diet);
      });
      
      return diets;
    } catch (error) {
      console.error("Error fetching user diets:", error);
      throw error;
    }
  },

  // Create a new diet
  createDiet: async (dietData: Omit<Diet, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
      const collectionRef = collection(db, 'diets');
      const docRef = await addDoc(collectionRef, {
        ...dietData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating diet:", error);
      throw error;
    }
  },

  // Update an existing diet
  updateDiet: async (dietId: string, dietData: Partial<Omit<Diet, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> => {
    try {
      const docRef = doc(db, 'diets', dietId);
      await updateDoc(docRef, {
        ...dietData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error("Error updating diet:", error);
      throw error;
    }
  },

  // Delete a diet
  deleteDiet: async (dietId: string): Promise<boolean> => {
    try {
      const docRef = doc(db, 'diets', dietId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Error deleting diet:", error);
      throw error;
    }
  }
};
