"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Dashboard from "@/app/Hompage/Dashboard";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <ClipLoader size={60}/>
        </div>
      </>
    );
  }

  return <Dashboard />;
}
