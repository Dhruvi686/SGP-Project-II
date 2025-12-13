import React from 'react';

const LocationAccessibility: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Location & Accessibility</h2>
        <p className="text-gray-600 mb-4">
          Located just 2.5 km from the city center, our resort offers easy access to local attractions.
        </p>
        <ul className="list-disc list-inside text-gray-600">
          <li>5 minutes drive to Leh Palace</li>
          <li>10 minutes to Shanti Stupa</li>
          <li>Airport shuttle service available</li>
        </ul>
      </div>
    </section>
  );
};

export default LocationAccessibility;