import { createContext} from 'react';
import { type User } from 'firebase/auth';

// Type for AuthContext
export interface AuthContextType {
    user: User | null;
    loading: boolean;
}

// Create AuthContext
export const AuthContext = createContext<AuthContextType | null>(null);


