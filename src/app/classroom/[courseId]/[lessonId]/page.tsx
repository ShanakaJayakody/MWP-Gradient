"use client"

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ArrowLeft, Edit, FolderPlus, FilePlus2, Trash2, MoreVertical, Type, ListChecks, CheckSquare, BookOpen, Download } from "lucide-react";
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
import { VideoPlayer } from "@/components/classroom/video-player";
import { Separator } from "@/components/ui/separator";
import { Accordion } from "@/components/ui/accordion";
import { ModuleAccordion } from "@/components/classroom/module-accordion";
import { LessonCompletionCheckbox } from "@/components/classroom/lesson-completion-checkbox";
import type { Course, Module, Lesson, FileInfo } from "@/types/classroom";
import { getCourseById, deleteCourse, updateCourseModules, getLessonById } from "../../data";
import { EditableLessonSection } from "@/components/classroom/editable-lesson-section";
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

export default function LessonPage() {
  const routeParams = useParams();
  const courseId = routeParams.courseId as string;
  const lessonId = routeParams.lessonId as string;
  
  const router = useRouter();
  const { toast } = useToast();
  
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [lessonDetails, setLessonDetails] = useState<{ course: Course; module: Module; lesson: Lesson } | null>(null);
  const [lessonCompletions, setLessonCompletions] = useState<Record<string, boolean>>({});
  const [currentModuleIdOpen, setCurrentModuleIdOpen] = useState<string | undefined>(undefined);
  const [isDeleteCourseDialogOpen, setIsDeleteCourseDialogOpen] = useState(false);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // TODO: Replace with actual admin check

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      const newModule: Module = {
        id: `module-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: moduleName,
        description: isPublished ? "Published module" : "Draft module",
        lessons: [],
        position: courseData.modules.length + 1,
        isPublished
      };
      const updatedModules = [...courseData.modules, newModule];
      updateCourseModules(courseData.id, updatedModules);
      const updatedCourse = getCourseById(courseId);
      setCourseData(updatedCourse || null);
      toast({
        title: "Module Added",
        description: `"${moduleName}" has been added to ${courseData.title}.`,
      });
    }
    setIsAddModuleDialogOpen(false);
  };

  const handleVideoTimeUpdate = (time: number) => {
    if (lessonDetails) {
      const { lesson } = lessonDetails;
      lesson.lastPosition = time;
      // Save to local storage
      const key = `videoProgress_${lesson.id}`;
      localStorage.setItem(key, time.toString());
    }
  };

  const handleVideoSave = (newVideoUrl: string) => {
    if (lessonDetails) {
      const updatedLesson = { ...lessonDetails.lesson, videoUrl: newVideoUrl };
      setLessonDetails({ ...lessonDetails, lesson: updatedLesson });
      // TODO: Add API call to save changes
      toast({
        title: "Changes Saved",
        description: "Video URL has been updated successfully.",
      });
    }
  };

  const handleContentSave = (newContent: string) => {
    if (lessonDetails) {
      const updatedLesson = { ...lessonDetails.lesson, textContent: newContent };
      setLessonDetails({ ...lessonDetails, lesson: updatedLesson });
      // TODO: Add API call to save changes
      toast({
        title: "Changes Saved",
        description: "Lesson content has been updated successfully.",
      });
    }
  };

  const handleActionItemsSave = (newActionItems: string[]) => {
    if (lessonDetails) {
      const updatedLesson = { ...lessonDetails.lesson, actionItems: newActionItems };
      setLessonDetails({ ...lessonDetails, lesson: updatedLesson });
      // TODO: Add API call to save changes
      toast({
        title: "Changes Saved",
        description: "Action items have been updated successfully.",
      });
    }
  };

  const handleFilesSave = (newFiles: FileInfo[]) => {
    if (lessonDetails) {
      const updatedLesson = { ...lessonDetails.lesson, files: newFiles };
      setLessonDetails({ ...lessonDetails, lesson: updatedLesson });
      // TODO: Add API call to save changes
      toast({
        title: "Changes Saved",
        description: "Resource files have been updated successfully.",
      });
    }
  };

  const handleModuleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (courseData && active.id !== over?.id && over) {
      const oldIndex = courseData.modules.findIndex((m) => m.id === active.id);
      const newIndex = courseData.modules.findIndex((m) => m.id === over.id);
      
      const reorderedModules = arrayMove(courseData.modules, oldIndex, newIndex);
      updateCourseModules(courseData.id, reorderedModules);
      setCourseData(prevCourse => prevCourse ? { ...prevCourse, modules: reorderedModules } : null);
      
      toast({
        title: "Module Order Updated",
        description: "The module order has been successfully updated.",
      });
    }
  };

  const handleLessonReorder = (moduleId: string, oldIndex: number, newIndex: number) => {
    if (courseData) {
      const updatedModules = courseData.modules.map(mod => {
        if (mod.id === moduleId) {
          const reorderedLessons = arrayMove(mod.lessons, oldIndex, newIndex);
          return { ...mod, lessons: reorderedLessons };
        }
        return mod;
      });

      updateCourseModules(courseData.id, updatedModules);
      setCourseData(prevCourse => prevCourse ? { ...prevCourse, modules: updatedModules } : null);
      
      toast({
        title: "Lesson Order Updated",
        description: "The lesson order has been successfully updated.",
      });
    }
  };

  if (!courseData || !lessonDetails) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-lg text-muted-foreground">Loading lesson details...</p>
      </div>
    );
  }

  const { course, module, lesson } = lessonDetails;

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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleModuleDragEnd}
              >
                <SortableContext
                  items={course.modules.map(m => m.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {course.modules.map((mod, index) => (
                    <Card key={mod.id} className="overflow-hidden bg-card">
                      <ModuleAccordion
                        module={mod}
                        courseId={course.id}
                        lessonCompletions={lessonCompletions}
                        currentLessonId={lesson.id}
                        isAdmin={isAdmin}
                        onLessonReorder={handleLessonReorder}
                        moduleIndex={index}
                      />
                    </Card>
                  ))}
                </SortableContext>
              </DndContext>
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
                {isAdmin && (
                  <div className="mb-8">
                    <EditableLessonSection
                      title="Video"
                      type="video"
                      value={lesson.videoUrl || ""}
                      onSave={handleVideoSave}
                    />
                  </div>
                )}
                
                {lesson.videoUrl && (
                  <div className="mb-8">
                    <VideoPlayer lesson={lesson} onTimeUpdate={handleVideoTimeUpdate} />
                  </div>
                )}

                {isAdmin && (
                  <div className="mb-8">
                    <EditableLessonSection
                      title="Content"
                      type="content"
                      value={lesson.textContent || ""}
                      onSave={handleContentSave}
                    />
                  </div>
                )}

                {lesson.textContent && (
                  <section className="mb-8 prose dark:prose-invert max-w-none">
                    <h2 className="font-headline text-2xl mb-3 flex items-center">
                      <Type className="mr-2 h-6 w-6 text-primary" /> Lesson Content
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: lesson.textContent }} />
                  </section>
                )}

                {isAdmin && (
                  <div className="mb-8">
                    <EditableLessonSection
                      title="Action Items"
                      type="actionItems"
                      value={lesson.actionItems || []}
                      onSave={handleActionItemsSave}
                    />
                  </div>
                )}

                {lesson.actionItems && lesson.actionItems.length > 0 && (
                  <section className="mb-8">
                    <h2 className="font-headline text-2xl mb-3 flex items-center">
                      <ListChecks className="mr-2 h-6 w-6 text-primary" /> Action Items
                    </h2>
                    <ul className="space-y-2">
                      {lesson.actionItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckSquare className="h-5 w-5 mt-0.5 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {isAdmin && (
                  <div className="mb-8">
                    <EditableLessonSection
                      title="Resources"
                      type="files"
                      value={lesson.files || []}
                      onSave={handleFilesSave}
                    />
                  </div>
                )}

                {lesson.files && lesson.files.length > 0 && (
                  <section className="mb-8">
                    <h2 className="font-headline text-2xl mb-3 flex items-center">
                      <BookOpen className="mr-2 h-6 w-6 text-primary" /> Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lesson.files.map((file) => (
                        <a
                          key={file.id}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                        >
                          <Download className="h-5 w-5 text-primary" />
                          <span>{file.name}</span>
                        </a>
                      ))}
                    </div>
                  </section>
                )}
                
                <LessonCompletionCheckbox 
                  lessonId={lesson.id}
                  initialCompleted={lessonCompletions[lesson.id] || false}
                  onCompletionChange={handleCompletionChange}
                />
                
                <Separator className="my-8" />

                <div className="flex justify-between items-center">
                  <Button variant="outline" asChild>
                    <Link href={`/classroom/${course.id}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course Overview
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/admin/edit-lesson/${course.id}/${lesson.id}`}>
                      <Edit className="mr-2 h-4 w-4" /> Edit Lesson
                    </Link>
                  </Button>
                </div>
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

    