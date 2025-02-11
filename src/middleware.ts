import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    if (request.nextUrl.pathname.startsWith('/api/v1/')) {
      const headers = new Headers(request.headers);
      headers.set('Content-Type', 'application/json');

      return NextResponse.next({
        request: {
          headers,
        },
      });
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: '/api/v1/:path*',
};