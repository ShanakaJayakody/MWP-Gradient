
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"; // For isCompleted, though likely set by student
import { Save, UploadCloud, Paperclip, Trash2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";
import type { FileInfo } from "@/types/classroom"; // Assuming FileInfo is defined

export default function EditLessonPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = params.lessonId as string;
  const courseIdParam = searchParams.get('courseId'); // Optional: To know which course this lesson belongs to
  const moduleIdParam = searchParams.get('moduleId'); // Optional: To know which module

  const [lessonTitle, setLessonTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [actionItems, setActionItems] = useState<string[]>([]);
  const [transcript, setTranscript] = useState("");
  const [files, setFiles] = useState<FileInfo[]>([]); // Store uploaded files info
  const [newFileName, setNewFileName] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [isCompleted, setIsCompleted] = useState(false); // Admin might set default

  useEffect(() => {
    if (lessonId && lessonId !== "new-lesson") { // "new-lesson" or similar for creating
      // In a real app, fetch lesson data by lessonId
      console.log(`Fetching data for lesson ID: ${lessonId}. Course ID: ${courseIdParam}, Module ID: ${moduleIdParam}`);
      // const fetchedLesson = getLessonById(courseIdParam, moduleIdParam, lessonId); // Adjusted fetch
      // if (fetchedLesson) {
      //   setLessonTitle(fetchedLesson.title);
      //   setVideoUrl(fetchedLesson.videoUrl || "");
      //   setTextContent(fetchedLesson.textContent || "");
      //   setActionItems(fetchedLesson.actionItems || []);
      //   setTranscript(fetchedLesson.transcript || "");
      //   setFiles(fetchedLesson.files || []);
      //   setIsCompleted(fetchedLesson.isCompleted || false);
      // } else {
      //   // notFound(); or show error if not 'new'
      // }
      setLessonTitle(`Editing Lesson: ${lessonId}`); // Placeholder title
      setVideoUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ"); // Placeholder
      setTextContent("<p>This is some <strong>sample</strong> HTML content for the lesson.</p><ul><li>Point 1</li><li>Point 2</li></ul>");
      setActionItems(["Review key terms.", "Complete practice quiz."]);
      setTranscript("This is a sample transcript...");
      setFiles([{id: "sample-file-1", name: "Worksheet.pdf", url: "/path/to/worksheet.pdf", type: "pdf"}]);

    } else if (lessonId === "new-lesson") {
        setLessonTitle("New Lesson");
        // Reset all fields for new lesson
    }
  }, [lessonId, courseIdParam, moduleIdParam]);

  // if (!lessonId) { // Covered by useParams, lessonId will be string or undefined
  //   notFound();
  // }

  const handleAddFile = () => {
    if (!newFileName.trim() || !newFileUrl.trim()) {
        alert("Please provide both file name and URL.");
        return;
    }
    const newFile: FileInfo = {
        id: `file-${Date.now()}`,
        name: newFileName,
        url: newFileUrl,
        type: newFileName.split('.').pop() || 'file'
    };
    setFiles([...files, newFile]);
    setNewFileName("");
    setNewFileUrl("");
    console.log("Added file:", newFile);
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter(f => f.id !== fileId));
    console.log("Deleted file:", fileId);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lessonData = { 
      lessonId: lessonId === "new-lesson" ? `lesson-${Date.now()}` : lessonId, 
      title: lessonTitle, 
      videoUrl, 
      textContent, 
      actionItems, 
      transcript, 
      files,
      isCompleted,
      // Potentially include courseIdParam, moduleIdParam if saving to backend
    };
    console.log("Saving lesson:", lessonData);
    alert("Lesson saving functionality is a placeholder. Check console for data.");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold mb-3">{lessonId === "new-lesson" ? "Create New Lesson" : "Edit Lesson"}</h1>
        <p className="text-lg text-muted-foreground">
          Modify the content and details of this lesson.
          {courseIdParam && <span className="block text-sm">For Course: {courseIdParam}</span>}
          {moduleIdParam && <span className="block text-sm">For Module: {moduleIdParam}</span>}
        </p>
      </header>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{lessonTitle || "Loading lesson..."}</CardTitle>
          <CardDescription>Update the lesson information below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="lessonTitle" className="font-headline">Lesson Title</Label>
              <Input id="lessonTitle" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} required />
            </div>

            <div>
              <Label htmlFor="videoUrl" className="font-headline">Video URL (YouTube, Vimeo, etc.)</Label>
              <Input id="videoUrl" type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
            </div>

            <div>
              <Label htmlFor="textContent" className="font-headline">Text Content (HTML supported)</Label>
              <Textarea id="textContent" value={textContent} onChange={(e) => setTextContent(e.target.value)} rows={8} placeholder="Enter lesson content here... Use HTML for formatting like <p>, <h1>, <ul> etc." />
            </div>
            
            <div>
              <Label htmlFor="actionItems" className="font-headline">Action Items (one per line)</Label>
              <Textarea id="actionItems" value={actionItems.join("\\n")} onChange={(e) => setActionItems(e.target.value.split("\\n").map(item => item.trim()).filter(item => item))} rows={3} placeholder="Action item 1\nAction item 2" />
            </div>

            <div>
              <Label htmlFor="transcript" className="font-headline">Transcript (Optional)</Label>
              <Textarea id="transcript" value={transcript} onChange={(e) => setTranscript(e.target.value)} rows={5} placeholder="Enter video transcript here..." />
            </div>
            
            <div className="space-y-4">
              <Label className="font-headline">Worksheets/Files</Label>
              {files.map(file => (
                <div key={file.id} className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                        <Paperclip className="inline mr-2 h-4 w-4" />{file.name}
                    </a>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(file.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
              ))}
              <Card className="p-4 space-y-3 bg-muted/50">
                <Label htmlFor="newFileName" className="font-semibold">Add New File</Label>
                <Input id="newFileName" value={newFileName} onChange={(e) => setNewFileName(e.target.value)} placeholder="File Name (e.g., Notes.pdf)" />
                <Input id="newFileUrl" value={newFileUrl} onChange={(e) => setNewFileUrl(e.target.value)} placeholder="File URL (e.g., https://example.com/file.pdf)" />
                <Button type="button" onClick={handleAddFile} variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4"/> Add File
                </Button>
              </Card>
              <div className="mt-2 flex items-center justify-center w-full">
                <label htmlFor="file-upload-actual" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-muted-foreground">(Conceptual: Real uploads require backend integration)</p>
                  </div>
                  <input id="file-upload-actual" type="file" className="hidden" multiple onChange={(e) => alert(`File upload selected: ${e.target.files?.[0]?.name || 'none'}. Backend needed.`)} />
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="isCompletedAdmin" checked={isCompleted} onCheckedChange={(checked) => setIsCompleted(checked as boolean)} />
                <Label htmlFor="isCompletedAdmin">Mark as initially completed (student can override)</Label>
            </div>


            <Button type="submit" className="w-full">
              <Save className="mr-2 h-5 w-5" />
              {lessonId === "new-lesson" ? "Create Lesson" : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
