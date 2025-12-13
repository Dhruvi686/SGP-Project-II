import { NextRequest, NextResponse } from 'next/server';
import { dbConnect as dbConnect } from '@/lib/db';
import Permit, { IPermit } from '@/lib/models/Permit'

// GET /api/admin/permits - Get all permits for admin review
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    
    // Build query
    const query: any = {};
    if (status) query.status = status;
    
    const permits = await Permit.find(query)
      .populate('touristId', 'name email')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(
      { success: true, data: permits },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching permits for admin:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch permits' },
      { status: 500 }
    );
  }
}
