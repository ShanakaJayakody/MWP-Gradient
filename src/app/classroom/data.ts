
import type { Course } from "@/types/classroom";

export const mockCourses: Course[] = [
  {
    id: "verbal-reasoning-foundations",
    title: "Verbal Reasoning Foundations",
    description: "Complete guide to excelling in the verbal reasoning section with AI-powered insights.",
    imageUrl: "https://ik.imagekit.io/mwp/MWP%20Platform%20Design%20Images/VR_banner",
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
    id: "decision-making-foundations",
    title: "Decision Making Foundations",
    description: "Master logical puzzles and decision-making processes with adaptive learning.",
    imageUrl: "https://ik.imagekit.io/mwp/MWP%20Platform%20Design%20Images/DM_Banner",
    instructor: "Prof. Michael Chen",
    duration: "10 hours",
    progress: 30,
    modules: [
      {
        id: "dm-module-1",
        title: "Core Concepts in Decision Making",
        lessons: [
          {
            id: "dm-lesson-1-1",
            title: "Introduction to Logical Puzzles",
            textContent: "<p>This lesson provides a comprehensive review of logical puzzles, including common types and solving strategies for the UCAT DM section.</p>",
            videoUrl: "https://www.youtube.com/watch?v=dm_video_1",
            actionItems: ["Complete practice set on syllogisms.", "Review logical fallacies."],
            files: [{id: "file-dm-1-1-puzzles", name: "DM Puzzle Pack.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", type: "pdf"}],
            isCompleted: true,
          },
          {
            id: "dm-lesson-1-2",
            title: "Interpreting Probabilistic Information",
            textContent: "<p>Learn to efficiently interpret scenarios involving probability and make sound decisions based on statistical information.</p>",
            isCompleted: false,
          },
        ],
      },
       {
        id: "dm-module-2",
        title: "DM Problem Solving Strategies",
        lessons: [
          {
            id: "dm-lesson-2-1",
            title: "Evaluating Arguments and Evidence",
            textContent: "<p>Essential tips and strategies for critically evaluating arguments and the strength of evidence presented.</p>",
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: "quantitative-reasoning-foundations",
    title: "Quantitative Reasoning Foundations",
    description: "Develop numerical problem-solving skills through interactive exercises.",
    imageUrl: "https://ik.imagekit.io/mwp/MWP%20Platform%20Design%20Images/QR_banner",
    instructor: "Dr. Emma Wilson",
    duration: "8 hours",
    progress: 0,
    modules: [
      {
        id: "qr-module-1",
        title: "Introduction to Quantitative Reasoning",
        lessons: [
          {
            id: "qr-lesson-1-1",
            title: "Essential Mathematical Operations",
            textContent: "<p>Covering percentages, ratios, rates, and other fundamental mathematical operations required for the QR section.</p>",
            videoUrl: "https://www.youtube.com/watch?v=qr_video_intro",
            isCompleted: false,
          },
        ],
      },
      {
        id: "qr-module-2",
        title: "Advanced Quantitative Reasoning",
        lessons: [
          {
            id: "qr-lesson-2-1",
            title: "Tackling Complex Charts & Data Sets",
            textContent: "<p>Strategies for breaking down and solving problems involving complex charts, tables, and multi-step calculations.</p>",
            isCompleted: false,
          },
        ],
      },
    ],
  },
];

// Helper function to add a course
export const addCourse = (course: Course) => {
  mockCourses.push(course);
};

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

// Conceptual function to update course modules (used by admin edit course page)
// In a real app, this would interact with a backend.
// For this prototype, it might modify mockCourses directly if needed.
export const updateCourseModules = (courseId: string, newModules: Course['modules']) => {
  const courseIndex = mockCourses.findIndex(c => c.id === courseId);
  if (courseIndex > -1) {
    mockCourses[courseIndex].modules = newModules;
    console.log("Mock course modules updated for:", courseId);
    return mockCourses[courseIndex];
  }
  console.error("Failed to update mock course modules for:", courseId);
  return undefined;
};
