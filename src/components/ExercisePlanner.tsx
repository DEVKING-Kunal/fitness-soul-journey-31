
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, RefreshCcw, Dumbbell, Heart, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';

// Mock data to simulate AI response
const mockExercisePlan = {
  weekdays: [
    {
      day: 'Monday',
      focus: 'Upper Body',
      exercises: [
        { name: 'Push-ups', sets: 3, reps: '10-12', rest: '60s', notes: 'Focus on form' },
        { name: 'Dumbbell Rows', sets: 3, reps: '12', rest: '60s', notes: 'Engage your back' },
        { name: 'Shoulder Press', sets: 3, reps: '10', rest: '60s', notes: 'Controlled movement' },
        { name: 'Bicep Curls', sets: 3, reps: '12', rest: '45s', notes: 'Avoid swinging' },
        { name: 'Tricep Dips', sets: 3, reps: '12', rest: '45s', notes: 'Keep elbows close' }
      ],
      cardio: { name: 'Treadmill', duration: '15 min', intensity: 'Moderate' }
    },
    {
      day: 'Tuesday',
      focus: 'Lower Body',
      exercises: [
        { name: 'Squats', sets: 4, reps: '12', rest: '60s', notes: 'Hip width stance' },
        { name: 'Lunges', sets: 3, reps: '10 each leg', rest: '60s', notes: 'Keep knee aligned' },
        { name: 'Leg Press', sets: 3, reps: '12', rest: '60s', notes: 'Don\'t lock knees' },
        { name: 'Calf Raises', sets: 3, reps: '15', rest: '45s', notes: 'Full range of motion' },
        { name: 'Glute Bridges', sets: 3, reps: '15', rest: '45s', notes: 'Squeeze at the top' }
      ],
      cardio: { name: 'Stationary Bike', duration: '15 min', intensity: 'Moderate' }
    },
    {
      day: 'Wednesday',
      focus: 'Rest & Recovery',
      exercises: [
        { name: 'Light Walking', sets: 1, reps: '20-30 min', rest: '0', notes: 'Keep heart rate low' },
        { name: 'Stretching', sets: 1, reps: '15-20 min', rest: '0', notes: 'Focus on tight areas' },
        { name: 'Foam Rolling', sets: 1, reps: '10 min', rest: '0', notes: 'Target sore muscles' }
      ],
      cardio: { name: 'None', duration: 'Rest day', intensity: 'Low' }
    },
    {
      day: 'Thursday',
      focus: 'Full Body',
      exercises: [
        { name: 'Deadlifts', sets: 3, reps: '10', rest: '90s', notes: 'Maintain neutral spine' },
        { name: 'Chest Press', sets: 3, reps: '12', rest: '60s', notes: 'Full range of motion' },
        { name: 'Pull-ups/Assisted Pull-ups', sets: 3, reps: '8-10', rest: '60s', notes: 'Controlled descent' },
        { name: 'Lateral Raises', sets: 3, reps: '12', rest: '45s', notes: 'Keep slight bend in elbow' },
        { name: 'Plank', sets: 3, reps: '30-45s', rest: '30s', notes: 'Engage core' }
      ],
      cardio: { name: 'Rowing Machine', duration: '15 min', intensity: 'Moderate-High' }
    },
    {
      day: 'Friday',
      focus: 'Core & Cardio',
      exercises: [
        { name: 'Crunches', sets: 3, reps: '15', rest: '45s', notes: 'Controlled movement' },
        { name: 'Russian Twists', sets: 3, reps: '20 total', rest: '45s', notes: 'Rotate fully' },
        { name: 'Mountain Climbers', sets: 3, reps: '30s', rest: '30s', notes: 'Keep hips down' },
        { name: 'Leg Raises', sets: 3, reps: '12', rest: '45s', notes: 'Lower slowly' },
        { name: 'Plank Variations', sets: 3, reps: '30s each', rest: '30s', notes: 'Side and standard' }
      ],
      cardio: { name: 'HIIT Circuit', duration: '20 min', intensity: 'High' }
    },
    {
      day: 'Saturday',
      focus: 'Active Recovery',
      exercises: [
        { name: 'Swimming', sets: 1, reps: '30 min', rest: '0', notes: 'Easy pace' },
        { name: 'Yoga', sets: 1, reps: '30 min', rest: '0', notes: 'Focus on flexibility' },
        { name: 'Light Stretching', sets: 1, reps: '15 min', rest: '0', notes: 'Full body' }
      ],
      cardio: { name: 'Light Swimming', duration: '30 min', intensity: 'Low-Moderate' }
    },
    {
      day: 'Sunday',
      focus: 'Complete Rest',
      exercises: [
        { name: 'Rest Day', sets: 0, reps: '0', rest: '0', notes: 'Allow full recovery' }
      ],
      cardio: { name: 'None', duration: 'Rest day', intensity: 'None' }
    }
  ]
};

