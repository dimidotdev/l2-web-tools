import { NextResponse } from "next/server";
import { connectDB } from "../../db";
import 'dotenv/config'; 
import { revalidatePath } from "next/cache";
import { createNad } from "../../../lib/services/nadServices";

export async function GET() {

  const { db } = await connectDB();
  const nads = await db.collection('quicknads').find().toArray();

  return new Response(JSON.stringify(nads), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await createNad(data);

    revalidatePath('/nads');

    return NextResponse.json({ 
      success: true, 
      id: result.toString() 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating NAD:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create NAD' 
    }, { status: 500 });
  }
}