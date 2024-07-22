import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Task Manager | Your Ultimate Trello Clone",
    template: "%s | Task Manager",
  },
  description:
    "Experience seamless project management with Task Manager, your ultimate Trello clone. Organize tasks, collaborate with your team, and boost productivity with our intuitive and feature-rich application.",
  keywords: [
    "Task Manager",
    "Trello clone",
    "project management",
    "task organization",
    "team collaboration",
    "productivity tool",
    "Kanban board",
    "task tracking",
    "project planning",
    "workflow management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
