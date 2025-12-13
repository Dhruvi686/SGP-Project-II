import React from 'react';
import { Star } from 'lucide-react';

const GuestReviews: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Guest Reviews</h2>
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-yellow-400 w-4 h-4" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">John Doe</span>
            </div>
            <p className="text-gray-600">
              Excellent stay! The staff was friendly and the views were breathtaking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestReviews;