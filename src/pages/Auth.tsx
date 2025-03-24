
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup, googleSignIn, currentUser } = useAuth();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginEmail, loginPassword);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Toast notifications are handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupPassword !== signupConfirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(signupEmail, signupPassword);
      navigate('/profile');
    } catch (error) {
      console.error('Signup error:', error);
      // Toast notifications are handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    
    try {
      await googleSignIn();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google auth error:', error);
      // Toast notifications are handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 relative">
          {/* Animated gradient background */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-fitness-300 to-fitness-500 rounded-full filter blur-3xl opacity-30 -z-10 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-bl from-fitness-400 to-fitness-600 rounded-full filter blur-3xl opacity-30 -z-10 animate-pulse"></div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gradient">Welcome to Fitness Soul</h1>
            <p className="mt-2 text-foreground/70">
              Your personalized AI fitness journey begins here
            </p>
          </div>
          
          <Tabs defaultValue="login" className="w-full animate-fade-in">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="border border-border shadow-sm bg-background/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your fitness journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input 
                        id="login-email"
                        type="email" 
                        placeholder="your@email.com" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">Password</Label>
                        <a 
                          href="#" 
                          className="text-xs text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            toast.info('Password reset functionality will be implemented soon.');
                          }}
                        >
                          Forgot password?
                        </a>
                      </div>
                      <Input 
                        id="login-password"
                        type="password" 
                        placeholder="••••••••" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-fitness-500 to-fitness-700 hover:from-fitness-600 hover:to-fitness-800 button-shine"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex items-center w-full">
                    <Separator className="flex-1" />
                    <span className="mx-2 text-xs text-muted-foreground">OR</span>
                    <Separator className="flex-1" />
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card className="border border-border shadow-sm bg-background/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Join Fitness Soul to start your personalized fitness journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email"
                        type="email" 
                        placeholder="your@email.com" 
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input 
                        id="signup-password"
                        type="password" 
                        placeholder="••••••••" 
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <Input 
                        id="signup-confirm-password"
                        type="password" 
                        placeholder="••••••••" 
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-background/50 backdrop-blur-sm"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-fitness-500 to-fitness-700 hover:from-fitness-600 hover:to-fitness-800 button-shine"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex items-center w-full">
                    <Separator className="flex-1" />
                    <span className="mx-2 text-xs text-muted-foreground">OR</span>
                    <Separator className="flex-1" />
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
