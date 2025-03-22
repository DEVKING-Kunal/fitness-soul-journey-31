
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCcw, 
  Coffee, 
  Pizza, 
  UtensilsCrossed, 
  Apple, 
  MessageSquare,
  Check,
  X,
  Heart,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data to simulate AI response
const mockDietPlan = {
  weekdays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  meals: {
    "Monday": {
      breakfast: {
        meal: "Greek Yogurt Parfait",
        description: "Greek yogurt with berries, honey, and granola",
        calories: 420,
        protein: 24,
        carbs: 58,
        fat: 12,
        ingredients: [
          "1 cup Greek yogurt (2% fat)",
          "1/2 cup mixed berries",
          "1 tbsp honey",
          "1/4 cup low-sugar granola",
          "1 tbsp chia seeds"
        ]
      },
      lunch: {
        meal: "Grilled Chicken Salad",
        description: "Mixed greens with grilled chicken, avocado, and balsamic vinaigrette",
        calories: 550,
        protein: 35,
        carbs: 25,
        fat: 22,
        ingredients: [
          "5 oz grilled chicken breast",
          "3 cups mixed greens",
          "1/4 avocado",
          "1 tbsp balsamic vinaigrette",
          "1/4 cup cherry tomatoes",
          "1/4 cup cucumber",
          "2 tbsp red onion"
        ]
      },
      dinner: {
        meal: "Baked Salmon with Vegetables",
        description: "Baked salmon fillet with roasted sweet potato and steamed broccoli",
        calories: 580,
        protein: 42,
        carbs: 40,
        fat: 25,
        ingredients: [
          "6 oz salmon fillet",
          "1 medium sweet potato",
          "1 cup broccoli",
          "1 tbsp olive oil",
          "1 tsp herbs and spices",
          "Lemon wedge"
        ]
      },
      snacks: {
        meal: "Protein Shake & Apple",
        description: "Protein shake after workout and apple with almond butter",
        calories: 320,
        protein: 25,
        carbs: 30,
        fat: 10,
        ingredients: [
          "1 scoop protein powder",
          "1 cup unsweetened almond milk",
          "1 medium apple",
          "1 tbsp almond butter"
        ]
      }
    },
    "Tuesday": {
      breakfast: {
        meal: "Veggie Omelette with Toast",
        description: "Egg omelette with spinach, mushrooms, and whole grain toast",
        calories: 440,
        protein: 28,
        carbs: 35,
        fat: 22,
        ingredients: [
          "3 whole eggs",
          "1 cup spinach",
          "1/2 cup mushrooms",
          "1 slice whole grain bread",
          "1 tsp olive oil",
          "1 tbsp low-fat cheese"
        ]
      },
      lunch: {
        meal: "Quinoa Bowl",
        description: "Quinoa with chickpeas, roasted vegetables, and tahini dressing",
        calories: 520,
        protein: 18,
        carbs: 70,
        fat: 20,
        ingredients: [
          "3/4 cup cooked quinoa",
          "1/2 cup chickpeas",
          "1 cup roasted vegetables (bell peppers, zucchini)",
          "1 tbsp tahini",
          "Lemon juice",
          "Fresh herbs"
        ]
      },
      dinner: {
        meal: "Turkey Stir-Fry",
        description: "Ground turkey stir-fry with mixed vegetables and brown rice",
        calories: 550,
        protein: 40,
        carbs: 45,
        fat: 18,
        ingredients: [
          "5 oz lean ground turkey",
          "1/2 cup brown rice (cooked)",
          "2 cups mixed vegetables (broccoli, bell peppers, carrots)",
          "1 tbsp soy sauce (low sodium)",
          "1 tsp sesame oil",
          "Ginger and garlic"
        ]
      },
      snacks: {
        meal: "Greek Yogurt & Berries",
        description: "Plain Greek yogurt with mixed berries and a sprinkle of cinnamon",
        calories: 180,
        protein: 17,
        carbs: 15,
        fat: 6,
        ingredients: [
          "3/4 cup Greek yogurt (0% fat)",
          "1/2 cup mixed berries",
          "Cinnamon",
          "Stevia (optional)"
        ]
      }
    },
    "Wednesday": {
      breakfast: {
        meal: "Overnight Oats",
        description: "Rolled oats soaked in almond milk with fruit and nuts",
        calories: 450,
        protein: 20,
        carbs: 60,
        fat: 15,
        ingredients: [
          "1/2 cup rolled oats",
          "3/4 cup unsweetened almond milk",
          "1 tbsp chia seeds",
          "1 tbsp maple syrup",
          "1/2 banana (sliced)",
          "1 tbsp chopped nuts"
        ]
      },
      lunch: {
        meal: "Mediterranean Wrap",
        description: "Whole grain wrap with hummus, falafel, and fresh vegetables",
        calories: 510,
        protein: 18,
        carbs: 65,
        fat: 22,
        ingredients: [
          "1 whole grain wrap",
          "1/4 cup hummus",
          "3 falafel balls",
          "1/2 cup mixed greens",
          "1/4 cup cucumber",
          "2 tbsp red onion",
          "1 tbsp tahini sauce"
        ]
      },
      dinner: {
        meal: "Baked Cod with Vegetables",
        description: "Baked cod fillet with quinoa and roasted Brussels sprouts",
        calories: 480,
        protein: 40,
        carbs: 40,
        fat: 14,
        ingredients: [
          "6 oz cod fillet",
          "1/2 cup cooked quinoa",
          "1 cup Brussels sprouts",
          "1 tbsp olive oil",
          "Lemon, garlic, and herbs"
        ]
      },
      snacks: {
        meal: "Protein Bar & Fruit",
        description: "Low-sugar protein bar and a piece of fruit",
        calories: 280,
        protein: 20,
        carbs: 30,
        fat: 8,
        ingredients: [
          "1 protein bar (choose one with minimal additives)",
          "1 medium pear or apple"
        ]
      }
    },
    // More days would be included in a real implementation
    "Thursday": {
      breakfast: { 
        meal: "Protein Smoothie Bowl",
        description: "Smoothie bowl with protein powder, berries, and toppings",
        calories: 420,
        protein: 30,
        carbs: 50,
        fat: 10,
        ingredients: [
          "1 scoop protein powder",
          "1/2 frozen banana",
          "1/2 cup frozen mixed berries",
          "1/2 cup unsweetened almond milk",
          "Toppings: 1 tbsp granola, 1 tsp chia seeds, 1/2 tbsp almond butter"
        ]
      },
      lunch: {
        meal: "Tuna Salad Sandwich",
        description: "Tuna mixed with Greek yogurt on whole grain bread with lettuce and tomato",
        calories: 480,
        protein: 35,
        carbs: 45,
        fat: 18,
        ingredients: [
          "4 oz tuna (canned in water)",
          "2 tbsp Greek yogurt",
          "2 slices whole grain bread",
          "Lettuce and tomato",
          "1 tsp Dijon mustard",
          "1 tbsp diced celery"
        ]
      },
      dinner: {
        meal: "Tofu Stir-Fry",
        description: "Stir-fried tofu with vegetables and cauliflower rice",
        calories: 420,
        protein: 25,
        carbs: 30,
        fat: 22,
        ingredients: [
          "6 oz firm tofu",
          "2 cups mixed vegetables (bok choy, mushrooms, snow peas)",
          "1 cup cauliflower rice",
          "1 tbsp low-sodium soy sauce",
          "1 tsp sesame oil",
          "Ginger and garlic"
        ]
      },
      snacks: {
        meal: "Veggie Sticks with Hummus",
        description: "Fresh vegetables with hummus dip",
        calories: 180,
        protein: 7,
        carbs: 20,
        fat: 8,
        ingredients: [
          "1 cup mixed vegetable sticks (carrots, celery, bell peppers)",
          "1/4 cup hummus"
        ]
      }
    },
    "Friday": {
      breakfast: {
        meal: "Protein Pancakes",
        description: "Protein-packed pancakes with berries and a drizzle of maple syrup",
        calories: 450,
        protein: 30,
        carbs: 50,
        fat: 12,
        ingredients: [
          "1/3 cup rolled oats",
          "1 scoop protein powder",
          "1 whole egg",
          "1/4 cup egg whites",
          "1/2 banana",
          "1/4 cup mixed berries",
          "1 tsp maple syrup"
        ]
      },
      lunch: {
        meal: "Mexican Bowl",
        description: "Brown rice bowl with black beans, vegetables, and avocado",
        calories: 520,
        protein: 20,
        carbs: 65,
        fat: 20,
        ingredients: [
          "1/2 cup brown rice",
          "1/2 cup black beans",
          "1/4 avocado",
          "1/2 cup mixed vegetables (bell peppers, onions)",
          "Salsa",
          "Lime juice",
          "Cilantro"
        ]
      },
      dinner: {
        meal: "Grilled Steak with Vegetables",
        description: "Grilled lean steak with sweet potato and asparagus",
        calories: 580,
        protein: 45,
        carbs: 35,
        fat: 22,
        ingredients: [
          "5 oz lean steak (sirloin or flank)",
          "1 medium sweet potato",
          "1 cup asparagus",
          "1 tbsp olive oil",
          "Herbs and spices"
        ]
      },
      snacks: {
        meal: "Cottage Cheese with Fruit",
        description: "Low-fat cottage cheese with pineapple chunks",
        calories: 200,
        protein: 24,
        carbs: 15,
        fat: 4,
        ingredients: [
          "3/4 cup low-fat cottage cheese",
          "1/2 cup pineapple chunks"
        ]
      }
    },
    "Saturday": {
      breakfast: {
        meal: "Avocado Toast with Eggs",
        description: "Whole grain toast with avocado and poached eggs",
        calories: 480,
        protein: 22,
        carbs: 40,
        fat: 25,
        ingredients: [
          "2 slices whole grain bread",
          "1/2 avocado",
          "2 poached eggs",
          "Salt, pepper, and red pepper flakes",
          "Lemon juice"
        ]
      },
      lunch: {
        meal: "Grilled Chicken Wrap",
        description: "Whole grain wrap with grilled chicken, vegetables, and yogurt sauce",
        calories: 520,
        protein: 38,
        carbs: 50,
        fat: 18,
        ingredients: [
          "5 oz grilled chicken breast",
          "1 whole grain wrap",
          "1/2 cup mixed vegetables (lettuce, tomato, cucumber)",
          "2 tbsp Greek yogurt sauce",
          "Herbs and spices"
        ]
      },
      dinner: {
        meal: "Baked Vegetable Lasagna",
        description: "Vegetable lasagna with ricotta and a side salad",
        calories: 550,
        protein: 25,
        carbs: 60,
        fat: 22,
        ingredients: [
          "Whole grain lasagna noodles",
          "1/2 cup ricotta cheese (part-skim)",
          "1 cup mixed vegetables (zucchini, spinach, mushrooms)",
          "1/4 cup tomato sauce",
          "2 tbsp mozzarella cheese",
          "Side salad with olive oil and vinegar"
        ]
      },
      snacks: {
        meal: "Trail Mix",
        description: "Homemade trail mix with nuts, seeds, and dried fruit",
        calories: 240,
        protein: 8,
        carbs: 15,
        fat: 18,
        ingredients: [
          "1/4 cup mixed nuts (almonds, walnuts)",
          "1 tbsp pumpkin seeds",
          "1 tbsp dried cranberries",
          "1 tsp dark chocolate chips"
        ]
      }
    },
    "Sunday": {
      breakfast: {
        meal: "Breakfast Burrito",
        description: "Whole grain wrap with eggs, black beans, and vegetables",
        calories: 490,
        protein: 28,
        carbs: 55,
        fat: 20,
        ingredients: [
          "1 whole grain wrap",
          "2 whole eggs",
          "1/4 cup black beans",
          "1/4 cup bell peppers and onions",
          "2 tbsp salsa",
          "1 tbsp Greek yogurt",
          "Cilantro"
        ]
      },
      lunch: {
        meal: "Lentil Soup with Bread",
        description: "Hearty lentil soup with a slice of whole grain bread",
        calories: 420,
        protein: 20,
        carbs: 65,
        fat: 8,
        ingredients: [
          "1 cup lentil soup",
          "1 slice whole grain bread",
          "1 tsp olive oil",
          "Mixed vegetables in soup (carrots, celery, onions)"
        ]
      },
      dinner: {
        meal: "Grilled Fish Tacos",
        description: "Corn tortillas with grilled fish, cabbage slaw, and lime",
        calories: 520,
        protein: 35,
        carbs: 45,
        fat: 20,
        ingredients: [
          "6 oz white fish (tilapia or cod)",
          "2 corn tortillas",
          "1 cup cabbage slaw",
          "2 tbsp Greek yogurt sauce",
          "Lime juice",
          "Cilantro",
          "Avocado slice"
        ]
      },
      snacks: {
        meal: "Protein Smoothie",
        description: "Protein shake with banana and almond butter",
        calories: 280,
        protein: 25,
        carbs: 25,
        fat: 8,
        ingredients: [
          "1 scoop protein powder",
          "1 small banana",
          "1 cup unsweetened almond milk",
          "1 tsp almond butter",
          "Ice"
        ]
      }
    }
  },
  totals: {
    "Monday": { calories: 1870, protein: 126, carbs: 153, fat: 69 },
    "Tuesday": { calories: 1690, protein: 103, carbs: 165, fat: 66 },
    "Wednesday": { calories: 1720, protein: 98, carbs: 195, fat: 59 },
    "Thursday": { calories: 1700, protein: 97, carbs: 145, fat: 68 },
    "Friday": { calories: 1750, protein: 119, carbs: 165, fat: 58 },
    "Saturday": { calories: 1790, protein: 93, carbs: 165, fat: 83 },
    "Sunday": { calories: 1710, protein: 108, carbs: 190, fat: 56 }
  }
};

