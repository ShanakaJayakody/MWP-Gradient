
"use client"

import { notFound, useRouter } from "next/navigation"; // Added useRouter
import Image from "next/image";
import { getCourseById } from "../data";
import { ModuleAccordion } from "@/components/classroom/module-accordion";
import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Lesson } from "@/types/classroom";
import React, { useEffect, useState } from 'react'; // Added useEffect, useState

interface CoursePageProps {
  params: { courseId: string };
}

interface CourseClientPageProps {
  courseId: string;
}

// Client component to manage state and redirection
function CourseClientPage({ courseId }: CourseClientPageProps) {
  const course = getCourseById(courseId);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // For redirect UX
  const [lessonCompletions, setLessonCompletions] = React.useState<Record<string, boolean>>({});

  useEffect(() => {
    if (course) {
      const localStorageKey = `lastViewedLesson_${courseId}`;
      const lastViewedLessonId = localStorage.getItem(localStorageKey);

      if (lastViewedLessonId) {
        router.replace(`/classroom/${courseId}/${lastViewedLessonId}`);
        // No need to setIsLoading(false) as component will unmount
      } else if (course.modules?.[0]?.lessons?.[0]?.id) {
        const firstLessonId = course.modules[0].lessons[0].id;
        router.replace(`/classroom/${courseId}/${firstLessonId}`);
        // No need to setIsLoading(false)
      } else {
        // No last viewed lesson, and no first lesson (e.g., empty course)
        setIsLoading(false); // Allow rendering the course overview
      }
    } else if (course === undefined && courseId) {
      // Course data not found, notFound() will be called below
      setIsLoading(false);
    }
  }, [courseId, course, router]);

  useEffect(() => {
    if (course) {
      const initialCompletions: Record<string, boolean> = {};
      course.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          // Prioritize localStorage, then mock data's isCompleted
          const storedCompletions = localStorage.getItem('lessonCompletions');
          const completions = storedCompletions ? JSON.parse(storedCompletions) : {};
          initialCompletions[lesson.id] = completions[lesson.id] || lesson.isCompleted || false;
        });
      });
      setLessonCompletions(initialCompletions);
    }
  }, [course, courseId]); // Added courseId dependency


  if (!course) {
    // This handles the case where getCourseById returns undefined
    notFound();
  }
  
  // Show loading indicator only if we expect a redirect and course data is loaded
  if (isLoading && course && (localStorage.getItem(`lastViewedLesson_${courseId}`) || course.modules?.[0]?.lessons?.[0]?.id)) {
     return (
        <div className="container mx-auto py-8 px-4 text-center">
            <p className="text-lg text-muted-foreground">Loading course content...</p>
            {/* You could add a spinner component here for better UX */}
        </div>
    );
  }

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
        <p className="text-muted-foreground">This course currently has no modules. You can add them in the admin section.</p>
      )}
    </div>
  );
}

// Server component wrapper that passes params to the client component
export default function CoursePage({ params }: CoursePageProps) {
  return <CourseClientPage courseId={params.courseId} />;
}