// Mock female-specific recommendations
const femaleCycleRecommendations = {
  follicular: {
    phase: 'Follicular Phase (Days 1-14)',
    workouts: 'Focus on higher intensity workouts. This is a great time for strength training, HIIT, and cardio.',
    exercises: ['Strength training with heavier weights', 'High-intensity interval training', 'Challenging cardio sessions'],
    tips: 'You may feel stronger and have more energy during this phase. Take advantage of this by challenging yourself with progressive overload.'
  },
  ovulation: {
    phase: 'Ovulation (Days 14-16)',
    workouts: 'You may feel at your strongest. Good time for personal bests and challenging workouts.',
    exercises: ['Power exercises like box jumps', 'Strength training with maximum weights', 'Intense cardio'],
    tips: 'Estrogen peaks during this phase, which may increase your pain tolerance and power output.'
  },
  luteal: {
    phase: 'Luteal Phase (Days 16-28)',
    workouts: 'As you approach your period, you may want to reduce intensity. Focus on yoga, pilates, and moderate cardio.',
    exercises: ['Yoga and stretching', 'Light to moderate cardio', 'Lower intensity strength training'],
    tips: 'You may experience PMS symptoms during this phase. Listen to your body and reduce intensity if needed.'
  },
  menstrual: {
    phase: 'Menstrual Phase (Days 1-5)',
    workouts: 'Light exercise can help with cramps and mood. Focus on walking, light yoga, and mobility work.',
    exercises: ['Walking', 'Gentle yoga', 'Swimming', 'Light mobility work'],
    tips: 'If you experience pain or discomfort, it\'s okay to take rest days. Light movement can help with symptoms for some women.'
  }
};

