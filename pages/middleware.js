import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('auth_token'); // Adjust based on how you store the auth token

  // Check if the URL contains '/protected'
  if (url.pathname.startsWith('/protected')) {
    if (!token) {
      // Redirect to the login page with a message if the user is not authenticated
      url.pathname = '/login';
      url.searchParams.set('message', 'Please log in first');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
