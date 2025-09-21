import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Bike from '../models/Bike';

// GET /api/bikes - Get all available bikes
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'available';
    const location = searchParams.get('location');
    
    // Build query
    const query: any = { availabilityStatus: status };
    if (location) query.location = location;
    
    const bikes = await Bike.find(query).populate('vendorId', 'name email');
    
    return NextResponse.json({ success: true, data: bikes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bikes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bikes' },
      { status: 500 }
    );
  }
}

// POST /api/bikes - Add a new bike (vendor only)
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { model, vendorId, pricePerHour, location, photos, description } = body;
    
    // Validate required fields
    if (!model || !vendorId || !pricePerHour || !location) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newBike = await Bike.create({
      model,
      vendorId,
      pricePerHour,
      location,
      photos: photos || [],
      description,
      availabilityStatus: 'available'
    });
    
    return NextResponse.json(
      { success: true, data: newBike },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating bike:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create bike' },
      { status: 500 }
    );
  }
}
