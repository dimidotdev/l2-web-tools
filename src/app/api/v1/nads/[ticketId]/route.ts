import { NextRequest } from "next/server";
import { connectDB } from "@/app/api/db";

type Params = {
  ticketId: string;
};

export async function GET(request: NextRequest, props: { params: Promise<Params> }) {
  const params = (await props.params).ticketId;
  const { db } = await connectDB();
  const nad = await db.collection("quicknads").findOne({ ticketId: params });

  if (!nad) {
    return new Response(JSON.stringify({ message: "NAD not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(nad), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    }
  });
}