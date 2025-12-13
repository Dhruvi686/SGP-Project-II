import React from 'react';
import { MapPin } from 'lucide-react';

const popularRoutes = [
  {
    from: 'Leh',
    to: 'Pangong Lake',
    distance: '150 km',
    duration: '4-5 hours',
    price: '₹3,000',
  },
  {
    from: 'Leh',
    to: 'Nubra Valley',
    distance: '150 km',
    duration: '4-5 hours',
    price: '₹3,500',
  },
  {
    from: 'Leh',
    to: 'Tso Moriri',
    distance: '240 km',
    duration: '6-7 hours',
    price: '₹4,500',
  },
  {
    from: 'Leh',
    to: 'Zanskar Valley',
    distance: '220 km',
    duration: '5-6 hours',
    price: '₹4,000',
  },
];

export default function PopularRoutes() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-8">Popular Routes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {popularRoutes.map((route, index) => (
          <div key={index} className="bg-white border rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold">{route.from} → {route.to}</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Distance: {route.distance}</p>
              <p>Duration: {route.duration}</p>
              <p className="text-blue-600 font-bold">Starting from {route.price}</p>
            </div>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Book Route
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}