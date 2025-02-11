import { NextResponse } from "next/server";
import { connectDB } from "../../db";

export async function GET() {
  try {
    const { db } = await connectDB();
    
    const nads = await db
      .collection('quicknads')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ nads });
  } catch (error) {
    console.error('Error fetching NADs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NADs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectDB();
    const nadData = await request.json();

    const existingNad = await db.collection('quicknads').findOne({
      ticketId: nadData.ticketId
    });

    if (existingNad) {
      return NextResponse.json(
        { 
          error: 'TicketId already exists',
          code: 'DUPLICATE_TICKET_ID'
        },
        { status: 409 }
      );
    }

    const newNad = {
      ...nadData,
      createdAt: new Date().toISOString(),
      author: 'Admin'
    };

    await db.collection('quicknads').insertOne(newNad);
    
    return NextResponse.json({ 
      success: true,
      nad: newNad 
    });
  } catch (error) {
    console.error('Error creating NAD:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create NAD',
        code: 'CREATE_ERROR'
      },
      { status: 500 }
    );
  }
}