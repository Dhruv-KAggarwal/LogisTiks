// components/ProtectedComponent.js
import useAuth from '../hooks/useAuth';

export default function ProtectedComponent() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in to view this content.</div>;
  }

  return <div>This is protected content.</div>;
}
