'use client';

import { useState, useEffect } from 'react';
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
  availabilityStatus: 'available' | 'rented' | 'under_maintenance';
}

interface Booking {
  _id: string;
  bikeId: string;
  touristId: {
    name: string;
    email: string;
  };
  startTime: string;
  endTime: string;
  status: string;
  totalPrice: number;
}

export default function VendorBikeDashboard() {
  // Mock vendor ID (in a real app, this would come from authentication)
  const vendorId = '65f1a2b3c4d5e6f7a8b9c0d2';
  
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddBikeForm, setShowAddBikeForm] = useState(false);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);
  
  // New bike form state
  const [model, setModel] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    fetchVendorBikes();
    fetchBookings();
  }, []);

  const fetchVendorBikes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bikes?vendorId=${vendorId}`);
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

  const fetchBookings = async () => {
    try {
      const response = await fetch(`/api/bookings/vendor/${vendorId}`);
      const data = await response.json();
      
      if (data.success) {
        setBookings(data.data);
      } else {
        console.error('Failed to fetch bookings:', data.error);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleAddBike = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bikes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          vendorId,
          pricePerHour: Number(pricePerHour),
          location,
          description,
          photos: photoUrl ? [photoUrl] : []
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Reset form
        setModel('');
        setPricePerHour('');
        setLocation('');
        setDescription('');
        setPhotoUrl('');
        setShowAddBikeForm(false);
        
        // Refresh bikes list
        fetchVendorBikes();
      } else {
        alert(`Failed to add bike: ${data.error}`);
      }
    } catch (error) {
      console.error('Error adding bike:', error);
      alert('Failed to add bike. Please try again.');
    }
  };

  const handleUpdateBike = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingBike) return;
    
    try {
      const response = await fetch(`/api/bikes/${editingBike._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          pricePerHour: Number(pricePerHour),
          location,
          description,
          photos: photoUrl ? [photoUrl] : []
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Reset form
        setEditingBike(null);
        setModel('');
        setPricePerHour('');
        setLocation('');
        setDescription('');
        setPhotoUrl('');
        
        // Refresh bikes list
        fetchVendorBikes();
      } else {
        alert(`Failed to update bike: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating bike:', error);
      alert('Failed to update bike. Please try again.');
    }
  };

  const handleUpdateStatus = async (bikeId: string, status: string) => {
    try {
      const response = await fetch(`/api/bikes/${bikeId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          availabilityStatus: status
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh bikes list
        fetchVendorBikes();
      } else {
        alert(`Failed to update status: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const startEditBike = (bike: Bike) => {
    setEditingBike(bike);
    setModel(bike.model);
    setPricePerHour(bike.pricePerHour.toString());
    setLocation(bike.location);
    setDescription(bike.description || '');
    setPhotoUrl(bike.photos && bike.photos.length > 0 ? bike.photos[0] : '');
  };

  const cancelEdit = () => {
    setEditingBike(null);
    setModel('');
    setPricePerHour('');
    setLocation('');
    setDescription('');
    setPhotoUrl('');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vendor Dashboard - Bikes</h1>
        <Button onClick={() => setShowAddBikeForm(!showAddBikeForm)}>
          {showAddBikeForm ? 'Cancel' : 'Add New Bike'}
        </Button>
      </div>
      
      {showAddBikeForm && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Bike</h2>
          
          <form onSubmit={handleAddBike}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="model">Bike Model</Label>
                <Input
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="pricePerHour">Price Per Hour (₹)</Label>
                <Input
                  id="pricePerHour"
                  type="number"
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="photoUrl">Photo URL</Label>
                <Input
                  id="photoUrl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://example.com/bike.jpg"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full p-2 border rounded-md"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <Button type="submit">Add Bike</Button>
          </form>
        </Card>
      )}
      
      {editingBike && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Bike</h2>
          
          <form onSubmit={handleUpdateBike}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="edit-model">Bike Model</Label>
                <Input
                  id="edit-model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="edit-pricePerHour">Price Per Hour (₹)</Label>
                <Input
                  id="edit-pricePerHour"
                  type="number"
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="edit-photoUrl">Photo URL</Label>
                <Input
                  id="edit-photoUrl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://example.com/bike.jpg"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="edit-description">Description</Label>
              <textarea
                id="edit-description"
                className="w-full p-2 border rounded-md"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit">Update Bike</Button>
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      <h2 className="text-2xl font-semibold mb-4">Your Bikes</h2>
      
      {loading ? (
        <div className="text-center py-8">Loading bikes...</div>
      ) : bikes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg">You haven't added any bikes yet.</p>
          <Button className="mt-4" onClick={() => setShowAddBikeForm(true)}>
            Add Your First Bike
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{bike.model}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    bike.availabilityStatus === 'available' ? 'bg-green-100 text-green-800' :
                    bike.availabilityStatus === 'rented' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {bike.availabilityStatus}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-2">Location: {bike.location}</p>
                <p className="text-lg font-bold text-green-600 mb-4">
                  ₹{bike.pricePerHour}/hour
                </p>
                
                {bike.description && (
                  <p className="text-gray-700 mb-4 text-sm">{bike.description}</p>
                )}
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => startEditBike(bike)}
                  >
                    Edit
                  </Button>
                  
                  <div className="flex-1"></div>
                  
                  {bike.availabilityStatus !== 'available' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUpdateStatus(bike._id, 'available')}
                    >
                      Mark Available
                    </Button>
                  )}
                  
                  {bike.availabilityStatus !== 'under_maintenance' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUpdateStatus(bike._id, 'under_maintenance')}
                    >
                      Maintenance
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg">No bookings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Tourist</th>
                <th className="p-3 text-left">Bike</th>
                <th className="p-3 text-left">Start Time</th>
                <th className="p-3 text-left">End Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="p-3">{booking.touristId.name}</td>
                  <td className="p-3">{booking.bikeId}</td>
                  <td className="p-3">{new Date(booking.startTime).toLocaleString()}</td>
                  <td className="p-3">{new Date(booking.endTime).toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3">₹{booking.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
