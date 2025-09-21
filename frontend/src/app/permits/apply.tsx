"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/lib/Authcontextapi";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function ApplyPermit() {
  const { data: session } = useSession();
  const { applyForPermit } = useAuth();
  const [formData, setFormData] = useState({ destination: "", dates: "" });
  const mutation = useMutation({
    mutationFn: () =>
      applyForPermit({
        userId: session?.user?.id || "",
        ...formData,
        dates: formData.dates.split(","),
      }),
    onSuccess: () => {
      alert("Permit application submitted!");
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Permit application failed");
    },
  });

  const handleSubmit = () => {
    if (!session) {
      alert("Please log in to apply for a permit");
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href="/permits">← Back to Permits</Link>
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Apply for Inner Line Permit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    type="text"
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
                    placeholder="e.g., Nubra Valley"
                  />
                </div>
                <div>
                  <Label htmlFor="dates">Travel Dates (comma-separated)</Label>
                  <Input
                    id="dates"
                    type="text"
                    value={formData.dates}
                    onChange={(e) =>
                      setFormData({ ...formData, dates: e.target.value })
                    }
                    placeholder="e.g., 2025-07-10,2025-07-11"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={mutation.isPending}
                  className="w-full"
                >
                  {mutation.isPending ? "Applying..." : "Apply for Permit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