export const ExercisePlanner: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCycleInfo, setShowCycleInfo] = useState(false);
  const [activeDay, setActiveDay] = useState('Monday');
  const [cyclePhase, setCyclePhase] = useState('follicular');
  
  // In a real app, these would come from user profile and state management
  const userProfile = JSON.parse(localStorage.getItem('fitnessUserProfile') || '{}');
  const isFemale = userProfile.sex === 'female';
  const hasMenstrualTracking = isFemale && userProfile.menstrualTracking;
  
  const generateNewPlan = () => {
    setIsLoading(true);
    // Simulate API call to AI service
    setTimeout(() => {
      toast.success('New exercise plan generated!');
      setIsLoading(false);
    }, 2000);
  };
  
  const handleShowCycleInfo = () => {
    setShowCycleInfo(!showCycleInfo);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Your Exercise Plan</h2>
          <p className="text-muted-foreground">
            AI-generated workouts tailored to your goals and fitness level
          </p>
        </div>
        <Button 
          onClick={generateNewPlan} 
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          {isLoading ? 'Generating...' : 'Refresh Plan'}
        </Button>
      </div>
      
      {hasMenstrualTracking && (
        <Card className="border border-muted mb-6">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-pink-500" />
                  Cycle-Optimized Training
                </CardTitle>
                <CardDescription>
                  Workouts optimized for your menstrual cycle phase
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShowCycleInfo}
              >
                {showCycleInfo ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>
          </CardHeader>
          
          {showCycleInfo && (
            <CardContent>
              <Tabs defaultValue={cyclePhase} onValueChange={setCyclePhase} className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="follicular">Follicular</TabsTrigger>
                  <TabsTrigger value="ovulation">Ovulation</TabsTrigger>
                  <TabsTrigger value="luteal">Luteal</TabsTrigger>
                  <TabsTrigger value="menstrual">Menstrual</TabsTrigger>
                </TabsList>
                
                {Object.keys(femaleCycleRecommendations).map((phase) => (
                  <TabsContent key={phase} value={phase} className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2">{femaleCycleRecommendations[phase].phase}</h4>
                      <p className="text-sm mb-3">{femaleCycleRecommendations[phase].workouts}</p>
                      
                      <h5 className="font-medium text-sm mb-1">Recommended Exercises:</h5>
                      <ul className="list-disc list-inside text-sm mb-3">
                        {femaleCycleRecommendations[phase].exercises.map((exercise, index) => (
                          <li key={index}>{exercise}</li>
                        ))}
                      </ul>
                      
                      <div className="flex items-start mt-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-sm text-blue-800 dark:text-blue-300 w-full">
                          <strong>Tip:</strong> {femaleCycleRecommendations[phase].tips}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          )}
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-card shadow rounded-lg overflow-hidden border border-border">
            <div className="p-4 bg-muted/30 border-b border-border">
              <h3 className="font-medium flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Weekly Schedule
              </h3>
            </div>
            <div className="divide-y divide-border">
              {mockExercisePlan.weekdays.map((day) => (
                <button
                  key={day.day}
                  className={`w-full text-left px-4 py-3 transition-colors hover:bg-muted/40 ${
                    activeDay === day.day ? 'bg-muted/60' : ''
                  }`}
                  onClick={() => setActiveDay(day.day)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{day.day}</span>
                    <Badge variant={day.focus === 'Rest & Recovery' || day.focus === 'Complete Rest' ? 'outline' : 'default'}>
                      {day.focus}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          {mockExercisePlan.weekdays.filter(day => day.day === activeDay).map((day) => (
            <Card key={day.day} className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">{day.day}: {day.focus}</CardTitle>
                    <CardDescription>
                      {day.focus === 'Rest & Recovery' || day.focus === 'Complete Rest' 
                        ? 'Recovery is essential for muscle growth and preventing burnout' 
                        : 'Complete all exercises with proper form and appropriate weights'}
                    </CardDescription>
                  </div>
                  {(day.focus !== 'Rest & Recovery' && day.focus !== 'Complete Rest') && (
                    <Badge className="bg-gradient-to-r from-fitness-500 to-fitness-600">
                      <Dumbbell className="mr-1 h-3 w-3" /> {day.focus}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {day.exercises.length > 0 && day.focus !== 'Complete Rest' && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      Exercises
                    </h4>
                    <div className="bg-muted/30 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-10 gap-4 p-3 bg-muted/50 text-sm font-medium">
                        <div className="col-span-4">Exercise</div>
                        <div className="col-span-1 text-center">Sets</div>
                        <div className="col-span-1 text-center">Reps</div>
                        <div className="col-span-1 text-center">Rest</div>
                        <div className="col-span-3">Notes</div>
                      </div>
                      <div className="divide-y divide-border">
                        {day.exercises.map((exercise, index) => (
                          <div key={index} className="grid grid-cols-10 gap-4 p-3 text-sm">
                            <div className="col-span-4">{exercise.name}</div>
                            <div className="col-span-1 text-center">{exercise.sets}</div>
                            <div className="col-span-1 text-center">{exercise.reps}</div>
                            <div className="col-span-1 text-center">{exercise.rest}</div>
                            <div className="col-span-3 text-muted-foreground">{exercise.notes}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {day.cardio && day.cardio.name !== 'None' && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Cardio
                    </h4>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Activity</p>
                          <p className="font-medium">{day.cardio.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Duration</p>
                          <p className="font-medium">{day.cardio.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Intensity</p>
                          <p className="font-medium">{day.cardio.intensity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {day.focus === 'Complete Rest' && (
                  <div className="py-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Rest Day</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Today is your complete rest day. Allow your body to recover and repair.
                      Rest is when your muscles grow stronger and adapt to your training.
                    </p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-0">
                {(day.focus !== 'Rest & Recovery' && day.focus !== 'Complete Rest') && (
                  <div className="w-full">
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Estimated workout time: 45-60 minutes
                      </div>
                      <Button variant="outline" size="sm">
                        Mark as Completed
                      </Button>
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <Card className="border border-muted">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Ask AI for Adjustments</CardTitle>
          <CardDescription>
            Want to modify your plan? Our AI can help you customize it further.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success('Adjustments will be applied soon!')}>
              Less intense workouts
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success('Adjustments will be applied soon!')}>
              Focus more on upper body
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success('Adjustments will be applied soon!')}>
              Add more core exercises
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success('Adjustments will be applied soon!')}>
              Shorter workout sessions
            </Button>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-fitness-500 to-fitness-600 hover:from-fitness-600 hover:to-fitness-700">
            Chat with AI Trainer <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
