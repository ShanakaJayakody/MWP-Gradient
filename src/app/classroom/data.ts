import type { Course, Module, Lesson, CourseAnalytics } from "@/types/classroom";

export let mockCourses: Course[] = [
  {
    id: "verbal-reasoning-foundations",
    title: "Verbal Reasoning Foundations",
    description: "Complete guide to excelling in the verbal reasoning section with AI-powered insights.",
    imageUrl: "https://ik.imagekit.io/mwp/MWP%20Platform%20Design%20Images/VR_banner",
    instructor: "Dr. Sarah Johnson",
    duration: "12 hours",
    progress: 65,
    communityId: "vr-community",
    accessLevel: "all",
    coverImageUrl: "https://ik.imagekit.io/mwp/MWP%20Platform%20Design%20Images/VR_banner",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    modules: [
      {
        id: "vr-module-1",
        title: "Introduction to Verbal Reasoning",
        description: "Understand the fundamentals and question types.",
        position: 1,
        isPublished: true,
        unlockLevel: 0,
        lessons: [
          {
            id: "vr-lesson-1-1",
            title: "What is Verbal Reasoning?",
            textContent: "<p>Verbal reasoning tests assess your ability to read and understand written information and use this to make reasoned judgements. This lesson covers the basics. You will learn common strategies for tackling these questions efficiently.</p><h3>Key Topics:</h3><ul><li>Understanding passage structure</li><li>Identifying main ideas vs. supporting details</li><li>Making inferences</li></ul>",
            videoUrl: "https://www.youtube.com/watch?v=kf4j0Q8Lw0k",
            actionItems: ["Read Chapter 1 of the UCAT guide.", "Attempt introductory quiz on VR basics."],
            transcript: "Welcome to our first lesson on Verbal Reasoning. In this session, we'll break down what verbal reasoning entails in the context of the UCAT exam. We'll explore different question types and discuss initial strategies. Make sure to download the introductory worksheet.",
            files: [{id: "file-vr-1-1-worksheet", name: "VR Intro Worksheet.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", type: "pdf"}],
            isCompleted: true,
            duration: 1800,
            contentType: "mixed",
            completedAt: new Date().toISOString()
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
        position: 2,
        isPublished: true,
        unlockLevel: 1,
        unlockDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        lessons: [
          {
            id: "vr-lesson-2-1",
            title: "Skimming and Scanning Strategies",
            textContent: "<p>Master effective techniques for quickly extracting vital information from dense passages without reading every word. This is crucial for time management.</p>",
            files: [{id: "file-vr-2-1-guide", name: "Skimming Guide.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", type: "pdf"}],
            isCompleted: true,
            duration: 2400, // 40 minutes
            contentType: "text",
            completedAt: new Date().toISOString()
          },
          {
            id: "vr-lesson-2-2",
            title: "True, False, Can't Tell Questions Deep Dive",
            textContent: "<p>A detailed look at strategies for accurately and consistently answering True/False/Can't Tell (TFC) questions, one of the trickiest UCAT VR formats.</p>",
            videoUrl: "https://www.youtube.com/watch?v=video_id_tfc",
            actionItems: ["Practice TFC questions set A.", "Review TFC decision tree."],
            isCompleted: false,
            duration: 3600, // 60 minutes
            contentType: "mixed"
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

// Function to update course modules (used by admin edit course page & add module dialog)
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

// Helper function to delete a course
export const deleteCourse = (courseId: string): boolean => {
  const courseIndex = mockCourses.findIndex(c => c.id === courseId);
  if (courseIndex > -1) {
    mockCourses.splice(courseIndex, 1);
    console.log("Mock course deleted:", courseId);
    localStorage.removeItem(`lastViewedLesson_${courseId}`);
    return true;
  }
  console.warn("Failed to delete mock course, course not found:", courseId);
  return false;
};

// Helper function to delete a module from a course
export const deleteModule = (courseId: string, moduleId: string): boolean => {
  const course = getCourseById(courseId);
  if (course) {
    const initialModuleCount = course.modules.length;
    course.modules = course.modules.filter(module => module.id !== moduleId);
    if (course.modules.length < initialModuleCount) {
      console.log(`Module ${moduleId} deleted from course ${courseId}`);
      // Update the main mockCourses array by finding and replacing the course
      const courseIndex = mockCourses.findIndex(c => c.id === courseId);
      if (courseIndex !== -1) {
        mockCourses[courseIndex] = course;
      }
      return true;
    }
  }
  console.warn(`Failed to delete module ${moduleId} from course ${courseId}`);
  return false;
};

// Helper function to duplicate a module in a course
export const duplicateModule = (courseId: string, moduleId: string): Module | undefined => {
  const course = getCourseById(courseId);
  if (course) {
    const originalModule = course.modules.find(module => module.id === moduleId);
    if (originalModule) {
      const newModuleId = `module-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const duplicatedLessons: Lesson[] = originalModule.lessons.map(lesson => ({
        ...lesson,
        id: `lesson-${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${lesson.id.slice(-5)}`, // Ensure unique lesson IDs
      }));
      
      const newModule: Module = {
        ...originalModule,
        id: newModuleId,
        title: `${originalModule.title} (Copy)`,
        lessons: duplicatedLessons,
      };
      
      course.modules.push(newModule);
      // Update the main mockCourses array
      const courseIndex = mockCourses.findIndex(c => c.id === courseId);
      if (courseIndex !== -1) {
        mockCourses[courseIndex] = course;
      }
      console.log(`Module ${moduleId} duplicated in course ${courseId} as ${newModuleId}`);
      return newModule;
    }
  }
  console.warn(`Failed to duplicate module ${moduleId} in course ${courseId}`);
  return undefined;
};

// Helper function to re-export mockCourses if direct mutation is an issue for reactivity elsewhere.
// This might not be necessary if component state updates correctly.
export const getCourses = (): Course[] => {
    return mockCourses;
};

// Add new helper functions for analytics
export const getCourseAnalytics = (courseId: string): CourseAnalytics => {
  const course = getCourseById(courseId);
  if (!course) {
    throw new Error(`Course not found: ${courseId}`);
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.isCompleted).length, 0);

  const moduleCompletionRates: Record<string, number> = {};
  course.modules.forEach(module => {
    const totalModuleLessons = module.lessons.length;
    const completedModuleLessons = module.lessons.filter(lesson => lesson.isCompleted).length;
    moduleCompletionRates[module.id] = (completedModuleLessons / totalModuleLessons) * 100;
  });

  return {
    courseId,
    totalStudents: 100, // Mock data
    completionRate: (completedLessons / totalLessons) * 100,
    averageProgress: course.progress || 0,
    moduleCompletionRates,
    averageTimePerLesson: 2700, // Mock data: 45 minutes
    dropOffPoints: course.modules.map(module => ({
      lessonId: module.lessons[0].id,
      dropOffRate: Math.random() * 20 // Mock data: 0-20% drop-off rate
    }))
  };
};
