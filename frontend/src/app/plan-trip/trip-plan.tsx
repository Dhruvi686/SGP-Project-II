"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/lib/Authcontextapi";
import { useState } from "react";

export default function PlanTrip() {
  const { fetchRecommendations } = useAuth();
  const [formData, setFormData] = useState({
    days: 5,
    budget: 20000,
    interests: "adventure,photography",
  });
  const mutation = useMutation({
    mutationFn: () =>
      fetchRecommendations({
        days: Number(formData.days),
        budget: Number(formData.budget),
        interests: formData.interests.split(",").map((i) => i.trim()),
      }),
    onSuccess: (data) => {
      alert("Recommendations received!");
      console.log(data);
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Failed to fetch recommendations");
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="container mx-auto py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Plan Your Trip</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="days">Number of Days</Label>
                <Input
                  id="days"
                  type="number"
                  value={formData.days}
                  onChange={(e) =>
                    setFormData({ ...formData, days: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget (₹)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label htmlFor="interests">Interests (comma-separated)</Label>
                <Input
                  id="interests"
                  type="text"
                  value={formData.interests}
                  onChange={(e) =>
                    setFormData({ ...formData, interests: e.target.value })
                  }
                  placeholder="e.g., adventure, photography"
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={mutation.isPending}
                className="w-full"
              >
                Get Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
