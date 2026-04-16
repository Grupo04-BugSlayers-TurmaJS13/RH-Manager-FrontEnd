import { useState, useEffect } from "react";
import { UserCircle, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SignOut, Gear } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "Colaboradores", href: "/colaboradores" },
  { label: "Sobre", href: "/sobre" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { autenticado, manager, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrolled(window.scrollY > 10);
      setProgress((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      <div id="scroll-progress" style={{ width: `${progress}%` }} />

      <header className={`fixed top-0 left-0 right-0 z-50 bg-custom-beige transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}>
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="RH Manager" width={65} height={45} className="object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  location.pathname === link.href
                    ? "text-primary font-semibold border-b-2 border-primary pb-0.5"
                    : "text-gray-800 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {autenticado ? (
              <div className="ml-2 flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <UserCircle size={20} className="text-primary" />
                  <span className="font-semibold tracking-wide">{manager?.nome}</span>
                </div>
                <Link
                  to="/configuracoes"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gray-500 hover:text-primary transition-colors border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg"
                  aria-label="Configurações"
                >
                  <Gear size={14} />
                  Config.
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors border border-gray-200 hover:border-red-300 px-3 py-1.5 rounded-lg"
                >
                  <SignOut size={14} />
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-2 inline-flex items-center gap-2 text-sm uppercase tracking-widest bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                <UserCircle size={18} />
                Entrar
              </Link>
            )}
          </nav>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-purple-dark px-6 py-4 flex flex-col gap-3 shadow-lg md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm uppercase tracking-widest py-2 border-b border-white/10 transition-colors ${
                location.pathname === link.href ? "text-primary" : "text-white/80 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {autenticado ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-red-400 pt-2 font-semibold"
            >
              <SignOut size={16} />
              Sair
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary pt-2 font-semibold"
            >
              <UserCircle size={18} />
              Entrar
            </Link>
          )}
        </div>
      )}
    </>
  );
}
