'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Bike {
  _id: string;
  model: string;
  pricePerHour: number;
  location: string;
  photos: string[];
  description?: string;
}

export default function BookBikePage() {
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const bikeId = searchParams.get('bikeId');
  
  // Mock user ID (in a real app, this would come from authentication)
  const touristId = '65f1a2b3c4d5e6f7a8b9c0d1';

  useEffect(() => {
    if (!bikeId) {
      router.push('/transport/bikes');
      return;
    }
    
    fetchBikeDetails();
  }, [bikeId, router]);

  const fetchBikeDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bikes/${bikeId}`);
      const data = await response.json();
      
      if (data.success) {
        setBike(data.data);
      } else {
        console.error('Failed to fetch bike details:', data.error);
        router.push('/transport/bikes');
      }
    } catch (error) {
      console.error('Error fetching bike details:', error);
      router.push('/transport/bikes');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!bike || !startTime || !endTime) return 0;
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationHours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    
    return durationHours * bike.pricePerHour;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [startTime, endTime, bike]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bike || !startTime || !endTime) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      const response = await fetch(${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          touristId,
          bikeId: bike._id,
          startTime,
          endTime,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setBookingSuccess(true);
      } else {
        alert(`Booking failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        Loading bike details...
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-md mx-auto p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Booking Confirmed!</h2>
            <p className="mb-6">Your bike rental has been successfully booked.</p>
            <Button onClick={() => router.push('/bookings')}>View My Bookings</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="container mx-auto py-8 text-center">
        Bike not found. <Button onClick={() => router.push('/transport/bikes')}>Back to Bikes</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Book Your Bike</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="mb-4">
            {bike.photos && bike.photos.length > 0 ? (
              <img
                src={bike.photos[0]}
                alt={bike.model}
                className="w-full h-48 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
                No image available
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-semibold mb-2">{bike.model}</h2>
          <p className="text-gray-600 mb-2">Location: {bike.location}</p>
          <p className="text-lg font-bold text-green-600 mb-4">
            ₹{bike.pricePerHour}/hour
          </p>
          
          {bike.description && (
            <p className="text-gray-700">{bike.description}</p>
          )}
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="mb-6">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h3 className="font-semibold mb-2">Price Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Hourly Rate:</span>
                <span>₹{bike.pricePerHour}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Price:</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Confirm Booking
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
