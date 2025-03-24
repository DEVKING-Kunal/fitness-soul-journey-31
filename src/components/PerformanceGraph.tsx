
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

// Character emojis with different positions for animation
const characterPositions = [
  { x: '10%', y: '20%', rotation: '5deg', delay: 0.2, character: "🏃" },
  { x: '30%', y: '40%', rotation: '-8deg', delay: 0.5, character: "🏋️" },
  { x: '50%', y: '10%', rotation: '12deg', delay: 0.8, character: "🧘" },
  { x: '70%', y: '30%', rotation: '-5deg', delay: 1.1, character: "🚴" },
  { x: '90%', y: '15%', rotation: '8deg', delay: 1.4, character: "🤸" },
  { x: '20%', y: '60%', rotation: '-10deg', delay: 1.7, character: "🏆" },
  { x: '60%', y: '50%', rotation: '7deg', delay: 2.0, character: "💪" },
  { x: '80%', y: '65%', rotation: '-4deg', delay: 2.3, character: "🧠" },
];

// Different motivational phrases that will cycle
const motivationalPhrases = [
  "Keep pushing!",
  "You're doing great!",
  "Stay consistent!",
  "New record coming!",
  "Feel the burn!",
  "Keep that pace!",
  "Almost there!",
  "Breathe & focus!"
];

interface PerformanceGraphProps {
  title: string;
  description: string;
  data: Array<{
    date: string;
    value: number;
    [key: string]: any;
  }>;
  dataKey: string;
  className?: string;
  gradient?: boolean;
  areaChart?: boolean;
}

export const PerformanceGraph: React.FC<PerformanceGraphProps> = ({
  title,
  description,
  data,
  dataKey,
  className,
  gradient = true,
  areaChart = false,
}) => {
  const [animate, setAnimate] = useState(false);
  const [activePhrase, setActivePhrase] = useState(0);
  
  useEffect(() => {
    // Start animation after a delay
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    
    // Cycle through motivational phrases
    const phraseInterval = setInterval(() => {
      setActivePhrase(prev => (prev + 1) % motivationalPhrases.length);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(phraseInterval);
    };
  }, []);

  return (
    <Card className={cn("overflow-hidden glass-panel transition-all duration-500 hover:shadow-xl", className)}>
      <CardHeader className="relative z-20">
        <CardTitle className="text-xl md:text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        
        {/* Animated motivational phrase */}
        <div className="absolute top-6 right-6 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          <div className="bg-fitness-500/10 text-fitness-700 dark:text-fitness-300 px-3 py-1 rounded-full text-sm font-medium">
            {motivationalPhrases[activePhrase]}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative min-h-[300px]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-fitness-50/50 to-background/30 dark:from-fitness-900/20 dark:to-background/10 z-0"></div>
        
        {/* Animated characters */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {characterPositions.map((pos, idx) => (
            <div 
              key={idx}
              className={cn(
                "absolute h-12 w-12 transition-all duration-1000 opacity-0",
                animate && "opacity-100 transform translate-y-0"
              )}
              style={{
                left: pos.x, 
                top: pos.y,
                transform: `rotate(${pos.rotation}) translateY(${animate ? '0' : '20px'})`,
                transitionDelay: `${pos.delay}s`
              }}
            >
              <div className={cn(
                "h-full w-full rounded-full bg-gradient-to-br from-fitness-300/80 to-fitness-500/80 flex items-center justify-center text-white",
                idx % 2 === 0 ? "floating-slow" : "floating"
              )}>
                <span role="img" aria-label="character">
                  {pos.character}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Chart */}
        <div className="pt-6 relative z-20">
          <ChartContainer 
            className="h-[300px]"
            config={{
              [dataKey]: {
                label: title,
                theme: {
                  light: "hsl(var(--primary))",
                  dark: "hsl(var(--primary))"
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              {areaChart ? (
                <AreaChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey={dataKey}
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#gradient-${dataKey})`}
                    className="animate-fade-in"
                  />
                </AreaChart>
              ) : (
                <LineChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <defs>
                    {gradient && (
                      <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      </linearGradient>
                    )}
                  </defs>
                  <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, fill: '#fff' }}
                    activeDot={{ r: 8, className: "pulse-ring" }}
                    className="animate-fade-in"
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
