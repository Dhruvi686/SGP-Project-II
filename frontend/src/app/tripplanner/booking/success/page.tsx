"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function BookingSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("bookingId");
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("Processing confirmation...");

  useEffect(() => {
    async function confirm() {
      if (!bookingId) {
        setStatus("Missing booking id.");
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${bookingId}/confirm-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          setStatus(err.message || "Failed to confirm payment.");
          return;
        }

        setStatus("Payment received. Your booking is confirmed — check your email for details.");
      } catch (err) {
        console.error(err);
        setStatus("Error confirming payment. Please contact support.");
      }
    }

    confirm();
  }, [bookingId, sessionId]);

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmed</h1>
      <p className="mb-4">{status}</p>
      <button onClick={() => router.push('/tripplanner')} className="bg-blue-600 text-white px-4 py-2 rounded">Go to Trip Planner</button>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Suspense fallback={
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p className="mb-4">Processing your booking confirmation...</p>
        </div>
      }>
        <BookingSuccess />
      </Suspense>
    </main>
  );
}
