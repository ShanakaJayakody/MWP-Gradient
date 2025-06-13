
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea"; // Textarea not used here for module details currently
import { PlusCircle, Edit3, Trash2, ListTree, FilePlus2 } from "lucide-react";
import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { getCourseById, updateCourseModules } from "@/app/classroom/data"; 
import type { Course, Module } from "@/types/classroom"; // Ensure Module type is correctly imported or defined

// Re-defining Module type locally if it's not directly from types/classroom or needs specific fields for this page
interface EditableModule {
  id: string;
  title: string;
  description?: string;
}

export default function EditCoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<EditableModule[]>([]);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      setIsLoading(true);
      const fetchedCourse = getCourseById(courseId);
      if (fetchedCourse) {
        setCourse(fetchedCourse);
        setModules(fetchedCourse.modules.map(m => ({ id: m.id, title: m.title, description: m.description })));
      } else {
        // If course is not found (e.g. after a refresh and mock data is reset, or invalid ID)
        // For a newly created course, it should be found in mockCourses.
        // If it's truly not found for other reasons, call notFound().
        // However, for this prototype, we'll show a generic title if it's not found after creation.
        console.warn(`Course with ID ${courseId} not found. This might happen if mock data was reset.`);
        // To prevent app crash on direct navigation/refresh if data isn't persisted beyond session:
        // setCourse(null); // Or handle as "not found"
        // For now, let's allow a generic title to appear for robustness in dev
      }
      setIsLoading(false);
    }
  }, [courseId]);

  if (!courseId) {
    // This case should ideally not be hit if routing is set up,
    // but as a fallback, or if courseId is somehow undefined/empty.
    notFound();
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading course details...</p>
      </div>
    );
  }

  // If after loading, course is still null (e.g. invalid ID and not found by getCourseById)
  // and we want to be strict, we can use notFound() here.
  // However, for the flow from "create course", it should exist.
  // if (!course && !isLoading) { 
  //   notFound();
  // }


  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim() || !course) return;
    const newModule: EditableModule = {
      id: `module-${Date.now()}`, // Simple unique ID for demo
      title: newModuleTitle,
    };
    const updatedModules = [...modules, newModule];
    setModules(updatedModules);
    
    // Update the course in our mock data
    const courseModulesForUpdate: Module[] = updatedModules.map(em => ({
        id: em.id,
        title: em.title,
        description: em.description,
        lessons: [], // New modules initially have no lessons
    }));
    updateCourseModules(course.id, courseModulesForUpdate);

    setNewModuleTitle("");
    console.log("Adding new module:", newModule, "to course:", course.id);
    // No alert needed, UI updates.
  };

  const handleDeleteModule = (moduleId: string) => {
    if (!course) return;
    const updatedModules = modules.filter(m => m.id !== moduleId);
    setModules(updatedModules);
    
    const courseModulesForUpdate: Module[] = updatedModules.map(em => ({
        id: em.id,
        title: em.title,
        description: em.description,
        lessons: course.modules.find(cm => cm.id === em.id)?.lessons || [], // Preserve existing lessons if any
    }));
    updateCourseModules(course.id, courseModulesForUpdate);

    console.log("Deleting module:", moduleId, "from course:", course.id);
  }

  const pageTitle = course ? `Editing Course: ${course.title}` : `Editing Course: ${courseId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;


  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold mb-3">{pageTitle}</h1>
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
                    <Button variant="outline" size="sm" asChild>
                        {/* Pass courseId and moduleId to the lesson editor */}
                        <Link href={`/admin/edit-lesson/new-lesson?courseId=${courseId}&moduleId=${module.id}`}>
                            <FilePlus2 className="mr-1 h-4 w-4" /> Manage Lessons
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => alert(`Editing module '${module.title}' (placeholder for deeper module edit functionality)`)}>
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
            {/* Conceptual: Add Textarea for module description if needed here */}
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
                <ListTree className="mr-2 h-4 w-4" /> View All Courses
            </Link>
        </Button>
      </div>
    </div>
  );
}
