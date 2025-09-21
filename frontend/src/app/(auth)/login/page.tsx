"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to tourist login by default
    router.replace('/login/tourist');
  }, [router]);

  // This is a simple redirect page
  // The actual login functionality is in the specific login pages (tourist, admin, etc.)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Redirecting to login...</h1>
        <p>Please wait while we redirect you to the login page.</p>
      </div>
    </div>
  );
}