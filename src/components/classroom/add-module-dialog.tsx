
"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AddModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddModule: (moduleName: string, isPublished: boolean) => void;
}

export function AddModuleDialog({ open, onOpenChange, onAddModule }: AddModuleDialogProps) {
  const [moduleName, setModuleName] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 50;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name.length <= maxChars) {
      setModuleName(name);
      setCharCount(name.length);
    }
  };

  const handleSubmit = () => {
    if (!moduleName.trim()) {
      // Basic validation: ensure module name is not empty
      alert("Module name cannot be empty."); // Replace with a more elegant notification if desired
      return;
    }
    onAddModule(moduleName, isPublished);
    setModuleName(""); 
    setIsPublished(true);
    setCharCount(0);
    onOpenChange(false); 
  };

  // Reset state when dialog is closed externally (e.g. clicking outside)
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setModuleName("");
      setIsPublished(true);
      setCharCount(0);
    }
    onOpenChange(isOpen);
  };


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border shadow-xl rounded-lg">
        <DialogHeader className="p-6">
          <DialogTitle className="text-xl font-headline">Add folder</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 px-6 pb-6">
          <div className="space-y-2">
            <Label htmlFor="module-name" className="text-sm font-medium">
              Name
            </Label>
            <div className="relative">
              <Input
                id="module-name"
                value={moduleName}
                onChange={handleNameChange}
                className="pr-14 border-input focus:border-primary"
                placeholder="Enter module name..."
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {charCount}/{maxChars}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="module-published" className="text-sm font-medium">
              {isPublished ? "Published" : "Draft"}
            </Label>
            <Switch
              id="module-published"
              checked={isPublished}
              onCheckedChange={setIsPublished}
              aria-label={isPublished ? "Set module to draft" : "Set module to published"}
            />
          </div>
        </div>
        <DialogFooter className="p-6 bg-muted/50 rounded-b-lg flex justify-end space-x-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              CANCEL
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">
            ADD
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
