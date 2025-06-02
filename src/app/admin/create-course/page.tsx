"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

// This is a conceptual placeholder for an admin feature.
// In a real application, this would involve authentication, authorization,
// and interaction with a backend API to save the course data.

export default function CreateCoursePage() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Submitting new course:", { courseTitle, courseDescription, imageUrl });
    alert("Course creation functionality is a placeholder. Check console for data.");
    // Reset form or redirect
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold mb-3">Create New Course (Admin)</h1>
        <p className="text-lg text-muted-foreground">
          Add a new course to the UPrep platform.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Course Details</CardTitle>
          <CardDescription>Fill in the information for the new course.</CardDescription>
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

            {/* In a real system, you'd add sections for Modules and Lessons here,
                or save the course and then edit it to add modules/lessons. */}
            <p className="text-sm text-muted-foreground">
              Further details like modules and lessons can be added after initial course creation.
            </p>

            <Button type="submit" className="w-full">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Course
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
