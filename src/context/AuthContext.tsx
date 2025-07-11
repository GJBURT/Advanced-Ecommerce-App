import { createContext} from 'react';
import type { User, UserCredential } from 'firebase/auth';

// Type for AuthContext
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    register: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
}

// Create AuthContext
export const AuthContext = createContext<AuthContextType | null>(null);


