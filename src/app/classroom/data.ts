
import type { Course } from "@/types/classroom";

export const mockCourses: Course[] = [
  {
    id: "ucat-verbal-reasoning-101",
    title: "UCAT Verbal Reasoning Mastery",
    description: "Complete guide to excelling in the verbal reasoning section with AI-powered insights.",
    imageUrl: "https://placehold.co/600x400.png",
    instructor: "Dr. Sarah Johnson",
    duration: "12 hours",
    progress: 65, // Initial progress
    modules: [
      {
        id: "vr-module-1",
        title: "Introduction to Verbal Reasoning",
        description: "Understand the fundamentals and question types.",
        lessons: [
          {
            id: "vr-lesson-1-1",
            title: "What is Verbal Reasoning?",
            textContent: "<p>Verbal reasoning tests assess your ability to read and understand written information and use this to make reasoned judgements. This lesson covers the basics. You will learn common strategies for tackling these questions efficiently.</p><h3>Key Topics:</h3><ul><li>Understanding passage structure</li><li>Identifying main ideas vs. supporting details</li><li>Making inferences</li></ul>",
            videoUrl: "https://www.youtube.com/watch?v=kf4j0Q8Lw0k", // Example video
            actionItems: ["Read Chapter 1 of the UCAT guide.", "Attempt introductory quiz on VR basics."],
            transcript: "Welcome to our first lesson on Verbal Reasoning. In this session, we'll break down what verbal reasoning entails in the context of the UCAT exam. We'll explore different question types and discuss initial strategies. Make sure to download the introductory worksheet.",
            files: [{id: "file-vr-1-1-worksheet", name: "VR Intro Worksheet.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", type: "pdf"}],
            isCompleted: true,
          },
          {
            id: "vr-lesson-1-2",
            title: "Common Pitfalls & Traps",
            textContent: "<p>Learn about common mistakes students make in VR and how to actively avoid them. We'll look at misinterpreting negatives, extreme language, and scope issues.</p>",
            videoUrl: "https://www.youtube.com/watch?v=8b0_c1N_gI4", // Example video
            actionItems: ["Complete worksheet on identifying pitfalls.", "Review common error types from the notes."],
            isCompleted: true,
          },
          {
            id: "vr-lesson-1-3",
            title: "Identifying Assumptions",
            textContent: "<p>A crucial skill in VR is understanding implicit assumptions within texts. This lesson focuses on techniques to spot unstated premises.</p>",
            transcript: "Identifying assumptions is key. This lesson provides practical examples...",
            isCompleted: false,
          },
        ],
      },
      {
        id: "vr-module-2",
        title: "Advanced Verbal Reasoning Techniques",
        description: "Develop advanced skills for tackling complex passages and nuanced questions.",
        lessons: [
          {
            id: "vr-lesson-2-1",
            title: "Skimming and Scanning Strategies",
            textContent: "<p>Master effective techniques for quickly extracting vital information from dense passages without reading every word. This is crucial for time management.</p>",
            files: [{id: "file-vr-2-1-guide", name: "Skimming Guide.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", type: "pdf"}],
            isCompleted: true,
          },
          {
            id: "vr-lesson-2-2",
            title: "True, False, Can't Tell Questions Deep Dive",
            textContent: "<p>A detailed look at strategies for accurately and consistently answering True/False/Can't Tell (TFC) questions, one of the trickiest UCAT VR formats.</p>",
            videoUrl: "https://www.youtube.com/watch?v=video_id_tfc", // Example video
            actionItems: ["Practice TFC questions set A.", "Review TFC decision tree."],
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
    imageUrl: "https://placehold.co/600x400.png",
    instructor: "Prof. Michael Chen",
    duration: "10 hours",
    progress: 30,
    modules: [
      {
        id: "qr-module-1",
        title: "Core Mathematical Concepts for QR",
        lessons: [
          {
            id: "qr-lesson-1-1",
            title: "Percentages, Fractions, and Ratios",
            textContent: "<p>This lesson provides a comprehensive review of percentages, fractions, and ratios, including common calculations and conversions needed for the UCAT QR section.</p>",
            videoUrl: "https://www.youtube.com/watch?v=qr_video_1",
            actionItems: ["Complete practice set on percentages.", "Memorize key fraction-decimal equivalents."],
            files: [{id: "file-qr-1-1-formulas", name: "QR Formulas Sheet.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", type: "pdf"}],
            isCompleted: true,
          },
          {
            id: "qr-lesson-1-2",
            title: "Data Interpretation: Charts & Graphs",
            textContent: "<p>Learn to efficiently interpret various types of charts, graphs, and tables commonly found in the QR section. Focus on speed and accuracy.</p>",
            isCompleted: false,
          },
          {
            id: "qr-lesson-1-3",
            title: "Basic Algebraic Manipulation",
            textContent: "<p>Covering the basics of algebraic manipulation relevant to solving UCAT QR problems, including rearranging equations and solving for unknowns.</p>",
            isCompleted: false,
          },
        ],
      },
       {
        id: "qr-module-2",
        title: "QR Problem Solving Strategies",
        lessons: [
          {
            id: "qr-lesson-2-1",
            title: "Time Management in Quantitative Reasoning",
            textContent: "<p>Essential tips and strategies for managing your time effectively during the QR section to maximize your score.</p>",
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
    imageUrl: "https://placehold.co/600x400.png",
    instructor: "Dr. Emma Wilson",
    duration: "8 hours",
    progress: 0,
    modules: [
      {
        id: "ar-module-1",
        title: "Introduction to Abstract Reasoning",
        lessons: [
          {
            id: "ar-lesson-1-1",
            title: "Common Pattern Types (SCANS)",
            textContent: "<p>Identifying common abstract patterns using frameworks like SCANS (Shape, Colour, Arrangement, Number, Size) and other mnemonic devices.</p>",
            videoUrl: "https://www.youtube.com/watch?v=ar_video_intro",
            isCompleted: false,
          },
        ],
      },
      {
        id: "ar-module-2",
        title: "Advanced Abstract Reasoning",
        lessons: [
          {
            id: "ar-lesson-2-1",
            title: "Tackling Complex Sequences & Matrices",
            textContent: "<p>Strategies for breaking down and solving complex visual sequences and matrix-based AR problems.</p>",
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
// Now also returns module info
export const getLessonById = (courseId: string, lessonId: string) => {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  for (const module of course.modules) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return { course, module, lesson };
  }
  return undefined;
};
