import { createContext, useContext, useState } from "react";
import type Colaborador from "../models/Colaborador";
import { Colaboradores as MOCK } from "../util/DadosColaborador";

interface ColaboradorContextType {
  colaboradores: Colaborador[];
  adicionar: (c: Omit<Colaborador, "id">) => void;
  atualizar: (c: Colaborador) => void;
  remover: (id: number) => void;
}

const ColaboradorContext = createContext<ColaboradorContextType | null>(null);

export function ColaboradorProvider({ children }: { children: React.ReactNode }) {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>(MOCK);

  const adicionar = (dados: Omit<Colaborador, "id">) => {
    const novoId = Math.max(...colaboradores.map((c) => c.id), 0) + 1;
    setColaboradores((prev) => [...prev, { id: novoId, ...dados }]);
  };

  const atualizar = (atualizado: Colaborador) => {
    setColaboradores((prev) =>
      prev.map((c) => (c.id === atualizado.id ? atualizado : c))
    );
  };

  const remover = (id: number) => {
    setColaboradores((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ColaboradorContext.Provider value={{ colaboradores, adicionar, atualizar, remover }}>
      {children}
    </ColaboradorContext.Provider>
  );
}

export function useColaboradores() {
  const ctx = useContext(ColaboradorContext);
  if (!ctx) throw new Error("useColaboradores deve ser usado dentro de ColaboradorProvider");
  return ctx;
}
