import type { Course } from "@/types/classroom";

export const mockCourses: Course[] = [
  {
    id: "ucat-verbal-reasoning-101",
    title: "UCAT Verbal Reasoning Mastery",
    description: "Complete guide to excelling in the verbal reasoning section with AI-powered insights.",
    imageUrl: "https://placehold.co/600x400.png?text=Verbal+Reasoning&a=1",
    instructor: "Dr. Sarah Johnson",
    duration: "12 hours",
    progress: 65,
    modules: [
      {
        id: "vr-module-1",
        title: "Introduction to Verbal Reasoning",
        description: "Understand the fundamentals and question types.",
        lessons: [
          {
            id: "vr-lesson-1-1",
            title: "What is Verbal Reasoning?",
            textContent: "<p>Verbal reasoning tests assess your ability to read and understand written information and use this to make reasoned judgements. This lesson covers the basics.</p>",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
            actionItems: ["Read Chapter 1 of the UCAT guide.", "Attempt introductory quiz."],
            transcript: "This is a placeholder transcript for the video...",
            files: [{id: "file-1", name: "VR Worksheet 1.pdf", url: "/path/to/worksheet1.pdf", type: "pdf"}],
            isCompleted: true,
          },
          {
            id: "vr-lesson-1-2",
            title: "Common Pitfalls",
            textContent: "<p>Learn about common mistakes students make and how to avoid them.</p>",
            isCompleted: true,
          },
          {
            id: "vr-lesson-1-3",
            title: "Identifying Assumptions",
            textContent: "<p>Understanding implicit assumptions in texts.</p>",
            isCompleted: false,
          },
        ],
      },
      {
        id: "vr-module-2",
        title: "Advanced Techniques",
        description: "Develop advanced skills for tackling complex passages.",
        lessons: [
          {
            id: "vr-lesson-2-1",
            title: "Skimming and Scanning",
            textContent: "<p>Effective techniques for quickly extracting information.</p>",
            isCompleted: true,
          },
          {
            id: "vr-lesson-2-2",
            title: "True, False, Can't Tell Questions",
            textContent: "<p>Strategies for accurately answering T/F/CT questions.</p>",
            videoUrl: "https://www.youtube.com/embed/ primjer", 
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: "ucat-quantitative-reasoning-101",
    title: "Quantitative Reasoning Fundamentals",
    description: "Master mathematical concepts and problem-solving techniques with adaptive learning.",
    imageUrl: "https://placehold.co/600x400.png?text=Quantitative+Reasoning&b=2",
    instructor: "Prof. Michael Chen",
    duration: "10 hours",
    progress: 30,
    modules: [
      {
        id: "qr-module-1",
        title: "Core Mathematical Concepts",
        lessons: [
          {
            id: "qr-lesson-1-1",
            title: "Percentages and Ratios",
            textContent: "<p>Master calculations involving percentages and ratios.</p>",
            isCompleted: true,
          },
          {
            id: "qr-lesson-1-2",
            title: "Data Interpretation",
            textContent: "<p>Learn to interpret charts, graphs, and tables effectively.</p>",
            isCompleted: false,
          },
          {
            id: "qr-lesson-1-3",
            title: "Algebraic Manipulation",
            textContent: "<p>Basics of algebra relevant to QR.</p>",
            isCompleted: false,
          },
        ],
      },
       {
        id: "qr-module-2",
        title: "Problem Solving Strategies",
        lessons: [
          {
            id: "qr-lesson-2-1",
            title: "Time Management in QR",
            textContent: "<p>Tips for solving QR problems quickly.</p>",
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: "ucat-abstract-reasoning-patterns",
    title: "Abstract Reasoning Patterns",
    description: "Develop pattern recognition and logical thinking skills through interactive exercises.",
    imageUrl: "https://placehold.co/600x400.png?text=Abstract+Reasoning&c=3",
    instructor: "Dr. Emma Wilson",
    duration: "8 hours",
    progress: 0,
    modules: [
      {
        id: "ar-module-1",
        title: "Introduction to AR",
        lessons: [
          {
            id: "ar-lesson-1-1",
            title: "Common Pattern Types",
            textContent: "<p>Identifying common abstract patterns.</p>",
            isCompleted: false,
          },
        ],
      },
      {
        id: "ar-module-2",
        title: "Advanced AR",
        lessons: [
          {
            id: "ar-lesson-2-1",
            title: "Complex Sequences",
            textContent: "<p>Tackling complex visual sequences.</p>",
            isCompleted: false,
          },
        ],
      },
    ],
  },
];

// Helper function to find a course by ID
export const getCourseById = (courseId: string): Course | undefined => {
  return mockCourses.find(course => course.id === courseId);
}

// Helper function to find a lesson by ID within a course
export const getLessonById = (courseId: string, lessonId: string) => {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  for (const module of course.modules) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return { course, module, lesson };
  }
  return undefined;
};
