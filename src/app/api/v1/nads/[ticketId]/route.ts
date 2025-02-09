import { NextRequest } from "next/server";
import { nads } from "@/app/nads-data";

export async function GET(request: NextRequest, params: Promise<{ ticketId: string }>) {
  const { ticketId } = await params;
  const nad = nads.find(nad => nad.ticketId === ticketId);
  if (!nad) {
    return new Response(JSON.stringify({ message: "NAD not found" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 404,
    });
  }
  return new Response(JSON.stringify(nad), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}