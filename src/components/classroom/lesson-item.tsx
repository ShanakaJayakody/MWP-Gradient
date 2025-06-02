"use client"

import Link from "next/link";
import type { Lesson } from "@/types/classroom";
import { CheckCircle2, Circle, FileText, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonItemProps {
  lesson: Lesson;
  courseId: string;
  isCompleted: boolean;
}

export function LessonItem({ lesson, courseId, isCompleted }: LessonItemProps) {
  return (
    <Link href={`/classroom/${courseId}/${lesson.id}`} className="block group">
      <div className={cn(
        "flex items-center justify-between p-3 rounded-md transition-colors",
        "hover:bg-accent/50",
        isCompleted ? "bg-green-500/10 hover:bg-green-500/20" : "hover:bg-accent/10"
      )}>
        <div className="flex items-center space-x-3">
          {lesson.videoUrl ? <PlayCircle className="h-5 w-5 text-primary" /> : <FileText className="h-5 w-5 text-muted-foreground" />}
          <span className={cn("text-sm", isCompleted && "line-through text-muted-foreground")}>{lesson.title}</span>
        </div>
        {isCompleted ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Circle className="h-5 w-5 text-border group-hover:text-primary transition-colors" />
        )}
      </div>
    </Link>
  );
}
