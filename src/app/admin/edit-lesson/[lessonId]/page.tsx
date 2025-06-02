"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, UploadCloud } from "lucide-react";
import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
// import { getLessonById } from "@/app/classroom/data"; // Assuming lesson data can be fetched

// This is a conceptual placeholder for an admin feature.
// It would fetch existing lesson data, allow editing, and save changes.

export default function EditLessonPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;

  // State for form fields - prefill with fetched lesson data
  const [lessonTitle, setLessonTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [actionItems, setActionItems] = useState<string[]>([]); // Example: comma-separated string or structured
  const [transcript, setTranscript] = useState("");
  // State for file uploads would be more complex

  useEffect(() => {
    if (lessonId) {
      // In a real app, fetch lesson data by lessonId
      // const fetchedLesson = getLessonById(courseId, lessonId); // This needs courseId too
      // For demo, using placeholder:
      console.log(`Fetching data for lesson ID: ${lessonId}`);
      // if (fetchedLesson) {
      //   setLessonTitle(fetchedLesson.lesson.title);
      //   setVideoUrl(fetchedLesson.lesson.videoUrl || "");
      //   setTextContent(fetchedLesson.lesson.textContent || "");
      //   // etc.
      // } else {
      //   // notFound(); or show error
      // }
      setLessonTitle(`Editing Lesson: ${lessonId}`); // Placeholder title
    }
  }, [lessonId]);

  if (!lessonId) {
    notFound();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving lesson:", { lessonId, lessonTitle, videoUrl, textContent, actionItems, transcript });
    alert("Lesson saving functionality is a placeholder. Check console for data.");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold mb-3">Edit Lesson (Admin)</h1>
        <p className="text-lg text-muted-foreground">
          Modify the content and details of this lesson.
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
              <Label htmlFor="videoUrl" className="font-headline">Video URL (Embed or Direct)</Label>
              <Input id="videoUrl" type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
            </div>

            <div>
              <Label htmlFor="textContent" className="font-headline">Text Content (HTML/Markdown)</Label>
              <Textarea id="textContent" value={textContent} onChange={(e) => setTextContent(e.target.value)} rows={8} placeholder="Enter lesson content here..." />
            </div>
            
            <div>
              <Label htmlFor="actionItems" className="font-headline">Action Items (one per line)</Label>
              <Textarea id="actionItems" value={actionItems.join("\\n")} onChange={(e) => setActionItems(e.target.value.split("\\n"))} rows={3} placeholder="Action item 1\nAction item 2" />
            </div>

            <div>
              <Label htmlFor="transcript" className="font-headline">Transcript</Label>
              <Textarea id="transcript" value={transcript} onChange={(e) => setTranscript(e.target.value)} rows={5} placeholder="Enter video transcript here..." />
            </div>
            
            <div>
              <Label className="font-headline">Worksheets/Files</Label>
              <div className="mt-2 flex items-center justify-center w-full">
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, PPTX, etc.</p>
                  </div>
                  <input id="file-upload" type="file" className="hidden" multiple />
                </label>
              </div>
               {/* Display currently uploaded files here */}
            </div>


            <Button type="submit" className="w-full">
              <Save className="mr-2 h-5 w-5" />
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
