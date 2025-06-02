import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function PracticePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold mb-3">Practice Zone</h1>
        <p className="text-lg text-muted-foreground">
          Sharpen your skills with targeted UCAT practice questions and mock exams.
        </p>
      </header>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Construction className="mr-2 h-6 w-6 text-primary" />
            Coming Soon!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Our extensive practice question bank and realistic mock exams are currently under development. 
            We're working hard to bring you the best UCAT preparation tools. Please check back soon!
          </p>
          <div className="mt-6 h-64 bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground italic">Imagine a variety of practice modules here...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
