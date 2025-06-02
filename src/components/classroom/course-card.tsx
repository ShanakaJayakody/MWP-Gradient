import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/types/classroom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        {course.imageUrl && (
          <div className="relative w-full h-48 mb-4">
            <Image
              src={course.imageUrl}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-md"
              data-ai-hint="education online course"
            />
          </div>
        )}
        <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Could add more details like number of modules/lessons */}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/classroom/${course.id}`}>
            View Course <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
