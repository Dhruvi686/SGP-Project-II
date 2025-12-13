import React from 'react';
import { Car, Bus, Bike, Plane } from 'lucide-react';
import CategoryCard from '../localGuides/CategoryCard';

const transportOptions = [
  {
    title: 'Private Taxis',
    description: 'Comfortable private taxis for personalized travel',
    icon: <Car className="w-8 h-8 text-blue-600" />,
  },
  {
    title: 'Shared Taxis',
    description: 'Affordable shared taxis to popular destinations',
    icon: <Bus className="w-8 h-8 text-green-600" />,
  },
  {
    title: 'Bike Rentals',
    description: 'Explore Ladakh on two wheels with bike rentals',
    icon: <Bike className="w-8 h-8 text-red-600" />,
  },
  {
    title: 'Airport Transfers',
    description: 'Reliable airport pickup and drop services',
    icon: <Plane className="w-8 h-8 text-purple-600" />,
  },
];

export default function TransportOptions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {transportOptions.map((option, index) => (
        <CategoryCard
          key={index}
          title={option.title}
          description={option.description}
          icon={option.icon}
          onClick={() => console.log(`Selected ${option.title}`)}
        />
      ))}
    </div>
  );
}