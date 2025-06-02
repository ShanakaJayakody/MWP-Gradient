"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface LessonCompletionCheckboxProps {
  lessonId: string;
  initialCompleted?: boolean;
  onCompletionChange: (lessonId: string, completed: boolean) => void;
}

export function LessonCompletionCheckbox({
  lessonId,
  initialCompleted = false,
  onCompletionChange,
}: LessonCompletionCheckboxProps) {
  const [isChecked, setIsChecked] = useState(initialCompleted);

  useEffect(() => {
    setIsChecked(initialCompleted);
  }, [initialCompleted]);

  const handleChange = (checked: boolean | "indeterminate") => {
    if (typeof checked === "boolean") {
      setIsChecked(checked);
      onCompletionChange(lessonId, checked);
    }
  };

  return (
    <div className="flex items-center space-x-2 my-4 p-4 border rounded-md bg-background">
      <Checkbox
        id={`completion-${lessonId}`}
        checked={isChecked}
        onCheckedChange={handleChange}
        aria-label={isChecked ? "Mark lesson as incomplete" : "Mark lesson as complete"}
      />
      <Label htmlFor={`completion-${lessonId}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
        {isChecked ? "Lesson Completed! Well Done!" : "Mark as Complete"}
      </Label>
    </div>
  );
}
