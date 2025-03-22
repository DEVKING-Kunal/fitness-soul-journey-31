
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ExercisePlanner } from '@/components/ExercisePlanner';
import { DietPlanner } from '@/components/DietPlanner';
import { Competition } from '@/components/Competition';

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
  
  // Define valid tabs and set default if none is provided
  const validTabs = ['exercise', 'diet', 'compete'];
  const currentTab = tab || 'home';
  
  // Handle tab changes
  const handleTabChange = (value: string) => {
    if (value === 'home') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard/${value}`);
    }
  };
  
  // Ensure the selected tab is valid
  useEffect(() => {
    if (tab && !validTabs.includes(tab) && tab !== 'home') {
      navigate('/dashboard');
    }
  }, [tab, navigate]);

  return (
    <Layout>
      <div className="min-h-screen max-w-screen-xl mx-auto pt-20 px-4">
        <Tabs 
          defaultValue={currentTab} 
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="border-b sticky top-16 bg-background/80 backdrop-blur-sm z-10 py-2">
            <TabsList className="w-full max-w-md mx-auto">
              <TabsTrigger value="home" className="flex-1">Home</TabsTrigger>
              <TabsTrigger value="exercise" className="flex-1">Exercise</TabsTrigger>
              <TabsTrigger value="diet" className="flex-1">Diet</TabsTrigger>
              <TabsTrigger value="compete" className="flex-1">Compete</TabsTrigger>
            </TabsList>
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
