
"use client"

import type { Module as ModuleType } from "@/types/classroom";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Accordion itself is rendered by parent
import { LessonItem } from "./lesson-item";

interface ModuleAccordionProps {
  module: ModuleType;
  courseId: string;
  lessonCompletions: Record<string, boolean>;
  currentLessonId?: string; // New prop
}

export function ModuleAccordion({ module, courseId, lessonCompletions, currentLessonId }: ModuleAccordionProps) {
  const completedLessonsInModule = module.lessons.filter(lesson => lessonCompletions[lesson.id]).length;
  const totalLessonsInModule = module.lessons.length;

  return (
    <AccordionItem value={module.id} className="border-b-0">
      <AccordionTrigger className="hover:no-underline py-3 px-2 rounded-md hover:bg-muted/50 transition-colors">
        <div className="flex flex-col text-left w-full">
            <span className="font-headline text-md">{module.title}</span>
            {module.description && <p className="text-xs text-muted-foreground mt-1">{module.description}</p>}
            <p className="text-xs text-primary mt-1">
                {completedLessonsInModule} / {totalLessonsInModule} lessons completed
            </p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-1 pl-0 pr-0"> {/* Adjusted padding */}
        <div className="space-y-1 ml-2 py-1"> {/* Removed border, slight indent for lesson items */}
          {module.lessons.length > 0 ? (
            module.lessons.map((lesson) => (
              <LessonItem 
                key={lesson.id} 
                lesson={lesson} 
                courseId={courseId}
                isCompleted={!!lessonCompletions[lesson.id]}
                isActive={lesson.id === currentLessonId} // Pass isActive prop
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
