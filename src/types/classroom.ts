export interface FileInfo {
  id: string;
  name: string;
  url: string; 
  type?: string; 
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl?: string;
  textContent?: string;
  actionItems?: string[];
  transcript?: string;
  files?: FileInfo[];
  isCompleted?: boolean;
  duration?: number; // in seconds
  contentType: 'video' | 'text' | 'mixed';
  lastPosition?: number; // for video resume
  completedAt?: string; // ISO date string
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  position: number;
  unlockLevel?: number;
  unlockDate?: string; // ISO date string
  isPublished: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  modules: Module[];
  instructor?: string;
  duration?: string; // e.g., "12 hours"
  progress?: number; // Percentage from 0 to 100
  communityId?: string;
  accessLevel?: string;
  coverImageUrl?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface UserProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string; // ISO date string
  lastPosition?: number; // for video resume
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CourseAnalytics {
  courseId: string;
  totalStudents: number;
  completionRate: number;
  averageProgress: number;
  moduleCompletionRates: Record<string, number>;
  averageTimePerLesson: number;
  dropOffPoints: { lessonId: string; dropOffRate: number }[];
}
