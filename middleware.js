
import { NextResponse } from 'next/server';

export function middleware(request) {
    // Only apply to API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
        const response = NextResponse.next();

        // Ensure no caching for API routes
        response.headers.set('Cache-Control', 'no-store, must-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;
    }
}

export const config = {
    matcher: '/api/:path*',
};