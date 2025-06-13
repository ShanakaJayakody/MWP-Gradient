
"use client"

import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { deleteCourse, getCourseById, updateCourseModules } from "../data";
import { ModuleAccordion } from "@/components/classroom/module-accordion";
import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Edit, Trash2, FilePlus2, FolderPlus } from "lucide-react";
import type { Lesson, Module } from "@/types/classroom";
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
import { AddModuleDialog } from "@/components/classroom/add-module-dialog"; // New import

interface CoursePageProps {
  params: { courseId: string };
}

interface CourseClientPageProps {
  courseId: string;
}

function CourseClientPage({ courseId }: CourseClientPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  // State for course data to allow re-rendering when modules are added
  const [currentCourse, setCurrentCourse] = useState(() => getCourseById(courseId));
  const [isLoading, setIsLoading] = useState(true);
  const [lessonCompletions, setLessonCompletions] = React.useState<Record<string, boolean>>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch or update course whenever courseId changes or component mounts
    const fetchedCourse = getCourseById(courseId);
    setCurrentCourse(fetchedCourse);

    if (fetchedCourse) {
      const localStorageKey = `lastViewedLesson_${courseId}`;
      const lastViewedLessonId = localStorage.getItem(localStorageKey);

      if (lastViewedLessonId) {
        router.replace(`/classroom/${courseId}/${lastViewedLessonId}`);
      } else if (fetchedCourse.modules?.[0]?.lessons?.[0]?.id) {
        const firstLessonId = fetchedCourse.modules[0].lessons[0].id;
        router.replace(`/classroom/${courseId}/${firstLessonId}`);
      } else {
        setIsLoading(false);
      }
    } else if (fetchedCourse === undefined && courseId) {
      // If course not found after initial load attempt
      setIsLoading(false); 
    }
  }, [courseId, router]); // Removed currentCourse from dependencies to avoid loop

  useEffect(() => {
    if (currentCourse) {
      const initialCompletions: Record<string, boolean> = {};
      currentCourse.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          const storedCompletions = localStorage.getItem('lessonCompletions');
          const completions = storedCompletions ? JSON.parse(storedCompletions) : {};
          initialCompletions[lesson.id] = completions[lesson.id] || lesson.isCompleted || false;
        });
      });
      setLessonCompletions(initialCompletions);
      setIsLoading(false); // Set loading to false once course and completions are processed
    } else if (!currentCourse && !isLoading) {
        // If after initial useEffect, currentCourse is still null and we are not loading, it means course not found
        // Handled by notFound() below
    }
  }, [currentCourse, isLoading]); // Added isLoading to dependencies


  const handleDeleteCourse = () => {
    if (currentCourse) {
      const success = deleteCourse(currentCourse.id);
      if (success) {
        toast({
          title: "Course Deleted",
          description: `"${currentCourse.title}" has been successfully deleted.`,
        });
        router.push("/classroom");
      } else {
        toast({
          variant: "destructive",
          title: "Error Deleting Course",
          description: `Could not delete "${currentCourse.title}". Please try again.`,
        });
      }
      setIsDeleteDialogOpen(false);
    }
  };

  const handleAddModuleCallback = (moduleName: string, isPublished: boolean) => {
    if (currentCourse) {
      const newModule: Module = {
        id: `module-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: moduleName,
        description: isPublished ? "Published module" : "Draft module", // Placeholder description
        lessons: [],
      };
      const updatedModules = [...currentCourse.modules, newModule];
      updateCourseModules(currentCourse.id, updatedModules);
      setCurrentCourse(getCourseById(courseId)); // Re-fetch to update local state and trigger re-render
      toast({
        title: "Module Added",
        description: `"${moduleName}" has been added to ${currentCourse.title}.`,
      });
    }
    setIsAddModuleDialogOpen(false);
  };


  if (isLoading && !(currentCourse && (localStorage.getItem(`lastViewedLesson_${courseId}`) || currentCourse.modules?.[0]?.lessons?.[0]?.id))) {
     return (
        <div className="container mx-auto py-8 px-4 text-center">
            <p className="text-lg text-muted-foreground">Loading course content...</p>
        </div>
    );
  }
  
  if (!currentCourse) {
    notFound(); // Call notFound if currentCourse is null after loading attempts
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <Button variant="outline" asChild className="mb-6">
          <Link href="/classroom"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Classroom</Link>
        </Button>

        <Card className="mb-8 overflow-hidden shadow-xl">
          {currentCourse.imageUrl && (
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={currentCourse.imageUrl}
                alt={currentCourse.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint="education learning"
              />
            </div>
          )}
          <CardHeader className="p-6 flex flex-row justify-between items-start">
            <div>
              <CardTitle className="font-headline text-3xl md:text-4xl mb-2">{currentCourse.title}</CardTitle>
              <CardDescription className="text-lg">{currentCourse.description}</CardDescription>
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
                  <Link href={`/admin/edit-course/${currentCourse.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit course
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsAddModuleDialogOpen(true)} className="cursor-pointer">
                  <FolderPlus className="mr-2 h-4 w-4" />
                  Add Module
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/edit-lesson/new-lesson?courseId=${currentCourse.id}`}>
                    <FilePlus2 className="mr-2 h-4 w-4" />
                    Add Lesson
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
        {currentCourse.modules.length > 0 ? (
          <Accordion type="multiple" className="w-full space-y-4" defaultValue={currentCourse.modules.map(m => m.id)}>
            {currentCourse.modules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                   <ModuleAccordion 
                      module={module} 
                      courseId={currentCourse.id} 
                      lessonCompletions={lessonCompletions}
                  />
              </Card>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground">This course currently has no modules. You can add them by clicking "Add Module" in the options menu above.</p>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this course?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course
              "{currentCourse.title}" and all of its associated modules and lessons.
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
      
      {/* Add Module Dialog instance */}
      <AddModuleDialog
        open={isAddModuleDialogOpen}
        onOpenChange={setIsAddModuleDialogOpen}
        onAddModule={(moduleName, isPublished) => handleAddModuleCallback(moduleName, isPublished)}
      />
    </>
  );
}

export default function CoursePage({ params }: CoursePageProps) {
  return <CourseClientPage courseId={params.courseId} />;
}
