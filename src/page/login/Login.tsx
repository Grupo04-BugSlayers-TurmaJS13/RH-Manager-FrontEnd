import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, LockKey, EnvelopeSimple } from "@phosphor-icons/react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    const ok = login(form.email, form.senha);
    if (ok) navigate("/colaboradores");
    else setErro("Credenciais inválidas.");
  };

  return (
    <main className="min-h-screen flex">
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-purple px-16 py-12">
        <Link to="/">
          <img src="/logo.png" alt="RH Manager" className="w-16 object-contain" />
        </Link>
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-extrabold text-custom-beige uppercase tracking-widest leading-tight">
            RH<br />Manager
          </h1>
          <div className="w-16 h-1 bg-primary rounded-full" />
          <p className="text-custom-beige/70 text-lg leading-relaxed max-w-sm">
            Gerencie sua equipe com <span className="text-primary font-semibold">eficiência</span> e{" "}
            <span className="text-primary font-semibold">inteligência</span>.
          </p>
        </div>
        <p className="text-white/30 text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} RH Manager — BugSlayers
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center bg-custom-beige px-8 py-16">
        <div className="w-full max-w-sm">

          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-purple">Bem-vindo</h2>
            <p className="text-gray-500 text-sm mt-1">Acesse sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                E-mail
              </label>
              <div className="relative">
                <EnvelopeSimple size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                Senha
              </label>
              <div className="relative">
                <LockKey size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.senha}
                  onChange={(e) => setForm({ ...form, senha: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                >
                  {show ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {erro && (
              <p className="text-red-500 text-xs uppercase tracking-widest">{erro}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest py-3 rounded-lg transition-colors shadow-lg shadow-primary/20 mt-2"
            >
              Entrar
            </button>

          </form>

          <p className="text-center text-xs text-gray-400 mt-8 uppercase tracking-widest">
            <Link to="/" className="hover:text-primary transition-colors">← Voltar ao início</Link>
          </p>

          <div className="mt-6 flex items-start gap-2 bg-primary/10 border border-primary/20 rounded-lg px-4 py-3">
            <span className="w-4 h-4 mt-0.5 shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold leading-none">i</span>
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-700">Modo demonstração</span> — qualquer e-mail e senha são aceitos para acesso.
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}

export default Login;
