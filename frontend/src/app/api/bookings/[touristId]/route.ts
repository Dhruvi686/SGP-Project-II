import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/utils';
import Booking from '../../models/Booking';

// GET /api/bookings/:touristId - Get bookings for a specific tourist
export async function GET(
  req: NextRequest,
  { params }: { params: { touristId: string } }
) {
  try {
    await connectToDatabase();
    
    const { touristId } = params;
    
    const bookings = await Booking.find({ touristId })
      .populate('bikeId')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(
      { success: true, data: bookings },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tourist bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}