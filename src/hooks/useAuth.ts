import { useState, useEffect, createContext, useContext } from 'react';
import type { User, PracticeSession } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
  savePracticeSession: (session: Omit<PracticeSession, 'id' | 'date'>) => void;
  practiceHistory: PracticeSession[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [practiceHistory, setPracticeHistory] = useState<PracticeSession[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      loadPracticeHistory(JSON.parse(storedUser).id);
    }
  }, []);

  const loadPracticeHistory = (userId: string) => {
    const history = localStorage.getItem(`practice_history_${userId}`);
    if (history) {
      setPracticeHistory(JSON.parse(history));
    }
  };

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    const userRecord = Object.values(storedUsers).find(
      (u: any) => u.email === email && u.password === password
    );

    if (!userRecord) {
      throw new Error('Invalid credentials');
    }

    const userData: User = { id: (userRecord as any).id, email };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    loadPracticeHistory(userData.id);
  };

  const register = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (Object.values(storedUsers).some((u: any) => u.email === email)) {
      throw new Error('Email already exists');
    }

    const id = Math.random().toString(36).substr(2, 9);
    const users = {
      ...storedUsers,
      [id]: { id, email, password },
    };
    localStorage.setItem('users', JSON.stringify(users));

    const userData: User = { id, email };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setPracticeHistory([]);
    localStorage.removeItem('user');
  };

  const savePracticeSession = (session: Omit<PracticeSession, 'id' | 'date'>) => {
    if (!user) return;

    const newSession: PracticeSession = {
      ...session,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };

    const updatedHistory = [...practiceHistory, newSession];
    setPracticeHistory(updatedHistory);
    localStorage.setItem(
      `practice_history_${user.id}`,
      JSON.stringify(updatedHistory)
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, savePracticeSession, practiceHistory }}
    >
      {children}
    </AuthContext.Provider>
  );
}