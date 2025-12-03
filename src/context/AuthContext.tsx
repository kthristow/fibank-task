import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthContext } from "./AuthContextDefinition";

const STORAGE_KEY = "fibank-task-auth";

type StoredAuth = {
  isAuthenticated: boolean;
  username: string | null;
};

const getInitialAuthState = (): StoredAuth => {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as StoredAuth;
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }
  return { isAuthenticated: false, username: null };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialState = getInitialAuthState();
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const [username, setUsername] = useState<string | null>(
    initialState.username
  );

  useEffect(() => {
    const value: StoredAuth = { isAuthenticated, username };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }, [isAuthenticated, username]);

  const login = (name: string) => {
    setIsAuthenticated(true);
    setUsername(name);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout, username }),
    [isAuthenticated, username]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

