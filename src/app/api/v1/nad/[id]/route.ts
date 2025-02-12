import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../db';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectDB();
    
    let nad;
    try {
      if (ObjectId.isValid(params.id)) {
        nad = await db.collection('nads').findOne({
          _id: new ObjectId(params.id)
        });
      }
    } catch (error) {
      console.log('Not a valid ObjectId, trying ticketId');
    }

    if (!nad) {
      nad = await db.collection('nads').findOne({
        ticketId: params.id
      });
    }

    if (!nad) {
      return NextResponse.json(
        { error: 'NAD not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ nad });
  } catch (error) {
    console.error('Error fetching NAD:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NAD' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { db } = await connectDB();
    const data = await request.json();

    const updateData = {
      ...data,
      lastModifiedAt: new Date().toISOString(),
      lastModifiedBy: data.lastModifiedBy || 'dimidotdev'
    };

    const result = await db.collection('nads').findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'NAD not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      nad: {
        ...result,
        _id: result._id.toString()
      }
    });
  } catch (error) {
    console.error('Error updating NAD:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update NAD' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { db } = await connectDB();
    
    const result = await db.collection('nads').findOneAndDelete({
      _id: new ObjectId(params.id)
    });

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'NAD not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'NAD deleted successfully',
      deletedNad: {
        ...result,
        _id: result._id.toString()
      }
    });
  } catch (error) {
    console.error('Error deleting NAD:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete NAD' },
      { status: 500 }
    );
  }
}