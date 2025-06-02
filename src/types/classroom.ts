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
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  modules: Module[];
}
