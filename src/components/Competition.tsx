
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
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Trophy,
  Users,
  UserPlus,
  Flame,
  TrendingUp,
  Calendar,
  Medal,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Crown,
  Check
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Mock data for competition
const mockCompetitors = [
  {
    id: 1,
    name: 'You',
    avatar: '',
    caloriesBurned: 2345,
    workouts: 12,
    steps: 68423,
    progress: 75,
    rank: 2,
    change: 'up',
    bmi: 21.4,
    bmiChange: -0.8,
    stats: {
      week: [320, 420, 380, 400, 450, 375, 0],
      month: [1200, 1500, 1350, 1800]
    }
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    caloriesBurned: 2856,
    workouts: 15,
    steps: 81745,
    progress: 90,
    rank: 1,
    change: 'same',
    bmi: 20.8,
    bmiChange: -1.2,
    stats: {
      week: [380, 450, 420, 380, 500, 526, 200],
      month: [1400, 1650, 1800, 2000]
    }
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    caloriesBurned: 1923,
    workouts: 9,
    steps: 52140,
    progress: 60,
    rank: 3,
    change: 'down',
    bmi: 22.7,
    bmiChange: -0.4,
    stats: {
      week: [250, 300, 280, 320, 350, 325, 98],
      month: [950, 1100, 1250, 1500]
    }
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    caloriesBurned: 1648,
    workouts: 8,
    steps: 45892,
    progress: 48,
    rank: 4,
    change: 'same',
    bmi: 23.2,
    bmiChange: -0.2,
    stats: {
      week: [220, 280, 240, 200, 260, 230, 218],
      month: [850, 950, 1050, 1300]
    }
  }
];

// Mock challenges
const mockChallenges = [
  {
    id: 1,
    title: 'Weekly Step Challenge',
    description: 'Reach 70,000 steps this week',
    progress: 68,
    participants: 12,
    rewards: '100 points',
    deadline: '3 days left',
    active: true
  },
  {
    id: 2,
    title: 'Calorie Burn Marathon',
    description: 'Burn 5,000 calories in a week',
    progress: 47,
    participants: 8,
    rewards: '150 points + badge',
    deadline: '5 days left',
    active: true
  },
  {
    id: 3,
    title: 'Workout Streak',
    description: 'Complete 5 workouts in a row',
    progress: 100,
    participants: 5,
    rewards: '200 points + premium week',
    deadline: 'Completed',
    active: false
  }
];

// Mock achievements
const mockAchievements = [
  { id: 1, title: 'First Workout', description: 'Completed your first workout', date: '2 weeks ago' },
  { id: 2, title: '5 Day Streak', description: 'Worked out for 5 consecutive days', date: '1 week ago' },
  { id: 3, title: 'Calorie Crusher', description: 'Burned over 10,000 calories total', date: '3 days ago' },
];

