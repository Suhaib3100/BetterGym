"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, Calendar, Dumbbell, Star, Users } from "lucide-react";
import { toast } from "sonner";

interface Trainer {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience_years: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/manager/trainers");
      if (!response.ok) {
        throw new Error("Failed to fetch trainers");
      }
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      toast.error("Failed to load trainers");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTrainers = trainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTrainers = trainers.filter((trainer) => trainer.status === "active").length;
  const averageExperience = trainers.length > 0
    ? (trainers.reduce((sum, trainer) => sum + trainer.experience_years, 0) / trainers.length).toFixed(1)
    : "0";

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
      <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-3">
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
            <CardTitle className="text-sm font-medium">Active Trainers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTrainers}</div>
            <p className="text-xs text-muted-foreground">Currently available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Experience</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageExperience} years</div>
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
              <Input 
                placeholder="Search trainers..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                <TableHead>Phone</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Loading trainers...
                  </TableCell>
                </TableRow>
              ) : filteredTrainers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No trainers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTrainers.map((trainer) => (
                  <TableRow key={trainer.id}>
                    <TableCell className="font-medium">{trainer.name}</TableCell>
                    <TableCell>{trainer.email}</TableCell>
                    <TableCell>{trainer.phone}</TableCell>
                    <TableCell>{trainer.specialization}</TableCell>
                    <TableCell>{trainer.experience_years} years</TableCell>
                    <TableCell>
                      <Badge variant={trainer.status === "active" ? "default" : "secondary"}>
                        {trainer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/Dashboard/Manager/trainers/${trainer.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 