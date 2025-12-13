"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TripResults() {
  const router = useRouter();
  const [tripDetails, setTripDetails] = useState({
    location: "Ladakh (General)",
    dates: "2025-09-09 to 2025-09-15",
    groupSize: "4 Adults, 1 Children",
    budget: "₹50,000 - ₹70,000"
  });

  useEffect(() => {
    // Get form data from sessionStorage
    const formData = sessionStorage.getItem('tripFormData');
    if (formData) {
      const parsedData = JSON.parse(formData);
      
      // Format the data for display
      const arrivalDate = parsedData.travelDates?.arrival ? new Date(parsedData.travelDates.arrival).toLocaleDateString() : '2025-09-09';
      const departureDate = parsedData.travelDates?.departure ? new Date(parsedData.travelDates.departure).toLocaleDateString() : '2025-09-15';
      
      setTripDetails({
        location: "Ladakh (General)",
        dates: `${arrivalDate} to ${departureDate}`,
        groupSize: parsedData.groupSize ? `${parsedData.groupSize} people` : "4 Adults, 1 Children",
        budget: parsedData.budget ? `${parsedData.budget} per person` : "₹50,000 - ₹70,000"
      });
    }
  }, []);

  const handleBookNow = (itinerary: any) => {
    // Store selected trip data in sessionStorage
    sessionStorage.setItem('selectedTrip', JSON.stringify({
      title: itinerary.title,
      duration: itinerary.duration,
      price: itinerary.price,
      description: itinerary.description,
      highlights: itinerary.highlights,
      bestFor: itinerary.bestFor
    }));
    
    // Redirect to booking page
    router.push('/tripplanner/booking');
  };

  const itineraries = [
    {
      id: 1,
      title: "Classic Ladakh Experience",
      duration: "7 Days / 6 Nights",
      rating: 4.8,
      reviews: 342,
      price: 45000,
      originalPrice: 52000,
      difficulty: "Easy",
      savings: 7000,
      description: "Perfect for first-time visitors covering all major attractions with comfortable accommodations.",
      highlights: [
        "Leh Palace & Shanti Stupa",
        "Pangong Lake overnight stay",
        "Nubra Valley with camel safari",
        "Magnetic Hill & Gurudwara Pathar Sahib"
      ],
      bestFor: ["Families", "Photography", "Culture"],
      image: "/images/ladakhhero.jpeg"
    },
    {
      id: 2,
      title: "Adventure Seeker's Paradise",
      duration: "10 Days / 9 Nights",
      rating: 4.9,
      reviews: 186,
      price: 65000,
      difficulty: "Challenging",
      description: "High-altitude adventure with trekking, rafting, and extreme sports for thrill seekers.",
      highlights: [
        "Trekking to Markha Valley",
        "White water rafting in Zanskar",
        "Camping at Tso Moriri",
        "Mountain biking in Khardung La"
      ],
      bestFor: ["Adventure", "Trekking", "Extreme Sports"],
      image: "/ladakh-hero.jpg"
    },
    {
      id: 3,
      title: "Spiritual & Cultural Journey",
      duration: "8 Days / 7 Nights",
      rating: 4.7,
      reviews: 234,
      price: 38000,
      originalPrice: 44000,
      difficulty: "Easy",
      savings: 6000,
      description: "Deep cultural immersion with monastery visits, meditation, and authentic local experiences.",
      highlights: [
        "Hemis & Thiksey Monastery visits",
        "Buddhist meditation sessions",
        "Local village homestays",
        "Traditional Ladakhi cuisine experiences"
      ],
      bestFor: ["Spirituality", "Culture", "Photography"],
      image: "/handicrafts.jpg"
    },
    {
      id: 4,
      title: "Luxury Ladakh Retreat",
      duration: "6 Days / 5 Nights",
      rating: 4.9,
      reviews: 98,
      price: 85000,
      difficulty: "Easy",
      description: "Luxurious experience with premium accommodations, private transfers, and exclusive access.",
      highlights: [
        "Stay in luxury eco-resorts",
        "Private helicopter to Pangong",
        "Exclusive dining experiences",
        "Spa treatments with mountain views"
      ],
      bestFor: ["Luxury", "Honeymoon", "Relaxation"],
      image: "/images/hotelguide/hotel-bg.jpg"
    }
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/tripplanner" className="flex items-center text-white hover:text-blue-200 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Trip Planner
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">AI-Powered Trip Recommendations</h1>
            </div>
            <p className="text-xl text-blue-100">Personalized itineraries based on your preferences</p>
          </div>
        </div>
      </div>

      {/* Trip Details Section */}
      <div className="bg-blue-600 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-blue-500 rounded-lg p-4">
            <h2 className="text-white text-lg font-semibold mb-3">Your Trip Details</h2>
            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{tripDetails.location}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{tripDetails.dates}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span>{tripDetails.groupSize}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>{tripDetails.budget}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Perfect Itineraries for Your Ladakh Adventure
          </h2>
          <p className="text-lg text-gray-600">
            Our AI has analyzed your preferences and curated these amazing experiences
          </p>
        </div>

        {/* Itinerary Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {itineraries.map((itinerary) => (
            <div key={itinerary.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image with overlay tags */}
              <div className="relative h-48">
                <Image
                  src={itinerary.image}
                  alt={itinerary.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    itinerary.difficulty === 'Easy' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {itinerary.difficulty}
                  </span>
                </div>
                {itinerary.savings && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                      Save ₹{itinerary.savings.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{itinerary.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{itinerary.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-sm">{itinerary.rating} ({itinerary.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">₹{itinerary.price.toLocaleString()}</div>
                    {itinerary.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">₹{itinerary.originalPrice.toLocaleString()}</div>
                    )}
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{itinerary.description}</p>

                {/* Trip Highlights */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Trip Highlights:</h4>
                  <ul className="space-y-1">
                    {itinerary.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For Tags */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {itinerary.bestFor.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleBookNow(itinerary)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                  >
                    Book Now
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Actions */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Don't see what you're looking for?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded">
              Customize Your Trip
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded">
              Get Expert Consultation
            </button>
          </div>
        </div>
      </div>
    </main>
    );
}
