"use client";

import { GymSidebar } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <GymSidebar />
        <div className="flex-grow flex-shrink-0 basis-0 min-w-0 bg-red-500/30">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
} 