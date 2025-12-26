"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type BackendAuthResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  token?: string;
  user?: { id: string; name: string; email: string; role?: string };
};

export default function GoogleAuthCallbackPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const run = async () => {
      if (status === "loading") return;
      if (status === "unauthenticated") {
        router.replace("/auth/register");
        return;
      }

      const idToken = session?.idToken;
      if (!idToken) {
        setError("Google sign-in did not return an id_token. Check your Google OAuth client settings.");
        return;
      }

      let role = "Tourist";
      try {
        if (typeof window !== "undefined") {
          role = window.sessionStorage.getItem("signup_role") || role;
        }
      } catch {}

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken, role }),
        });

        const data = (await res.json()) as BackendAuthResponse;
        if (!res.ok) {
          throw new Error(data.error || data.message || "Google authentication failed");
        }

        if (!data.token || !data.user) {
          throw new Error("Backend did not return token/user");
        }

        // Persist into the app's AuthContext storage so the rest of the app treats the user as logged in.
        if (typeof window !== "undefined") {
          window.localStorage.setItem("ladakh_auth", JSON.stringify({ user: data.user, token: data.token }));
        }

        router.replace("/dashboard");
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Google authentication failed";
        setError(message);
      }
    };

    run();
  }, [router, session, status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">Signing you in…</h1>
        <p className="text-sm text-gray-600 mt-2">
          Completing Google authentication.
        </p>

        {error && (
          <div className="mt-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
