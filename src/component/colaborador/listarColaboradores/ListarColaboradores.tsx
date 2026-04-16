import { useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass, UserPlus } from "@phosphor-icons/react";
import CardColaborador from '../cardcolaborador/CardColaborador';
import { useColaboradores } from '../../../context/ColaboradorContext';
import { useAuth } from '../../../context/AuthContext';
import type Colaborador from '../../../models/Colaborador';

const STATUS_FILTERS: Array<Colaborador["status"] | "Todos"> = ["Todos", "Ativo", "Férias", "Afastado"];

function ListarColaboradores() {
  const { colaboradores } = useColaboradores();
  const { autenticado } = useAuth();
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<Colaborador["status"] | "Todos">("Todos");

  const filtrados = colaboradores.filter((c) => {
    const termo = busca.toLowerCase();
    const matchBusca = c.nome.toLowerCase().includes(termo) || c.cargo.toLowerCase().includes(termo);
    const matchStatus = filtroStatus === "Todos" || c.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  return (
    <main className="min-h-screen bg-custom-beige py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-widest text-purple">
                Colaboradores
              </h2>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
                Dados fictícios — uso exclusivo para demonstração (LGPD)
              </p>
            </div>
            {autenticado && (
              <Link
                to="/colaboradores/novo"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors shadow-sm"
              >
                <UserPlus size={16} />
                Novo
              </Link>
            )}
          </div>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up animate-delay-100">
          <div className="relative flex-1">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou cargo..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setFiltroStatus(s)}
                className={`text-xs uppercase tracking-widest px-4 py-2.5 rounded-lg border font-semibold transition-colors ${
                  filtroStatus === s
                    ? "bg-purple text-custom-beige border-purple"
                    : "bg-white text-gray-600 border-gray-200 hover:border-purple hover:text-purple"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {filtrados.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Nenhum colaborador encontrado.</p>
            <button
              onClick={() => { setBusca(""); setFiltroStatus("Todos"); }}
              className="mt-4 text-sm text-primary hover:underline uppercase tracking-widest"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((colaborador) => (
              <CardColaborador key={colaborador.id} colaborador={colaborador} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ListarColaboradores;