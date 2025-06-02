"use client" // This page needs to be client-side for stateful checkbox and potentially video player interactions

import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getLessonById, getCourseById } from "../../data"; // Adjusted import path
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckSquare, Download, ListChecks, Type, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LessonCompletionCheckbox } from "@/components/classroom/lesson-completion-checkbox";

interface LessonPageParams {
  params: {
    courseId: string;
    lessonId: string;
  };
}

// This state needs to be managed at a higher level or via context/backend for persistence across sessions/views.
// For now, we'll manage checkbox state locally on this page.
// Ideally, onCompletionChange would be passed from the parent `[courseId]/page.tsx`

export default function LessonPage({ params }: LessonPageParams) {
  const { courseId, lessonId } = params;
  const lessonData = getLessonById(courseId, lessonId);
  
  // Local state for completion status, ideally this comes from a global store or parent
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (lessonData) {
      setIsCompleted(lessonData.lesson.isCompleted || false);
      // Simulate loading completion status from a persistent store or parent.
      // In a real app, you might fetch this or receive it via props/context.
      const storedCompletions = localStorage.getItem('lessonCompletions');
      if (storedCompletions) {
        const completions = JSON.parse(storedCompletions);
        if (completions[lessonId] !== undefined) {
          setIsCompleted(completions[lessonId]);
        }
      }
    }
  }, [lessonData, lessonId]);


  if (!lessonData) {
    notFound();
  }

  const { course, module, lesson } = lessonData;

  const handleCompletionChange = (id: string, completed: boolean) => {
    setIsCompleted(completed);
    // Persist to localStorage for simple demo purposes
    const storedCompletions = localStorage.getItem('lessonCompletions');
    const completions = storedCompletions ? JSON.parse(storedCompletions) : {};
    completions[id] = completed;
    localStorage.setItem('lessonCompletions', JSON.stringify(completions));
    
    // Here you would also call an API to update backend if this was a full-stack app
    // e.g., updateLessonCompletion(courseId, lessonId, completed);
    console.log(`Lesson ${id} marked as ${completed ? 'complete' : 'incomplete'}`);
  };

  // Function to get YouTube embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const embedUrl = lesson.videoUrl ? getYouTubeEmbedUrl(lesson.videoUrl) : null;

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="outline" asChild className="mb-6">
        <Link href={`/classroom/${courseId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Course: {course.title}</Link>
      </Button>

      <Card className="shadow-xl">
        <CardHeader className="bg-muted/30 p-6">
          <p className="text-sm text-primary font-medium mb-1">{module.title}</p>
          <CardTitle className="font-headline text-3xl md:text-4xl">{lesson.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {embedUrl && (
            <div className="mb-8 aspect-video rounded-lg overflow-hidden border shadow-md">
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title="YouTube video player"
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
            initialCompleted={isCompleted}
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
                <CardContent className="p-4 text-sm text-muted-foreground whitespace-pre-wrap">
                  {lesson.transcript}
                </CardContent>
              </Card>
            </section>
          )}

          {lesson.files && lesson.files.length > 0 && (
            <section>
              <h3 className="font-headline text-xl mb-3">Worksheets & Files</h3>
              <div className="space-y-2">
                {lesson.files.map((file) => (
                  <Button key={file.id} variant="outline" asChild>
                    <a href={file.url} download={file.name} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> {file.name} ({file.type?.toUpperCase()})
                    </a>
                  </Button>
                ))}
              </div>
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
