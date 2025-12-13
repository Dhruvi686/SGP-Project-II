import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Permit, { IPermit } from '@/lib/models/Permit'

// POST /api/permits - Submit a new permit application
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { touristId, destination, startDate, endDate, documentUrl } = body;
    
    // Validate required fields
    if (!touristId || !destination || !startDate || !endDate || !documentUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newPermit = await Permit.create({
      touristId,
      destination,
      startDate,
      endDate,
      documentUrl,
      status: 'pending'
    });
    
    return NextResponse.json(
      { success: true, data: newPermit },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating permit application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create permit application' },
      { status: 500 }
    );
  }
}

// GET /api/permits - Get all permits (admin only)
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const permits = await Permit.find()
      .populate('touristId', 'name email')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(
      { success: true, data: permits },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching permits:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch permits' },
      { status: 500 }
    );
  }
}
