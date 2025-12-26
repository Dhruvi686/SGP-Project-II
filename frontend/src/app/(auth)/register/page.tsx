"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to check if a booking is expired
  const isBookingExpired = (tripDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    const bookingDate = new Date(tripDate);
    bookingDate.setHours(0, 0, 0, 0); // Reset time to start of day
    return bookingDate < today;
  };

  useEffect(() => {
    console.log('MyBookingsPage: Session status:', status);
    console.log('MyBookingsPage: Session data:', session);

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated" && session?.user?.email) {
      console.log('MyBookingsPage: User authenticated with email:', session.user.email);
      fetchBookings(session.user.email);
    }
  }, [status, session, router]);

  const fetchBookings = async (email: string) => {
    console.log('MyBookingsPage: Fetching bookings for email:', email);
    try {
      // Fetch bookings filtered by the user's email
      const response = await fetch(`/api/bookings?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        console.log('MyBookingsPage: Received bookings data:', data);
        setBookings(data);
      } else {
        console.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No bookings found for {session?.user?.email}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => {
              const expired = isBookingExpired(booking.tripDate || booking.date);
              return (
                <div key={booking._id || index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{booking.destination || "Trip"}</h3>
                        {expired && (
                          <div className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-semibold rounded-full flex items-center">
                            <span className="mr-1">🎉</span>
                            Trip Completed
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">Date: {booking.tripDate || booking.date ? new Date(booking.tripDate || booking.date).toLocaleDateString() : 'N/A'}</p>
                      <p className="text-gray-600">Status: <span className="font-medium text-blue-600">{booking.status || booking.paymentStatus || "Pending"}</span></p>
                      {booking.seats && <p className="text-gray-600">Travelers: {booking.seats} {booking.seats === 1 ? 'person' : 'people'}</p>}
                      {expired && (
                        <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-purple-800">
                                🎉 Your trip has been completed! Hope you had an amazing experience in Ladakh!
                              </p>
                              <p className="text-xs text-purple-600 mt-1">
                                Thank you for choosing us. We look forward to serving you again!
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">₹{booking.price || booking.amount || 0}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}