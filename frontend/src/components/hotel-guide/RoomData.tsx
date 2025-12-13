import React from 'react';

const RoomTypesPricing: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Room Types & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Standard Room</h3>
            <p className="text-gray-600 mb-4">Comfortable room with basic amenities.</p>
            <p className="text-2xl font-bold">₹ 2,999/night</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Deluxe Room</h3>
            <p className="text-gray-600 mb-4">Spacious room with premium amenities.</p>
            <p className="text-2xl font-bold">₹ 4,499/night</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomTypesPricing;