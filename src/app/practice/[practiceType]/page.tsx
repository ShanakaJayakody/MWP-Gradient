
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Timer, Settings2, ClipboardList, PlayCircle } from "lucide-react";
import React, { useState } from "react";

export default function PracticeTypePage() {
  const params = useParams();
  const router = useRouter();
  const practiceType = params.practiceType as string;

  const [untimedSets, setUntimedSets] = useState("1");
  const [untimedQuestionType, setUntimedQuestionType] = useState("type-a");
  const [timedSets, setTimedSets] = useState("1");
  const [timedQuestionType, setTimedQuestionType] = useState("type-a");

  const formattedPracticeType = practiceType
    ? practiceType.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Practice";

  const questionSetOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const placeholderQuestionTypes = [
    { value: "type-a", label: "All Types" },
    { value: "type-b", label: "Specific Type B (Placeholder)" },
    { value: "type-c", label: "Specific Type C (Placeholder)" },
  ];
  const sectionTests = Array.from({ length: 10 }, (_, i) => ({
    id: `st-${i + 1}`,
    name: `${formattedPracticeType} - Section Test ${i + 1}`,
  }));

  const handleStartPractice = (mode: string, sets?: string, type?: string) => {
    alert(`Starting ${mode} for ${formattedPracticeType}${sets ? ` with ${sets} sets` : ''}${type ? ` of type ${type}` : ''}. (Placeholder)`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={() => router.push("/practice")} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Practice Options</span>
          </Button>
          <h1 className="font-headline text-4xl font-bold">
            {formattedPracticeType} Practice
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Untimed Practice Card */}
        <Card className="bg-card/70 backdrop-blur-md border-border/30 hover:border-primary/50 transition-shadow hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-2xl">
              <Settings2 className="mr-2 h-6 w-6 text-accent" />
              Untimed Practice
            </CardTitle>
            <CardDescription>Practice at your own pace without time limits.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="untimed-sets">Number of Question Sets</Label>
              <Select value={untimedSets} onValueChange={setUntimedSets}>
                <SelectTrigger id="untimed-sets">
                  <SelectValue placeholder="Select sets" />
                </SelectTrigger>
                <SelectContent>
                  {questionSetOptions.map((num) => (
                    <SelectItem key={`untimed-${num}`} value={num}>{num} set(s)</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="untimed-qtype">Question Type</Label>
              <Select value={untimedQuestionType} onValueChange={setUntimedQuestionType}>
                <SelectTrigger id="untimed-qtype">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {placeholderQuestionTypes.map((type) => (
                    <SelectItem key={`untimed-${type.value}`} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
                className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground"
                onClick={() => handleStartPractice('Untimed Practice', untimedSets, untimedQuestionType)}
            >
                <PlayCircle className="mr-2 h-5 w-5" /> Start Untimed
            </Button>
          </CardContent>
        </Card>

        {/* Timed Practice Card */}
        <Card className="bg-card/70 backdrop-blur-md border-border/30 hover:border-primary/50 transition-shadow hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-2xl">
              <Timer className="mr-2 h-6 w-6 text-accent" />
              Timed Practice
            </CardTitle>
            <CardDescription>Simulate exam conditions with timed sets.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="timed-sets">Number of Question Sets</Label>
              <Select value={timedSets} onValueChange={setTimedSets}>
                <SelectTrigger id="timed-sets">
                  <SelectValue placeholder="Select sets" />
                </SelectTrigger>
                <SelectContent>
                  {questionSetOptions.map((num) => (
                    <SelectItem key={`timed-${num}`} value={num}>{num} set(s)</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timed-qtype">Question Type</Label>
              <Select value={timedQuestionType} onValueChange={setTimedQuestionType}>
                <SelectTrigger id="timed-qtype">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {placeholderQuestionTypes.map((type) => (
                    <SelectItem key={`timed-${type.value}`} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
                className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground"
                onClick={() => handleStartPractice('Timed Practice', timedSets, timedQuestionType)}
            >
                <PlayCircle className="mr-2 h-5 w-5" /> Start Timed
            </Button>
          </CardContent>
        </Card>

        {/* Section Tests Card */}
        <Card className="bg-card/70 backdrop-blur-md border-border/30 hover:border-primary/50 transition-shadow hover:shadow-xl lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-2xl">
              <ClipboardList className="mr-2 h-6 w-6 text-accent" />
              Section Tests
            </CardTitle>
            <CardDescription>Choose from various full section tests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {sectionTests.map((test) => (
              <Button
                key={test.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleStartPractice(`Section Test: ${test.name}`)}
              >
                <PlayCircle className="mr-2 h-5 w-5 text-primary" />
                {test.name}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
