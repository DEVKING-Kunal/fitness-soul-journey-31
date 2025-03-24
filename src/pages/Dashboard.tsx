
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { ExercisePlanner } from '@/components/ExercisePlanner';
import { DietPlanner } from '@/components/DietPlanner';
import { Competition } from '@/components/Competition';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Moon, Sun, Activity, Calendar, Trophy, BarChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PerformanceGraph } from '@/components/PerformanceGraph';
import { useAuth } from '@/contexts/AuthContext';

// Sample workout data
const workoutData = [
  { date: 'Mon', value: 40 },
  { date: 'Tue', value: 60 },
  { date: 'Wed', value: 45 },
  { date: 'Thu', value: 70 },
  { date: 'Fri', value: 55 },
  { date: 'Sat', value: 80 },
  { date: 'Sun', value: 65 },
];

// Sample nutrition data
const nutritionData = [
  { date: 'Mon', value: 1800 },
  { date: 'Tue', value: 2100 },
  { date: 'Wed', value: 1950 },
  { date: 'Thu', value: 1750 },
  { date: 'Fri', value: 2050 },
  { date: 'Sat', value: 2200 },
  { date: 'Sun', value: 1900 },
];

const DashboardHome = () => {
  return (
    <div className="space-y-8 pt-8">
      <div className="relative">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-fitness-500 to-fitness-700 bg-clip-text text-transparent">Welcome back!</h1>
        <p className="text-muted-foreground mb-8">
          Track your progress, update your fitness plans, and connect with friends.
        </p>
        
        {/* Animated gradient blob in background */}
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-fitness-300/20 to-fitness-500/20 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-fitness-50 to-background border-fitness-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Weekly Workouts</CardTitle>
            <CardDescription>Your activity this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4/5</div>
              <Activity className="h-4 w-4 text-fitness-500" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              80% completed
            </div>
            <Progress value={80} className="h-2 mt-3 bg-fitness-100" 
              style={{
                "--tw-bg-opacity": ".2",
                "--progress-background": "hsl(var(--fitness-500))",
              } as React.CSSProperties} 
            />
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-fitness-50 to-background border-fitness-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Diet Plan</CardTitle>
            <CardDescription>Calorie tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,850</div>
              <BarChart className="h-4 w-4 text-fitness-500" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              cal consumed today
            </div>
            <Progress value={72} className="h-2 mt-3 bg-fitness-100" 
              style={{
                "--tw-bg-opacity": ".2",
                "--progress-background": "hsl(var(--fitness-500))",
              } as React.CSSProperties} 
            />
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-fitness-50 to-background border-fitness-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Workout</CardTitle>
            <CardDescription>Scheduled session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">Today</div>
              <Calendar className="h-4 w-4 text-fitness-500" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Upper Body - 5:30 PM
            </div>
            <div className="w-full h-2 mt-3 rounded-full relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-full bg-fitness-100 opacity-20"></div>
              <div className="absolute top-0 left-0 h-full w-2/3 bg-fitness-500 animate-pulse rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-fitness-50 to-background border-fitness-100 dark:from-gray-800 dark:to-gray-900 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Challenges</CardTitle>
            <CardDescription>Competition status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2</div>
              <Trophy className="h-4 w-4 text-fitness-500" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Active challenges
            </div>
            <div className="flex gap-1 mt-3">
              <div className="h-2 flex-1 rounded-full bg-fitness-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[85%] bg-fitness-500 rounded-full"></div>
              </div>
              <div className="h-2 flex-1 rounded-full bg-fitness-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[40%] bg-fitness-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <PerformanceGraph 
          title="Workout Performance"
          description="Minutes of exercise per day"
          data={workoutData}
          dataKey="value"
        />
        
        <PerformanceGraph 
          title="Nutrition Intake"
          description="Daily calorie consumption"
          data={nutritionData}
          dataKey="value"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="bg-gradient-to-br from-background to-fitness-50 border-fitness-100 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-fitness-600 to-fitness-500 bg-clip-text text-transparent">Recent Activities</CardTitle>
            <CardDescription>Your latest workout sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gradient-to-r from-background to-fitness-50/50 p-3 rounded-lg">
                <div>
                  <p className="font-medium">Leg Day Workout</p>
                  <p className="text-sm text-muted-foreground">Yesterday at 6:30 PM</p>
                </div>
                <Badge variant="outline" className="bg-background/50">45 min</Badge>
              </div>
              <div className="flex justify-between items-center bg-gradient-to-r from-background to-fitness-50/50 p-3 rounded-lg">
                <div>
                  <p className="font-medium">Morning Run</p>
                  <p className="text-sm text-muted-foreground">2 days ago at 7:00 AM</p>
                </div>
                <Badge variant="outline" className="bg-background/50">30 min</Badge>
              </div>
              <div className="flex justify-between items-center bg-gradient-to-r from-background to-fitness-50/50 p-3 rounded-lg">
                <div>
                  <p className="font-medium">HIIT Session</p>
                  <p className="text-sm text-muted-foreground">3 days ago at 5:45 PM</p>
                </div>
                <Badge variant="outline" className="bg-background/50">20 min</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-background to-fitness-50 border-fitness-100 dark:from-gray-900 dark:to-gray-800 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-fitness-600 to-fitness-500 bg-clip-text text-transparent">Nutrition Summary</CardTitle>
            <CardDescription>Weekly nutrition tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Protein</span>
                  <span className="text-sm text-muted-foreground">120g / 150g</span>
                </div>
                <Progress value={80} className="h-2 bg-fitness-100" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Carbs</span>
                  <span className="text-sm text-muted-foreground">210g / 250g</span>
                </div>
                <Progress value={84} className="h-2 bg-fitness-100" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Fat</span>
                  <span className="text-sm text-muted-foreground">65g / 70g</span>
                </div>
                <Progress value={92} className="h-2 bg-fitness-100" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Water</span>
                  <span className="text-sm text-muted-foreground">2.1L / 3L</span>
                </div>
                <Progress value={70} className="h-2 bg-fitness-100" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams();
  const { currentUser, logout } = useAuth();
  
  const validTabs = ['exercise', 'diet', 'compete'];
  const currentTab = tab && validTabs.includes(tab) ? tab : 'home';
  
  const handleTabChange = (value: string) => {
    if (value === 'home') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard/${value}`);
    }
  };
  
  useEffect(() => {
    if (tab && !validTabs.includes(tab) && tab !== 'home') {
      navigate('/dashboard');
    }
  }, [tab, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Layout showNavbar={false}>
      <div className="min-h-screen max-w-screen-xl mx-auto px-4">
        <Tabs 
          defaultValue={currentTab} 
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-2">
            <div className="flex items-center justify-between px-4 py-2">
              <Link to="/" className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-fitness-400 to-fitness-700 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FS</span>
                </span>
                <span className="text-xl font-bold bg-gradient-to-r from-fitness-500 to-fitness-700 bg-clip-text text-transparent">Fitness Soul</span>
              </Link>
              <TabsList className="max-w-md bg-fitness-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <TabsTrigger value="home" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-fitness-500 data-[state=active]:to-fitness-600 data-[state=active]:text-white">Home</TabsTrigger>
                <TabsTrigger value="exercise" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-fitness-500 data-[state=active]:to-fitness-600 data-[state=active]:text-white">Exercise</TabsTrigger>
                <TabsTrigger value="diet" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-fitness-500 data-[state=active]:to-fitness-600 data-[state=active]:text-white">Diet</TabsTrigger>
                <TabsTrigger value="compete" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-fitness-500 data-[state=active]:to-fitness-600 data-[state=active]:text-white">Compete</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => {
                    document.documentElement.classList.toggle('dark');
                  }}
                >
                  <Moon className="h-5 w-5 dark:hidden" />
                  <Sun className="h-5 w-5 hidden dark:block" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full bg-gradient-to-br from-fitness-100 to-fitness-200 dark:from-gray-700 dark:to-gray-800">
                      <User className="h-5 w-5 text-fitness-700 dark:text-fitness-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-sm border-fitness-100">
                    <DropdownMenuItem>
                      <Link to="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <button className="flex items-center w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pb-20">
            <TabsContent value="home">
              <DashboardHome />
            </TabsContent>
            
            <TabsContent value="exercise">
              <ExercisePlanner />
            </TabsContent>
            
            <TabsContent value="diet">
              <DietPlanner />
            </TabsContent>
            
            <TabsContent value="compete">
              <Competition />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
