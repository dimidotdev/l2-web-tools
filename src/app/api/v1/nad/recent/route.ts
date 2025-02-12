import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');
    
    const { db } = await connectDB();

    const nads = await db.collection('nads')
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    const formattedNads = nads.map(nad => ({
      ...nad,
      _id: nad._id.toString(),
      createdAt: nad.createdAt || new Date().toISOString(),
      lastModifiedAt: nad.lastModifiedAt || nad.createdAt || new Date().toISOString(),
      createdBy: nad.createdBy || 'dimidotdev',
      lastModifiedBy: nad.lastModifiedBy || nad.createdBy || 'dimidotdev'
    }));

    return NextResponse.json({
      success: true,
      nads: formattedNads,
      metadata: {
        count: formattedNads.length,
        limit,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching recent NADs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recent NADs' },
      { status: 500 }
    );
  }
}