
"use client"

import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getLessonById, getCourseById } from "../../data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckSquare, Download, ListChecks, Type, Video, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LessonCompletionCheckbox } from "@/components/classroom/lesson-completion-checkbox";
import { Accordion } from "@/components/ui/accordion";
import { ModuleAccordion } from "@/components/classroom/module-accordion";
import { Progress } from "@/components/ui/progress";
import type { Lesson, Course, Module as ModuleType } from "@/types/classroom"; // Ensure ModuleType is imported if named Module locally

interface LessonPageParams {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: LessonPageParams) {
  const { courseId, lessonId } = params;
  
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [lessonData, setLessonData] = useState<{ course: Course; module: ModuleType; lesson: Lesson } | null>(null);
  const [lessonCompletions, setLessonCompletions] = useState<Record<string, boolean>>({});
  const [currentModuleIdOpen, setCurrentModuleIdOpen] = useState<string | undefined>(undefined);

  useEffect(() => {
    const course = getCourseById(courseId);
    const lessonDetails = getLessonById(courseId, lessonId);

    if (course) {
      setCourseData(course);
      const initialCompletions: Record<string, boolean> = {};
      let completedCount = 0;
      course.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          const storedCompletions = localStorage.getItem('lessonCompletions');
          const completions = storedCompletions ? JSON.parse(storedCompletions) : {};
          const isCompleted = completions[lesson.id] || lesson.isCompleted || false;
          initialCompletions[lesson.id] = isCompleted;
          if (isCompleted) completedCount++;
        });
      });
      setLessonCompletions(initialCompletions);
      
      // Update course progress (visual only for now)
      const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
      if (totalLessons > 0) {
        const progress = Math.round((completedCount / totalLessons) * 100);
        // This updates the visual progress on the client side for the current course object
        // In a real app, progress would be managed more robustly
        setCourseData(prevCourse => prevCourse ? { ...prevCourse, progress } : null);
      }

    } else {
      notFound(); // Course not found
    }

    if (lessonDetails) {
      setLessonData(lessonDetails);
      setCurrentModuleIdOpen(lessonDetails.module.id); // Open the current lesson's module by default
      // Persist completion for current lesson if needed from lessonDetails
      if (lessonCompletions[lessonDetails.lesson.id] === undefined) {
        setLessonCompletions(prev => ({...prev, [lessonDetails.lesson.id]: lessonDetails.lesson.isCompleted || false}));
      }
    } else {
      notFound(); // Lesson not found
    }
  }, [courseId, lessonId]);


  const handleCompletionChange = (id: string, completed: boolean) => {
    setLessonCompletions(prev => {
        const newCompletions = {...prev, [id]: completed};
        // Update localStorage
        localStorage.setItem('lessonCompletions', JSON.stringify(newCompletions));
        
        // Recalculate progress for the course
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
    console.log(`Lesson ${id} marked as ${completed ? 'complete' : 'incomplete'}`);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  if (!courseData || !lessonData) {
    // Could show a loading spinner here
    return (
        <div className="container mx-auto py-8 px-4 text-center">
            <p>Loading lesson...</p>
        </div>
    );
  }

  const { course, module, lesson } = lessonData;
  const embedUrl = lesson.videoUrl ? getYouTubeEmbedUrl(lesson.videoUrl) : null;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-1/3 xl:w-1/4 space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto pr-4">
          <Button variant="outline" asChild className="mb-4 w-full justify-start">
            <Link href={`/classroom/${courseId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Course Overview</Link>
          </Button>
          <div className="p-4 border rounded-lg bg-card shadow">
            <h2 className="font-headline text-xl mb-1">{course.title}</h2>
            {course.progress !== undefined && (
                <>
                <p className="text-xs text-muted-foreground mb-1">{course.progress}% complete</p>
                <Progress value={course.progress} className="h-2 mb-3" />
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
                />
              </Card>
            ))}
          </Accordion>
        </aside>

        {/* Right Content Area */}
        <main className="w-full lg:w-2/3 xl:w-3/4">
          <Card className="shadow-xl">
            <CardHeader className="bg-muted/30 p-6">
              <p className="text-sm text-primary font-medium mb-1">{module.title}</p>
              <div className="flex justify-between items-center">
                <CardTitle className="font-headline text-3xl md:text-4xl">{lesson.title}</CardTitle>
                {/* Placeholder for Admin Edit Link */}
                {/* <Button variant="outline" size="icon" asChild title="Edit Lesson (Admin)">
                  <Link href={`/admin/edit-lesson/${lesson.id}?courseId=${courseId}&moduleId=${module.id}`}>
                    <Edit3 className="h-5 w-5" />
                  </Link>
                </Button> */}
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
  );
}
