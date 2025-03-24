
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
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const characterPositions = [
  { x: '10%', y: '20%', rotation: '5deg' },
  { x: '30%', y: '40%', rotation: '-8deg' },
  { x: '50%', y: '10%', rotation: '12deg' },
  { x: '70%', y: '30%', rotation: '-5deg' },
  { x: '90%', y: '15%', rotation: '8deg' },
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
}

export const PerformanceGraph: React.FC<PerformanceGraphProps> = ({
  title,
  description,
  data,
  dataKey,
  className,
  gradient = true,
}) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Start animation after a delay
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 relative min-h-[300px]">
        {/* Animated characters */}
        <div className="absolute inset-0 z-0 overflow-hidden">
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
                transitionDelay: `${idx * 150}ms`
              }}
            >
              <div className="animate-bounce h-full w-full rounded-full bg-gradient-to-br from-fitness-300 to-fitness-500 flex items-center justify-center text-white">
                <span role="img" aria-label="character">
                  {["🏃", "🏋️", "🧘", "🚴", "🤸"][idx % 5]}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Chart */}
        <div className="pt-6 relative z-10">
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
                  dot={{ strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                  fill={gradient ? `url(#gradient-${dataKey})` : undefined}
                  className="animate-fade-in"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
