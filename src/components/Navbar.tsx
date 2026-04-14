import { useState } from "react";
import { UserCircle, Menu, X } from "lucide-react";

function Logo() {
  return (
    <img
      src="/logo.png"
      alt="RH Manager"
      width={42}
      height={42}
      className="object-contain"
    />
  );
}

// aqui vcs precisam colocar as paginas tipo o href do sobre, etc pra poder funcionar

const NAV_LINKS = [{ label: "Colaboradores", href: "#colaboradores" }];
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-purple shadow-md">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Logo />
            <div className="leading-tight">
              <div className="text-white font-extrabold text-base tracking-wide">
                RH Manager
              </div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-semibold tracking-widest uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}

            <button
              aria-label="Perfil do usuário"
              className="text-white/80 hover:text-white transition-colors ml-2"
            >
              <UserCircle size={28} strokeWidth={1.5} />
            </button>
          </nav>
          {/* adaptabilidade pro mobile aqui */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-purple-dark px-6 py-4 flex flex-col gap-3 shadow-lg md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-sm font-semibold uppercase tracking-widest py-2 border-b border-white/10"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-2 text-white/70 text-sm">
            <UserCircle size={22} strokeWidth={1.5} />
            <span>Minha Conta</span>
          </div>
        </div>
      )}
    </>
  );
}
