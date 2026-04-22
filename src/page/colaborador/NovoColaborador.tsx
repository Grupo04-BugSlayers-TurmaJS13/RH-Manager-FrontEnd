import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, CheckCircle } from "@phosphor-icons/react";
import { useColaboradores } from "../../context/ColaboradorContext";
import type Colaborador from "../../models/Colaborador";

interface FormState {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  salario: string;
  dataNascimento: string;
  dataAdimissao: string;
  status: Colaborador["status"];
  foto: string;
}

const FORM_INICIAL: FormState = {
  nome: "",
  email: "",
  telefone: "",
  cargo: "",
  salario: "",
  dataNascimento: "",
  dataAdimissao: "",
  status: "Ativo",
  foto: "",
};

const CARGOS = [
  "Analista de RH",
  "Assistente de Recrutamento",
  "Coordenador de Pessoas",
  "Especialista em Benefícios",
  "Analista de Folha",
  "Analista de Treinamento",
  "Auxiliar Administrativo",
  "Gerente de RH",
  "Diretor de Pessoas",
];

function NovoColaborador() {
  const { adicionar } = useColaboradores();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(FORM_INICIAL);
  const [erros, setErros] = useState<Partial<FormState>>({});
  const [sucesso, setSucesso] = useState(false);

  const set = (campo: keyof FormState, valor: string) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: "" }));
  };

  const validar = (): boolean => {
    const novosErros: Partial<FormState> = {};
    if (!form.nome.trim()) novosErros.nome = "Nome obrigatório";
    if (!form.cargo) novosErros.cargo = "Cargo obrigatório";
    if (!form.salario || isNaN(Number(form.salario)) || Number(form.salario) <= 0)
      novosErros.salario = "Salário inválido";
    if (!form.dataNascimento) novosErros.dataNascimento = "Data obrigatória";
    if (!form.dataAdimissao) novosErros.dataAdimissao = "Data obrigatória";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    adicionar({
      nome: form.nome.trim(),
      email: form.email.trim(),
      telefone: form.telefone.trim(),
      cargo: form.cargo,
      salario: Number(form.salario),
      dataNascimento: new Date(form.dataNascimento),
      dataAdimissao: new Date(form.dataAdimissao),
      status: form.status,
      foto: form.foto.trim() || `https://i.pravatar.cc/300?u=${form.nome}`,
    });

    setSucesso(true);
    setTimeout(() => navigate("/colaboradores"), 1800);
  };

  return (
    <main className="min-h-screen bg-custom-beige pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <Link
            to="/colaboradores"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Colaboradores
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-fade-in-up">

          <div className="bg-purple px-8 py-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <UserPlus size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-custom-beige uppercase tracking-widest">
                Novo Colaborador
              </h1>
              <p className="text-white/50 text-xs mt-0.5">Preencha os dados para cadastrar</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 flex flex-col gap-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  Nome completo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Ana Paula Souza"
                  value={form.nome}
                  onChange={(e) => set("nome", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition ${
                    erros.nome ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                  }`}
                />
                {erros.nome && <p className="text-xs text-red-500 uppercase tracking-widest">{erros.nome}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">E-mail</label>
                <input
                  type="email"
                  placeholder="colaborador@empresa.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Telefone</label>
                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  value={form.telefone}
                  onChange={(e) => set("telefone", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  Cargo
                </label>
                <select
                  value={form.cargo}
                  onChange={(e) => set("cargo", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition bg-white ${
                    erros.cargo ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                >
                  <option value="">Selecione...</option>
                  {CARGOS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {erros.cargo && <p className="text-xs text-red-500 uppercase tracking-widest">{erros.cargo}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  Salário (R$)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 4500"
                  min={0}
                  value={form.salario}
                  onChange={(e) => set("salario", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition ${
                    erros.salario ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                  }`}
                />
                {erros.salario && <p className="text-xs text-red-500 uppercase tracking-widest">{erros.salario}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  value={form.dataNascimento}
                  onChange={(e) => set("dataNascimento", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition ${
                    erros.dataNascimento ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                  }`}
                />
                {erros.dataNascimento && <p className="text-xs text-red-500 uppercase tracking-widest">{erros.dataNascimento}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  Data de Admissão
                </label>
                <input
                  type="date"
                  value={form.dataAdimissao}
                  onChange={(e) => set("dataAdimissao", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition ${
                    erros.dataAdimissao ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                  }`}
                />
                {erros.dataAdimissao && <p className="text-xs text-red-500 uppercase tracking-widest">{erros.dataAdimissao}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => set("status", e.target.value as Colaborador["status"])}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Férias">Férias</option>
                  <option value="Afastado">Afastado</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  URL da Foto <span className="text-gray-300 normal-case">(opcional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={form.foto}
                  onChange={(e) => set("foto", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <p className="text-xs text-gray-400">Se não informada, será gerada automaticamente.</p>
              </div>

            </div>

            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <Link
                to="/colaboradores"
                className="flex-1 py-3 rounded-lg border border-gray-200 text-gray-500 text-sm uppercase tracking-widest text-center hover:border-gray-400 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={sucesso}
                className="flex-1 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-60"
              >
                {sucesso ? "Cadastrado!" : "Cadastrar"}
              </button>
            </div>

          </form>
        </div>

        {sucesso && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up bg-white border border-green-200 shadow-xl rounded-xl px-5 py-4 flex items-center gap-3 max-w-xs">
            <CheckCircle size={22} className="text-green-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Colaborador cadastrado!</p>
              <p className="text-xs text-gray-500">Redirecionando para a lista...</p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default NovoColaborador;
