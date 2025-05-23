"use client";

import * as React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, CreditCard, Bell, Dumbbell, Utensils, TrendingUp, Activity } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for recent activities
const recentActivities = [
  { id: 1, description: "New member John Doe joined", timestamp: "2 hours ago" },
  { id: 2, description: "Trainer Mike Johnson updated his schedule", timestamp: "yesterday" },
  { id: 3, description: "Membership plan 'Premium' updated", timestamp: "3 days ago" },
];

// Mock data for membership breakdown
const membershipBreakdown = [
  { type: "Premium", count: 120, percentage: "48%" },
  { type: "Standard", count: 90, percentage: "36%" },
  { type: "Basic", count: 38, percentage: "15%" },
];

export default function ManagerDashboard() {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manager Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your gym's operations
          </p>
        </div>
        <div className="flex gap-2">
           <Button asChild>
            <Link href="/Dashboard/Manager/members/add">
              <Users className="mr-2 h-4 w-4" />
              Add Member
            </Link>
          </Button>
           <Button asChild variant="outline">
            <Link href="/Dashboard/Manager/plans/create">
              <Dumbbell className="mr-2 h-4 w-4" />
              Create Plan
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-4 lg:px-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">+12 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trainers</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">All trainers available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full px-4 lg:px-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="trainers">Trainers</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Membership Overview Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Membership Overview</CardTitle>
              <CardDescription>Breakdown of active memberships</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Membership Type</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {membershipBreakdown.map((item) => (
                    <TableRow key={item.type}>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Activities Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                       <Activity className="h-4 w-4 text-muted-foreground" />
                       <span>{activity.description}</span>
                    </div>
                    <span className="text-muted-foreground">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Placeholder for other overview charts/metrics */}
           <div className="grid gap-6 md:grid-cols-2">
             <Card className="w-full">
               <CardHeader>
                 <CardTitle>Revenue Trends</CardTitle>
                 <CardDescription>Monthly revenue performance</CardDescription>
               </CardHeader>
               <CardContent>
                 {/* Chart Placeholder */}
                 <div className="h-48 flex items-center justify-center text-muted-foreground">
                   [Revenue Chart Placeholder]
                 </div>
               </CardContent>
             </Card>
              <Card className="w-full">
               <CardHeader>
                 <CardTitle>New Member Signups</CardTitle>
                 <CardDescription>Monthly new member count</CardDescription>
               </CardHeader>
               <CardContent>
                 {/* Chart Placeholder */}
                 <div className="h-48 flex items-center justify-center text-muted-foreground">
                   [New Member Signups Chart Placeholder]
                 </div>
               </CardContent>
             </Card>
           </div>

        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Member Management</CardTitle>
              <CardDescription>View and manage all gym members</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/Dashboard/Manager/members">View All Members</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trainers" className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Trainer Management</CardTitle>
              <CardDescription>Manage trainers and their schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/Dashboard/Manager/trainers">View All Trainers</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Plan Management</CardTitle>
              <CardDescription>Create and manage workout and diet plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Button asChild>
                  <Link href="/Dashboard/Manager/plans">View All Plans</Link>
                </Button>
                 <Button asChild variant="outline">
                  <Link href="/Dashboard/Manager/diet-plans">View All Diet Plans</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 