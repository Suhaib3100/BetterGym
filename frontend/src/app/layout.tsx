import { ThemeProvider } from "@/components/theme-provider";
import { SharedLayout } from "@/components/shared-layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gym Management System",
  description: "A comprehensive gym management system",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = (await headersList).get('x-invoke-path') || "";

  // Check if the current route is under the Dashboard path
  const isDashboardRoute = pathname.startsWith('/Dashboard');

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SharedLayout>
            {/* Conditionally remove flex/padding for dashboard routes */}
            <main className={isDashboardRoute ? "" : "flex flex-col gap-4 py-4 md:gap-6 md:py-6"}>
              {children}
            </main>
          </SharedLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
