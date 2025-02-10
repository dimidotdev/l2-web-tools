import { connectDB } from "../../db";

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

  const { db } = await connectDB();
  const body = await request.json();
  const nad = await db.collection('quicknads').insertOne(body);

  return new Response(JSON.stringify(nad), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
};