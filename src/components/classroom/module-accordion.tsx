"use client"

import type { Module as ModuleType, Lesson } from "@/types/classroom";
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

interface ModuleAccordionProps {
  module: ModuleType;
  courseId: string;
  lessonCompletions?: Record<string, boolean>;
  currentLessonId?: string;
  isAdmin?: boolean;
  onModuleReorder?: (oldIndex: number, newIndex: number) => void;
  onLessonReorder?: (moduleId: string, oldIndex: number, newIndex: number) => void;
  moduleIndex?: number;
}

export function ModuleAccordion({
  module,
  courseId,
  lessonCompletions = {},
  currentLessonId,
  isAdmin = false,
  onModuleReorder,
  onLessonReorder,
  moduleIndex,
}: ModuleAccordionProps) {
  const completedLessonsInModule = module.lessons.filter(lesson => lessonCompletions[lesson.id]).length;
  const totalLessonsInModule = module.lessons.length;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: module.id,
    disabled: !isAdmin,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleLessonDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = module.lessons.findIndex((l) => l.id === active.id);
      const newIndex = module.lessons.findIndex((l) => l.id === over.id);
      
      if (onLessonReorder) {
        onLessonReorder(module.id, oldIndex, newIndex);
      }
    }
  };

  return (
    <AccordionItem 
      value={module.id} 
      className={cn(
        "border-b-0 bg-card rounded-lg shadow-sm mb-2 relative",
        isDragging && "opacity-50 shadow-xl",
        isAdmin && "cursor-grab active:cursor-grabbing"
      )}
      ref={setNodeRef}
      style={style}
    >
      <div className="flex items-center px-2 hover:bg-muted/50 rounded-t-lg group">
        {isAdmin && (
          <div
            {...attributes}
            {...listeners}
            className="p-2 cursor-grab focus:outline-none focus:ring-2 focus:ring-primary rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
          </div>
        )}
        <AccordionTrigger className="hover:no-underline py-3 flex-1">
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
            <DropdownMenuItem onSelect={() => alert(`Duplicating module: ${module.title}. Placeholder action.`)}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate Module
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => alert(`Deleting module: ${module.title}. Placeholder action.`)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Module
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AccordionContent className="pb-1 pl-0 pr-0">
        <div className="space-y-1 ml-2 py-1 border-t">
          {module.lessons.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleLessonDragEnd}
            >
              <SortableContext
                items={module.lessons.map(l => l.id)}
                strategy={verticalListSortingStrategy}
              >
                {module.lessons.map((lesson) => (
                  <SortableLesson
                    key={lesson.id}
                    lesson={lesson}
                    courseId={courseId}
                    isCompleted={!!lessonCompletions[lesson.id]}
                    isActive={lesson.id === currentLessonId}
                    isAdmin={isAdmin}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            <p className="text-sm text-muted-foreground p-3">No lessons in this module yet.</p>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// Create a new SortableLesson component that wraps the existing LessonItem
function SortableLesson({ lesson, courseId, isCompleted, isActive, isAdmin }: {
  lesson: Lesson;
  courseId: string;
  isCompleted: boolean;
  isActive?: boolean;
  isAdmin?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lesson.id,
    disabled: !isAdmin,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(isDragging && "opacity-50 shadow-xl")}
    >
      <div className="flex items-center">
        {isAdmin && (
          <div
            {...listeners}
            className="p-2 cursor-grab focus:outline-none focus:ring-2 focus:ring-primary rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </div>
        )}
        <div className="flex-1">
          <LessonItem
            lesson={lesson}
            courseId={courseId}
            isCompleted={isCompleted}
            isActive={isActive}
          />
        </div>
      </div>
    </div>
  );
}
