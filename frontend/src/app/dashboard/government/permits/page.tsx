'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

interface Tourist {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  nationality?: string;
}

interface Permit {
  _id: string;
  touristId: Tourist;
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

export default function GovernmentPermitDashboard() {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionForm, setShowRejectionForm] = useState<string | null>(null);

  useEffect(() => {
    fetchPermits();
  }, [filter]);

  const fetchPermits = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/permits?status=${filter}`);
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

  const handleApprove = async (permitId: string) => {
    try {
      setProcessingId(permitId);
      const response = await fetch(`/api/admin/permits/${permitId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'approved'
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the local state to reflect the change
        setPermits(permits.map(permit => 
          permit._id === permitId 
            ? { ...permit, status: 'approved' } 
            : permit
        ));
      } else {
        setError(data.error || 'Failed to approve permit');
      }
    } catch (error) {
      console.error('Error approving permit:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (permitId: string) => {
    if (!rejectionReason) {
      setError('Please provide a reason for rejection');
      return;
    }
    
    try {
      setProcessingId(permitId);
      const response = await fetch(`/api/admin/permits/${permitId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'rejected',
          rejectionReason
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the local state to reflect the change
        setPermits(permits.map(permit => 
          permit._id === permitId 
            ? { ...permit, status: 'rejected', rejectionReason } 
            : permit
        ));
        setShowRejectionForm(null);
        setRejectionReason('');
      } else {
        setError(data.error || 'Failed to reject permit');
      }
    } catch (error) {
      console.error('Error rejecting permit:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setProcessingId(null);
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

  const filteredPermits = permits.filter(permit => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      permit.touristId.name.toLowerCase().includes(query) ||
      permit.touristId.email.toLowerCase().includes(query) ||
      permit.destination.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Permit Applications Dashboard</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
          <Button 
            variant="link" 
            className="ml-2 p-0 h-auto text-red-600" 
            onClick={() => setError('')}
          >
            Dismiss
          </Button>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <Button 
            variant={filter === 'pending' ? 'default' : 'outline'} 
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button 
            variant={filter === 'approved' ? 'default' : 'outline'} 
            onClick={() => setFilter('approved')}
          >
            Approved
          </Button>
          <Button 
            variant={filter === 'rejected' ? 'default' : 'outline'} 
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </Button>
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            onClick={() => setFilter('all')}
          >
            All
          </Button>
        </div>
        
        <div className="flex-1">
          <Input
            placeholder="Search by tourist name, email or destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin mr-2 h-6 w-6" />
          <span>Loading permit applications...</span>
        </div>
      ) : filteredPermits.length === 0 ? (
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No Permit Applications Found</h2>
          <p className="text-gray-600">
            {filter === 'all' 
              ? 'There are no permit applications in the system.' 
              : `There are no ${filter} permit applications.`}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredPermits.map((permit) => (
            <Card key={permit._id} className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                    <h2 className="text-xl font-semibold">{permit.destination}</h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      permit.status === 'approved' ? 'bg-green-100 text-green-800' :
                      permit.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {permit.status.charAt(0).toUpperCase() + permit.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tourist Name</p>
                      <p>{permit.touristId.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p>{permit.touristId.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Travel Dates</p>
                      <p>{formatDate(permit.startDate)} - {formatDate(permit.endDate)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Applied On</p>
                      <p>{formatDate(permit.createdAt)}</p>
                    </div>
                  </div>
                  
                  {permit.reason && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500">Purpose of Visit</p>
                      <p className="text-gray-700">{permit.reason}</p>
                    </div>
                  )}
                  
                  {permit.status === 'rejected' && permit.rejectionReason && (
                    <div className="mb-4 p-3 bg-red-50 rounded-md">
                      <p className="text-sm font-medium text-red-800">Reason for Rejection</p>
                      <p className="text-red-700">{permit.rejectionReason}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(permit.documentUrl, '_blank')}
                  >
                    View ID Document
                  </Button>
                  
                  {permit.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleApprove(permit._id)}
                        disabled={!!processingId}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {processingId === permit._id ? (
                          <>
                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                            Processing...
                          </>
                        ) : (
                          'Approve'
                        )}
                      </Button>
                      
                      {showRejectionForm === permit._id ? (
                        <div className="mt-2">
                          <textarea
                            className="w-full p-2 border rounded-md mb-2"
                            rows={3}
                            placeholder="Reason for rejection..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(permit._id)}
                              disabled={!!processingId}
                            >
                              {processingId === permit._id ? (
                                <>
                                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                  Processing...
                                </>
                              ) : (
                                'Confirm Reject'
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setShowRejectionForm(null);
                                setRejectionReason('');
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => setShowRejectionForm(permit._id)}
                          disabled={!!processingId}
                        >
                          Reject
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}