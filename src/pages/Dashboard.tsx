import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { ExercisePlanner } from '@/components/ExercisePlanner';
import { DietPlanner } from '@/components/DietPlanner';
import Competition from '@/components/Competition';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Moon, Sun } from 'lucide-react';

const DashboardHome = () => {
  return (
    <div className="space-y-8 pt-8">
      <h1 className="text-3xl font-bold">Welcome back!</h1>
      <p className="text-muted-foreground">
        Track your progress, update your fitness plans, and connect with friends.
      </p>
      {/* Dashboard home content here */}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useParams();
  
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
                <span className="text-xl font-bold text-gradient">Fitness Soul</span>
              </Link>
              <TabsList className="max-w-md">
                <TabsTrigger value="home" className="flex-1">Home</TabsTrigger>
                <TabsTrigger value="exercise" className="flex-1">Exercise</TabsTrigger>
                <TabsTrigger value="diet" className="flex-1">Diet</TabsTrigger>
                <TabsTrigger value="compete" className="flex-1">Compete</TabsTrigger>
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
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link to="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
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
