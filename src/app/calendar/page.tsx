
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarCheck2, ChevronLeft, ChevronRight, Edit3, Sparkles } from "lucide-react";
import React, { useState, useMemo } from "react";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay, 
  addMonths, 
  subMonths, 
  isSameMonth, 
  isToday, 
  isSameDay 
} from "date-fns";
import { cn } from "@/lib/utils";

type CalendarView = "month" | "week" | "year";

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  color?: string; // Tailwind background color class, e.g., 'bg-blue-500'
  aiSuggested?: boolean;
}

// Mock Data
const MOCK_EVENTS: CalendarEvent[] = [
  { id: "1", date: new Date(new Date().setDate(new Date().getDate() + 2)), title: "UCAT VR Practice", color: "bg-primary/20", aiSuggested: true },
  { id: "2", date: new Date(new Date().setDate(new Date().getDate() + 5)), title: "DM Mock Test", color: "bg-secondary/20" },
  { id: "3", date: new Date(new Date().setDate(new Date().getDate() - 3)), title: "Review QR Notes", color: "bg-accent/20" },
  { id: "4", date: new Date(), title: "Study Planning Session", color: "bg-green-500/20", aiSuggested: true },
];

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState<CalendarView>("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);

  const firstDayCurrentMonth = startOfMonth(currentDate);
  const lastDayCurrentMonth = endOfMonth(currentDate);

  const daysInMonth = useMemo(() => 
    eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: lastDayCurrentMonth,
    }), [firstDayCurrentMonth, lastDayCurrentMonth]);

  const startingDayIndex = getDay(firstDayCurrentMonth); // 0 for Sunday, 1 for Monday...

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  const renderMonthView = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-px text-center font-medium text-sm text-muted-foreground border-b pb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px">
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div key={`empty-${index}`} className="border-r border-b h-28"></div>
        ))}
        {daysInMonth.map((day) => {
          const dayEvents = getEventsForDay(day);
          const dayColor = dayEvents.length > 0 && dayEvents[0].color ? dayEvents[0].color : "";
          return (
            <div
              key={day.toString()}
              className={cn(
                "p-2 border-r border-b h-28 flex flex-col relative group",
                !isSameMonth(day, currentDate) && "bg-muted/30",
                isToday(day) && "bg-primary/10 ring-2 ring-primary z-10",
                dayColor
              )}
            >
              <span className={cn("font-medium", isToday(day) ? "text-primary" : "text-foreground")}>
                {format(day, "d")}
              </span>
              <div className="mt-1 space-y-1 overflow-y-auto text-xs flex-grow">
                {dayEvents.map(event => (
                  <div key={event.id} className={cn(
                    "p-1 rounded text-foreground/80 text-[10px] leading-tight", 
                    event.color ? `${event.color} opacity-70` : 'bg-muted/50' // Use event color or default
                    )}>
                    {event.aiSuggested && <Sparkles className="inline h-3 w-3 mr-1 text-accent" />}
                    {event.title}
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="icon" className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6" onClick={() => alert(`Editing tasks for ${format(day, "PPP")}. (Conceptual)`)}>
                <Edit3 className="h-3 w-3" />
              </Button>
            </div>
          );
        })}
        {/* Fill remaining cells if needed to complete the grid structure, ensuring consistent borders */}
        {Array.from({ length: (7 - ((daysInMonth.length + startingDayIndex) % 7)) % 7 }).map((_, index) => (
          <div key={`empty-end-${index}`} className="border-r border-b h-28"></div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        <Sparkles className="inline h-3 w-3 mr-1 text-accent" /> AI Suggested Task. 
        <Edit3 className="inline h-3 w-3 ml-2 mr-1" /> Hover over a day to see edit icon (conceptual).
        Actual editing and AI integration would require backend setup.
      </p>
    </div>
  );

  const renderWeekView = () => (
    <div className="h-80 bg-muted rounded-md flex items-center justify-center">
      <p className="text-muted-foreground italic">Weekly calendar view coming soon...</p>
    </div>
  );

  const renderYearView = () => (
    <div className="h-80 bg-muted rounded-md flex items-center justify-center">
      <p className="text-muted-foreground italic">Yearly calendar view coming soon...</p>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 text-center">
        <h1 className="font-headline text-4xl font-bold mb-3">Study Calendar</h1>
        <p className="text-lg text-muted-foreground">
          Organize your study schedule, set reminders, and track important UCAT deadlines.
        </p>
      </header>

      <Card className="max-w-5xl mx-auto">
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={handlePrevMonth} aria-label="Previous month">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="font-headline text-xl sm:text-2xl text-center mx-4 w-48 sm:w-auto">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <Button variant="outline" size="icon" onClick={handleNextMonth} aria-label="Next month">
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" onClick={handleToday} className="ml-4">Today</Button>
            </div>
            <div className="flex space-x-2">
              {(["month", "week", "year"] as CalendarView[]).map((view) => (
                <Button
                  key={view}
                  variant={currentView === view ? "default" : "outline"}
                  onClick={() => setCurrentView(view)}
                  className="capitalize"
                >
                  {view}
                </Button>
              ))}
            </div>
          </div>
            <CardDescription className="text-center sm:text-left mt-2">
                View and manage your study tasks. Color-coding indicates task types or AI suggestions.
            </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {currentView === "month" && renderMonthView()}
          {currentView === "week" && renderWeekView()}
          {currentView === "year" && renderYearView()}
        </CardContent>
      </Card>
    </div>
  );
}
