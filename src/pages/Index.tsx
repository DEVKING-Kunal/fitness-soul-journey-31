
import React, { useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Dumbbell, Users, Utensils, Check } from 'lucide-react';

const Index = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Handle smooth scrolling for anchor links
    if (window.location.hash === '#about' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Simple animation on scroll
    const handleScroll = () => {
      fadeRefs.current.forEach((ref) => {
        if (!ref) return;
        const top = ref.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight * 0.8) {
          ref.classList.add('animate-fade-in');
          ref.classList.remove('opacity-0');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !fadeRefs.current.includes(el)) {
      fadeRefs.current.push(el);
    }
  };

  const features = [
    {
      icon: <Activity className="h-10 w-10 text-fitness-500" />,
      title: 'Personalized Workout Plans',
      description: 'AI-generated exercise routines tailored to your unique body type, fitness level, and goals.'
    },
    {
      icon: <Utensils className="h-10 w-10 text-fitness-500" />,
      title: 'Smart Diet Planning',
      description: 'Receive customized nutrition plans that complement your workout regime and dietary preferences.'
    },
    {
      icon: <Users className="h-10 w-10 text-fitness-500" />,
      title: 'Community Competition',
      description: 'Connect with friends and family, tracking progress and motivating each other to reach fitness goals.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah J.',
      role: 'Marathon Runner',
      content: 'The AI-generated training plan helped me shave 15 minutes off my personal best. Incredible customization!'
    },
    {
      name: 'Michael T.',
      role: 'Weight Loss Journey',
      content: 'Lost 30 pounds in 3 months following the nutrition and exercise plan. The app adapted as my fitness improved.'
    },
    {
      name: 'Priya K.',
      role: 'Yoga Instructor',
      content: 'The female-specific recommendations during my cycle have been game-changing for my energy levels and performance.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-fitness-50/30 to-background -z-10"></div>
        <div className="absolute top-20 right-0 w-3/4 h-3/4 bg-fitness-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in">
                  Transform Your Fitness Journey with <span className="text-gradient">AI</span>
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 mb-8 animate-fade-in delay-100">
                  Experience personalized workout plans, smart nutrition advice, and a community that keeps you motivated—all powered by advanced artificial intelligence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-200">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 button-shine">
                    <Link to="/auth">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="#about">Learn More</a>
                  </Button>
                </div>
                
                <div className="mt-10 flex items-center space-x-4 text-sm text-foreground/70 animate-fade-in delay-300">
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4 text-fitness-500" />
                    <span>Personalized</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4 text-fitness-500" />
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4 text-fitness-500" />
                    <span>Results-Driven</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 relative animate-fade-in delay-300">
              <div className="relative h-[480px] w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-fitness-400/20 to-fitness-600/20 rounded-3xl transform rotate-3 scale-95"></div>
                <div className="absolute inset-0 glass-panel rounded-3xl overflow-hidden transform -rotate-3 shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Fitness Journey" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" ref={addToRefs}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Fitness, Designed for You</h2>
            <p className="text-lg text-foreground/70">
              Our AI-powered platform adapts to your body's needs, creating the perfect balance of exercise and nutrition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-card p-8 rounded-xl border border-border shadow-sm card-hover opacity-0"
                ref={addToRefs}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 p-3 bg-fitness-50 dark:bg-fitness-900/10 rounded-full w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-gradient-to-b from-background to-fitness-50/30 dark:to-fitness-900/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 opacity-0" ref={addToRefs}>
              <div className="relative">
                <div className="absolute -left-6 -top-6 w-64 h-64 bg-fitness-200 rounded-full opacity-30 -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="About Fitness Soul" 
                  className="rounded-2xl shadow-2xl max-w-full object-cover"
                />
                <div className="absolute -right-8 bottom-12 p-6 glass-panel rounded-xl shadow-lg">
                  <Dumbbell className="text-fitness-500 mb-2 h-8 w-8" />
                  <h4 className="font-bold">Adaptive Training</h4>
                  <p className="text-sm text-foreground/70">Our AI adjusts your routine as you progress</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 opacity-0" ref={addToRefs}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Fitness Soul</h2>
              <p className="text-lg mb-6 text-foreground/80">
                Fitness Soul was born from a simple idea: what if your fitness journey was guided by intelligence that truly understands your body?
              </p>
              <p className="text-lg mb-6 text-foreground/80">
                Our platform combines cutting-edge AI technology with sports science to deliver personalized fitness experiences. We consider your age, body type, goals, and even biological factors like menstrual cycles to create plans that work with your body, not against it.
              </p>
              <p className="text-lg mb-8 text-foreground/80">
                By analyzing thousands of data points, our AI creates exercise and nutrition recommendations that adapt as you progress, ensuring you're always challenged but never overwhelmed.
              </p>
              
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 button-shine">
                <Link to="/auth">
                  Join Fitness Soul <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 opacity-0" ref={addToRefs}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-foreground/70">
              See how AI-driven fitness has transformed the lives of our members.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-card p-8 rounded-xl border border-border shadow-sm opacity-0"
                ref={addToRefs}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="mb-6 text-foreground/80 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-fitness-50 dark:bg-fitness-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto opacity-0" ref={addToRefs}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Fitness Journey?</h2>
            <p className="text-lg text-foreground/80 mb-8">
              Join thousands of others who have discovered the power of AI-driven fitness. Your personalized plan is waiting.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 button-shine">
              <Link to="/auth">
                Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-fitness-400 to-fitness-700 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FS</span>
                </span>
                <span className="text-xl font-bold text-gradient">Fitness Soul</span>
              </Link>
              <p className="mt-2 text-sm text-foreground/60">
                Transforming fitness with artificial intelligence.
              </p>
            </div>
            
            <div className="text-sm text-foreground/60">
              © {new Date().getFullYear()} Fitness Soul. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
