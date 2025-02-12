import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');

    if (!startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: 'Start and end dates are required' },
        { status: 400 }
      );
    }

    const { db } = await connectDB();

    const nads = await db.collection('nads')
      .find({
        createdAt: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .sort({ createdAt: -1 })
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
        startDate,
        endDate,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching NADs by date range:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch NADs by date range' },
      { status: 500 }
    );
  }
}