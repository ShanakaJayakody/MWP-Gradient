
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addCourse } from "@/app/classroom/data";
import type { Course } from "@/types/classroom";

export default function CreateCoursePage() {
  const router = useRouter();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourseId = courseTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''); // simple ID generation
    
    const newCourse: Course = {
      id: newCourseId,
      title: courseTitle,
      description: courseDescription,
      imageUrl: imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(courseTitle)}`,
      instructor: instructor || undefined,
      duration: duration || undefined,
      modules: [], // New courses start with no modules
      progress: 0, // New courses start with 0 progress
    };

    addCourse(newCourse);
    console.log("New course added to mock data:", newCourse);
    router.push(`/admin/edit-course/${newCourseId}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold mb-3">Create New Course (Admin)</h1>
        <p className="text-lg text-muted-foreground">
          Add a new course to the MedWithPurpose platform. Modules and lessons can be added after creation.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Course Details</CardTitle>
          <CardDescription>Fill in the initial information for the new course. You will be redirected to edit the course and add modules/lessons afterwards.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="courseTitle" className="font-headline">Course Title</Label>
              <Input 
                id="courseTitle" 
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="e.g., UCAT Decision Making Advanced" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseDescription" className="font-headline">Course Description</Label>
              <Textarea 
                id="courseDescription" 
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="A brief summary of what the course covers..."
                rows={4}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="font-headline">Image URL (Optional)</Label>
              <Input 
                id="imageUrl" 
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://placehold.co/600x400.png" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructor" className="font-headline">Instructor (Optional)</Label>
              <Input 
                id="instructor" 
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="e.g., Dr. Jane Doe" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="font-headline">Course Duration (Optional)</Label>
              <Input 
                id="duration" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 10 hours" 
              />
            </div>

            <p className="text-sm text-muted-foreground">
              After creating the course, you will be redirected to the "Edit Course" page to add modules and lessons.
            </p>

            <Button type="submit" className="w-full">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Course & Proceed to Edit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
