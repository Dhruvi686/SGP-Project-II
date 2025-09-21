'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Permit {
  _id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  documentUrl: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export default function PermitStatusPage() {
  // Mock tourist ID (in a real app, this would come from authentication)
  const touristId = '65f1a2b3c4d5e6f7a8b9c0d1';
  
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPermits();
  }, []);

  const fetchPermits = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/permits/${touristId}`);
      const data = await response.json();
      
      if (data.success) {
        setPermits(data.data);
      } else {
        setError(data.error || 'Failed to fetch permits');
      }
    } catch (error) {
      console.error('Error fetching permits:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pending</span>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Permit Applications</h1>
        <Link href="/permits/apply">
          <Button>Apply for New Permit</Button>
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin mr-2 h-6 w-6" />
          <span>Loading your permits...</span>
        </div>
      ) : permits.length === 0 ? (
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">No Permit Applications Found</h2>
          <p className="text-gray-600 mb-6">
            You haven't submitted any permit applications yet.
          </p>
          <Link href="/permits/apply">
            <Button>Apply for a Permit</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {permits.map((permit) => (
            <Card key={permit._id} className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold">{permit.destination}</h2>
                    {getStatusBadge(permit.status)}
                  </div>
                  
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Travel Dates:</span> {formatDate(permit.startDate)} - {formatDate(permit.endDate)}
                  </p>
                  
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Applied on:</span> {formatDate(permit.createdAt)}
                  </p>
                  
                  {permit.reason && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700">Purpose of Visit:</h3>
                      <p className="text-gray-600 mt-1">{permit.reason}</p>
                    </div>
                  )}
                  
                  {permit.status === 'rejected' && permit.rejectionReason && (
                    <div className="mt-4 p-3 bg-red-50 rounded-md">
                      <h3 className="text-sm font-medium text-red-800">Reason for Rejection:</h3>
                      <p className="text-red-700 mt-1">{permit.rejectionReason}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  {permit.status === 'approved' && (
                    <Button variant="outline" className="whitespace-nowrap">
                      Download Permit
                    </Button>
                  )}
                  
                  {permit.status === 'pending' && (
                    <div className="text-sm text-gray-500 italic">
                      Your application is under review
                    </div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500"
                    onClick={() => window.open(permit.documentUrl, '_blank')}
                  >
                    View Uploaded Document
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}