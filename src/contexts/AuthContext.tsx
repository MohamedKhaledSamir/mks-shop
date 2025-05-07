import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "../api/axios";
interface User {
  id: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  console.log(user);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (localStorage.token)
        api
          .get("auth/verifyToken", { headers: { token: localStorage.token } })
          .then((res) => {
            if (res.status === 200) {
              setUser(res.data.decoded);
            }
          });
    };

    checkAuthStatus();
  }, []);

  function login() {}

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
