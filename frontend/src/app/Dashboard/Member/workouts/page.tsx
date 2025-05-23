"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Dumbbell, Clock, Target } from "lucide-react";

// Mock data for demonstration
const currentWorkout = {
  name: "Upper Body Strength",
  progress: 65,
  nextExercise: "Bench Press",
  remainingTime: "45 min",
  exercises: [
    { name: "Warm-up", sets: 2, reps: "10 min", completed: true },
    { name: "Bench Press", sets: 4, reps: "12 reps", completed: false },
    { name: "Shoulder Press", sets: 3, reps: "10 reps", completed: false },
    { name: "Tricep Extensions", sets: 3, reps: "15 reps", completed: false },
  ],
};

const upcomingWorkouts = [
  {
    id: 1,
    name: "Lower Body Power",
    date: "Tomorrow",
    time: "10:00 AM",
    trainer: "Mike Johnson",
  },
  {
    id: 2,
    name: "HIIT Cardio",
    date: "Wednesday",
    time: "9:00 AM",
    trainer: "Sarah Wilson",
  },
];

export default function WorkoutsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Workouts</h2>
          <p className="text-muted-foreground">
            Track your workouts and progress
          </p>
        </div>
        <Button asChild>
          <Link href="/Dashboard/Member/workouts/schedule">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Workout
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Workout</CardTitle>
            <CardDescription>
              {currentWorkout.name} - {currentWorkout.remainingTime} remaining
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{currentWorkout.progress}%</span>
                </div>
                <Progress value={currentWorkout.progress} />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Exercises</h4>
                {currentWorkout.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted"
                  >
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4" />
                      <span>{exercise.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {exercise.sets} sets × {exercise.reps}
                      </span>
                      <Badge variant={exercise.completed ? "default" : "secondary"}>
                        {exercise.completed ? "Completed" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full">Complete Workout</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Workouts</CardTitle>
              <CardDescription>Your scheduled sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{workout.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {workout.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {workout.time}
                        </div>
                      </div>
                      <p className="text-sm">with {workout.trainer}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
              <CardDescription>Your fitness journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span>Weekly Goal</span>
                  </div>
                  <Badge>3/5 workouts</Badge>
                </div>
                <Progress value={60} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 