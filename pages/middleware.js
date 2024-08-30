import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('auth_token'); // Adjust based on how you store the auth token

  console.log('Middleware triggered');
  console.log('Requested URL:', url.pathname);
  console.log('Token:', token);

  // Check if the URL contains '/protected'
  if (url.pathname.startsWith('/protected')) {
    if (!token) {
      console.log('No token found, redirecting to login');
      // Redirect to the login page with a message if the user is not authenticated
      url.pathname = '/login';
      url.searchParams.set('message', 'Please log in first');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Middleware matcher
export const config = {
  matcher: ['/protected/:path*', '/login'], // Adjust based on your routing needs
};
