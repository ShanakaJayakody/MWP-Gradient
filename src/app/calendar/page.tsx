import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold mb-3">Study Calendar</h1>
        <p className="text-lg text-muted-foreground">
          Organize your study schedule, set reminders, and track important UCAT deadlines.
        </p>
      </header>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <CalendarCheck2 className="mr-2 h-6 w-6 text-primary" />
            Feature Under Construction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Our integrated calendar feature is being built to help you manage your UCAT preparation effectively. 
            You'll soon be able to schedule study sessions, track course progress deadlines, and more.
          </p>
          <div className="mt-6 h-80 bg-muted rounded-md flex items-center justify-center">
            {/* Placeholder for a calendar view */}
            <p className="text-muted-foreground italic">Interactive calendar view coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
