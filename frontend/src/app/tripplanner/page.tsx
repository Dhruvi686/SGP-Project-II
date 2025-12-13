"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TripPlanner() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDates: {
      arrival: '',
      departure: ''
    },
    groupSize: '',
    budget: '',
    accommodation: '',
    transport: '',
    interests: [] as string[],
    specialRequirements: '',
    transportRequirements: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else if (name === 'interests' && e.target instanceof HTMLSelectElement && e.target.multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({
        ...prev,
        interests: selectedOptions
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Store form data in sessionStorage to pass to results page
    sessionStorage.setItem('tripFormData', JSON.stringify(formData));
    
    // Redirect to results page
    router.push('/tripplanner/results');
  };

  return (
    <main className="bg-white min-h-screen relative" style={{ 
      backgroundImage: "url('/ladakh-hotel.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }}>
      <div className="absolute inset-0 bg-white bg-opacity-80 z-0"></div>
      <div className="relative z-10">
       {/* Hero Section with Background Image */}
       <section 
         className="relative bg-cover bg-center h-64 md:h-80" 
         style={{ backgroundImage: "url('/trip-planner-lake.jpg')" }}
       >
         <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
         <div className="absolute inset-0 flex items-center justify-center">
           <div className="text-center text-white px-4">
             <h1 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Dream Ladakh Trip</h1>
             <p className="text-lg md:text-xl">Customize your journey through the breathtaking landscapes of Ladakh</p>
           </div>
         </div>
       </section>

      {/* Search Bar */}
      <div className="bg-blue-600 py-3 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="w-full md:w-1/3">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full px-4 py-2 rounded border-none focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Destinations</button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Activities</button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Packages</button>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Planning Form */}
      <section className="max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Trip Planning Wizard</h2>
          <p className="text-gray-600 mb-8">Fill in the details below to get a customized itinerary for your Ladakh adventure</p>
          
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Travel Dates */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Travel Dates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Arrival Date</label>
                  <input 
                    type="date" 
                    name="travelDates.arrival"
                    value={formData.travelDates.arrival}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Departure Date</label>
                  <input 
                    type="date" 
                    name="travelDates.departure"
                    value={formData.travelDates.departure}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Group Size */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Group Size</h3>
              <div>
                <select 
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select number of travelers</option>
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3-5">3-5 people</option>
                  <option value="6-10">6-10 people</option>
                  <option value="10+">More than 10 people</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Budget</h3>
              <div>
                <select 
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select your budget range</option>
                  <option value="economy">Economy (₹20,000 - ₹40,000 per person)</option>
                  <option value="standard">Standard (₹40,000 - ₹70,000 per person)</option>
                  <option value="premium">Premium (₹70,000 - ₹1,00,000 per person)</option>
                  <option value="luxury">Luxury (₹1,00,000+ per person)</option>
                </select>
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Areas of Interest</h3>
              <div>
                <select
                  multiple
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  size={4}
                >
                  <option value="leh">Leh</option>
                  <option value="nubra">Nubra Valley</option>
                  <option value="pangong">Pangong Lake</option>
                  <option value="tso-moriri">Tso Moriri</option>
                  <option value="zanskar">Zanskar Valley</option>
                  <option value="kargil">Kargil</option>
                  <option value="all">All major attractions</option>
                </select>
              </div>
            </div>

            {/* Accommodation */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Accommodation Preference</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <select 
                    name="accommodation"
                    value={formData.accommodation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select accommodation type</option>
                    <option value="guesthouse">Guesthouse/Homestay</option>
                    <option value="budget">Budget Hotel</option>
                    <option value="mid-range">Mid-range Hotel</option>
                    <option value="luxury">Luxury Hotel/Resort</option>
                    <option value="camping">Camping</option>
                  </select>
                </div>
                <div>
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>

            {/* Transport */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Transport Preference</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <select 
                    name="transport"
                    value={formData.transport}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select transport type</option>
                    <option value="shared">Shared Taxi/Jeep</option>
                    <option value="private">Private Taxi/Jeep</option>
                    <option value="bike">Motorcycle Rental</option>
                    <option value="self-drive">Self-drive Car Rental</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    name="transportRequirements"
                    value={formData.transportRequirements}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    placeholder="Any specific requirements"
                  />
                </div>
              </div>
            </div>

            {/* Special Requirements */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Special Requirements</h3>
              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Any special requirements or preferences for your trip"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      </div>
    </main>
  );
}
