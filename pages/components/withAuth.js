// components/withAuth.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Dummy authentication check (replace with your actual authentication logic)
const isAuthenticated = () => {
  // Replace with real authentication check
  return !!localStorage.getItem('user'); 
};

export default function withAuth(Component) {
  return function AuthComponent(props) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/login'); // Redirect to login if not authenticated
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) return <div>Loading...</div>; // Or any loading indicator

    return <Component {...props} />;
  };
}
