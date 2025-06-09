import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/types/classroom";
import { Card, CardContent } from "@/components/ui/card"; // Removed CardHeader, CardFooter, CardTitle, CardDescription as we'll structure differently
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, Clock, PlayCircle, User } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const hasProgress = course.progress !== undefined && course.progress > 0;

  return (
    <Card className="flex flex-col h-full bg-card rounded-lg shadow-xl hover:shadow-primary/30 transition-all duration-300 overflow-hidden group">
      <div className="relative w-full h-48">
        <Image
          src={course.imageUrl || "https://placehold.co/600x400.png"}
          alt={course.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-105"
          data-ai-hint="course abstract"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <PlayCircle className="h-12 w-12 text-white/80 group-hover:text-white transition-colors" />
        </div>
        {hasProgress && course.progress && course.progress < 100 && (
          <Badge variant="secondary" className="absolute top-3 right-3 bg-green-500/80 text-white border-none">
            {course.progress}% Complete
          </Badge>
        )}
         {course.progress === 100 && (
          <Badge variant="secondary" className="absolute top-3 right-3 bg-primary/80 text-primary-foreground border-none">
            Completed
          </Badge>
        )}
      </div>

      <CardContent className="p-5 flex flex-col flex-grow">
        <h2 className="font-headline text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
          {course.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-3 flex-grow line-clamp-3">
          {course.description}
        </p>

        <div className="space-y-2 text-xs text-muted-foreground mb-4">
          <div className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>{course.modules.length} modules, {totalLessons} lessons</span>
          </div>
          {course.duration && (
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          )}
          {course.instructor && (
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{course.instructor}</span>
            </div>
          )}
        </div>

        {course.progress !== undefined && ( // Show progress bar even if 0% to be consistent
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
        
        <Button asChild className="w-full mt-auto justify-between bg-muted hover:bg-primary/20 text-foreground hover:text-primary transition-colors">
          <Link href={`/classroom/${course.id}`}>
            <span>{hasProgress && course.progress < 100 ? "Continue Learning" : (course.progress === 100 ? "Review Course" : "Start Course")}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
