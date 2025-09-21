'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Bike {
  _id: string;
  model: string;
  pricePerHour: number;
  location: string;
  photos: string[];
  description?: string;
  availabilityStatus: string;
  vendorId: {
    name: string;
    email: string;
  };
}

export default function BikeRentalPage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bikes?status=available${location ? `&location=${location}` : ''}`);
      const data = await response.json();
      
      if (data.success) {
        setBikes(data.data);
      } else {
        console.error('Failed to fetch bikes:', data.error);
      }
    } catch (error) {
      console.error('Error fetching bikes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchBikes();
  };

  const handleRentNow = (bikeId: string) => {
    router.push(`/transport/bikes/book?bikeId=${bikeId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Bike Rentals in Ladakh</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Find Your Perfect Bike</h2>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Location (e.g., Leh, Nubra Valley)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading bikes...</div>
      ) : bikes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg">No bikes available for the selected criteria.</p>
          <p className="text-gray-600 mt-2">Try changing your search parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <Card key={bike._id} className="overflow-hidden">
              <div className="h-48 bg-gray-200">
                {bike.photos && bike.photos.length > 0 ? (
                  <img
                    src={bike.photos[0]}
                    alt={bike.model}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{bike.model}</h3>
                <p className="text-gray-600 mb-2">Location: {bike.location}</p>
                <p className="text-gray-600 mb-2">Vendor: {bike.vendorId.name}</p>
                <p className="text-lg font-bold text-green-600 mb-4">
                  ₹{bike.pricePerHour}/hour
                </p>
                
                {bike.description && (
                  <p className="text-gray-700 mb-4">{bike.description}</p>
                )}
                
                <Button 
                  className="w-full" 
                  onClick={() => handleRentNow(bike._id)}
                >
                  Rent Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}