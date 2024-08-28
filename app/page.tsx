"use client";

import Dashboard from "@/components/dashboard/dashboard";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "@/features/use-session";

export default function Home() {
  const sessionData = useSession();
  console.log("sessionData:", sessionData);
  const session = sessionData?.session;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      <Dashboard session={session} />
      <Toaster />
    </div>
  )
}
