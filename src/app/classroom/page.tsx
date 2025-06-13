
import { CourseCard } from "@/components/classroom/course-card";
import { mockCourses } from "./data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export const dynamic = 'force-dynamic'; // Ensures the page is re-rendered on the server for each request

export default function ClassroomPage() {
  // In a real app, user role would determine if this button is shown.
  // const userRole = "admin"; // Example: Get user role from auth context

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-3">
          Your <span className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">Personalised</span> Classroom
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse our available courses and start your UCAT preparation journey.
        </p>
      </header>
      
      {mockCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No courses available at the moment. Please check back later.</p>
        </div>
      )}

      {/* Admin: Add New Course Button */}
      {/* This would be conditionally rendered based on user role in a real application */}
      <div className="mt-16 text-center">
        <Card className="max-w-md mx-auto p-6 bg-muted/30">
          <h3 className="text-xl font-semibold mb-3 font-headline">Admin Actions</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Manage course content and platform settings.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
            <Link href="/admin/create-course">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create New Course
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
