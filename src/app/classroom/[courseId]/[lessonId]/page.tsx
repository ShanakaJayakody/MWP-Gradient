
"use client"

import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getLessonById, getCourseById, deleteCourse, updateCourseModules, deleteModule, duplicateModule } from "../../data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckSquare, Download, ListChecks, Type, Video, BookOpen, MoreVertical, Edit, Trash2, FilePlus2, FolderPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LessonCompletionCheckbox } from "@/components/classroom/lesson-completion-checkbox";
import { Accordion } from "@/components/ui/accordion";
import { ModuleAccordion } from "@/components/classroom/module-accordion";
import { Progress } from "@/components/ui/progress";
import type { Lesson, Course, Module as ModuleType } from "@/types/classroom";
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

export default function LessonPage() {
  const routeParams = useParams();
  const courseId = routeParams.courseId as string;
  const lessonId = routeParams.lessonId as string;
  
  const router = useRouter();
  const { toast } = useToast();
  
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [lessonDetails, setLessonDetails] = useState<{ course: Course; module: ModuleType; lesson: Lesson } | null>(null);
  const [lessonCompletions, setLessonCompletions] = useState<Record<string, boolean>>({});
  const [currentModuleIdOpen, setCurrentModuleIdOpen] = useState<string | undefined>(undefined);
  
  const [isDeleteCourseDialogOpen, setIsDeleteCourseDialogOpen] = useState(false);
  const [isDeleteModuleDialogOpen, setIsDeleteModuleDialogOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);

  useEffect(() => {
    if (!courseId || !lessonId) {
      return;
    }

    const course = getCourseById(courseId);
    const lessonData = getLessonById(courseId, lessonId); 

    if (course) {
      setCourseData(course); 

      const storedCompletionsRaw = localStorage.getItem('lessonCompletions');
      const storedCompletions = storedCompletionsRaw ? JSON.parse(storedCompletionsRaw) : {};
      const initialCompletions: Record<string, boolean> = {};
      let completedCount = 0;

      course.modules.forEach(module => {
        module.lessons.forEach(l => {
          const isCompleted = storedCompletions[l.id] || l.isCompleted || false;
          initialCompletions[l.id] = isCompleted;
          if (isCompleted) completedCount++;
        });
      });
      setLessonCompletions(initialCompletions);
      
      const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
      if (totalLessons > 0) {
        const progress = Math.round((completedCount / totalLessons) * 100);
        setCourseData(prevCourse => prevCourse ? { ...prevCourse, progress } : course);
      }

    } else {
      notFound(); 
    }

    if (lessonData) {
      setLessonDetails(lessonData);
      setCurrentModuleIdOpen(lessonData.module.id); 
      
      setLessonCompletions(prevCompletions => ({
          ...prevCompletions,
          [lessonData.lesson.id]: prevCompletions[lessonData.lesson.id] || lessonData.lesson.isCompleted || false
      }));

    } else {
      if (course) { 
          notFound();
      }
    }
  }, [courseId, lessonId]);

  useEffect(() => {
    if (courseId && lessonId && lessonDetails) { 
      const localStorageKey = `lastViewedLesson_${courseId}`;
      localStorage.setItem(localStorageKey, lessonId);
    }
  }, [courseId, lessonId, lessonDetails]);


  const handleCompletionChange = (id: string, completed: boolean) => {
    setLessonCompletions(prev => {
        const newCompletions = {...prev, [id]: completed};
        localStorage.setItem('lessonCompletions', JSON.stringify(newCompletions));
        
        if (courseData) {
            let completedCount = 0;
            const totalLessons = courseData.modules.reduce((acc, module) => acc + module.lessons.length, 0);
            courseData.modules.forEach(module => {
                module.lessons.forEach(lesson => {
                    if (newCompletions[lesson.id]) completedCount++;
                });
            });
            if (totalLessons > 0) {
                const progress = Math.round((completedCount / totalLessons) * 100);
                setCourseData(prevCourse => prevCourse ? { ...prevCourse, progress } : null);
            }
        }
        return newCompletions;
    });
  };

  const handleDeleteCourseAction = () => {
    if (courseData) {
      const success = deleteCourse(courseData.id);
      if (success) {
        toast({
          title: "Course Deleted",
          description: `"${courseData.title}" has been successfully deleted.`,
        });
        router.push("/classroom");
      } else {
        toast({
          variant: "destructive",
          title: "Error Deleting Course",
          description: `Could not delete "${courseData.title}". Please try again.`,
        });
      }
      setIsDeleteCourseDialogOpen(false);
    }
  };

  const handleAddModuleCallback = (moduleName: string, isPublished: boolean) => {
    if (courseData) {
      const newModule: ModuleType = {
        id: `module-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: moduleName,
        description: isPublished ? "Published module" : "Draft module",
        lessons: [],
      };
      const updatedModules = [...courseData.modules, newModule];
      updateCourseModules(courseData.id, updatedModules);
      setCourseData(getCourseById(courseId));

      toast({
        title: "Module Added",
        description: `"${moduleName}" has been added to ${courseData.title}.`,
      });
    }
    setIsAddModuleDialogOpen(false);
  };

  const handleDeleteModuleAction = () => {
    if (courseData && moduleToDelete) {
      const success = deleteModule(courseData.id, moduleToDelete);
      if (success) {
        toast({
          title: "Module Deleted",
          description: `Module has been successfully deleted.`,
        });
        setCourseData(getCourseById(courseId)); 
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
    if (courseData) {
      const duplicated = duplicateModule(courseData.id, moduleId);
      if (duplicated) {
        toast({
          title: "Module Duplicated",
          description: `Module "${duplicated.title}" has been successfully created.`,
        });
        setCourseData(getCourseById(courseId)); 
      } else {
        toast({
          variant: "destructive",
          title: "Error Duplicating Module",
          description: "Could not duplicate the module. Please try again.",
        });
      }
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  if (!courseData || !lessonDetails) {
    return (
        <div className="container mx-auto py-8 px-4 text-center">
            <p className="text-lg text-muted-foreground">Loading lesson details...</p>
        </div>
    );
  }

  const { course, module, lesson } = lessonDetails;
  const embedUrl = lesson.videoUrl ? getYouTubeEmbedUrl(lesson.videoUrl) : null;

  return (
    <>
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/3 xl:w-1/4 space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto pr-4">
          <Button variant="outline" asChild className="mb-4 w-full justify-start">
            <Link href={`/classroom`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Classroom Overview</Link>
          </Button>
          <div className="p-4 border rounded-lg bg-card shadow">
            <div className="flex justify-between items-center mb-1">
              <h2 className="font-headline text-xl">{course.title}</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Course Options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/edit-course/${course.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit course
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setIsAddModuleDialogOpen(true)} className="cursor-pointer">
                    <FolderPlus className="mr-2 h-4 w-4" />
                    Add Module
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/edit-lesson/new-lesson?courseId=${course.id}&moduleId=${module.id}`}>
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
            </div>
            {courseData.progress !== undefined && (
                <>
                <p className="text-xs text-muted-foreground mb-1">{courseData.progress}% complete</p>
                <Progress value={courseData.progress} className="h-2 mb-3" />
                </>
            )}
          </div>

          <Accordion type="single" collapsible defaultValue={currentModuleIdOpen} className="w-full space-y-1">
            {course.modules.map((mod) => (
              <Card key={mod.id} className="overflow-hidden bg-card">
                <ModuleAccordion 
                    module={mod} 
                    courseId={course.id} 
                    lessonCompletions={lessonCompletions}
                    currentLessonId={lesson.id}
                    onDeleteModule={(moduleId) => {
                      setModuleToDelete(moduleId);
                      setIsDeleteModuleDialogOpen(true);
                    }}
                    onDuplicateModule={handleDuplicateModuleAction}
                />
              </Card>
            ))}
          </Accordion>
        </aside>

        <main className="w-full lg:w-2/3 xl:w-3/4">
          <Card className="shadow-xl">
            <CardHeader className="bg-muted/30 p-6">
              <p className="text-sm text-primary font-medium mb-1">{module.title}</p>
              <div className="flex justify-between items-center">
                <CardTitle className="font-headline text-3xl md:text-4xl">{lesson.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {embedUrl && (
                <div className="mb-8 aspect-video rounded-lg overflow-hidden border shadow-md bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title="Lesson Video Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {lesson.textContent && (
                <section className="mb-8 prose dark:prose-invert max-w-none">
                  <h2 className="font-headline text-2xl mb-3 flex items-center"><Type className="mr-2 h-6 w-6 text-primary" /> Lesson Content</h2>
                  <div dangerouslySetInnerHTML={{ __html: lesson.textContent }} />
                </section>
              )}
              
              <LessonCompletionCheckbox 
                lessonId={lesson.id}
                initialCompleted={lessonCompletions[lesson.id] || false}
                onCompletionChange={handleCompletionChange}
              />
              
              <Separator className="my-8" />

              {lesson.actionItems && lesson.actionItems.length > 0 && (
                <section className="mb-8">
                  <h3 className="font-headline text-xl mb-3 flex items-center"><ListChecks className="mr-2 h-5 w-5 text-primary" /> Action Items</h3>
                  <ul className="list-disc list-inside space-y-2 bg-accent/10 p-4 rounded-md">
                    {lesson.actionItems.map((item, index) => (
                      <li key={index} className="text-foreground">{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {lesson.transcript && (
                <section className="mb-8">
                  <h3 className="font-headline text-xl mb-3">Transcript</h3>
                  <Card className="bg-muted/20">
                    <CardContent className="p-4 text-sm text-muted-foreground whitespace-pre-wrap max-h-60 overflow-y-auto">
                      {lesson.transcript}
                    </CardContent>
                  </Card>
                </section>
              )}

              {lesson.files && lesson.files.length > 0 && (
                <section>
                  <h3 className="font-headline text-xl mb-3">Resources & Downloads</h3>
                  <div className="space-y-2">
                    {lesson.files.map((file) => (
                      <Button key={file.id} variant="outline" asChild className="justify-start w-full sm:w-auto">
                        <a href={file.url} download={file.name} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" /> {file.name} {file.type && `(${file.type.toUpperCase()})`}
                        </a>
                      </Button>
                    ))}
                  </div>
                </section>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>

    <AlertDialog open={isDeleteCourseDialogOpen} onOpenChange={setIsDeleteCourseDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this course?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course
              "{courseData?.title}" and all of its associated modules and lessons.
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
            "{courseData?.modules.find(m => m.id === moduleToDelete)?.title}" and all its lessons.
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

    {courseData && (
      <AddModuleDialog
          open={isAddModuleDialogOpen}
          onOpenChange={setIsAddModuleDialogOpen}
          onAddModule={(moduleName, isPublished) => handleAddModuleCallback(moduleName, isPublished)}
      />
    )}
    </>
  );
}

    