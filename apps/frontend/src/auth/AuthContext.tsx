import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  pseudo: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const token = localStorage.getItem("token");

  interface DecodedToken {
    email: string;
    pseudo: string;
  }

  useEffect(() => {
    const decodedToken = token ? jwtDecode<DecodedToken>(token) : null;
    const email = decodedToken?.email;
    const pseudo = decodedToken?.pseudo;

    if (email && pseudo) {
      setUser({ email, pseudo });
    }
  }, [token]);

  const login = (token: string) => {
    const decodedToken = token ? jwtDecode<DecodedToken>(token) : null;
    const email = decodedToken?.email;
    const pseudo = decodedToken?.pseudo;

    if (email && pseudo) {
      setUser({ email, pseudo });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
