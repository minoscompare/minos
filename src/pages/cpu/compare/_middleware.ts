import { NextRequest, NextResponse } from 'next/server';

// Next.js Middlewares are run before the request reaches the page renderer
// See https://nextjs.org/docs/middleware

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // If no cpu ids present, redirect to search page
  if (url.pathname === '/cpu/compare') {
    url.pathname = '/cpu/search';
    return NextResponse.redirect(url);
  }

  // Else, proceed with request
  return NextResponse.next();
}
