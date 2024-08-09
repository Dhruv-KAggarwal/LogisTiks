// pages/protected-page.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';

export default function ProtectedPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/check-auth');
      const data = await res.json();
      if (data.authenticated) {
        // Redirect to /protected/ if authenticated
        router.push('/protected/');
      } else {
        // Redirect to login page if not authenticated
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Checking Authentication...</h1>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
