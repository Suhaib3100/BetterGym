"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, Calendar, Dumbbell, Star, Users } from "lucide-react";

// Mock data for demonstration
const trainers = [
  {
    id: 1,
    name: "Mike Johnson",
    email: "mike@example.com",
    specialization: "Strength Training",
    status: "Available",
    clients: 18,
    rating: 4.8,
    nextSession: "Today, 2:00 PM",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    specialization: "Yoga & Pilates",
    status: "Busy",
    clients: 15,
    rating: 4.9,
    nextSession: "Tomorrow, 9:00 AM",
  },
   {
    id: 3,
    name: "David Lee",
    email: "david@example.com",
    specialization: "Cardio & HIIT",
    status: "Available",
    clients: 10,
    rating: 4.5,
    nextSession: "Today, 4:00 PM",
  },
];

export default function TrainersPage() {
  // Calculate average rating
  const totalRating = trainers.reduce((sum, trainer) => sum + trainer.rating, 0);
  const averageRating = trainers.length > 0 ? (totalRating / trainers.length).toFixed(1) : "N/A";

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Trainers</h2>
          <p className="text-muted-foreground">
            Manage your gym trainers and their schedules
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/Dashboard/Manager/trainers/schedule">
              <Calendar className="mr-2 h-4 w-4" />
              View Schedule
            </Link>
          </Button>
          <Button asChild>
            <Link href="/Dashboard/Manager/trainers/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Trainer
            </Link>
          </Button>
        </div>
      </div>

      {/* Trainer Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full px-4 lg:px-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trainers</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainers.length}</div>
            <p className="text-xs text-muted-foreground">All gym trainers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Trainers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainers.filter(t => t.status === 'Available').length}</div>
            <p className="text-xs text-muted-foreground">Currently available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating}</div>
            <p className="text-xs text-muted-foreground">Across all trainers</p>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full px-4 lg:px-6">
        <CardHeader>
          <CardTitle>Trainer List</CardTitle>
          <CardDescription>
            View and manage all gym trainers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search trainers..." className="pl-8" />
            </div>
            <Button variant="outline">
              <MoreHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Clients</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Next Session</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainers.map((trainer) => (
                <TableRow key={trainer.id}>
                  <TableCell className="font-medium">{trainer.name}</TableCell>
                  <TableCell>{trainer.email}</TableCell>
                  <TableCell>{trainer.specialization}</TableCell>
                  <TableCell>
                    <Badge variant={trainer.status === "Available" ? "default" : "secondary"}>
                      {trainer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{trainer.clients}</TableCell>
                  <TableCell>{trainer.rating}/5.0</TableCell>
                   <TableCell className="text-muted-foreground text-sm">{trainer.nextSession}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/Dashboard/Manager/trainers/${trainer.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 