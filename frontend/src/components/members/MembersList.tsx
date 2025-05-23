"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  join_date: string;
  membership_type: "basic" | "premium" | "vip";
  membership_status: "active" | "inactive" | "suspended";
}

interface MembersListProps {
  refreshTrigger?: number;
}

export function MembersList({ refreshTrigger = 0 }: MembersListProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, [refreshTrigger]);

  async function fetchMembers() {
    try {
      const response = await fetch("http://localhost:3001/api/manager/members");
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      toast.error("Failed to fetch members");
      console.error("Error fetching members:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const getMembershipTypeColor = (type: string) => {
    switch (type) {
      case "basic":
        return "bg-blue-500";
      case "premium":
        return "bg-purple-500";
      case "vip":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-500";
      case "suspended":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return <div>Loading members...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Membership</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.phone}</TableCell>
              <TableCell>
                {new Date(member.join_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge className={getMembershipTypeColor(member.membership_type)}>
                  {member.membership_type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(member.membership_status)}>
                  {member.membership_status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 