import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <section className="text-center py-12 md:py-20">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Welcome to <span className="text-primary">UPrep</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Your ultimate platform for UCAT success. Access comprehensive courses, practice questions, and track your progress all in one place.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/classroom">
              Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/practice">Start Practicing</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <h2 className="font-headline text-3xl font-semibold text-center mb-10">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Interactive Classroom</CardTitle>
              <CardDescription>Engage with expertly crafted courses, modules, and lessons.</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src="https://placehold.co/600x400.png" alt="Classroom" data-ai-hint="education study" width={600} height={400} className="rounded-md object-cover aspect-video" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Extensive Practice</CardTitle>
              <CardDescription>Hone your skills with a vast library of UCAT style questions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src="https://placehold.co/600x400.png" alt="Practice" data-ai-hint="test exam" width={600} height={400} className="rounded-md object-cover aspect-video"/>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Progress Tracking</CardTitle>
              <CardDescription>Monitor your performance and identify areas for improvement.</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src="https://placehold.co/600x400.png" alt="Progress" data-ai-hint="chart graph" width={600} height={400} className="rounded-md object-cover aspect-video"/>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
