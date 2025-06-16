"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCourseAnalytics } from "@/app/classroom/data";
import type { CourseAnalytics } from "@/types/classroom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CourseAnalyticsProps {
  courseId: string;
}

export function CourseAnalytics({ courseId }: CourseAnalyticsProps) {
  const [analytics, setAnalytics] = useState<CourseAnalytics | null>(null);

  useEffect(() => {
    try {
      const data = getCourseAnalytics(courseId);
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  }, [courseId]);

  if (!analytics) {
    return null;
  }

  const moduleData = Object.entries(analytics.moduleCompletionRates).map(([moduleId, rate]) => ({
    moduleId,
    completionRate: rate
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Overall Completion</p>
              <div className="flex items-center space-x-2">
                <Progress value={analytics.completionRate} className="flex-1" />
                <span className="text-sm font-medium">{Math.round(analytics.completionRate)}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Total Students</p>
              <p className="text-2xl font-bold">{analytics.totalStudents}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Average Time per Lesson</p>
              <p className="text-2xl font-bold">{Math.round(analytics.averageTimePerLesson / 60)} min</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Module Completion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="moduleId" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completionRate" fill="#3b82f6" name="Completion Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Drop-off Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.dropOffPoints.map((point) => (
              <div key={point.lessonId} className="flex items-center justify-between">
                <span className="text-sm">{point.lessonId}</span>
                <div className="flex items-center space-x-2">
                  <Progress value={point.dropOffRate} className="w-32" />
                  <span className="text-sm font-medium">{Math.round(point.dropOffRate)}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 