
"use client"

import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { deleteCourse, getCourseById } from "../data";
import { ModuleAccordion } from "@/components/classroom/module-accordion";
import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Edit, Trash2, FilePlus2 } from "lucide-react";
import type { Lesson } from "@/types/classroom";
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface CoursePageProps {
  params: { courseId: string };
}

interface CourseClientPageProps {
  courseId: string;
}

function CourseClientPage({ courseId }: CourseClientPageProps) {
  const course = getCourseById(courseId);
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [lessonCompletions, setLessonCompletions] = React.useState<Record<string, boolean>>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (course) {
      const localStorageKey = `lastViewedLesson_${courseId}`;
      const lastViewedLessonId = localStorage.getItem(localStorageKey);

      if (lastViewedLessonId) {
        router.replace(`/classroom/${courseId}/${lastViewedLessonId}`);
      } else if (course.modules?.[0]?.lessons?.[0]?.id) {
        const firstLessonId = course.modules[0].lessons[0].id;
        router.replace(`/classroom/${courseId}/${firstLessonId}`);
      } else {
        setIsLoading(false);
      }
    } else if (course === undefined && courseId) {
      setIsLoading(false);
    }
  }, [courseId, course, router]);

  useEffect(() => {
    if (course) {
      const initialCompletions: Record<string, boolean> = {};
      course.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          const storedCompletions = localStorage.getItem('lessonCompletions');
          const completions = storedCompletions ? JSON.parse(storedCompletions) : {};
          initialCompletions[lesson.id] = completions[lesson.id] || lesson.isCompleted || false;
        });
      });
      setLessonCompletions(initialCompletions);
    }
  }, [course, courseId]);


  const handleDeleteCourse = () => {
    if (course) {
      const success = deleteCourse(course.id);
      if (success) {
        toast({
          title: "Course Deleted",
          description: `"${course.title}" has been successfully deleted.`,
        });
        router.push("/classroom");
      } else {
        toast({
          variant: "destructive",
          title: "Error Deleting Course",
          description: `Could not delete "${course.title}". Please try again.`,
        });
      }
      setIsDeleteDialogOpen(false);
    }
  };

  if (!course) {
    notFound();
  }
  
  if (isLoading && course && (localStorage.getItem(`lastViewedLesson_${courseId}`) || course.modules?.[0]?.lessons?.[0]?.id)) {
     return (
        <div className="container mx-auto py-8 px-4 text-center">
            <p className="text-lg text-muted-foreground">Loading course content...</p>
        </div>
    );
  }

  return (
    <>
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
          <CardHeader className="p-6 flex flex-row justify-between items-start">
            <div>
              <CardTitle className="font-headline text-3xl md:text-4xl mb-2">{course.title}</CardTitle>
              <CardDescription className="text-lg">{course.description}</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">Course Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/edit-course/${course.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Course & Modules
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/edit-lesson/new-lesson?courseId=${course.id}`}>
                    <FilePlus2 className="mr-2 h-4 w-4" />
                    Add New Lesson
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Course
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          <p className="text-muted-foreground">This course currently has no modules. You can add them by clicking "Edit Course & Modules" in the options menu above.</p>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this course?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course
              "{course.title}" and all of its associated modules and lessons.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCourse} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              Delete Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function CoursePage({ params }: CoursePageProps) {
  return <CourseClientPage courseId={params.courseId} />;
}
