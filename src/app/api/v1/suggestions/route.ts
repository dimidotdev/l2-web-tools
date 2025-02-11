import { NextResponse } from 'next/server';
import { connectDB } from '../../db';

export async function GET() {
  try {
    const { db } = await connectDB();
    
    const suggestions = await db
      .collection('suggestions')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectDB();
    const { content } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const newSuggestion = {
      id: Date.now().toString(),
      content: content.trim(),
      authorName: 'Admin', // Valor fixo por enquanto
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.collection('suggestions').insertOne(newSuggestion);

    return NextResponse.json({ suggestion: newSuggestion });
  } catch (error) {
    console.error('Error adding suggestion:', error);
    return NextResponse.json(
      { error: 'Failed to add suggestion' },
      { status: 500 }
    );
  }
}