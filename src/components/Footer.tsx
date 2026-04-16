import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Início", href: "/" },
  { label: "Colaboradores", href: "/colaboradores" },
  { label: "Sobre", href: "/sobre" },
  { label: "Entrar", href: "/login" },
];

export function Footer() {
  return (
    <footer className="bg-gray-700 text-white">
      <div className="max-w-6xl mx-auto px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="RH Manager" width={32} height={32} className="object-contain opacity-80" />
          <span className="text-custom-beige font-bold text-sm tracking-widest uppercase">RH Manager</span>
        </div>
        <nav className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-white/50 hover:text-primary text-xs uppercase tracking-widest transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-widest">Topo</span>
          <div className="w-7 h-7 rounded-full border border-white/20 group-hover:border-primary flex items-center justify-center transition-colors">
            <ArrowUp size={12} />
          </div>
        </button>
      </div>
      <div className="border-t border-white/10 px-8 py-3">
        <p className="text-white/25 text-xs text-center tracking-wide">
          &copy; {new Date().getFullYear()} RH Manager &mdash; BugSlayers &mdash; Generation Brasil &mdash; Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
