'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/app/lib/auth';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'nad_auth_state';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Função para persistir o estado de autenticação
  const persistAuthState = (user: User | null) => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        user,
        timestamp: new Date().toISOString()
      }));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  // Função para recuperar o estado de autenticação
  const loadAuthState = () => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const { user, timestamp } = JSON.parse(stored);
        
        // Opcional: verificar se a sessão não expirou (exemplo: 24 horas)
        const storedTime = new Date(timestamp).getTime();
        const currentTime = new Date().getTime();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

        if (currentTime - storedTime > sessionDuration) {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          return null;
        }

        return user;
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    }
    return null;
  };

  // Carregar estado inicial
  useEffect(() => {
    const storedUser = loadAuthState();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  // Redirecionar se necessário
  useEffect(() => {
    if (!isLoading) {
      if (!user && pathname !== '/login') {
        router.push('/login');
      } else if (user && pathname === '/login') {
        router.push('/');
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = async (username: string, password: string) => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === 'dimidotdev' && password === 'nad123') {
      const newUser = {
        id: '1',
        name: 'dimidotdev',
        email: 'dimidotdev@example.com',
        username: 'dimidotdev',
      };
      setUser(newUser);
      persistAuthState(newUser);
      
      // Log de acesso
      console.log(`Login Time (UTC): ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`);
      console.log(`User's Login: ${username}`);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    persistAuthState(null);
    router.push('/login');
    
    // Log de saída
    console.log(`Logout Time (UTC): ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}