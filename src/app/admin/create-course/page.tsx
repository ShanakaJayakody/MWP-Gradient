
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function CreateCoursePage() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    const newCourseId = courseTitle.toLowerCase().replace(/\s+/g, '-'); // simple ID generation
    console.log("Submitting new course:", { courseId: newCourseId, courseTitle, courseDescription, imageUrl, instructor, duration });
    alert("Course creation functionality is a placeholder. Check console for data. You would then be redirected to edit this course to add modules and lessons.");
    // Reset form or redirect to the new edit course page e.g. /admin/edit-course/${newCourseId}
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
          <CardDescription>Fill in the initial information for the new course. You can add modules and lessons in the next step by editing the course.</CardDescription>
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
              After creating the course, you will be able to add modules and lessons.
              For this prototype, you would typically navigate to an "Edit Course" page.
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
