"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/Authcontextapi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Permits() {
  const router = useRouter();
  const { data: session, status } = useSession();
  // Access auth context and safely read optional getUserPermits method (if implemented)
  const auth = useAuth() as unknown as {
    getUserPermits?: (userId: string) => Promise<any[]>;
  };
  const getUserPermits = auth?.getUserPermits;
  const [permits, setPermits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login/tourist?next=/permits");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id && typeof getUserPermits === "function") {
      // Fetch user's permits
      getUserPermits(session.user.id)
        .then((data: any[]) => {
          setPermits(data || []);
        })
        .catch((error: unknown) => {
          console.error("Error fetching permits:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (status === "authenticated") {
      setLoading(false);
    }
  }, [session, status, getUserPermits]);

  if (status !== "authenticated") {
    return (
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="container mx-auto py-12 px-4">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="text-center text-gray-600 mb-4">Redirecting to login…</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Permits</h1>
            <Button asChild>
              <Link href="/permits/apply">Apply for New Permit</Link>
            </Button>
          </div>

          {loading ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-600">Loading your permits...</p>
              </CardContent>
            </Card>
          ) : permits.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">You haven't applied for any permits yet.</p>
                  <Button asChild>
                    <Link href="/permits/apply">Apply for Your First Permit</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {permits.map((permit: any, index: number) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{permit.destination}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Status: </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          permit.status === 'approved' ? 'bg-green-100 text-green-800' :
                          permit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {permit.status}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Travel Dates: </span>
                        <span className="text-gray-600">
                          {Array.isArray(permit.dates) ? permit.dates.join(', ') : permit.dates}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Applied: </span>
                        <span className="text-gray-600">
                          {new Date(permit.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}