'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const destinations = [
  'Pangong Tso',
  'Nubra Valley',
  'Tso Moriri',
  'Khardung La',
  'Zanskar Valley',
  'Hemis National Park',
  'Magnetic Hill',
  'Lamayuru',
  'Alchi Monastery',
  'Changthang Wildlife Sanctuary'
];

export default function PermitApplicationForm() {
  const router = useRouter();
  // Mock tourist ID (in a real app, this would come from authentication)
  const touristId = '65f1a2b3c4d5e6f7a8b9c0d1';
  
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // In a real app, this would upload to a storage service like AWS S3
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      // Mock URL - in a real app, this would be the URL returned from your storage service
      const mockUrl = `https://storage.example.com/documents/${file.name}`;
      setDocumentUrl(mockUrl);
      setIsUploading(false);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    
    if (start < today) {
      setError('Start date cannot be in the past');
      return;
    }
    
    if (end < start) {
      setError('End date cannot be before start date');
      return;
    }
    
    if (!documentUrl) {
      setError('Please upload your ID proof');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/permits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          touristId,
          destination,
          startDate,
          endDate,
          reason,
          documentUrl
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(true);
        // Reset form
        setDestination('');
        setStartDate('');
        setEndDate('');
        setReason('');
        setDocumentUrl('');
        
        // Redirect to status page after a delay
        setTimeout(() => {
          router.push('/permits/status');
        }, 2000);
      } else {
        setError(data.error || 'Failed to submit permit application');
      }
    } catch (error) {
      console.error('Error submitting permit application:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Apply for Travel Permit</h1>
      
      <Card className="p-6 max-w-2xl mx-auto">
        {success ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your permit application has been submitted successfully. You will be redirected to the status page shortly.
            </p>
            <Button onClick={() => router.push('/permits/status')}>
              View Application Status
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <Label htmlFor="destination">Destination</Label>
              <select
                id="destination"
                className="w-full p-2 border rounded-md"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              >
                <option value="">Select a destination</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="reason">Purpose of Visit</Label>
              <textarea
                id="reason"
                className="w-full p-2 border rounded-md"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please describe the purpose of your visit..."
                required
              />
            </div>
            
            <div className="mb-6">
              <Label htmlFor="document">ID Proof (Passport/ID Card)</Label>
              <div className="mt-1">
                <Input
                  id="document"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  disabled={isUploading || !!documentUrl}
                />
              </div>
              
              {isUploading && (
                <div className="flex items-center mt-2 text-blue-600">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  <span>Uploading document...</span>
                </div>
              )}
              
              {documentUrl && (
                <div className="flex items-center mt-2 text-green-600">
                  <span>✓ Document uploaded successfully</span>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="ml-2"
                    onClick={() => setDocumentUrl('')}
                  >
                    Remove
                  </Button>
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-1">
                Please upload a clear copy of your ID proof. Accepted formats: PDF, JPG, PNG.
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
