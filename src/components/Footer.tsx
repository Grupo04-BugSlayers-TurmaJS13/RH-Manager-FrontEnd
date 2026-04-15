import { ArrowUp } from "lucide-react";

function Logo() {
  return (
    <img
      src="/logo.png"
      alt="RH Manager"
      width={38}
      height={38}
      className="object-contain"
    />
  );
}

export function Footer() {
  return (
    <footer className="bg-purple">
      <div className="w-full px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Logo />
            <div className="leading-tight">
              <div className="text-white font-extrabold text-base tracking-wide">
                RH MANAGER
              </div>
              <div className="text-white/60 text-xs">
                Sistema de Gestão de Recursos Humanos
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <a
              href="#colaboradores"
              className="text-white/70 hover:text-white text-sm font-semibold tracking-widest uppercase transition-colors"
            >
              Colaboradores
            </a>
          </nav>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold"
          >
            <span>Topo</span>
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white transition-colors">
              <ArrowUp size={16} />
            </div>
          </button>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            @{new Date().getFullYear()} RH Manager - Projeto BugSlayers -
            Generation Brasil
          </p>
          <p className="text-white/40 text-xs">
            Desenvolvido com React + Typescript + NestJs
          </p>
        </div>
      </div>
    </footer>
  );
}
