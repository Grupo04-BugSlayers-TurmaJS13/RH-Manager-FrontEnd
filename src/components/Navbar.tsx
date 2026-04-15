import { useState } from "react";
import { UserCircle, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <img
      src="/logo.png"
      alt="RH Manager"
      width={65}
      height={45}
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-custom-beige shadow-md">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3">
            <Logo />
            {/* <div className="leading-tight">
              <div className="text-gray-800 font-Regular text-base tracking-wide">
                RH Manager
              </div> */}
            {/* </div> */}
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/colaboradores">
            {NAV_LINKS.map((link) => (
              
              <a
                key={link.label}
                href={link.href}
                className="text-gray-800 hover:text-purple text-sm font-regular uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}
            </Link>
            <button
              aria-label="Perfil do usuário"
              className="text-gray-800 hover:text-purple transition-colors ml-2"
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