// Mock female-specific recommendations for menstrual phases
const femaleCycleDietRecommendations = {
  follicular: {
    phase: 'Follicular Phase (Days 1-14)',
    focus: 'Support recovery and energy levels',
    foods: ['Iron-rich foods (lean red meat, spinach, lentils)', 'Complex carbohydrates', 'Anti-inflammatory foods (berries, leafy greens)', 'Magnesium-rich foods (dark chocolate, nuts, seeds)'],
    tips: 'Focus on replenishing iron lost during menstruation. Slightly increase carbohydrate intake to support higher energy levels and training intensity.'
  },
  ovulation: {
    phase: 'Ovulation (Days 14-16)',
    focus: 'Support peak performance and muscle growth',
    foods: ['Lean proteins', 'Healthy fats', 'Antioxidant-rich foods (colorful fruits and vegetables)', 'Fermented foods (yogurt, kefir, kimchi)'],
    tips: 'Your metabolism may slightly increase. This is a good time to focus on muscle-building nutrients and anti-inflammatory foods.'
  },
  luteal: {
    phase: 'Luteal Phase (Days 16-28)',
    focus: 'Manage cravings and support mood',
    foods: ['Complex carbohydrates (sweet potatoes, oats)', 'Calcium-rich foods', 'B-vitamin rich foods (whole grains, eggs)', 'Omega-3 fatty acids (fatty fish, walnuts, flaxseeds)'],
    tips: 'You may experience cravings and higher hunger levels. Focus on fiber and protein to stay satiated, and include foods that support serotonin production.'
  },
  menstrual: {
    phase: 'Menstrual Phase (Days 1-5)',
    focus: 'Reduce inflammation and support energy',
    foods: ['Iron-rich foods', 'Anti-inflammatory foods', 'Warm, comforting foods', 'Hydrating foods and beverages'],
    tips: 'Focus on nutrient-dense foods that reduce inflammation and replenish iron. Stay well-hydrated and consider reducing caffeine if you experience increased sensitivity.'
  }
};

