"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface SharedLayoutProps {
  children: React.ReactNode;
}

export function SharedLayout({ children }: SharedLayoutProps) {
  const pathname = usePathname();


  const isAppPath = pathname.startsWith("/app");
  const isDashboardPath = pathname.startsWith("/Dashboard");


  if (!isAppPath && !isDashboardPath) {
    return <>{children}</>;
  }

  // Render App sidebar specific layout
  if (isAppPath) {
     return (
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" pathname={pathname} />
        <SidebarInset>
          <SiteHeader pathname={pathname} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // Render children directly for Dashboard paths
  if (isDashboardPath) {
      return <>{children}</>;
  }

   // Default case, should not be reached if all paths are covered
   return <>{children}</>;
}
