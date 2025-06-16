import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Edit2, Save, X, PlusCircle, Trash2, Paperclip } from "lucide-react";
import type { FileInfo } from "@/types/classroom";

interface EditableLessonSectionProps {
  title: string;
  type: "video" | "content" | "actionItems" | "files";
  value: string | string[] | FileInfo[];
  onSave: (value: any) => void;
}

export function EditableLessonSection({ title, type, value, onSave }: EditableLessonSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [newFileName, setNewFileName] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleAddFile = () => {
    if (!newFileName.trim() || !newFileUrl.trim()) return;
    
    const newFile: FileInfo = {
      id: `file-${Date.now()}`,
      name: newFileName,
      url: newFileUrl,
      type: newFileName.split('.').pop() || 'file'
    };
    
    const updatedFiles = [...(editValue as FileInfo[]), newFile];
    setEditValue(updatedFiles);
    setNewFileName("");
    setNewFileUrl("");
  };

  const handleDeleteFile = (fileId: string) => {
    const updatedFiles = (editValue as FileInfo[]).filter(f => f.id !== fileId);
    setEditValue(updatedFiles);
  };

  if (!isEditing) {
    return (
      <div className="relative group">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditing(true)}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="p-4 space-y-4 bg-muted/50">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{`Edit ${title}`}</h3>
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button variant="default" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      </div>

      {type === "video" && (
        <Input
          value={editValue as string}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder="Enter video URL (YouTube, Vimeo, or Loom)"
        />
      )}

      {type === "content" && (
        <Textarea
          value={editValue as string}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder="Enter lesson content (HTML supported)"
          rows={8}
        />
      )}

      {type === "actionItems" && (
        <div className="space-y-2">
          <Textarea
            value={(editValue as string[]).join("\n")}
            onChange={(e) => setEditValue(e.target.value.split("\n").filter(item => item.trim()))}
            placeholder="Enter action items (one per line)"
            rows={4}
          />
        </div>
      )}

      {type === "files" && (
        <div className="space-y-4">
          {(editValue as FileInfo[]).map((file) => (
            <div key={file.id} className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                <span>{file.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteFile(file.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          
          <div className="space-y-2">
            <Input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="File name (e.g., Worksheet.pdf)"
            />
            <Input
              value={newFileUrl}
              onChange={(e) => setNewFileUrl(e.target.value)}
              placeholder="File URL"
            />
            <Button type="button" onClick={handleAddFile} variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-1" /> Add File
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
} 