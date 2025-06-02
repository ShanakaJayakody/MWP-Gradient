"use client"

import { notFound } from "next/navigation";
import Image from "next/image";
import { getCourseById } from "../data";
import { ModuleAccordion } from "@/components/classroom/module-accordion";
import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Lesson } from "@/types/classroom";

interface CoursePageProps {
  params: { courseId: string };
}

// This component will be client-side to manage lesson completion state
// For a real app, this state would come from a backend and be updated via API calls
// We'll simulate it with a wrapper client component for state management

interface CourseClientPageProps {
  courseId: string;
}

// Client component to manage state
function CourseClientPage({ courseId }: CourseClientPageProps) {
  const course = getCourseById(courseId);
  const [lessonCompletions, setLessonCompletions] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (course) {
      const initialCompletions: Record<string, boolean> = {};
      course.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          initialCompletions[lesson.id] = lesson.isCompleted || false;
        });
      });
      setLessonCompletions(initialCompletions);
    }
  }, [course]);


  if (!course) {
    notFound();
  }
  
  // This function would be passed down to the LessonPage
  const toggleLessonCompletion = (lessonId: string) => {
    setLessonCompletions(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
    // In a real app, you'd also make an API call here to persist the change
    console.log(`Lesson ${lessonId} completion toggled to ${!lessonCompletions[lessonId]}`);
  };


  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/classroom"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Classroom</Link>
      </Button>

      <Card className="mb-8 overflow-hidden shadow-xl">
        {course.imageUrl && (
          <div className="relative w-full h-64 md:h-80">
            <Image
              src={course.imageUrl}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint="education learning"
            />
          </div>
        )}
        <CardHeader className="p-6">
          <CardTitle className="font-headline text-3xl md:text-4xl mb-2">{course.title}</CardTitle>
          <CardDescription className="text-lg">{course.description}</CardDescription>
        </CardHeader>
      </Card>
      
      <h2 className="font-headline text-2xl font-semibold mb-6">Course Modules</h2>
      {course.modules.length > 0 ? (
        <Accordion type="multiple" className="w-full space-y-4">
          {course.modules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
                 <ModuleAccordion 
                    module={module} 
                    courseId={course.id} 
                    lessonCompletions={lessonCompletions}
                />
            </Card>
          ))}
        </Accordion>
      ) : (
        <p className="text-muted-foreground">This course currently has no modules.</p>
      )}
    </div>
  );
}

// Server component wrapper that passes params to the client component
export default function CoursePage({ params }: CoursePageProps) {
  return <CourseClientPage courseId={params.courseId} />;
}

// Dummy import for React to satisfy linter until state is implemented properly
import React from 'react';
