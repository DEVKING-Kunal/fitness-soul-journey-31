
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExercisePlanner } from '@/components/ExercisePlanner';
import { DietPlanner } from '@/components/DietPlanner';
import { Competition } from '@/components/Competition';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  ActivitySquare, 
  Apple, 
  BarChart3, 
  Dumbbell, 
  Trophy, 
  UserCircle, 
  Utensils, 
  Users 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dummy data for dashboard summary
const summaryData = {
  caloriesBurned: 2345,
  workoutsCompleted: 12,
  mealsTracked: 42,
  competitionRank: 2
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [userProfile, setUserProfile] = useState<any>(null);
  
  useEffect(() => {
    // Check if user has completed profile
    const storedProfile = localStorage.getItem('fitnessUserProfile');
    if (!storedProfile) {
      navigate('/profile');
    } else {
      setUserProfile(JSON.parse(storedProfile));
    }
    
    // Set the active tab based on URL hash if present
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'exercise', 'diet', 'compete'].includes(hash)) {
      setActiveTab(hash);
    }
  }, [navigate]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.location.hash = value;
  };
  
  // If profile is not loaded yet, return null
  if (!userProfile) return null;
  
  return (
    <Layout>
      <div className="min-h-screen pb-12 pt-24">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userProfile.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-muted-foreground">
              Your personalized fitness journey awaits
            </p>
          </div>
          
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={handleTabChange}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-card shadow-sm border border-border rounded-lg p-1">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="home" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <ActivitySquare className="mr-2 h-4 w-4" />
                  Home
                </TabsTrigger>
                <TabsTrigger value="exercise" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Exercise
                </TabsTrigger>
                <TabsTrigger value="diet" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Utensils className="mr-2 h-4 w-4" />
                  AI Diet
                </TabsTrigger>
                <TabsTrigger value="compete" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Trophy className="mr-2 h-4 w-4" />
                  Compete
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="home" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border border-muted card-hover">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      Workouts Completed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{summaryData.workoutsCompleted}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last workout: Yesterday
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border border-muted card-hover">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Calories Burned
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{summaryData.caloriesBurned}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This week: 12,345
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border border-muted card-hover">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
                      <Apple className="mr-2 h-4 w-4" />
                      Meals Tracked
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{summaryData.mealsTracked}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Balanced nutrition: 85%
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border border-muted card-hover">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      Competition Rank
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">#{summaryData.competitionRank}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Among 12 friends
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-muted md:col-span-2">
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                    <CardDescription>
                      Your fitness progress over the past week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg bg-muted/30 h-60 flex items-center justify-center">
                      <p className="text-muted-foreground">Activity graph will appear here</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-muted">
                  <CardHeader>
                    <CardTitle>Today's Plan</CardTitle>
                    <CardDescription>
                      Recommended activities for today
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-muted/30 rounded-lg flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <Dumbbell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Upper Body Workout</h4>
                        <p className="text-sm text-muted-foreground">40 minutes, 5 exercises</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted/30 rounded-lg flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <Utensils className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Protein-Rich Meals</h4>
                        <p className="text-sm text-muted-foreground">Focus on recovery nutrition</p>
                      </div>
                    </div>
                    
                    <Button className="w-full" onClick={() => setActiveTab('exercise')}>
                      View Full Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-muted">
                  <CardHeader>
                    <CardTitle>Your BMI</CardTitle>
                    <CardDescription>
                      Current body mass index and trend
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center p-4">
                      <div className="h-32 w-32 rounded-full border-8 border-primary/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold">21.4</div>
                          <div className="text-xs text-muted-foreground">Healthy</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-green-500 flex items-center justify-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Down 0.8 points since starting
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Goal: 20.5 - 21.0
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-muted">
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                    <CardDescription>
                      Your latest fitness milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">5 Day Streak</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">10,000 Calories Burned</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">First Competition Joined</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab('compete')}>
                      View All Achievements
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border border-muted">
                  <CardHeader>
                    <CardTitle>Profile Overview</CardTitle>
                    <CardDescription>
                      Your current fitness profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Age</span>
                        <span className="text-sm font-medium">{userProfile.age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Weight</span>
                        <span className="text-sm font-medium">{userProfile.weight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Height</span>
                        <span className="text-sm font-medium">{userProfile.height} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Goal</span>
                        <span className="text-sm font-medium capitalize">{userProfile.goal?.replace('_', ' ')}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                      <UserCircle className="mr-2 h-4 w-4" />
                      Update Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="exercise" className="animate-fade-in">
              <ExercisePlanner />
            </TabsContent>
            
            <TabsContent value="diet" className="animate-fade-in">
              <DietPlanner />
            </TabsContent>
            
            <TabsContent value="compete" className="animate-fade-in">
              <Competition />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
