
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, ClipboardList, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const quickLinks = [
    { title: "Browse Courses", href: "/classroom", icon: BookOpen, description: "Explore and enroll in UCAT courses." },
    { title: "Start Practice", href: "/practice", icon: ClipboardList, description: "Hone your skills with targeted drills." },
    { title: "View Calendar", href: "/calendar", icon: CalendarDays, description: "Check your study schedule and deadlines." },
    { title: "Track Progress", href: "/progress", icon: TrendingUp, description: "Analyze your performance and growth." },
]

export default function DashboardHomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10">
        <h1 className="font-headline text-4xl font-bold mb-2">Welcome to Your Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Navigate your UCAT preparation journey from here.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 font-headline">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <Card key={link.href} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-center text-primary mb-2">
                  <link.icon className="h-7 w-7 mr-3" />
                  <CardTitle className={cn("text-xl font-headline", link.title === "Browse Courses" && "text-accent")}>{link.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button asChild className="w-full bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground">
                  <Link href={link.href}>
                    Go to {link.title.split(' ')[0]} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 font-headline">Recent Activity & Insights</h2>
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Summary of your recent study sessions and performance highlights.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground italic">
                Recent activity charts and insights coming soon...
              </p>
            </div>
             <p className="text-xs text-muted-foreground mt-4">
                Mock data: You completed 'Verbal Reasoning - Set 1' with 85% accuracy. Keep up the great work!
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
