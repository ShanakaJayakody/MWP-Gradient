
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Added CardContent
import { ArrowRight, TextSelect, BrainCircuit, Calculator, ClipboardList, Sparkles } from "lucide-react";
import Link from "next/link";
// import Image from "next/image"; // Not currently used

interface PracticeOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string; 
  imageHint?: string;
  isDirectLink: boolean; 
}

const practiceOptions: PracticeOption[] = [
  {
    id: "verbal-reasoning",
    title: "Verbal Reasoning",
    description: "Sharpen your ability to analyze and interpret written passages effectively.",
    icon: TextSelect,
    href: "/practice/verbal-reasoning",
    imageHint: "text analysis",
    isDirectLink: true,
  },
  {
    id: "decision-making",
    title: "Decision Making",
    description: "Develop skills in logical deduction, evaluating arguments, and making sound judgments.",
    icon: BrainCircuit,
    href: "/practice/decision-making",
    imageHint: "logical thinking",
    isDirectLink: true,
  },
  {
    id: "quantitative-reasoning",
    title: "Quantitative Reasoning",
    description: "Master numerical problem-solving and data interpretation techniques.",
    icon: Calculator,
    href: "/practice/quantitative-reasoning",
    imageHint: "math calculation",
    isDirectLink: true,
  },
  {
    id: "exams",
    title: "Full Mock Exams",
    description: "Simulate real UCAT exam conditions to test your preparedness and timing.",
    icon: ClipboardList,
    href: "/practice/exams", 
    imageHint: "exam preparation",
    isDirectLink: false, 
  },
  {
    id: "skills",
    title: "Targeted Skills Drills",
    description: "Focus on specific sub-skills within each UCAT section for tailored improvement.",
    icon: Sparkles,
    href: "/practice/skills", 
    imageHint: "skill development",
    isDirectLink: false,
  },
];

export default function PracticePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Practice <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">Zone</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Select a category below to hone your UCAT skills with targeted exercises and mock exams.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {practiceOptions.map((option) => (
          <PracticeOptionCard key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
}

interface PracticeOptionCardProps {
  option: PracticeOption;
}

function PracticeOptionCard({ option }: PracticeOptionCardProps) {
  const IconComponent = option.icon;
  return (
    <Card className="group bg-card/70 backdrop-blur-md border-border/30 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col overflow-hidden">
      <CardHeader className="items-center text-center p-6">
        <IconComponent className="h-12 w-12 text-accent mb-4" />
        <CardTitle className="font-headline text-2xl mt-2">{option.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center text-center p-6 pt-0">
        <p className="text-base text-muted-foreground mb-6 flex-grow">{option.description}</p>
        {option.isDirectLink ? (
          <Button 
            asChild
            className="w-full mt-auto bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-primary-foreground shadow-md hover:shadow-primary/30 transition-all duration-300 transform group-hover:scale-105"
          >
            <Link href={option.href}>
              Start Practice
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        ) : (
          <Button
            className="w-full mt-auto bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-primary-foreground shadow-md hover:shadow-primary/30 transition-all duration-300 transform group-hover:scale-105"
            onClick={() => alert(`Navigating to ${option.title} practice area (placeholder). Route: ${option.href}`)}
          >
            Start Practice
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
