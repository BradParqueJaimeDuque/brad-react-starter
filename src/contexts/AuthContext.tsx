import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/config/clienteAxios';
import { type LoginResponse, type ResponseData } from '@/types/Models';

type CredentialsLogin = {
    email: string;
    password: string;
}

type LoginResult =
    | { success: true }
    | { success: false; error: string };

interface AuthContextProps {
    data: ResponseData | null;
    loading: boolean;
    setData: React.Dispatch<React.SetStateAction<ResponseData | null>>;
    login: (credentials: CredentialsLogin) => Promise<LoginResult>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/api/auth/me');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                setData(null);
            }finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (credentials: CredentialsLogin) => {
        const response: LoginResponse = await api.post("/api/auth/login", credentials);
        if (response.data.success) {
            setData(response.data.data);
            return { success: true } as LoginResult;
        }
        return { success: false, error: "Credenciales inválidas" } as LoginResult;
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout'); // Ruta del backend que elimina las cookies
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setData(null); // Resetear estado de auth
        }
    };

    return (
        <AuthContext.Provider value={{ data, loading, setData, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
