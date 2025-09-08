"use client";

import { getAuthInfo } from "@/utils/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  userId: string | null;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // only runs on client
    const storedToken = localStorage.getItem("token");
    const storedUserId = getAuthInfo().userId;

    if (storedToken) setToken(storedToken);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