export const Competition: React.FC = () => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('leaderboard');
  
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail.trim() && inviteEmail.includes('@')) {
      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
    } else {
      toast.error('Please enter a valid email address');
    }
  };
  
  const filteredCompetitors = mockCompetitors.filter(competitor => 
    competitor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Crown className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Crown className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-muted-foreground">{rank}</span>;
    }
  };
  
  const getChangeIcon = (change: string) => {
    switch (change) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Competition Hub</h2>
          <p className="text-muted-foreground">
            Challenge friends and track progress together
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Friends
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Invite Friends</AlertDialogTitle>
              <AlertDialogDescription>
                Invite your friends and family to join your fitness journey and compete with you.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={handleInvite} className="space-y-4 py-2">
              <div className="space-y-2">
                <Input
                  placeholder="Enter email address"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button type="submit" className="bg-primary hover:bg-primary/90 w-full">
                  Send Invitation
                </Button>
              </div>
            </form>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leaderboard">
            <Trophy className="mr-2 h-4 w-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="challenges">
            <Flame className="mr-2 h-4 w-4" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Medal className="mr-2 h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="leaderboard" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="w-full md:w-3/4 border border-muted">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <Trophy className="mr-2 h-5 w-5" />
                      Weekly Leaderboard
                    </CardTitle>
                    <CardDescription>
                      See how you stack up against your friends this week
                    </CardDescription>
                  </div>
                  <div className="relative w-[180px]">
                    <Input
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-8"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="text-left font-medium text-sm p-3">Rank</th>
                        <th className="text-left font-medium text-sm p-3">Member</th>
                        <th className="text-right font-medium text-sm p-3">Calories</th>
                        <th className="text-right font-medium text-sm p-3">Workouts</th>
                        <th className="text-right font-medium text-sm p-3">Steps</th>
                        <th className="text-center font-medium text-sm p-3">Progress</th>
                        <th className="text-center font-medium text-sm p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredCompetitors.map((competitor) => (
                        <tr key={competitor.id} className={`hover:bg-muted/20 ${competitor.name === 'You' ? 'bg-primary/5' : ''}`}>
                          <td className="p-3 flex items-center">
                            <div className="flex items-center gap-1">
                              {getRankBadge(competitor.rank)}
                              {getChangeIcon(competitor.change)}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={competitor.avatar} />
                                <AvatarFallback>{competitor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {competitor.name}
                                  {competitor.name === 'You' && (
                                    <span className="ml-2">
                                      <Badge variant="outline" className="text-xs">You</Badge>
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  BMI: {competitor.bmi} 
                                  <span className={`ml-2 ${competitor.bmiChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {competitor.bmiChange < 0 ? '↓' : '↑'} {Math.abs(competitor.bmiChange)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-right font-medium">
                            {competitor.caloriesBurned.toLocaleString()}
                          </td>
                          <td className="p-3 text-right font-medium">
                            {competitor.workouts}
                          </td>
                          <td className="p-3 text-right font-medium">
                            {competitor.steps.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <div className="flex flex-col items-center">
                              <Progress value={competitor.progress} className="h-2 w-24" />
                              <span className="mt-1 text-xs text-muted-foreground">{competitor.progress}%</span>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            {competitor.name !== 'You' ? (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => toast.success(`Challenge sent to ${competitor.name}`)}>
                                    Challenge
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast.success(`Message sent to ${competitor.name}`)}>
                                    Message
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toast.success(`${competitor.name} removed from your competition list`)}>
                                    Remove
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            ) : (
                              <Badge variant="outline" className="bg-primary/10">Your Stats</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="w-full md:w-1/4 border border-muted">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Your Stats
                </CardTitle>
                <CardDescription>
                  Your fitness metrics this week
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Current Rank</div>
                    <div className="font-semibold flex items-center">
                      #{mockCompetitors[0].rank}
                      {getChangeIcon(mockCompetitors[0].change)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Calories Burned</div>
                    <div className="font-semibold">{mockCompetitors[0].caloriesBurned.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Workouts Completed</div>
                    <div className="font-semibold">{mockCompetitors[0].workouts}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Steps Taken</div>
                    <div className="font-semibold">{mockCompetitors[0].steps.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Current BMI</div>
                    <div className="font-semibold">
                      {mockCompetitors[0].bmi}
                      <span className={`ml-2 ${mockCompetitors[0].bmiChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {mockCompetitors[0].bmiChange < 0 ? '↓' : '↑'} {Math.abs(mockCompetitors[0].bmiChange)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Daily Calories Burned</h4>
                  <div className="flex items-end gap-1 h-[100px]">
                    {mockCompetitors[0].stats.week.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className={`w-full rounded-sm ${
                            index === 6 
                              ? 'bg-muted/30' 
                              : value > 400 
                                ? 'bg-green-500' 
                                : value > 300 
                                  ? 'bg-green-400' 
                                  : 'bg-green-300'
                          }`} 
                          style={{ height: `${(value / 600) * 100}px` }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button className="w-full" variant="outline" onClick={() => setActiveTab('challenges')}>
                  Join More Challenges
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {mockChallenges.map((challenge) => (
              <Card key={challenge.id} className={`border ${challenge.active ? 'border-muted' : 'border-green-100 dark:border-green-800'}`}>
                <CardHeader className={`${!challenge.active ? 'bg-green-50 dark:bg-green-900/10' : ''}`}>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {challenge.title}
                    </CardTitle>
                    {!challenge.active && (
                      <Badge className="bg-green-500">
                        <Check className="mr-1 h-3 w-3" /> Completed
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {challenge.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Participants</div>
                      <div className="font-medium flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        {challenge.participants}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Deadline</div>
                      <div className="font-medium flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        {challenge.deadline}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-lg text-sm">
                    <div className="text-muted-foreground mb-1">Rewards</div>
                    <div className="font-medium">{challenge.rewards}</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={challenge.active ? "default" : "outline"}
                    disabled={!challenge.active}
                    onClick={() => toast.success(challenge.active ? 'Challenge joined!' : 'Challenge already completed!')}
                  >
                    {challenge.active ? 'Join Challenge' : 'Completed'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="border border-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Flame className="mr-2 h-5 w-5" />
                Create Custom Challenge
              </CardTitle>
              <CardDescription>
                Create a new challenge and invite friends to compete
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => toast.success('Challenge creator will be available soon!')}>
                Create Challenge
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {mockAchievements.map((achievement) => (
              <Card key={achievement.id} className="border border-muted">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Medal className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center">{achievement.title}</CardTitle>
                  <CardDescription className="text-center">
                    {achievement.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-sm text-muted-foreground">
                    Earned {achievement.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="border border-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Upcoming Achievements</CardTitle>
              <CardDescription>
                Achievements you're close to unlocking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <div className="font-medium">10 Day Streak</div>
                  <div className="text-sm text-muted-foreground">7/10 days</div>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <div className="font-medium">Calorie Master</div>
                  <div className="text-sm text-muted-foreground">15,000/20,000 cal</div>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <div className="font-medium">Workout Warrior</div>
                  <div className="text-sm text-muted-foreground">18/25 workouts</div>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
