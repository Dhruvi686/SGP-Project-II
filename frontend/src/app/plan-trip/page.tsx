'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useAuth } from "@/lib/Authcontextapi";

interface ItineraryDay {
  day: number;
  activities: {
    time: string;
    activity: string;
    location: string;
    description: string;
    type: 'cultural' | 'adventure' | 'nature' | 'food' | 'accommodation' | 'travel';
  }[];
}

interface TripPlan {
  days: ItineraryDay[];
  totalCost: number;
  recommendations: string[];
  safetyTips: string[];
}

export default function PlanTrip() {
  const { fetchRecommendations } = useAuth();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('medium');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);

  const interestOptions = [
    { value: 'cultural', label: 'Cultural Experiences' },
    { value: 'adventure', label: 'Adventure Activities' },
    { value: 'nature', label: 'Nature & Landscapes' },
    { value: 'photography', label: 'Photography' },
    { value: 'food', label: 'Local Cuisine' },
    { value: 'spiritual', label: 'Spiritual Sites' },
    { value: 'history', label: 'Historical Places' },
    { value: 'trekking', label: 'Trekking' }
  ];

  const toggleInterest = (value: string) => {
    if (interests.includes(value)) {
      setInterests(interests.filter(i => i !== value));
    } else {
      setInterests([...interests, value]);
    }
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
    
    if (interests.length === 0) {
      setError('Please select at least one interest');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Calculate number of days
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      
      // Convert budget to numeric value
      let budgetValue = 20000; // Default medium budget
      if (budget === 'low') budgetValue = 10000;
      if (budget === 'high') budgetValue = 40000;
      
      // Use the existing fetchRecommendations function
      const result = await fetchRecommendations({
        days: days,
        budget: budgetValue,
        interests: interests,
      });
      
      // For demo purposes, create a mock trip plan if the API doesn't return the expected format
      if (!result || !result.days) {
        // Mock data for demonstration
        const mockPlan: TripPlan = {
          days: Array.from({ length: days }, (_, i) => ({
            day: i + 1,
            activities: [
              {
                time: '09:00 AM',
                activity: 'Breakfast at local restaurant',
                location: 'Leh Market',
                description: 'Start your day with traditional Ladakhi breakfast',
                type: 'food'
              },
              {
                time: '11:00 AM',
                activity: interests.includes('cultural') ? 'Visit Thiksey Monastery' : 'Trekking in Hemis National Park',
                location: interests.includes('cultural') ? 'Thiksey' : 'Hemis',
                description: interests.includes('cultural') 
                  ? 'Explore one of the most beautiful monasteries in Ladakh' 
                  : 'Enjoy a guided trek through stunning landscapes',
                type: interests.includes('cultural') ? 'cultural' : 'adventure'
              },
              {
                time: '02:00 PM',
                activity: 'Lunch break',
                location: 'Local restaurant',
                description: 'Enjoy authentic Ladakhi cuisine',
                type: 'food'
              },
              {
                time: '04:00 PM',
                activity: interests.includes('photography') ? 'Photography session at Shanti Stupa' : 'Visit Leh Palace',
                location: interests.includes('photography') ? 'Shanti Stupa' : 'Leh Palace',
                description: interests.includes('photography')
                  ? 'Capture panoramic views of Leh city'
                  : 'Explore the historic royal palace',
                type: interests.includes('photography') ? 'nature' : 'cultural'
              },
              {
                time: '07:00 PM',
                activity: 'Dinner and relaxation',
                location: 'Hotel/Guesthouse',
                description: 'Enjoy dinner and rest for the next day',
                type: 'accommodation'
              }
            ]
          })),
          totalCost: budgetValue,
          recommendations: [
            'Carry sufficient water during treks',
            'Respect local customs when visiting monasteries',
            'Acclimatize properly to avoid altitude sickness',
            'Carry warm clothes as evenings can be cold'
          ],
          safetyTips: [
            'Stay hydrated and protect yourself from the sun',
            'Inform your hotel about your daily plans',
            'Carry emergency contact numbers',
            'Be cautious when driving on mountain roads'
          ]
        };
        
        setTripPlan(mockPlan);
      } else {
        // Use the actual API response
        setTripPlan(result as unknown as TripPlan);
      }
    } catch (error) {
      console.error('Error generating trip plan:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'cultural':
        return '🏛️';
      case 'adventure':
        return '🧗';
      case 'nature':
        return '🏞️';
      case 'food':
        return '🍽️';
      case 'accommodation':
        return '🏨';
      case 'travel':
        return '🚗';
      default:
        return '📍';
    }
  };

  const getBudgetLabel = (budget: string) => {
    switch (budget) {
      case 'low':
        return 'Budget-friendly';
      case 'medium':
        return 'Moderate';
      case 'high':
        return 'Luxury';
      default:
        return 'Moderate';
    }
  };

  const resetForm = () => {
    setTripPlan(null);
    setStartDate('');
    setEndDate('');
    setBudget('medium');
    setInterests([]);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">AI Trip Planner</h1>
      <p className="text-gray-600 mb-6">
        Plan your perfect Ladakh adventure with our AI-powered trip planner
      </p>
      
      {!tripPlan ? (
        <Card className="p-6 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Create Your Personalized Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
              
              <div className="mb-6">
                <Label htmlFor="budget">Budget Level</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button
                    type="button"
                    variant={budget === 'low' ? 'default' : 'outline'}
                    onClick={() => setBudget('low')}
                  >
                    Budget
                  </Button>
                  <Button
                    type="button"
                    variant={budget === 'medium' ? 'default' : 'outline'}
                    onClick={() => setBudget('medium')}
                  >
                    Moderate
                  </Button>
                  <Button
                    type="button"
                    variant={budget === 'high' ? 'default' : 'outline'}
                    onClick={() => setBudget('high')}
                  >
                    Luxury
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <Label>Interests (select at least one)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {interestOptions.map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={interests.includes(option.value) ? 'default' : 'outline'}
                      onClick={() => toggleInterest(option.value)}
                      className="text-sm"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Generating your perfect itinerary...
                  </>
                ) : (
                  'Generate Trip Plan'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Your Personalized Ladakh Itinerary</h2>
              <p className="text-gray-600">
                {new Date(startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - 
                {new Date(endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                {' • '}{getBudgetLabel(budget)}{' • '}
                {interests.length} interests
              </p>
            </div>
            <Button variant="outline" onClick={resetForm}>
              Create New Plan
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {tripPlan.days.map((day) => (
                <Card key={day.day} className="mb-6 overflow-hidden">
                  <div className="bg-blue-50 p-4 border-b">
                    <h3 className="text-lg font-semibold">Day {day.day}</h3>
                  </div>
                  
                  <div className="p-0">
                    {day.activities.map((activity, index) => (
                      <div 
                        key={index} 
                        className={`p-4 flex gap-4 ${
                          index !== day.activities.length - 1 ? 'border-b' : ''
                        }`}
                      >
                        <div className="text-2xl">
                          {getActivityIcon(activity.type)}
                        </div>
                        
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-gray-600 text-sm">{activity.time}</span>
                            <h4 className="font-medium">{activity.activity}</h4>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-1">
                            {activity.location}
                          </p>
                          
                          <p className="text-sm">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
            
            <div>
              <Card className="mb-6 p-4">
                <h3 className="text-lg font-semibold mb-3">Estimated Budget</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  ₹{tripPlan.totalCost.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  This estimate includes accommodation, local transportation, activities, and average meal costs.
                </p>
              </Card>
              
              <Card className="mb-6 p-4">
                <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {tripPlan.recommendations.map((rec, index) => (
                    <li key={index} className="flex gap-2">
                      <span>✓</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3">Safety Tips</h3>
                <ul className="space-y-2">
                  {tripPlan.safetyTips.map((tip, index) => (
                    <li key={index} className="flex gap-2">
                      <span>⚠️</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}