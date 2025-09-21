"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const fetchBookings = async (token: string) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default function Bookings() {
  const { data: session } = useSession();
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchBookings(localStorage.getItem("token") || ""),
    enabled: !!session,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">My Bookings</h2>
        {isLoading ? (
          <p>Loading bookings...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings?.map((booking: any) => (
              <Card key={booking._id}>
                <CardHeader>
                  <CardTitle>{booking.tourId.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Amount: ₹{booking.amount}</p>
                  <p>Status: {booking.status}</p>
                  <p>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}