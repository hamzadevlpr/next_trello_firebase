"use client";

import Dashboard from "@/app/Hompage/Dashboard";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const [user, setUser] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return;
  }

  return <Dashboard />;
}
