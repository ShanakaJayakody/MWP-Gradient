
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit3, Trash2, ListTree, FilePlus2 } from "lucide-react";
import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
// import { getCourseById, updateCourseModules } from "@/app/classroom/data"; // Conceptual

// This is a conceptual placeholder for an admin feature.
// It would fetch existing course data, allow adding/editing/deleting modules,
// and then link to adding/editing lessons within those modules.

interface Module {
  id: string;
  title: string;
  description?: string;
  // lessons would be managed on a separate page or inline editor
}

export default function EditCoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [courseTitle, setCourseTitle] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const [newModuleTitle, setNewModuleTitle] = useState("");

  useEffect(() => {
    if (courseId) {
      // In a real app, fetch course data including its modules
      // const fetchedCourse = getCourseById(courseId);
      console.log(`Fetching data for course ID: ${courseId}`);
      // if (fetchedCourse) {
      //   setCourseTitle(fetchedCourse.title);
      //   setModules(fetchedCourse.modules.map(m => ({ id: m.id, title: m.title, description: m.description })));
      // } else {
      //   // notFound(); or show error
      // }
      setCourseTitle(`Editing Course: ${courseId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`); // Placeholder
      // Simulate fetching some modules
      setModules([
        { id: "module-1-placeholder", title: "Sample Module 1: Introduction" },
        { id: "module-2-placeholder", title: "Sample Module 2: Core Concepts" },
      ]);
    }
  }, [courseId]);

  if (!courseId) {
    notFound();
  }

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;
    const newModule: Module = {
      id: `module-${Date.now()}`, // Simple unique ID for demo
      title: newModuleTitle,
    };
    setModules([...modules, newModule]);
    setNewModuleTitle("");
    console.log("Adding new module:", newModule, "to course:", courseId);
    alert("Module added (placeholder). In a real app, this would be saved to the backend.");
  };

  const handleDeleteModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
    console.log("Deleting module:", moduleId, "from course:", courseId);
    alert("Module deleted (placeholder).");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold mb-3">{courseTitle || "Loading course..."}</h1>
        <p className="text-lg text-muted-foreground">
          Manage modules and lessons for this course.
        </p>
      </header>

      <Card className="max-w-3xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Modules</CardTitle>
          <CardDescription>Add, edit, or remove modules for this course. Click on a module to manage its lessons.</CardDescription>
        </CardHeader>
        <CardContent>
          {modules.length > 0 ? (
            <ul className="space-y-4">
              {modules.map((module) => (
                <li key={module.id} className="p-4 border rounded-md flex justify-between items-center bg-muted/30">
                  <div>
                    <h3 className="font-semibold text-lg">{module.title}</h3>
                    {module.description && <p className="text-sm text-muted-foreground">{module.description}</p>}
                  </div>
                  <div className="space-x-2">
                     {/* In a real app, these would link to pages to edit module details or manage lessons */}
                    <Button variant="outline" size="sm" asChild>
                        {/* For now, let's assume lesson editing is via a generic lesson editor page */}
                        {/* This would ideally link to a page filtered by this module or allow adding lessons to this module. */}
                        {/* For simplicity, we can link to a generic "create lesson" or "edit lesson" page with courseId context. */}
                        <Link href={`/admin/edit-lesson/new-lesson-for-${module.id}`}> {/* Conceptual link */}
                            <FilePlus2 className="mr-1 h-4 w-4" /> Manage Lessons
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => alert(`Editing module '${module.title}' (placeholder)`)}>
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteModule(module.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No modules yet. Add one below.</p>
          )}
        
          <form onSubmit={handleAddModule} className="mt-6 space-y-3 border-t pt-6">
            <Label htmlFor="newModuleTitle" className="font-headline text-lg">Add New Module</Label>
            <Input 
              id="newModuleTitle" 
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              placeholder="e.g., Advanced Strategies" 
              required 
            />
            <Button type="submit">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Module
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="outline" asChild>
            <Link href="/classroom">
                <ListTree className="mr-2 h-4 w-4" /> View All Courses (Admin View Placeholder)
            </Link>
        </Button>
      </div>
    </div>
  );
}
