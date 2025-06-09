
"use client"

import Link from "next/link";
import type { Lesson } from "@/types/classroom";
import { CheckCircle2, Circle, FileText, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonItemProps {
  lesson: Lesson;
  courseId: string;
  isCompleted: boolean;
  isActive?: boolean; // New prop
}

export function LessonItem({ lesson, courseId, isCompleted, isActive }: LessonItemProps) {
  return (
    <Link href={`/classroom/${courseId}/${lesson.id}`} className="block group">
      <div className={cn(
        "flex items-center justify-between p-3 rounded-md transition-colors",
        "hover:bg-accent/20", // Subtle hover for all
        isActive ? "bg-primary/30 text-primary-foreground" : (isCompleted ? "bg-green-500/10 hover:bg-green-500/20" : "hover:bg-accent/10"),
      )}>
        <div className="flex items-center space-x-3">
          {lesson.videoUrl ? <PlayCircle className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-primary")} /> : <FileText className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />}
          <span className={cn(
            "text-sm", 
            isActive ? "font-semibold text-primary-foreground" : (isCompleted && !isActive ? "line-through text-muted-foreground" : "text-foreground")
          )}>
            {lesson.title}
          </span>
        </div>
        {isCompleted && !isActive ? ( // Don't show check if active, as active state is more prominent
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : !isActive ? (
          <Circle className="h-5 w-5 text-border group-hover:text-primary transition-colors" />
        ) : null /* No icon if active, background indicates state */}
      </div>
    </Link>
  );
}
