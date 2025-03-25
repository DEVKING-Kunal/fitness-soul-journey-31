import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ExerciseService, 
  DietService, 
  Exercise, 
  ExerciseSet, 
  Diet 
} from '@/services/exerciseDietService';
import { useToast } from '@/hooks/use-toast';

export const useExerciseDiet = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Exercise related hooks
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [currentExerciseSet, setCurrentExerciseSet] = useState<ExerciseSet | null>(null);

  // Diet related hooks
  const [diets, setDiets] = useState<Diet[]>([]);
  const [currentDiet, setCurrentDiet] = useState<Diet | null>(null);

  // Error handling function
  const handleError = (error: any, message: string) => {
    console.error(message, error);
    setError(message);
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
    setLoading(false);
  };

  // Exercise functions
  const fetchUserExercises = useCallback(async () => {
    if (!currentUser?.uid) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const fetchedExercises = await ExerciseService.getUserExercises(currentUser.uid);
      setExercises(fetchedExercises);
    } catch (error) {
      handleError(error, "Failed to fetch exercises");
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, toast]);

  const fetchExercise = useCallback(async (exerciseId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const exercise = await ExerciseService.getExercise(exerciseId);
      setCurrentExercise(exercise);
      return exercise;
    } catch (error) {
      handleError(error, "Failed to fetch exercise details");
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createExercise = useCallback(async (exerciseData: Omit<Exercise, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser?.uid) {
      handleError(new Error("User not authenticated"), "You must be logged in to create an exercise");
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const newExerciseData = {
        ...exerciseData,
        userId: currentUser.uid
      };
      
      const exerciseId = await ExerciseService.createExercise(newExerciseData);
      
      toast({
        title: "Success",
        description: "Exercise created successfully",
      });
      
      fetchUserExercises();
      
      return exerciseId;
    } catch (error) {
      handleError(error, "Failed to create exercise");
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, fetchUserExercises, toast]);

  const updateExercise = useCallback(async (exerciseId: string, exerciseData: Partial<Omit<Exercise, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) => {
    if (!currentUser?.uid) {
      handleError(new Error("User not authenticated"), "You must be logged in to update an exercise");
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await ExerciseService.updateExercise(exerciseId, exerciseData);
      
      toast({
        title: "Success",
        description: "Exercise updated successfully",
      });
      
      fetchUserExercises();
      
      return true;
    } catch (error) {
      handleError(error, "Failed to update exercise");
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, fetchUserExercises, toast]);

  const deleteExercise = useCallback(async (exerciseId: string) => {
    if (!currentUser?.uid) {
      handleError(new Error("User not authenticated"), "You must be logged in to delete an exercise");
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await ExerciseService.deleteExercise(exerciseId);
      
      toast({
        title: "Success",
        description: "Exercise deleted successfully",
      });
      
      fetchUserExercises();
      
      return true;
    } catch (error) {
      handleError(error, "Failed to delete exercise");
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, fetchUserExercises, toast]);

  // Exercise Set functions
  const fetchUserExerciseSets = useCallback(async () => {
    if (!currentUser?.uid) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const fetchedExerciseSets = await ExerciseService.getUserExerciseSets(currentUser.uid);
      setExerciseSets(fetchedExerciseSets);
    } catch (error) {
      handleError(error, "Failed to fetch exercise sets");
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, toast]);

  const createExerciseSet = useCallback(async (exerciseSetData: Omit<ExerciseSet, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser?.uid) {
      handleError(new Error("User not authenticated"), "You must be logged in to create an exercise set");
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const newExerciseSetData = {
        ...exerciseSetData,
        userId: currentUser.uid
      };
      
      const exerciseSetId = await ExerciseService.createExerciseSet(newExerciseSetData);
      
      toast({
        title: "Success",
        description: "Exercise set created successfully",
      });
      
      fetchUserExerciseSets();
      
      return exerciseSetId;
    } catch (error) {
      handleError(error, "Failed to create exercise set");
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, fetchUserExerciseSets, toast]);

  // Diet functions
  const fetchUserDiets = useCallback(async () => {
    if (!currentUser?.uid) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const fetchedDiets = await DietService.getUserDiets(currentUser.uid);
      setDiets(fetchedDiets);
    } catch (error) {
      handleError(error, "Failed to fetch diets");
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, toast]);

  const fetchDiet = useCallback(async (dietId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const diet = await DietService.getDiet(dietId);
      setCurrentDiet(diet);
      return diet;
    } catch (error) {
      handleError(error, "Failed to fetch diet details");
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createDiet = useCallback(async (dietData: Omit<Diet, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser?.uid) {
      handleError(new Error("User not authenticated"), "You must be logged in to create a diet");
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const newDietData = {
        ...dietData,
        userId: currentUser.uid
      };
      
      const dietId = await DietService.createDiet(newDietData);
      
      toast({
        title: "Success",
        description: "Diet plan created successfully",
      });
      
      fetchUserDiets();
      
      return dietId;
    } catch (error) {
      handleError(error, "Failed to create diet plan");
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, fetchUserDiets, toast]);

  const updateDiet = useCallback(async (dietId: string, dietData: Partial<Omit<Diet, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) => {
    if (!currentUser?.uid) {
      handleError(new Error("User not authenticated"), "You must be logged in to update a diet");
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await DietService.updateDiet(dietId, dietData);
      
      toast({
        title: "Success",
        description: "Diet plan updated successfully",
      });
      
      fetchUserDiets();
      
      return true;
    } catch (error) {
      handleError(error, "Failed to update diet plan");
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, fetchUserDiets, toast]);

  const deleteDiet = useCallback(async (dietId: string) => {
    if (!currentUser?.uid) {
      handleError(new Error("User not authenticated"), "You must be logged in to delete a diet");
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await DietService.deleteDiet(dietId);
      
      toast({
        title: "Success",
        description: "Diet plan deleted successfully",
      });
      
      fetchUserDiets();
      
      return true;
    } catch (error) {
      handleError(error, "Failed to delete diet plan");
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, fetchUserDiets, toast]);

  return {
    // Common
    loading,
    error,
    
    // Exercises
    exercises,
    currentExercise,
    fetchUserExercises,
    fetchExercise,
    createExercise,
    updateExercise,
    deleteExercise,
    
    // Exercise Sets
    exerciseSets,
    currentExerciseSet,
    fetchUserExerciseSets,
    createExerciseSet,
    
    // Diets
    diets,
    currentDiet,
    fetchUserDiets,
    fetchDiet,
    createDiet,
    updateDiet,
    deleteDiet,
  };
};
