
"use client"

import type { Module as ModuleType } from "@/types/classroom";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LessonItem } from "./lesson-item";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit2, FilePlus2, Copy, Trash2, GripVertical } from "lucide-react";
import Link from "next/link";
import React from "react"; 
import { cn } from "@/lib/utils";
import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners';

interface ModuleAccordionProps {
  module: ModuleType;
  courseId: string;
  lessonCompletions: Record<string, boolean>;
  currentLessonId?: string;
  onDeleteModule: (moduleId: string) => void;
  onDuplicateModule: (moduleId: string) => void;
  // DND props
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  setNodeRef?: (node: HTMLElement | null) => void;
  style?: React.CSSProperties;
  isDragging?: boolean;
}

export function ModuleAccordion({
  module,
  courseId,
  lessonCompletions,
  currentLessonId,
  onDeleteModule,
  onDuplicateModule,
  attributes,
  listeners,
  setNodeRef,
  style,
  isDragging,
}: ModuleAccordionProps) {
  const completedLessonsInModule = module.lessons.filter(lesson => lessonCompletions[lesson.id]).length;
  const totalLessonsInModule = module.lessons.length;

  const handleDropdownSelect = (e: Event) => {
    e.stopPropagation(); 
  };

  return (
    <AccordionItem 
      value={module.id} 
      className={cn(
        "border-b-0 bg-card rounded-lg shadow-sm mb-2 relative", 
        isDragging && "opacity-50 shadow-xl" // Removed z-10, style prop from dnd-kit will handle zIndex
      )} 
      ref={setNodeRef} 
      style={style} 
    >
      <div className="flex items-center px-2 hover:bg-muted/50 rounded-t-lg group">
        {/* Drag Handle */}
        <button 
          {...attributes} 
          {...listeners} 
          className="p-2 cursor-grab focus:outline-none focus:ring-2 focus:ring-primary rounded"
          aria-label={`Drag to reorder module ${module.title}`}
          onClick={(e) => e.stopPropagation()} // Prevent accordion toggle
        >
          <GripVertical className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
        </button>
        <AccordionTrigger className="hover:no-underline py-3 flex-1 rounded-md transition-colors">
          <div className="flex flex-col text-left w-full">
              <span className="font-headline text-md">{module.title}</span>
              {module.description && <p className="text-xs text-muted-foreground mt-1">{module.description}</p>}
              <p className="text-xs text-primary mt-1">
                  {completedLessonsInModule} / {totalLessonsInModule} lessons completed
              </p>
          </div>
        </AccordionTrigger>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 ml-2 opacity-0 group-hover:opacity-100 focus:opacity-100"
              onClick={(e) => e.stopPropagation()} // Prevent accordion toggle
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Module Options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()} onFocusOutside={(e) => e.stopPropagation()} onInteractOutside={(e) => e.stopPropagation()}>
            <DropdownMenuItem onSelect={() => alert(`Editing module: ${module.title}. Placeholder action.`)}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Module
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/edit-lesson/new-lesson?courseId=${courseId}&moduleId=${module.id}`}>
                <FilePlus2 className="mr-2 h-4 w-4" />
                Add Lesson to Module
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onDuplicateModule(module.id)}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate Module
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => onDeleteModule(module.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Module
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AccordionContent className="pb-1 pl-0 pr-0">
        <div className="space-y-1 ml-2 py-1 border-t">
          {module.lessons.length > 0 ? (
            module.lessons.map((lesson) => (
              <LessonItem 
                key={lesson.id} 
                lesson={lesson} 
                courseId={courseId}
                isCompleted={!!lessonCompletions[lesson.id]}
                isActive={lesson.id === currentLessonId}
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
