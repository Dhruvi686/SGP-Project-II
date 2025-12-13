import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Permit, { IPermit } from '@/lib/models/Permit'

// GET /api/permits/:touristId - Get permits for a specific tourist
export async function GET(
  req: NextRequest,
  { params }: { params: { touristId: string } }
) {
  try {
    await connectToDatabase();
    
    const { touristId } = params;
    
    const permits = await Permit.find({ touristId })
      .sort({ createdAt: -1 });
    
    return NextResponse.json(
      { success: true, data: permits },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tourist permits:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch permits' },
      { status: 500 }
    );
  }
}