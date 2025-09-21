import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Alert from '../../models/Alert';

// POST /api/alerts/send - Send a new safety alert
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { message, geographicalArea, severity, createdBy } = body;
    
    // Validate required fields
    if (!message || !geographicalArea || !createdBy) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newAlert = await Alert.create({
      message,
      geographicalArea,
      severity: severity || 'medium',
      isActive: true,
      createdBy
    });
    
    // In a real implementation, we would trigger a WebSocket event here
    // For now, we'll just return the created alert
    
    return NextResponse.json(
      { success: true, data: newAlert },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating safety alert:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create safety alert' },
      { status: 500 }
    );
  }
}
