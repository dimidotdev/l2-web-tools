import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../db';

// GET - Listar todas as NADs
export async function GET() {
  try {
    const { db } = await connectDB();

    const nads = await db.collection('nads')
      .find({})
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
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching NADs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch NADs' },
      { status: 500 }
    );
  }
}

// POST - Criar nova NAD
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectDB();
    const data = await request.json();

    const newNad = {
      ...data,
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
      createdBy: data.createdBy || 'dimidotdev',
      lastModifiedBy: data.createdBy || 'dimidotdev'
    };

    const result = await db.collection('nads').insertOne(newNad);

    return NextResponse.json({
      success: true,
      nad: {
        ...newNad,
        _id: result.insertedId.toString()
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating NAD:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create NAD' },
      { status: 500 }
    );
  }
}