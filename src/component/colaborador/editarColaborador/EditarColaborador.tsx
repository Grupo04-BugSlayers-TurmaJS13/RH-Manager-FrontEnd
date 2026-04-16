import { useState, useEffect } from "react";
import { X, CheckCircle, PencilSimple } from "@phosphor-icons/react";
import { useColaboradores } from "../../../context/ColaboradorContext";
import { useAuth } from "../../../context/AuthContext";
import type Colaborador from "../../../models/Colaborador";
import type { Endereco } from "../../../models/Colaborador";

interface Props {
  colaborador: Colaborador;
}

const ESTADOS_BR = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS",
  "MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC",
  "SP","SE","TO",
];

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

function fmtTelefone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}

function fmtCEP(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0,5)}-${d.slice(5)}` : d;
}

export function EditarColaborador({ colaborador }: Props) {
  const { atualizar } = useColaboradores();
  const { autenticado } = useAuth();
  const [aberto, setAberto] = useState(false);
  const [salvo, setSalvo] = useState(false);

  const enderecoVazio: Endereco = {
    logradouro: "", numero: "", complemento: "",
    bairro: "", cidade: "", estado: "SP", cep: "",
  };

  const [form, setForm] = useState({
    nome: colaborador.nome,
    email: colaborador.email,
    telefone: colaborador.telefone,
    cargo: colaborador.cargo,
    status: colaborador.status,
    foto: colaborador.foto,
    endereco: colaborador.endereco ?? enderecoVazio,
  });

  useEffect(() => {
    setForm({
      nome: colaborador.nome,
      email: colaborador.email,
      telefone: colaborador.telefone,
      cargo: colaborador.cargo,
      status: colaborador.status,
      foto: colaborador.foto,
      endereco: colaborador.endereco ?? enderecoVazio,
    });
  }, [colaborador.id]);

  if (!autenticado) return null;

  const setEnd = (campo: keyof Endereco, valor: string) =>
    setForm((f) => ({ ...f, endereco: { ...f.endereco, [campo]: valor } }));

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    atualizar({ ...colaborador, ...form });
    setSalvo(true);
    setTimeout(() => { setSalvo(false); setAberto(false); }, 1500);
  };

  const inputCls = "w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition";
  const labelCls = "text-xs uppercase tracking-widest text-gray-500 font-semibold";

  return (
    <>
      <button
        onClick={() => setAberto(true)}
        className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors"
      >
        <PencilSimple size={14} />
        Editar
      </button>

      {aberto && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setAberto(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-fade-in-up overflow-hidden">

            <div className="bg-purple px-6 py-5 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-base font-bold text-custom-beige uppercase tracking-widest">
                  Editar Colaborador
                </h2>
                <p className="text-white/40 text-xs mt-0.5">{colaborador.nome}</p>
              </div>
              <button
                onClick={() => setAberto(false)}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSalvar}
              className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6"
            >
              <section className="flex flex-col gap-4">
                <p className="text-xs font-bold uppercase tracking-widest text-primary border-b border-gray-100 pb-2">
                  Dados Pessoais
                </p>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Nome completo</label>
                  <input
                    type="text"
                    value={form.nome}
                    onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                    className={inputCls}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>E-mail</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputCls}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Telefone</label>
                  <input
                    type="text"
                    value={form.telefone}
                    onChange={(e) => setForm((f) => ({ ...f, telefone: fmtTelefone(e.target.value) }))}
                    placeholder="(00) 00000-0000"
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Cargo</label>
                    <select
                      value={form.cargo}
                      onChange={(e) => setForm((f) => ({ ...f, cargo: e.target.value }))}
                      className={inputCls}
                    >
                      {CARGOS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Colaborador["status"] }))}
                      className={inputCls}
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Férias">Férias</option>
                      <option value="Afastado">Afastado</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>URL da Foto</label>
                  <input
                    type="url"
                    value={form.foto}
                    onChange={(e) => setForm((f) => ({ ...f, foto: e.target.value }))}
                    placeholder="https://..."
                    className={inputCls}
                  />
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <p className="text-xs font-bold uppercase tracking-widest text-primary border-b border-gray-100 pb-2">
                  Endereço
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label className={labelCls}>Logradouro</label>
                    <input
                      type="text"
                      value={form.endereco.logradouro}
                      onChange={(e) => setEnd("logradouro", e.target.value)}
                      placeholder="Rua, Av., Travessa..."
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Número</label>
                    <input
                      type="text"
                      value={form.endereco.numero}
                      onChange={(e) => setEnd("numero", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Complemento <span className="text-gray-300 normal-case">(opcional)</span></label>
                  <input
                    type="text"
                    value={form.endereco.complemento ?? ""}
                    onChange={(e) => setEnd("complemento", e.target.value)}
                    placeholder="Apto, Sala, Bloco..."
                    className={inputCls}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Bairro</label>
                  <input
                    type="text"
                    value={form.endereco.bairro}
                    onChange={(e) => setEnd("bairro", e.target.value)}
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Cidade</label>
                    <input
                      type="text"
                      value={form.endereco.cidade}
                      onChange={(e) => setEnd("cidade", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Estado</label>
                    <select
                      value={form.endereco.estado}
                      onChange={(e) => setEnd("estado", e.target.value)}
                      className={inputCls}
                    >
                      {ESTADOS_BR.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>CEP</label>
                  <input
                    type="text"
                    value={form.endereco.cep}
                    onChange={(e) => setEnd("cep", fmtCEP(e.target.value))}
                    placeholder="00000-000"
                    className={inputCls}
                  />
                </div>
              </section>

              <div className="flex gap-3 pt-2 border-t border-gray-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setAberto(false)}
                  className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-500 text-sm uppercase tracking-widest hover:border-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvo}
                  className="flex-1 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-60"
                >
                  {salvo ? "Salvo!" : "Salvar alterações"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {salvo && (
        <div className="fixed bottom-6 right-6 z-[60] animate-fade-in-up bg-white border border-green-200 shadow-xl rounded-xl px-5 py-4 flex items-center gap-3 max-w-xs">
          <CheckCircle size={22} className="text-green-500 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Alterações salvas!</p>
            <p className="text-xs text-gray-500">{form.nome} foi atualizado(a).</p>
          </div>
        </div>
      )}
    </>
  );
}
