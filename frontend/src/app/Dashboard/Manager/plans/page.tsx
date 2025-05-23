"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, Dumbbell, Users, Utensils, Filter } from "lucide-react";

// Mock data for demonstration
const workoutPlans = [
  {
    id: 1,
    name: "Beginner Strength Training",
    type: "Strength",
    difficulty: "Beginner",
    duration: "8 weeks",
    members: 15,
    status: "Active",
    created: "2024-03-10",
  },
  {
    id: 2,
    name: "Advanced HIIT",
    type: "Cardio",
    difficulty: "Advanced",
    duration: "6 weeks",
    members: 8,
    status: "Active",
    created: "2024-04-01",
  },
   {
    id: 3,
    name: "Weight Loss Program",
    type: "Hybrid",
    difficulty: "Intermediate",
    duration: "12 weeks",
    members: 25,
    status: "Active",
    created: "2024-02-15",
  },
];

const dietPlans = [
  {
    id: 1,
    name: "Keto Diet Plan",
    type: "Keto",
    duration: "Indefinite",
    members: 10,
    status: "Active",
     created: "2024-03-20",
  },
  {
    id: 2,
    name: "Vegetarian Meal Plan",
    type: "Vegetarian",
    duration: "Indefinite",
    members: 18,
    status: "Active",
     created: "2024-04-05",
  },
];

export default function PlansPage() {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Plans</h2>
          <p className="text-muted-foreground">
            Create and manage workout and diet plans
          </p>
        </div>
        <div className="flex gap-2">
           <Button asChild>
            <Link href="/Dashboard/Manager/plans/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Workout Plan
            </Link>
          </Button>
           <Button asChild variant="outline">
            <Link href="/Dashboard/Manager/diet-plans/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Diet Plan
            </Link>
          </Button>
        </div>
      </div>

      {/* Plan Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full px-4 lg:px-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workout Plans</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workoutPlans.length}</div>
            <p className="text-xs text-muted-foreground">Active workout plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Diet Plans</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dietPlans.length}</div>
            <p className="text-xs text-muted-foreground">Active diet plans</p>
          </CardContent>
        </Card>

         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Members on Workout Plans</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workoutPlans.reduce((sum, plan) => sum + plan.members, 0)}</div>
            <p className="text-xs text-muted-foreground">Total members enrolled</p>
          </CardContent>
        </Card>

         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Members on Diet Plans</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dietPlans.reduce((sum, plan) => sum + plan.members, 0)}</div>
            <p className="text-xs text-muted-foreground">Total members enrolled</p>
          </CardContent>
        </Card>
      </div>

      {/* Workout Plans List */}
      <Card className="w-full px-4 lg:px-6">
        <CardHeader>
          <CardTitle>Workout Plans List</CardTitle>
          <CardDescription>
            View and manage all workout plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search workout plans..." className="pl-8" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Status</TableHead>
                 <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workoutPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{plan.difficulty}</Badge>
                  </TableCell>
                  <TableCell>{plan.duration}</TableCell>
                  <TableCell>{plan.members}</TableCell>
                  <TableCell>
                    <Badge variant={plan.status === "Active" ? "default" : "secondary"}>
                      {plan.status}
                    </Badge>
                  </TableCell>
                   <TableCell className="text-muted-foreground text-sm">{plan.created}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/Dashboard/Manager/plans/${plan.id}`}>
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

      {/* Diet Plans List */}
       <Card className="w-full">
        <CardHeader>
          <CardTitle>Diet Plans List</CardTitle>
          <CardDescription>
            View and manage all diet plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search diet plans..." className="pl-8" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dietPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.type}</TableCell>
                  <TableCell>{plan.duration}</TableCell>
                  <TableCell>{plan.members}</TableCell>
                  <TableCell>
                    <Badge variant={plan.status === "Active" ? "default" : "secondary"}>
                      {plan.status}
                    </Badge>
                  </TableCell>
                   <TableCell className="text-muted-foreground text-sm">{plan.created}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/Dashboard/Manager/diet-plans/${plan.id}`}>
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