import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Permit from '@/lib/models/Permit';
import User from '@/lib/models/User';
import Booking from '@/lib/models/Booking';

// PUT /api/admin/permits/:permitId/status - Update permit status (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { permitId: string } }
) {
  try {
    await connectToDatabase();
    
    const { permitId } = params;
    const body = await req.json();
    const { status, reason } = body;
    
    // Validate status
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Find and update permit
    const updatedPermit = await Permit.findByIdAndUpdate(
      permitId,
      { status, reason, reviewedAt: new Date() },
      { new: true }
    ).populate('touristId');

    if (!updatedPermit) {
      return NextResponse.json(
        { success: false, error: 'Permit not found' },
        { status: 404 }
      );
    }

    // If permit is approved, create a booking and send confirmation email
    if (status === 'approved') {
      try {
        const user = await User.findById(updatedPermit.touristId);
        if (user) {
          // Create booking
          const booking = new Booking({
            name: user.name,
            email: user.email,
            phone: user.contactNumber || '',
            tripDate: updatedPermit.startDate,
            seats: 1, // Default to 1, can be updated later
            amount: 0, // Will be calculated based on package
            notes: `Permit approved for ${updatedPermit.destination}. ${reason || ''}`
          });

          await booking.save();

          // Send confirmation email (this will be handled by the backend booking creation)
          // The booking creation in backend already handles email sending
          console.log(`Booking created for approved permit: ${booking._id}`);
        }
      } catch (bookingError) {
        console.error('Error creating booking for approved permit:', bookingError);
        // Don't fail the permit update if booking creation fails
      }
    }

    return NextResponse.json(
      { success: true, data: updatedPermit },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating permit status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update permit status' },
      { status: 500 }
    );
  }
}