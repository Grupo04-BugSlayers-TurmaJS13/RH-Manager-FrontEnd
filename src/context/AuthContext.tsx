import { createContext, useContext, useState } from "react";

interface Manager {
  nome: string;
  email: string;
}

interface AuthContextType {
  manager: Manager | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
  autenticado: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MANAGER_MOCK: Manager = {
  nome: "Gerente RH",
  email: "manager@rhmanager.com",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [manager, setManager] = useState<Manager | null>(() => {
    const salvo = sessionStorage.getItem("rh_manager_session");
    return salvo ? JSON.parse(salvo) : null;
  });

  const login = (email: string, _senha: string): boolean => {
    if (!email) return false;
    const sessao = { ...MANAGER_MOCK, email };
    sessionStorage.setItem("rh_manager_session", JSON.stringify(sessao));
    setManager(sessao);
    return true;
  };

  const logout = () => {
    sessionStorage.removeItem("rh_manager_session");
    setManager(null);
  };

  return (
    <AuthContext.Provider value={{ manager, login, logout, autenticado: !!manager }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
