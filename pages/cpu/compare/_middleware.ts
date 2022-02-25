import { NextRequest, NextResponse } from 'next/server';

// Next.js Middlewares are run before the request reaches the page renderer
// See https://nextjs.org/docs/middleware

export function middleware(req: NextRequest) {
  // If no cpu ids present, redirect to search page
  if (req.nextUrl.pathname === '/cpu/compare') {
    return NextResponse.redirect('/cpu/search');
  }

  // Else, proceed with request
  return NextResponse.next();
}
