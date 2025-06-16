"use client"

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ArrowLeft, Edit, FolderPlus, FilePlus2, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { AddModuleDialog } from "@/components/classroom/add-module-dialog";
import { CourseAnalytics } from "@/components/classroom/course-analytics";
import type { Course } from "@/types/classroom";
import { getCourseById, deleteCourse, updateCourseModules } from "../data";
import { Accordion } from "@/components/ui/accordion";
import { ModuleAccordion } from "@/components/classroom/module-accordion";
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
} from '@dnd-kit/sortable';

interface CourseClientPageProps {
  courseId: string;
}

function CourseClientPage({ courseId }: CourseClientPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [currentCourse, setCurrentCourse] = useState<Course | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteCourseDialogOpen, setIsDeleteCourseDialogOpen] = useState(false);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchedCourse = getCourseById(courseId);
    setCurrentCourse(fetchedCourse || undefined);
    setIsLoading(false);

    if (fetchedCourse) {
      const localStorageKey = `lastViewedLesson_${courseId}`;
      const lastViewedLessonId = localStorage.getItem(localStorageKey);

      if (lastViewedLessonId) {
        const lessonExists = fetchedCourse.modules.some(m => m.lessons.some(l => l.id === lastViewedLessonId));
        if (lessonExists) {
          router.replace(`/classroom/${courseId}/${lastViewedLessonId}`);
          return;
        } else {
          localStorage.removeItem(localStorageKey);
        }
      }
      
      if (fetchedCourse.modules?.[0]?.lessons?.[0]?.id) {
        const firstLessonId = fetchedCourse.modules[0].lessons[0].id;
        router.replace(`/classroom/${courseId}/${firstLessonId}`);
        return;
      }
    }
  }, [courseId, router]);

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
      const newModule = {
        id: `module-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: moduleName,
        description: isPublished ? "Published module" : "Draft module",
        lessons: [],
        position: currentCourse.modules.length + 1,
        isPublished
      };
      const updatedModules = [...currentCourse.modules, newModule];
      updateCourseModules(currentCourse.id, updatedModules);
      const updatedCourse = getCourseById(courseId);
      setCurrentCourse(updatedCourse || undefined);
      toast({
        title: "Module Added",
        description: `"${moduleName}" has been added to ${currentCourse.title}.`,
      });
    }
    setIsAddModuleDialogOpen(false);
  };

  const handleModuleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (currentCourse && active.id !== over?.id && over) {
      const oldIndex = currentCourse.modules.findIndex((m) => m.id === active.id);
      const newIndex = currentCourse.modules.findIndex((m) => m.id === over.id);
      
      const reorderedModules = arrayMove(currentCourse.modules, oldIndex, newIndex);
      
      setCurrentCourse(prevCourse => prevCourse ? { ...prevCourse, modules: reorderedModules } : undefined);
      updateCourseModules(courseId, reorderedModules);
      
      toast({ title: "Module Reordered", description: "The module order has been updated." });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>Loading course details...</p>
      </div>
    );
  }

  if (!currentCourse) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 gap-8">
        <Card className="shadow-xl">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Course Details</h3>
                <div className="space-y-2">
                  {currentCourse.instructor && (
                    <p className="text-sm">
                      <span className="font-medium">Instructor:</span> {currentCourse.instructor}
                    </p>
                  )}
                  {currentCourse.duration && (
                    <p className="text-sm">
                      <span className="font-medium">Duration:</span> {currentCourse.duration}
                    </p>
                  )}
                  {currentCourse.accessLevel && (
                    <p className="text-sm">
                      <span className="font-medium">Access Level:</span> {currentCourse.accessLevel}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Progress value={currentCourse.progress || 0} className="flex-1" />
                    <span className="text-sm font-medium">{currentCourse.progress || 0}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentCourse.progress === 100 
                      ? "Course completed! 🎉" 
                      : "Keep going! You're making progress."}
                  </p>
                </div>
              </div>
            </div>

            <CourseAnalytics courseId={currentCourse.id} />

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Course Modules</h3>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleModuleDragEnd}
              >
                <SortableContext
                  items={currentCourse.modules.map(m => m.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {currentCourse.modules.map((module) => (
                      <ModuleAccordion
                        key={module.id}
                        module={module}
                        courseId={currentCourse.id}
                      />
                    ))}
                  </Accordion>
                </SortableContext>
              </DndContext>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddModuleDialog
        open={isAddModuleDialogOpen}
        onOpenChange={setIsAddModuleDialogOpen}
        onAddModule={(moduleName, isPublished) => handleAddModuleCallback(moduleName, isPublished)}
      />
    </div>
  );
}

export default function CoursePage({ params }: CoursePageProps) {
  return <CourseClientPage courseId={params.courseId} />;
}

