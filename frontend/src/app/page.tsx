"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { toast } from 'sonner';

// HeroSection Component
function HeroSection() {
  const router = useRouter();
  return (
    <div className="w-full max-w-5xl pt-12 pb-8 px-4 mx-auto">
      <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded mb-4 shadow inline-block">
        Official Government Portal
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Discover the Magic of <span className="text-orange-400">Ladakh</span>
      </h1>
      <p className="text-white text-lg mb-6 max-w-2xl">
        Your trusted gateway to authentic <span className="text-blue-200">Ladakh</span> experiences. Book directly with locals, get real-time updates, and <span className="text-blue-200">explore</span> responsibly with government-verified services.
      </p>
      <div className="flex gap-4 mb-8">
        <button onClick={() => router.push('/plan-trip')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow">
          Start Planning your Trip
        </button>
        <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2 rounded border border-white/40">
          Emergency Services
        </button>
      </div>
      <div className="flex gap-12 mt-4">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-white flex items-center gap-2">
            <span role="img" aria-label="Bookings">📅</span> 1,247
          </span>
          <span className="text-orange-300 text-sm mt-1">Active Bookings Today</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-white flex items-center gap-2">
            <span role="img" aria-label="Partners">🧑‍🤝‍🧑</span> 850+
          </span>
          <span className="text-orange-300 text-sm mt-1">Verified Local Partners</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-white flex items-center gap-2">
            <span role="img" aria-label="Ratings">⭐</span> 4.8
          </span>
          <span className="text-orange-300 text-sm mt-1">Average Ratings</span>
        </div>
      </div>
    </div>
  );
}

// InfoSection Component
function InfoSection() {
  const router = useRouter();
  return (
    <div className="relative w-full flex flex-col items-center mt-0 pb-12 min-h-[700px] text-gray-900">
      {/* Background Image for this section only */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/ladakh-hero.jpg"
          alt="Ladakh Info Background"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-90"
          priority
        />
        {/* Optional: add a dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Content */}
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 mt-16">
        <h2 className="text-lg font-bold flex items-center gap-2 text-blue-900 mb-4">
          <span className="w-3 h-3 bg-yellow-400 rounded-full inline-block" />
          Live Updates
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center justify-between bg-white/40 rounded px-4 py-3 shadow">
            <span className="flex items-center gap-2 text-black-700 font-semibold">
              <span className="text-green-400 text-lg">●</span> Leh 15C, Clear sky
            </span>
            <span className="text-green-700 font-semibold text-xs bg-green-100/80 px-3 py-1 rounded">Ok</span>
          </li>
          <li className="flex items-center justify-between bg-white/40 rounded px-4 py-3 shadow">
            <span className="flex items-center gap-2 text-black font-semibold">
              <span className="text-green-400 text-lg">●</span> Manali-leh Highway: Open
            </span>
            <span className="text-green-700 font-semibold text-xs bg-green-100/80 px-3 py-1 rounded">Ok</span>
          </li>
          <li className="flex items-center justify-between bg-white/40 rounded px-4 py-3 shadow">
            <span className="flex items-center gap-2 text-black font-semibold">
              <span className="text-green-400 text-lg">●</span> Inner Limit Permit: Available
            </span>
            <span className="text-green-700 font-semibold text-xs bg-green-100/80 px-3 py-1 rounded">Ok</span>
          </li>
          <li className="flex items-center justify-between bg-white/40 rounded px-4 py-3 shadow">
            <span className="flex items-center gap-2 text-black font-semibold">
              <span className="text-red-400 text-lg">▲</span> High altitude Advisory
            </span>
            <span className="text-red-700 font-semibold text-xs bg-red-100/80 px-3 py-1 rounded">Caution</span>
          </li>
        </ul>
      </div>
      {/* Quick Access */}
      <div className="w-full max-w-2xl bg-white/60 backdrop-blur-lg rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-black">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button type="button" onClick={() => router.push('/permits')} className="flex items-center gap-2 bg-white/40 hover:bg-blue-100 text-black font-semibold py-3 px-4 rounded border border-white/40 shadow-sm text-left w-full">
            <span className="text-lg">📍</span> Apply Permits
          </button>
          <button type="button" onClick={() => router.push('/weather')} className="flex items-center gap-2 bg-white/40 hover:bg-yellow-100 text-black font-semibold py-3 px-4 rounded border border-white/40 shadow-sm text-left w-full">
            <span className="text-lg">🗝️</span> Weather Alerts
          </button>
          <button type="button" onClick={() => router.push('/guides')} className="flex items-center gap-2 bg-white/40 hover:bg-green-100 text-black font-semibold py-3 px-4 rounded border border-white/40 shadow-sm text-left w-full">
            <span className="text-lg">🧑‍💼</span> Find Guides
          </button>
          <button type="button" onClick={() => router.push('/hotel-guide')} className="flex items-center gap-2 bg-white/40 hover:bg-purple-100 text-black font-semibold py-3 px-4 rounded border border-white/40 shadow-sm text-left w-full">
            <span className="text-lg">🏨</span> Book Hotels
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable centered modal with overlay for Quick Booking
function QBModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// QuickBookingSection Component
function QuickBookingSection() {
  const [activeTab, setActiveTab] = useState<'hotels' | 'transport' | 'guides'>('hotels');
  const [showTransport, setShowTransport] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center bg-blue-50 py-12 px-2">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Quick Booking</h2>
        <p className="text-center text-gray-600 mb-6">Book your Ladakh experience in just a few clicks.</p>

        {/* Tabs */}
        <div className="flex justify-center mb-6 relative z-50 pointer-events-auto">
          <div className="inline-flex rounded-md bg-gray-100 p-1">
            <Link href="/hotel-guide" className={`px-6 py-2 rounded-l-md font-semibold flex items-center gap-2 focus:outline-none cursor-pointer ${activeTab === 'hotels' ? 'bg-white text-gray-900' : 'text-gray-500'}`} role="button">
              <HomeIcon className="h-5 w-5" /> Hotels
            </Link>
            <Link href="/transport" className={`px-6 py-2 font-semibold flex items-center gap-2 focus:outline-none cursor-pointer ${activeTab === 'transport' ? 'bg-white text-gray-900' : 'text-gray-500'}`} role="button">
              <TruckIcon className="h-5 w-5" /> Transport
            </Link>
            <Link href="/guides" className={`px-6 py-2 rounded-r-md font-semibold flex items-center gap-2 focus:outline-none cursor-pointer ${activeTab === 'guides' ? 'bg-white text-gray-900' : 'text-gray-500'}`} role="button">
              <UserGroupIcon className="h-5 w-5" /> Guides
            </Link>
          </div>
        </div>

        {/* Hotels Form */}
        {activeTab === 'hotels' && (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input type="text" placeholder="Select destination" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accommodation Type</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                <option>Select type</option>
                <option>Hotel</option>
                <option>Homestay</option>
                <option>Guest House</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in date</label>
              <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out date</label>
              <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                <option>Select guest</option>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button type="button" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded mb-4 flex items-center justify-center gap-2">
                <span className="material-icons">search</span> Search Accommodation
              </button>
            </div>
          </form>
        )}

        {/* Transport Content */}
        {activeTab === 'transport' && (
          <div id="transport-section" className="space-y-8">
            {/* Transport Hero Section */}
            <div className="bg-green-800 text-white py-8 px-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-3">
                Transport Services in Ladakh
              </h3>
              <p className="text-lg mb-4">
                Safe, reliable, and government-verified transport options for your Ladakh adventure
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button onClick={() => router.push('/transport')} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2">
                  🔍 Find Transport
                </button>
                <button className="border border-white px-6 py-3 rounded-md font-semibold">
                  View Popular Routes
                </button>
              </div>
            </div>

            {/* Transport Booking Form */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-center">Book Your Transport</h4>
              <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                  <input type="text" placeholder="Select pickup location" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Location</label>
                  <input type="text" placeholder="Select drop-off location" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                  <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <option>Select vehicle</option>
                    <option>SUV</option>
                    <option>Sedan</option>
                    <option>Tempo Traveller</option>
                    <option>Bike</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <option>Select (1-20)</option>
                    <option>1-2</option>
                    <option>3-4</option>
                    <option>5-8</option>
                    <option>9-12</option>
                    <option>13-20</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button type="button" onClick={() => router.push('/transport')} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded mb-4 flex items-center justify-center gap-2">
                    <span className="material-icons">search</span> Find Transport
                  </button>
                  <button type="button" onClick={() => setActiveTab('hotels')} className="w-full bg-blue-900 text-white font-semibold py-2 rounded flex items-center justify-center gap-2">
                    <span className="material-icons">arrow_back</span> Back
                  </button>
                </div>
              </form>
            </div>

            {/* Featured Vehicles */}
            <div className="bg-gray-100 py-8 px-6 rounded-lg">
              <h4 className="text-2xl font-bold text-center mb-6">Featured Vehicles</h4>
              <p className="text-center text-gray-600 mb-8">
                Top-rated vehicles with experienced drivers for your Ladakh journey
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Toyota Innova Crysta",
                    price: "₹5,500 /Day",
                    image: "/images/transport/vehicals1.png",
                    passengers: "6 passengers",
                    features: ["4x4 Drive", "Air Conditioning", "Experienced driver"]
                  },
                  {
                    name: "Royal Enfield Himalayan",
                    price: "₹1,800 /Day",
                    image: "/images/transport/vehicals2.png",
                    passengers: "1–2 passengers",
                    features: ["411cc Engine", "Luggage Rack", "Helmet Included"]
                  },
                  {
                    name: "Tempo Traveler",
                    price: "₹8,000 /Day",
                    image: "/images/transport/vehicals3.jpg",
                    passengers: "12 passengers",
                    features: ["Spacious Seating", "Luggage Space", "Experienced driver"]
                  }
                ].map((vehicle, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-all">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="p-4 text-left">
                      <div className="flex justify-between items-start">
                        <h5 className="text-lg font-semibold">{vehicle.name}</h5>
                        <div className="text-green-600 font-medium text-sm">
                          <span className="text-black px-4">From</span> <br /> {vehicle.price}
                        </div>
                      </div>
                      <p className="text-sm text-black mt-1">{vehicle.passengers}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {vehicle.features.map((feature, i) => (
                          <span
                            key={i}
                            className="border-2 border-black px-2 text-xs rounded-xs text-black"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <button className="mt-4 w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition">
                        Book Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Routes */}
            <div className="bg-white py-8 px-6 rounded-lg border">
              <h4 className="text-2xl font-bold text-center mb-6">Popular Routes</h4>
              <p className="text-center text-gray-600 mb-8">
                Discover the most scenic and popular journeys in Ladakh
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Leh to Nubra Valley",
                    distance: "120 km",
                    duration: "4–5 Hours",
                    highlights: ["Khardung la pass", "Sand dunes"],
                    image: "/images/transport/routes1.png"
                  },
                  {
                    title: "Leh to Pangong Lake",
                    distance: "160 km",
                    duration: "5–6 Hours",
                    highlights: ["Chang la pass", "Shey Palace"],
                    image: "/images/transport/routes2.png"
                  },
                  {
                    title: "Manali to Leh",
                    distance: "480 km",
                    duration: "2 days",
                    highlights: ["Moore Plains", "Tanglang La"],
                    image: "/images/transport/routes3.png"
                  },
                  {
                    title: "Srinagar to Leh",
                    distance: "420 km",
                    duration: "2 days",
                    highlights: ["Sonamarg", "Zoji La Pass"],
                    image: "/images/transport/routes4.png"
                  }
                ].map((route, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden shadow-md border hover:shadow-lg transition">
                    <div className="relative">
                      <img
                        src={route.image}
                        alt={route.title}
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded">
                        {route.title}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <div>
                          <span className="block font-medium text-black">Distance</span>
                          {route.distance}
                        </div>
                        <div>
                          <span className="block font-medium text-black">Duration</span>
                          {route.duration}
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="block font-medium text-black text-sm mb-1">
                          Highlights
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {route.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="text-xs border rounded px-2 py-1 text-gray-700"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="mt-2 w-full bg-blue-900 text-white text-sm py-2 rounded-md hover:bg-blue-800 transition">
                        View Route Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Transport modal */}
        {showTransport && (
          <QBModal title="Transport Booking" onClose={() => setShowTransport(false)}>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>Select pickup location</option>
                  <option>Leh</option>
                  <option>Nubra Valley</option>
                  <option>Pangong</option>
              </select>
            </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Location</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>Select drop-off location</option>
                  <option>Leh</option>
                  <option>Nubra Valley</option>
                  <option>Pangong</option>
                </select>
            </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>Select vehicle</option>
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Tempo Traveller</option>
                  <option>Bike</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>Select passengers</option>
                  <option>1-2</option>
                  <option>3-4</option>
                  <option>5-8</option>
                  <option>9-12</option>
                  <option>13-20</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-3 mt-2">
                <button type="button" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded">Find Transport</button>
                <button type="button" onClick={() => setShowTransport(false)} className="w-full bg-blue-900 text-white font-semibold py-2 rounded">Back</button>
              </div>
            </form>
          </QBModal>
        )}

        {/* Guides modal */}
        {showGuides && (
          <QBModal title="Find Guides" onClose={() => setShowGuides(false)}>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>Select location</option>
                  <option>Leh</option>
                  <option>Nubra Valley</option>
                  <option>Pangong</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>Select language</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Ladakhi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Date</label>
                <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                <option>Select duration</option>
                <option>Half day</option>
                <option>Full day</option>
                <option>Multi-day</option>
              </select>
            </div>
              <div className="md:col-span-2 flex flex-col gap-3 mt-2">
                <button type="button" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded">Find Guides</button>
                <button type="button" onClick={() => setShowGuides(false)} className="w-full bg-blue-900 text-white font-semibold py-2 rounded">Back</button>
            </div>
          </form>
          </QBModal>
        )}
      </div>
    </div>
  );
}

// EssentialServicesSection Component
function EssentialServicesSection() {
  const services = [
    {
      icon: '🏨',
      image: '/accommodation.jpg',
      title: 'Accomodation',
      desc: 'Hotels, homestays, and guesthouses',
      features: ['Verified properties', 'Best price Guarantee', 'Direct booking'],
      button: 'Explore Accommodation',
    },
    {
      icon: '🚌',
      image: '/transport.jpg',
      title: 'Transport',
      desc: 'Cabs, rentals, and motorcycle tours',
      features: ['Licensed drivers', 'GPS tracking', '24/7 Support'],
      button: 'Explore Transport',
    },
    {
      icon: '🥾',
      image: '/guides.jpg',
      title: 'Local Guides',
      desc: 'Certified guides for authentic experiences',
      features: ['Multiple languages', 'Verified locals', 'Unique itineraries'],
      button: 'Explore Local Guides',
    },
    {
      icon: '🎉',
      image: '/events.jpg',
      title: 'Events & Festivals',
      desc: 'Experience Ladakh’s rich cultural heritage',
      features: ['Festival calendar', 'Event coverage', 'Local connect'],
      button: 'Explore Events & Festivals',
    },
    {
      icon: '🛍️',
      image: '/handicrafts.jpg',
      title: 'Handicrafts',
      desc: 'Authentic Ladakhi products and crafts',
      features: ['Shop from locals', 'Quality assurance', 'Unique souvenirs'],
      button: 'Explore Handicrafts',
    },
    {
      icon: '📄',
      image: '/permits.jpg',
      title: 'Permits & Documentation',
      desc: 'Easy online permit application',
      features: ['High pass permits', 'Quick approval', 'Guided assistance'],
      button: 'Explore Permits & Documentation',
    },
  ];
  // Add icon SVGs and color for each service
  const serviceIcons = [
    // Accommodation: black house on yellow
    <div className="bg-yellow-400 rounded-md p-1 flex items-center justify-center" style={{width:28,height:28}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="10" width="18" height="10" rx="2" fill="none"/>
        <path d="M9 21V13h6v8" />
        <path d="M3 10l9-7 9 7" />
      </svg>
    </div>,
    // Transport: black bus on blue
    <div className="bg-blue-400 rounded-md p-1 flex items-center justify-center" style={{width:28,height:28}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="7" width="18" height="10" rx="2" fill="none"/>
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="16.5" cy="17.5" r="1.5" />
        <path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
      </svg>
    </div>,
    // Local Guides: black user on green
    <div className="bg-green-400 rounded-md p-1 flex items-center justify-center" style={{width:28,height:28}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1" />
      </svg>
    </div>,
    // Events & Festivals: black party popper on orange
    <div className="bg-orange-400 rounded-md p-1 flex items-center justify-center" style={{width:28,height:28}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M2 22l14-6 6-14-14 6-6 14z" />
        <path d="M16 6l3 3" />
        <path d="M12 12l3 3" />
      </svg>
    </div>,
    // Handicrafts: black shopping bag on pink
    <div className="bg-pink-400 rounded-md p-1 flex items-center justify-center" style={{width:28,height:28}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M6 2l1.5 4h9L18 2" />
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    </div>,
    // Permits: black document on teal
    <div className="bg-teal-400 rounded-md p-1 flex items-center justify-center" style={{width:28,height:28}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8M8 10h8M8 14h6" />
      </svg>
    </div>,
  ];
  return (
    <div className="w-full flex flex-col items-center py-16 px-2 bg-white">
      <h2 className="text-3xl font-bold text-center mb-2">Essential Services for Your Journey</h2>
      <p className="text-center text-gray-600 mb-10 max-w-2xl">Everything you need for a perfect Ladakh experience, all in one place.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-8">
        {services.map((service, idx) => (
          <div key={service.title} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100">
            <div className="relative h-40 w-full">
              <img src={service.image} alt={service.title} className="object-cover w-full h-full" />
              <span className="absolute top-3 left-3">{serviceIcons[idx]}</span>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-bold mb-1">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
              <ul className="mb-4 flex-1">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center text-black text-sm mb-1">
                    {/* Green check SVG icon */}
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2.5 2.5L16 9" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow text-sm w-full">{service.button} <span className="ml-1">→</span></button>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 px-8 py-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 font-semibold text-gray-700 shadow">View Services <span className="ml-1">→</span></button>
    </div>
  );
}

// CoreFeaturesSection Component
function CoreFeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" /></svg>
      ),
      title: 'User-Friendly Interface',
      desc: 'Simple and smooth navigation designed for all users.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 12h8M12 8v8" /></svg>
      ),
      title: 'Direct Booking System',
      desc: 'Book hotels, guides & transport without middlemen.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
      ),
      title: 'Real-Time Updates',
      desc: 'Live road, permit & weather information for safe travel.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
      ),
      title: 'Multilingual Support',
      desc: 'Use the platform in your preferred language.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" /><path d="M7 17v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" /></svg>
      ),
      title: 'Secure Payments',
      desc: 'Fraud-protected online transactions.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
      ),
      title: 'Verified Reviews',
      desc: 'Read user feedback for hotels and services.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 8v4l3 3" /></svg>
      ),
      title: '24/7 Help Support',
      desc: 'Assistance via chat and phone anytime.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
      ),
      title: 'Smart Search Filters',
      desc: 'Easily find tickets, guides or activities.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 16h8" /></svg>
      ),
      title: 'Offline Access',
      desc: 'Use the app even without Internet.',
    },
  ];
  return (
    <div className="w-full flex flex-col items-center py-16 px-2 bg-blue-50">
      <h2 className="text-3xl font-bold text-center mb-2">Comprehensive Tourist Platform</h2>
      <p className="text-center text-gray-600 mb-8 max-w-2xl">A Complete ecosystem supporting travelers, local business, and sustainable tourism in Ladakh.</p>
      <div className="flex items-center w-full max-w-5xl mb-6">
        <span className="mr-2 text-2xl">🎉</span>
        <span className="font-bold text-lg">Core Features</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {features.map((feature, idx) => (
          <div key={feature.title} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative">
            <div className="flex items-center gap-3 mb-2">
              {feature.icon}
              <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded">Core</span>
            </div>
            <div className="font-bold text-lg text-gray-900">{feature.title}</div>
            <div className="text-gray-500 text-sm">{feature.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// TravelPlanningSection Component
function TravelPlanningSection() {
  return (
    <div className="w-full flex flex-col items-center py-12 px-2 bg-white">
      <h2 className="text-3xl font-bold text-center mb-2">Travel Planning</h2>
      <p className="text-center text-gray-600 mb-10 max-w-2xl">Everything you need to plan your trip to Ladakh, from permits to accommodations.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" /><path d="M7 17v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" /></svg>
            <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded">Experiences</span>
          </div>
          <div className="font-bold text-lg text-gray-900">Homestays & Hotels</div>
          <div className="text-gray-500 text-sm">Book authentic stays across Ladakh.</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
            <span className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded">Economy</span>
          </div>
          <div className="font-bold text-lg text-gray-900">Local Market Directory</div>
          <div className="text-gray-500 text-sm">Explore markets and support artisans.</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
            <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded">Safety</span>
          </div>
          <div className="font-bold text-lg text-gray-900">Safety & Emergency</div>
          <div className="text-gray-500 text-sm">Get help and stay safe during your visit.</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
            <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded">General</span>
          </div>
          <div className="font-bold text-lg text-gray-900">Digital Permits</div>
          <div className="text-gray-500 text-sm">Manage and apply for permits easily.</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
            <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded">Eco-Friendly</span>
          </div>
          <div className="font-bold text-lg text-gray-900">Eco-Friendly Tools</div>
          <div className="text-gray-500 text-sm">Minimize your impact, support eco-initiatives.</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
            <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded">General</span>
          </div>
          <div className="font-bold text-lg text-gray-900">Crowd Management</div>
          <div className="text-gray-500 text-sm">Stay informed for sustainability & safety.</div>
        </div>
      </div>
    </div>
  );
}

// Accommodation & Experiences Section
function AccommodationExperiencesSection() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" /><path d="M7 17v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" /></svg>
      ),
      title: 'Homestays & Hotels',
      desc: 'Book authentic stays across Ladakh.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
      ),
      title: 'AR & Interactive Maps',
      desc: 'Augmented reality and route planning tools.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
      ),
      title: 'Local Experience',
      desc: 'Access cultural workshops, treks, and activities.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" /><circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" /><path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" /></svg>
      ),
      title: 'Transport Rentals',
      desc: 'Taxi services, bike rentals and more.',
    },
  ];
  return (
    <div className="w-full flex flex-col items-center py-12 px-2 bg-blue-50">
      <div className="flex items-center w-full max-w-5xl mb-6">
        <span className="mr-2 text-2xl">🛏️</span>
        <span className="font-bold text-2xl">Accommodation & Experiences</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {features.map((feature, idx) => (
          <div key={feature.title} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative">
            <div className="flex items-center gap-3 mb-2">
              {feature.icon}
              <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded">Experiences</span>
            </div>
            <div className="font-bold text-lg text-gray-900">{feature.title}</div>
            <div className="text-gray-500 text-sm">{feature.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Local Economy & Artisan Support Section
function LocalEconomySection() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
      ),
      title: 'Handicraft E-commerce',
      desc: 'Buy authentic Ladakhi products online.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
      ),
      title: 'Local Market Directory',
      desc: 'Explore markets and support artisans.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
      ),
      title: 'Local Business Support',
      desc: 'Visibility and booking for local businesses.',
    },
  ];
  return (
    <div className="w-full flex flex-col items-center py-12 px-2 bg-blue-50">
      <div className="flex items-center w-full max-w-5xl mb-6">
        <span className="mr-2 text-2xl">🏪</span>
        <span className="font-bold text-2xl">Local Economy & Artisan Support</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {features.map((feature, idx) => (
          <div key={feature.title} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative">
            <div className="flex items-center gap-3 mb-2">
              {feature.icon}
              <span className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded">Economy</span>
            </div>
            <div className="font-bold text-lg text-gray-900">{feature.title}</div>
            <div className="text-gray-500 text-sm">{feature.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cultural, Environmental & Safety Section
function CulturalSafetySection() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
      ),
      title: 'Culture & Etiquette Guide',
      desc: 'Learn how to respect local traditions.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
      ),
      title: 'Flora & Fauna Info',
      desc: 'Discover Ladakh’s unique natural beauty.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
      ),
      title: 'Safety & Emergency',
      desc: 'Get help and stay safe during your visit.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
      ),
      title: 'Digital Permits',
      desc: 'Manage and apply for permits easily.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
      ),
      title: 'Eco-Friendly Tools',
      desc: 'Minimize your impact, support eco-initiatives.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8v8H8z" /></svg>
      ),
      title: 'Crowd Management',
      desc: 'Stay informed for sustainability & safety.',
    },
  ];
  return (
    <div className="w-full flex flex-col items-center py-12 px-2 bg-blue-50">
      <div className="flex items-center w-full max-w-5xl mb-6">
        <span className="mr-2 text-2xl">🛡️</span>
        <span className="font-bold text-2xl">Cultural, Environmental & Safety</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {features.map((feature, idx) => (
          <div key={feature.title} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative">
            <div className="flex items-center gap-3 mb-2">
              {feature.icon}
              <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded">Safety</span>
            </div>
            <div className="font-bold text-lg text-gray-900">{feature.title}</div>
            <div className="text-gray-500 text-sm">{feature.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Revenue & Growth Section
function RevenueGrowthSection() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 12h8M12 8v8" /></svg>
      ),
      title: 'Transparent Revenue',
      desc: 'Income via bookings, ads, and product sales',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 8v4l3 3" /></svg>
      ),
      title: 'Fair Pricing',
      desc: 'Avoid exploitation by third parties',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
      ),
      title: 'Skill Development',
      desc: 'Train locals in digital tourism and offer employment',
    },
  ];
  return (
    <div className="w-full flex flex-col items-center py-16 px-2 bg-blue-50">
      <div className="flex items-center w-full max-w-5xl mb-6">
        <span className="mr-2 text-2xl">💸</span>
        <span className="font-bold text-2xl">Revenue & Growth</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-8">
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              {features[0].icon}
              <span className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded">Economy</span>
            </div>
            <div className="font-bold text-lg text-gray-900">{features[0].title}</div>
            <div className="text-gray-500 text-sm">{features[0].desc}</div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              {features[1].icon}
              <span className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded">Economy</span>
            </div>
            <div className="font-bold text-lg text-gray-900">{features[1].title}</div>
            <div className="text-gray-500 text-sm">{features[1].desc}</div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 relative">
            <div className="flex items-center gap-3 mb-2">
              {features[2].icon}
              <span className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded">Economy</span>
            </div>
            <div className="font-bold text-lg text-gray-900">{features[2].title}</div>
            <div className="text-gray-500 text-sm">{features[2].desc}</div>
          </div>
        </div>
      </div>
      <button className="mt-4 px-8 py-3 rounded bg-red-600 hover:bg-red-700 text-white font-semibold text-lg shadow">Explore All Features</button>
    </div>
  );
}


// Main DashboardPage
export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Section: Hero with background image */}
      <div className="relative bg-[#181d27] w-full flex flex-col items-center justify-start pt-44 md:pt-56 pb-20 min-h-[90vh]">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/ladakh-hero.jpg"
            alt="Ladakh Hero Background"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <HeroSection />
      </div>
      <InfoSection />
      <QuickBookingSection />
      <EssentialServicesSection />
      <CoreFeaturesSection />
      <TravelPlanningSection />
      <AccommodationExperiencesSection />
      <LocalEconomySection />
      <CulturalSafetySection />
      <RevenueGrowthSection />
    </div>
  );
}
