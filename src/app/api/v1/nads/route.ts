import { nads } from "@/app/nads-data"

export async function GET() {
  return new Response(JSON.stringify(nads), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
};