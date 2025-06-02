import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold mb-3">Your Progress</h1>
        <p className="text-lg text-muted-foreground">
          Track your UCAT preparation journey, review performance analytics, and identify areas for improvement.
        </p>
      </header>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
            Performance Analytics Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We are developing a comprehensive progress tracking system. Soon, you'll be able to visualize your
            performance across different UCAT sections, see your improvement over time, and get personalized insights.
          </p>
          <div className="mt-6 h-80 bg-muted rounded-md flex items-center justify-center">
            {/* Placeholder for charts/graphs */}
            <p className="text-muted-foreground italic">Detailed charts and progress reports will appear here...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
