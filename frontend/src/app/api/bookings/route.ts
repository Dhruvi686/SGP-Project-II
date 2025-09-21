import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Booking from '../models/Booking';
import Bike from '../models/Bike';

// POST /api/bookings - Create a new booking
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { touristId, bikeId, startTime, endTime } = body;
    
    // Validate required fields
    if (!touristId || !bikeId || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if bike is available
    const bike = await Bike.findById(bikeId);
    if (!bike) {
      return NextResponse.json(
        { success: false, error: 'Bike not found' },
        { status: 404 }
      );
    }
    
    if (bike.availabilityStatus !== 'available') {
      return NextResponse.json(
        { success: false, error: 'Bike is not available for booking' },
        { status: 400 }
      );
    }
    
    // Calculate total price
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationHours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    const totalPrice = durationHours * bike.pricePerHour;
    
    // Create booking
    const newBooking = await Booking.create({
      touristId,
      bikeId,
      startTime,
      endTime,
      status: 'pending',
      totalPrice
    });
    
    // Update bike status to rented
    await Bike.findByIdAndUpdate(bikeId, { availabilityStatus: 'rented' });
    
    return NextResponse.json(
      { success: true, data: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// GET /api/bookings - Get all bookings (admin only)
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const bookings = await Booking.find()
      .populate('touristId', 'name email')
      .populate('bikeId');
    
    return NextResponse.json(
      { success: true, data: bookings },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
