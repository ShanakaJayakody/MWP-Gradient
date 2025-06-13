
"use client"

import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { deleteCourse, getCourseById, updateCourseModules, deleteModule, duplicateModule } from "../data";
import { ModuleAccordion } from "@/components/classroom/module-accordion";
import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Edit, Trash2, FilePlus2, FolderPlus, GripVertical } from "lucide-react";
import type { Module } from "@/types/classroom";
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
import { AddModuleDialog } from "@/components/classroom/add-module-dialog";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CoursePageProps {
  params: { courseId: string };
}

interface CourseClientPageProps {
  courseId: string;
}

// Wrapper for ModuleAccordion to integrate with dnd-kit's useSortable
function SortableModuleItem({ module, ...props }: { module: Module } & Omit<React.ComponentProps<typeof ModuleAccordion>, 'module' | 'setNodeRef' | 'attributes' | 'listeners' | 'style' | 'isDragging'>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto', // Ensure dragged item is above others
  };

  return (
    <ModuleAccordion
      module={module}
      setNodeRef={setNodeRef}
      attributes={attributes}
      listeners={listeners}
      style={style}
      isDragging={isDragging}
      {...props}
    />
  );
}


function CourseClientPage({ courseId }: CourseClientPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [currentCourse, setCurrentCourse] = useState(() => getCourseById(courseId));
  const [isLoading, setIsLoading] = useState(true);
  const [lessonCompletions, setLessonCompletions] = React.useState<Record<string, boolean>>({});
  const [isDeleteCourseDialogOpen, setIsDeleteCourseDialogOpen] = useState(false);
  const [isDeleteModuleDialogOpen, setIsDeleteModuleDialogOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchedCourse = getCourseById(courseId);
    setCurrentCourse(fetchedCourse);

    if (fetchedCourse) {
      const localStorageKey = `lastViewedLesson_${courseId}`;
      const lastViewedLessonId = localStorage.getItem(localStorageKey);

      if (lastViewedLessonId) {
        // Check if lesson still exists
        const lessonExists = fetchedCourse.modules.some(m => m.lessons.some(l => l.id === lastViewedLessonId));
        if (lessonExists) {
          router.replace(`/classroom/${courseId}/${lastViewedLessonId}`);
          return; // Important: return to prevent further execution if redirecting
        } else {
          localStorage.removeItem(localStorageKey); // Clean up invalid ID
        }
      }
      
      // If no valid lastViewedLessonId or it was cleaned up, try first lesson
      if (fetchedCourse.modules?.[0]?.lessons?.[0]?.id) {
        const firstLessonId = fetchedCourse.modules[0].lessons[0].id;
        router.replace(`/classroom/${courseId}/${firstLessonId}`);
        return; 
      }
      // If no lessons, just stay on this page
      setIsLoading(false);

    } else if (fetchedCourse === undefined && courseId) { // Course explicitly not found
      setIsLoading(false); 
    }
  }, [courseId, router]);


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
      if (isLoading) setIsLoading(false); // Set loading to false if it was true and course data is now processed
    } else if (!currentCourse && !isLoading) { // Course is null and we are not already loading
      // This implies course was not found initially or after an operation.
      // notFound() will be called below if currentCourse is still null after isLoading check.
    }
  }, [currentCourse, isLoading]);


  const handleDeleteCourseAction = () => {
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
      setIsDeleteCourseDialogOpen(false);
    }
  };

  const handleAddModuleCallback = (moduleName: string, isPublished: boolean) => {
    if (currentCourse) {
      const newModule: Module = {
        id: `module-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: moduleName,
        description: isPublished ? "Published module" : "Draft module",
        lessons: [],
      };
      const updatedModules = [...currentCourse.modules, newModule];
      updateCourseModules(currentCourse.id, updatedModules);
      setCurrentCourse(getCourseById(courseId));
      toast({
        title: "Module Added",
        description: `"${moduleName}" has been added to ${currentCourse.title}.`,
      });
    }
    setIsAddModuleDialogOpen(false);
  };

  const handleDeleteModuleAction = () => {
    if (currentCourse && moduleToDelete) {
      const success = deleteModule(currentCourse.id, moduleToDelete);
      if (success) {
        toast({
          title: "Module Deleted",
          description: `Module has been successfully deleted from "${currentCourse.title}".`,
        });
        setCurrentCourse(getCourseById(courseId)); 
      } else {
        toast({
          variant: "destructive",
          title: "Error Deleting Module",
          description: "Could not delete the module. Please try again.",
        });
      }
    }
    setIsDeleteModuleDialogOpen(false);
    setModuleToDelete(null);
  };

  const handleDuplicateModuleAction = (moduleId: string) => {
    if (currentCourse) {
      const duplicated = duplicateModule(currentCourse.id, moduleId);
      if (duplicated) {
        toast({
          title: "Module Duplicated",
          description: `Module "${duplicated.title}" has been successfully created.`,
        });
        setCurrentCourse(getCourseById(courseId)); 
      } else {
        toast({
          variant: "destructive",
          title: "Error Duplicating Module",
          description: "Could not duplicate the module. Please try again.",
        });
      }
    }
  };

  function handleModuleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (currentCourse && active.id !== over?.id && over) {
      const oldIndex = currentCourse.modules.findIndex((m) => m.id === active.id);
      const newIndex = currentCourse.modules.findIndex((m) => m.id === over.id);
      
      const reorderedModules = arrayMove(currentCourse.modules, oldIndex, newIndex);
      
      // Update state optimistically
      setCurrentCourse(prevCourse => prevCourse ? { ...prevCourse, modules: reorderedModules } : null);
      
      // "Persist" change to mock data
      updateCourseModules(courseId, reorderedModules); 
      
      toast({ title: "Module Reordered", description: "The module order has been updated." });
    }
  }
  
  if (isLoading && !(currentCourse && (localStorage.getItem(`lastViewedLesson_${courseId}`) || currentCourse.modules?.[0]?.lessons?.[0]?.id))) {
     return (
        <div className="container mx-auto py-8 px-4 text-center">
            <p className="text-lg text-muted-foreground">Loading course content...</p>
        </div>
    );
  }
  
  if (!currentCourse) {
    notFound();
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
                <DropdownMenuItem onClick={() => setIsDeleteCourseDialogOpen(true)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Course
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-6">
            <h2 className="font-headline text-2xl font-semibold mb-6">Course Modules</h2>
            {currentCourse.modules.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleModuleDragEnd}
              >
                <SortableContext
                  items={currentCourse.modules.map(m => m.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Accordion type="multiple" className="w-full space-y-0" defaultValue={currentCourse.modules.map(m => m.id)}>
                    {currentCourse.modules.map((module) => (
                      <SortableModuleItem
                        key={module.id}
                        module={module} 
                        courseId={currentCourse.id} 
                        lessonCompletions={lessonCompletions}
                        onDeleteModule={(moduleId) => {
                          setModuleToDelete(moduleId);
                          setIsDeleteModuleDialogOpen(true);
                        }}
                        onDuplicateModule={handleDuplicateModuleAction}
                      />
                    ))}
                  </Accordion>
                </SortableContext>
              </DndContext>
            ) : (
              <p className="text-muted-foreground">This course currently has no modules. You can add them by clicking "Add Module" in the options menu above.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={isDeleteCourseDialogOpen} onOpenChange={setIsDeleteCourseDialogOpen}>
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
            <AlertDialogAction onClick={handleDeleteCourseAction} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              Delete Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={isDeleteModuleDialogOpen} onOpenChange={setIsDeleteModuleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this module?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the module
              "{currentCourse.modules.find(m => m.id === moduleToDelete)?.title}" and all its lessons.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setModuleToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteModuleAction} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              Delete Module
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
