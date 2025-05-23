"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, DollarSign, Clock } from "lucide-react";
import { AddMemberForm } from "@/components/members/AddMemberForm";
import { MembersList } from "@/components/members/MembersList";

interface MemberStats {
  total: number;
  active: number;
  upcomingPayments: number;
}

export default function MembersPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [stats, setStats] = useState<MemberStats>({
    total: 0,
    active: 0,
    upcomingPayments: 0,
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  async function fetchStats() {
    try {
      const response = await fetch("http://localhost:3001/api/manager/members");
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }
      const members = await response.json();
      
      setStats({
        total: members.length,
        active: members.filter((m: any) => m.membership_status === "active").length,
        upcomingPayments: members.length, // This should be calculated based on payment dates
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }

  const handleMemberAdded = () => {
    setShowAddForm(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Members</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {showAddForm ? "Cancel" : "Add Member"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All registered members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingPayments}</div>
            <p className="text-xs text-muted-foreground">Due in next 30 days</p>
          </CardContent>
        </Card>
      </div>

      {showAddForm && (
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Add New Member</h2>
          <AddMemberForm onSuccess={handleMemberAdded} />
        </div>
      )}

      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">All Members</h2>
        <MembersList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
} 