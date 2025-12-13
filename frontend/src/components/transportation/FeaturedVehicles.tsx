import React from 'react';
import Image from 'next/image';

const featuredVehicles = [
  {
    name: 'Toyota Fortuner',
    type: 'SUV',
    capacity: '7 Seats',
    price: '₹2,500/day',
    image: '/images/vehicles/fortuner.jpg',
  },
  {
    name: 'Mahindra Scorpio',
    type: 'SUV',
    capacity: '7 Seats',
    price: '₹2,200/day',
    image: '/images/vehicles/scorpio.jpg',
  },
  {
    name: 'Honda City',
    type: 'Sedan',
    capacity: '5 Seats',
    price: '₹1,800/day',
    image: '/images/vehicles/city.jpg',
  },
];

export default function FeaturedVehicles() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-8">Featured Vehicles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredVehicles.map((vehicle, index) => (
          <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Vehicle Image</span>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold">{vehicle.name}</h4>
              <p className="text-gray-600">{vehicle.type} • {vehicle.capacity}</p>
              <p className="text-blue-600 font-bold mt-2">{vehicle.price}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}