import { CourseCard } from "@/components/classroom/course-card";
import { mockCourses } from "./data";

export default function ClassroomPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold mb-3">Classroom</h1>
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

      {/* Placeholder for admin "Add Course" button */}
      {/* This would be conditionally rendered based on user role */}
      {/*
      <div className="mt-12 text-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/admin/create-course">Add New Course (Admin)</Link>
        </Button>
      </div>
      */}
    </div>
  );
}