export const DietPlanner: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeDay, setActiveDay] = useState('Monday');
  const [currentMealType, setCurrentMealType] = useState('breakfast');
  const [showCycleInfo, setShowCycleInfo] = useState(false);
  const [cyclePhase, setCyclePhase] = useState('follicular');
  const [allergies, setAllergies] = useState('');
  
  // In a real app, these would come from user profile and state management
  const userProfile = JSON.parse(localStorage.getItem('fitnessUserProfile') || '{}');
  const isFemale = userProfile.sex === 'female';
  const hasMenstrualTracking = isFemale && userProfile.menstrualTracking;
  
  const generateNewPlan = () => {
    setIsLoading(true);
    // Simulate API call to AI service
    setTimeout(() => {
      toast.success('New diet plan generated!');
      setIsLoading(false);
    }, 2000);
  };
  
  const handleShowCycleInfo = () => {
    setShowCycleInfo(!showCycleInfo);
  };
  
  const handleSubmitAllergies = (e: React.FormEvent) => {
    e.preventDefault();
    if (allergies.trim()) {
      toast.success('Your dietary preferences have been saved. Your meal plan will be updated accordingly.');
      setAllergies('');
    }
  };
  
  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return <Coffee className="h-5 w-5" />;
      case 'lunch':
        return <Pizza className="h-5 w-5" />;
      case 'dinner':
        return <UtensilsCrossed className="h-5 w-5" />;
      case 'snacks':
        return <Apple className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Your Diet Plan</h2>
          <p className="text-muted-foreground">
            AI-generated nutrition tailored to support your fitness goals
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
                  Cycle-Optimized Nutrition
                </CardTitle>
                <CardDescription>
                  Diet recommendations optimized for your menstrual cycle phase
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
                
                {Object.keys(femaleCycleDietRecommendations).map((phase) => (
                  <TabsContent key={phase} value={phase} className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2">{femaleCycleDietRecommendations[phase].phase}</h4>
                      <p className="text-sm mb-2">
                        <span className="font-medium">Focus:</span> {femaleCycleDietRecommendations[phase].focus}
                      </p>
                      
                      <h5 className="font-medium text-sm mb-1">Recommended Foods:</h5>
                      <ul className="list-disc list-inside text-sm mb-3">
                        {femaleCycleDietRecommendations[phase].foods.map((food, index) => (
                          <li key={index}>{food}</li>
                        ))}
                      </ul>
                      
                      <div className="flex items-start mt-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-sm text-blue-800 dark:text-blue-300 w-full">
                          <strong>Tip:</strong> {femaleCycleDietRecommendations[phase].tips}
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
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-card shadow rounded-lg overflow-hidden border border-border">
            <div className="p-4 bg-muted/30 border-b border-border">
              <h3 className="font-medium">Weekly Meal Plan</h3>
            </div>
            <div className="divide-y divide-border">
              {mockDietPlan.weekdays.map((day) => (
                <button
                  key={day}
                  className={`w-full text-left p-4 transition-colors hover:bg-muted/40 ${
                    activeDay === day ? 'bg-muted/60' : ''
                  }`}
                  onClick={() => setActiveDay(day)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{day}</span>
                    <div className="text-sm text-muted-foreground">
                      {mockDietPlan.totals[day]?.calories} cal
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      P: {mockDietPlan.totals[day]?.protein}g
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      C: {mockDietPlan.totals[day]?.carbs}g
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      F: {mockDietPlan.totals[day]?.fat}g
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <Card className="mt-6 border border-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Dietary Preferences</CardTitle>
              <CardDescription>
                Tell us about your allergies or dietary restrictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitAllergies} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="E.g., Dairy, nuts, gluten, etc."
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Update Preferences
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5">
          <Card className="border border-muted">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">{activeDay}'s Meal Plan</CardTitle>
                  <CardDescription>
                    Total: {mockDietPlan.totals[activeDay]?.calories} calories | Protein: {mockDietPlan.totals[activeDay]?.protein}g | Carbs: {mockDietPlan.totals[activeDay]?.carbs}g | Fat: {mockDietPlan.totals[activeDay]?.fat}g
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <Tabs defaultValue={currentMealType} onValueChange={setCurrentMealType}>
                <TabsList className="w-full rounded-none border-b border-border p-0">
                  <TabsTrigger 
                    value="breakfast" 
                    className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    <Coffee className="mr-2 h-4 w-4" />
                    Breakfast
                  </TabsTrigger>
                  <TabsTrigger 
                    value="lunch" 
                    className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    <Pizza className="mr-2 h-4 w-4" />
                    Lunch
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dinner" 
                    className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    <UtensilsCrossed className="mr-2 h-4 w-4" />
                    Dinner
                  </TabsTrigger>
                  <TabsTrigger 
                    value="snacks" 
                    className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    <Apple className="mr-2 h-4 w-4" />
                    Snacks
                  </TabsTrigger>
                </TabsList>
                
                {Object.keys(mockDietPlan.meals[activeDay]).map((mealType) => (
                  <TabsContent key={mealType} value={mealType} className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {getMealIcon(mealType)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">
                            {mockDietPlan.meals[activeDay][mealType].meal}
                          </h3>
                          <p className="text-muted-foreground">
                            {mockDietPlan.meals[activeDay][mealType].description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="text-sm text-muted-foreground">Calories</div>
                          <div className="text-xl font-semibold">
                            {mockDietPlan.meals[activeDay][mealType].calories}
                          </div>
                        </div>
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="text-sm text-muted-foreground">Protein</div>
                          <div className="text-xl font-semibold">
                            {mockDietPlan.meals[activeDay][mealType].protein}g
                          </div>
                        </div>
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="text-sm text-muted-foreground">Carbs</div>
                          <div className="text-xl font-semibold">
                            {mockDietPlan.meals[activeDay][mealType].carbs}g
                          </div>
                        </div>
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="text-sm text-muted-foreground">Fat</div>
                          <div className="text-xl font-semibold">
                            {mockDietPlan.meals[activeDay][mealType].fat}g
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Ingredients</h4>
                        <ul className="space-y-2">
                          {mockDietPlan.meals[activeDay][mealType].ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        Mark as Completed
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <Card className="border border-muted">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Alternative Options</CardTitle>
                <CardDescription>
                  Don't like a meal? Here are some alternatives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    {getMealIcon(currentMealType)}
                  </div>
                  <div>
                    <h4 className="font-medium">Greek Yogurt Bowl</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Greek yogurt with honey, nuts, and fresh fruit
                    </p>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => toast.success('Meal replaced successfully!')}>
                      Replace Current Meal
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    {getMealIcon(currentMealType)}
                  </div>
                  <div>
                    <h4 className="font-medium">Protein Smoothie</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Protein powder, banana, spinach, and almond milk
                    </p>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => toast.success('Meal replaced successfully!')}>
                      Replace Current Meal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-muted">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Ask AI
                </CardTitle>
                <CardDescription>
                  Need personalized nutrition advice?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast.success('AI is generating a response...')}>
                    Meal prep ideas
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast.success('AI is generating a response...')}>
                    Higher protein options
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast.success('AI is generating a response...')}>
                    Low-carb alternatives
                  </Button>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-fitness-500 to-fitness-600 hover:from-fitness-600 hover:to-fitness-700">
                  Chat with AI Nutritionist <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3">
        <div className="mt-1">
          <AlertCircle className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h3 className="font-semibold text-amber-800 dark:text-amber-400">Important Note</h3>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            This meal plan is designed to support your fitness goals, but individual needs may vary. 
            Always consult with a healthcare professional or registered dietitian before making significant dietary changes, 
            especially if you have existing health conditions or take medications.
          </p>
        </div>
      </div>
    </div>
  );
};
