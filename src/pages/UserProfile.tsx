
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ChevronRight, Info } from 'lucide-react';
import { toast } from 'sonner';

interface UserFormData {
  name: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  goal: string;
  experienceLevel: string;
  menstrualTracking: boolean;
  lastPeriodDate?: string;
  cycleDuration?: number;
}

const UserProfile = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<UserFormData>({
    defaultValues: {
      name: '',
      age: undefined,
      sex: undefined,
      weight: undefined,
      height: undefined,
      goal: '',
      experienceLevel: 'beginner',
      menstrualTracking: false,
      lastPeriodDate: '',
      cycleDuration: 28,
    },
  });
  
  const { watch, setValue } = form;
  const sex = watch('sex');
  const age = watch('age');
  const menstrualTracking = watch('menstrualTracking');
  
  const goToNextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      const name = form.getValues('name');
      const age = form.getValues('age');
      const sex = form.getValues('sex');
      
      if (!name || !age || !sex) {
        toast.error('Please fill out all required fields');
        return;
      }
    }
    
    if (currentStep === 2) {
      // Validate second step
      const weight = form.getValues('weight');
      const height = form.getValues('height');
      const goal = form.getValues('goal');
      
      if (!weight || !height || !goal) {
        toast.error('Please fill out all required fields');
        return;
      }
    }
    
    setCurrentStep((prev) => prev + 1);
  };
  
  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };
  
  const onSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      console.log('Form data:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in localStorage for demo purposes
      localStorage.setItem('fitnessUserProfile', JSON.stringify(data));
      
      toast.success('Profile completed successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Profile submission error:', error);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center space-x-2 mb-8">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                currentStep === step 
                  ? 'bg-primary text-white' 
                  : currentStep > step 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {currentStep > step ? '✓' : step}
            </div>
            {step < 3 && (
              <div 
                className={`w-12 h-1 ${
                  currentStep > step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 relative animate-fade-in">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-fitness-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-fitness-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gradient">Complete Your Profile</h1>
            <p className="mt-2 text-foreground/70">
              Help us create your personalized fitness plan
            </p>
          </div>
          
          {renderStepIndicator()}
          
          <Card className="w-full border border-border shadow-sm">
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && 'Personal Information'}
                {currentStep === 2 && 'Body Metrics & Goals'}
                {currentStep === 3 && 'Final Details'}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && 'Tell us a bit about yourself'}
                {currentStep === 2 && 'Help us understand your body type and fitness goals'}
                {currentStep === 3 && 'Almost there! Just a few more details'}
              </CardDescription>
            </CardHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  {/* Step 1 - Personal Information */}
                  {currentStep === 1 && (
                    <>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Enter your age" 
                                min={13}
                                max={100}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || '')}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="sex"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sex</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                                disabled={isLoading}
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="male" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">Male</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="female" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">Female</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="other" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">Other</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {/* Step 2 - Body Metrics & Goals */}
                  {currentStep === 2 && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Weight in kg" 
                                  min={30}
                                  max={250}
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || '')}
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Height (cm)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Height in cm" 
                                  min={120}
                                  max={250}
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || '')}
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="goal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fitness Goal</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isLoading}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your main fitness goal" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="lose_weight">Lose Weight</SelectItem>
                                  <SelectItem value="build_muscle">Build Muscle</SelectItem>
                                  <SelectItem value="improve_fitness">Improve Overall Fitness</SelectItem>
                                  <SelectItem value="increase_endurance">Increase Endurance</SelectItem>
                                  <SelectItem value="tone_body">Tone Body</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience Level</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isLoading}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your fitness experience" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="beginner">Beginner (New to fitness)</SelectItem>
                                  <SelectItem value="intermediate">Intermediate (Some experience)</SelectItem>
                                  <SelectItem value="advanced">Advanced (Experienced fitness enthusiast)</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {/* Step 3 - Final Details */}
                  {currentStep === 3 && (
                    <>
                      {sex === 'female' && age >= 13 && age <= 55 && (
                        <>
                          <div className="flex items-start space-x-2">
                            <FormField
                              control={form.control}
                              name="menstrualTracking"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      disabled={isLoading}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="flex items-center">
                                      Enable Menstrual Cycle Tracking
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Info className="ml-2 h-4 w-4 text-muted-foreground" />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p className="max-w-xs">
                                              We use this information to optimize your exercise and diet 
                                              recommendations based on your menstrual cycle phases.
                                              This information is kept private.
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </FormLabel>
                                    <FormDescription>
                                      Optimize your workouts and nutrition based on your cycle
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          {menstrualTracking && (
                            <div className="space-y-4 mt-4 p-4 bg-muted/30 rounded-lg">
                              <FormField
                                control={form.control}
                                name="lastPeriodDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Day of Last Period</FormLabel>
                                    <FormControl>
                                      <Input 
                                        type="date" 
                                        {...field}
                                        disabled={isLoading}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="cycleDuration"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Average Cycle Length (days)</FormLabel>
                                    <FormControl>
                                      <Select
                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                        defaultValue={field.value?.toString()}
                                        disabled={isLoading}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select cycle length" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {[...Array(15)].map((_, i) => (
                                            <SelectItem key={i} value={(i + 21).toString()}>
                                              {i + 21} days
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </>
                      )}
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">What happens next?</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          Based on your profile, our AI will generate personalized exercise and nutrition 
                          plans tailored specifically to your body type, goals, and preferences.
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPreviousStep}
                      disabled={isLoading}
                    >
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={goToNextStep}
                      className="bg-primary hover:bg-primary/90"
                      disabled={isLoading}
                    >
                      Continue <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 button-shine"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Finalizing your profile...' : 'Complete Profile'}
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
