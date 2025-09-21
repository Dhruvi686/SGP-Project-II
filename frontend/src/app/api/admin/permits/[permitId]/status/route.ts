import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/utils';
import Permit from '../../../../models/Permit';

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
      { status, reason },
      { new: true }
    );
    
    if (!updatedPermit) {
      return NextResponse.json(
        { success: false, error: 'Permit not found' },
        { status: 404 }
      );
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