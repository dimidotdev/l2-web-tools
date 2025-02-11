import { NextResponse } from 'next/server';
import { connectDB } from '../../db';
import { validateTodo } from '@/app/lib/validation';

export async function GET() {
  try {
    const { db } = await connectDB();
    
    const todos = await db
      .collection('todos')
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    return NextResponse.json({ todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ todos: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validation = validateTodo(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    const { db } = await connectDB();
    
    const newTodo = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.collection('todos').insertOne(newTodo);

    return NextResponse.json({ 
      todo: {
        ...newTodo,
        _id: newTodo._id?.toString()
      }
    });
  } catch (error) {
    console.error('Error adding todo:', error);
    return NextResponse.json(
      { error: 'Failed to add todo' },
      { status: 500 }
    );
  }
}