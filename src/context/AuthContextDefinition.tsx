import { createContext } from "react";

export type AuthContextValue = {
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  username: string | null;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
