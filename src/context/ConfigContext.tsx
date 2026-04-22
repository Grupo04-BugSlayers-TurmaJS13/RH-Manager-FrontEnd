import { createContext, useContext, useState } from "react";
import { type ConfigSistema, CONFIG_DEFAULT } from "../util/calculos";

interface ConfigContextType {
  config: ConfigSistema;
  salvar: (c: ConfigSistema) => void;
}

const ConfigContext = createContext<ConfigContextType | null>(null);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ConfigSistema>(() => {
    try {
      const salvo = localStorage.getItem("rh_config");
      return salvo ? { ...CONFIG_DEFAULT, ...JSON.parse(salvo) } : CONFIG_DEFAULT;
    } catch {
      return CONFIG_DEFAULT;
    }
  });

  const salvar = (nova: ConfigSistema) => {
    localStorage.setItem("rh_config", JSON.stringify(nova));
    setConfig(nova);
  };

  return (
    <ConfigContext.Provider value={{ config, salvar }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error("useConfig deve ser usado dentro de ConfigProvider");
  return ctx;
}
