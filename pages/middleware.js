// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  // Simulate an authenticated state
  const url = req.nextUrl.clone();
  url.pathname = '/protected-page'; // Redirect to a protected page
  return NextResponse.redirect(url);
}
