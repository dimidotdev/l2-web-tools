import { NextResponse } from 'next/server';
import { connectDB } from '@/app/api/db';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const updates = await request.json();
    const { db } = await connectDB();
    
    await db.collection('todos').updateOne(
      { id: params.id },
      { 
        $set: { 
          ...updates,
          updatedAt: new Date()
        } 
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { db } = await connectDB();
    
    await db.collection('todos').deleteOne({ id: params.id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}