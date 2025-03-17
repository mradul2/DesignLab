import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return children;
}
