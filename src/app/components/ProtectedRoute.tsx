'use client';

import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Log de acesso à rota protegida
  const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(`Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${currentTime}`);
  console.log(`Current User's Login: ${user?.username || 'dimidotdev'}`);

  return <>{children}</>;
}