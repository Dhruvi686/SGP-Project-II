"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  tripDate: string;
  seats: number;
  amount: number;
  paymentStatus: string;
  notes: string;
  createdAt: string;
}

export default function BookingOpenedPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-4">Error</div>
          <p className="text-gray-600">{error}</p>
          <Link href="/tripplanner" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Back to Trip Planner
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">Ladakh Tourism</h1>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">Home</Link>
              <Link href="/tours" className="text-gray-700 hover:text-blue-600 font-medium">Tours</Link>
              <Link href="/tripplanner" className="text-gray-700 hover:text-blue-600 font-medium">Plan Trip</Link>
              <Link href="/permits" className="text-gray-700 hover:text-blue-600 font-medium">Permits</Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            </nav>

            {/* Register Button */}
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link href="/tripplanner" className="inline-flex items-center text-blue-200 hover:text-white mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Trip Planner
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Bookings</h1>
          <p className="text-xl text-blue-100">View and manage your Ladakh adventure bookings</p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Bookings Found</h2>
            <p className="text-gray-600 mb-8">You haven't made any bookings yet. Start planning your Ladakh adventure!</p>
            <Link href="/tripplanner" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Plan Your Trip
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Your Bookings ({bookings.length})</h2>
              <button
                onClick={fetchBookings}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Refresh
              </button>
            </div>

            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{booking.name}</h3>
                        <p className="text-gray-600">Booking ID: {booking._id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Email</span>
                        <p className="font-medium">{booking.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Phone</span>
                        <p className="font-medium">{booking.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Trip Date</span>
                        <p className="font-medium">
                          {booking.tripDate ? new Date(booking.tripDate).toLocaleDateString() : 'TBD'}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Seats</span>
                        <p className="font-medium">{booking.seats}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">Amount</span>
                        <p className="text-2xl font-bold text-blue-600">₹{booking.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">Payment Status</span>
                        <div className="flex items-center">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            booking.paymentStatus === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : booking.paymentStatus === 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-4">
                        <span className="text-sm text-gray-500">Notes</span>
                        <p className="text-gray-700 mt-1">{booking.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Booked on {new Date(booking.createdAt).toLocaleDateString()}</span>
                    <div className="flex space-x-4">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View Details
                      </button>
                      <button className="text-red-600 hover:text-red-800 font-medium">
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}