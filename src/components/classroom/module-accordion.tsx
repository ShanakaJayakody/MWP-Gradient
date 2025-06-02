"use client"

import type { Module as ModuleType, Lesson } from "@/types/classroom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LessonItem } from "./lesson-item";

interface ModuleAccordionProps {
  module: ModuleType;
  courseId: string;
  lessonCompletions: Record<string, boolean>;
}

export function ModuleAccordion({ module, courseId, lessonCompletions }: ModuleAccordionProps) {
  const completedLessonsInModule = module.lessons.filter(lesson => lessonCompletions[lesson.id]).length;
  const totalLessonsInModule = module.lessons.length;

  return (
    <AccordionItem value={module.id} className="border-b">
      <AccordionTrigger className="hover:no-underline py-4 px-2">
        <div className="flex flex-col text-left">
            <span className="font-headline text-lg">{module.title}</span>
            {module.description && <p className="text-sm text-muted-foreground mt-1">{module.description}</p>}
            <p className="text-xs text-primary mt-1">
                {completedLessonsInModule} / {totalLessonsInModule} lessons completed
            </p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-1">
        <div className="space-y-1 pl-4 pr-2 py-2 border-l-2 border-primary/20 ml-2">
          {module.lessons.length > 0 ? (
            module.lessons.map((lesson) => (
              <LessonItem 
                key={lesson.id} 
                lesson={lesson} 
                courseId={courseId}
                isCompleted={!!lessonCompletions[lesson.id]}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground p-3">No lessons in this module yet.</p>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
