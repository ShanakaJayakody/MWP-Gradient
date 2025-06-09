import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, Target, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <section className="text-center py-20 md:py-32 relative overflow-hidden">
        {/* Enhanced background glow effect for jace.ai feel */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl animate-pulse opacity-70"></div>
          <div className="absolute bottom-0 left-1/3 -translate-x-1/2 w-[100%] h-[100%] bg-gradient-radial from-accent/10 via-transparent to-transparent blur-2xl animate-pulse opacity-50"></div>
        </div>
        <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
          Welcome to <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">MedWithPurpose</span> 
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Your ultimate platform for UCAT success. Access comprehensive courses, practice questions, and track your progress all in one place, powered by cutting-edge AI.
        </p>
        <div className="space-x-4">
          <Button 
            size="lg" 
            asChild 
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 px-8 py-3"
          >
            <Link href="/classroom">
              Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className="border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 transform hover:scale-105 text-foreground hover:border-primary px-8 py-3"
          >
            <Link href="/practice">Start Practicing</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <h2 className="font-headline text-4xl font-bold text-center mb-16">
          Why Choose <span className="text-primary">MedWithPurpose</span>?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="h-10 w-10 text-accent mb-4" />}
            title="AI-Powered Classroom"
            description="Engage with expertly crafted courses, modules, and lessons, enhanced with AI insights."
            imageUrl="https://placehold.co/600x400.png"
            imageHint="abstract tech"
          />
          <FeatureCard
            icon={<Target className="h-10 w-10 text-accent mb-4" />}
            title="Extensive Practice"
            description="Hone your skills with a vast library of UCAT style questions and adaptive drills."
            imageUrl="https://placehold.co/600x400.png"
            imageHint="data visualization"
          />
          <FeatureCard
            icon={<TrendingUp className="h-10 w-10 text-accent mb-4" />}
            title="Personalized Progress"
            description="Monitor your performance with AI-driven analytics and identify areas for improvement."
            imageUrl="https://placehold.co/600x400.png"
            imageHint="learning interface"
          />
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

function FeatureCard({ icon, title, description, imageUrl, imageHint }: FeatureCardProps) {
  return (
    <Card className="group bg-card/70 backdrop-blur-md border-border/30 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col overflow-hidden">
      <CardHeader className="items-center text-center p-6">
        {icon}
        <CardTitle className="font-headline text-2xl mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center text-center p-6 pt-0">
        <div className="relative w-full aspect-[16/10] mb-4 rounded-lg overflow-hidden shadow-lg">
          <Image 
              src={imageUrl} 
              alt={title} 
              data-ai-hint={imageHint} 
              layout="fill"
              objectFit="cover" 
              className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardDescription className="text-base text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
