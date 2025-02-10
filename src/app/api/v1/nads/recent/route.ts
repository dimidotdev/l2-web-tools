import { NextResponse } from 'next/server';
import { getRecentNADs } from '@/app/lib/services/nadServices';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { nads, error } = await getRecentNADs();
    
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ nads });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 },
    );
  }
}