import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

// Simple rule-based trip planner
function generateItinerary(days: number, interests: string[], budget: string) {
  const attractions = {
    nature: ['Pangong Lake', 'Nubra Valley', 'Tso Moriri Lake', 'Zanskar Valley', 'Hemis National Park'],
    culture: ['Hemis Monastery', 'Thiksey Monastery', 'Leh Palace', 'Shanti Stupa', 'Alchi Monastery'],
    adventure: ['Khardung La Pass', 'Chadar Trek', 'River Rafting in Zanskar', 'Mountain Biking', 'Camel Safari in Nubra Valley'],
    food: ['Ladakhi Kitchen', 'Tibetan Kitchen', 'Gesmo Restaurant', 'Lamayuru Restaurant', 'Pumpernickel German Bakery']
  };
  
  const budgetOptions = {
    low: {
      accommodation: ['Budget Guesthouses', 'Hostels', 'Homestays'],
      transportation: ['Public Buses', 'Shared Taxis'],
      food: ['Local Eateries', 'Street Food']
    },
    medium: {
      accommodation: ['Mid-range Hotels', 'Boutique Guesthouses'],
      transportation: ['Private Taxis for some days', 'Rental Bikes'],
      food: ['Mid-range Restaurants', 'Cafes']
    },
    high: {
      accommodation: ['Luxury Hotels', 'Resorts'],
      transportation: ['Private Vehicle with Driver', 'Rental SUVs'],
      food: ['Fine Dining Restaurants', 'Hotel Restaurants']
    }
  };
  
  // Determine budget category
  let budgetCategory: 'low' | 'medium' | 'high' = 'medium';
  if (budget === 'low') budgetCategory = 'low';
  if (budget === 'high') budgetCategory = 'high';
  
  // Generate daily itinerary
  const itinerary = [];
  
  // First day is always arrival and acclimatization
  itinerary.push({
    day: 1,
    title: 'Arrival and Acclimatization',
    activities: [
      'Arrive in Leh',
      'Check-in to accommodation',
      'Rest and acclimatize to high altitude',
      'Short walk around Leh Market in the evening if feeling well'
    ],
    accommodation: budgetOptions[budgetCategory].accommodation[0],
    meals: 'Dinner at ' + budgetOptions[budgetCategory].food[0]
  });
  
  // Generate remaining days based on interests
  for (let day = 2; day <= days; day++) {
    const dayItinerary: any = {
      day,
      activities: []
    };
    
    // Alternate between interests
    const interestIndex = (day - 2) % interests.length;
    const currentInterest = interests[interestIndex];
    
    if (currentInterest === 'nature') {
      const attraction = attractions.nature[Math.floor(Math.random() * attractions.nature.length)];
      dayItinerary.title = `Explore ${attraction}`;
      dayItinerary.activities = [
        `Morning visit to ${attraction}`,
        'Photography session',
        'Picnic lunch',
        'Nature walk',
        'Return to accommodation'
      ];
    } else if (currentInterest === 'culture') {
      const attraction = attractions.culture[Math.floor(Math.random() * attractions.culture.length)];
      dayItinerary.title = `Visit ${attraction}`;
      dayItinerary.activities = [
        `Morning visit to ${attraction}`,
        'Learn about local traditions',
        'Meet with local artisans',
        'Cultural performance',
        'Return to accommodation'
      ];
    } else if (currentInterest === 'adventure') {
      const attraction = attractions.adventure[Math.floor(Math.random() * attractions.adventure.length)];
      dayItinerary.title = `Adventure at ${attraction}`;
      dayItinerary.activities = [
        'Early breakfast',
        `Full day ${attraction} experience`,
        'Packed lunch',
        'Return to accommodation',
        'Rest and relaxation'
      ];
    } else if (currentInterest === 'food') {
      const attraction = attractions.food[Math.floor(Math.random() * attractions.food.length)];
      dayItinerary.title = `Food Tour`;
      dayItinerary.activities = [
        'Local breakfast experience',
        'Visit local market',
        'Cooking class with local chef',
        `Dinner at ${attraction}`,
        'Return to accommodation'
      ];
    }
    
    dayItinerary.accommodation = budgetOptions[budgetCategory].accommodation[day % budgetOptions[budgetCategory].accommodation.length];
    dayItinerary.transportation = budgetOptions[budgetCategory].transportation[day % budgetOptions[budgetCategory].transportation.length];
    dayItinerary.meals = 'Meals at ' + budgetOptions[budgetCategory].food[day % budgetOptions[budgetCategory].food.length];
    
    itinerary.push(dayItinerary);
  }
  
  // Last day is always departure
  itinerary.push({
    day: days + 1,
    title: 'Departure',
    activities: [
      'Breakfast at accommodation',
      'Last-minute shopping',
      'Check-out from accommodation',
      'Transfer to airport/bus station',
      'Departure from Leh'
    ]
  });
  
  return itinerary;
}

// POST /api/trip-planner - Generate a trip itinerary
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { days, interests, budget } = body;
    
    // Validate required fields
    if (!days || !interests || !budget) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate days
    if (days < 1 || days > 14) {
      return NextResponse.json(
        { success: false, error: 'Days must be between 1 and 14' },
        { status: 400 }
      );
    }
    
    // Generate itinerary
    const itinerary = generateItinerary(days, interests, budget);
    
    return NextResponse.json(
      { 
        success: true, 
        data: {
          itinerary,
          summary: `${days}-day trip to Ladakh focusing on ${interests.join(', ')} with a ${budget} budget`
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error generating trip itinerary:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate trip itinerary' },
      { status: 500 }
    );
  }
}
