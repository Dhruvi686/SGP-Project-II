import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/utils';
import Bike from '../../../models/Bike';

// PUT /api/bikes/:bikeId/status - Update bike status (vendor only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { bikeId: string } }
) {
  try {
    await connectToDatabase();

    // Correctly destructure bikeId from params
    const { bikeId } = params;

    const body = await req.json();
    const { availabilityStatus } = body as { availabilityStatus?: string };

    // Validate status
    if (!availabilityStatus || !['available', 'rented', 'under_maintenance'].includes(availabilityStatus)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Find and update bike
    const updatedBike = await Bike.findByIdAndUpdate(
      bikeId,
      { availabilityStatus },
      { new: true }
    );

    if (!updatedBike) {
      return NextResponse.json(
        { success: false, error: 'Bike not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedBike },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating bike status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update bike status' },
      { status: 500 }
    );
  }
}