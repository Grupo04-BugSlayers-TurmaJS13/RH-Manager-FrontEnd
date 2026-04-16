import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Gear, Info, Users, CalendarBlank, Calculator } from "@phosphor-icons/react";
import { useConfig } from "../../context/ConfigContext";
import { useAuth } from "../../context/AuthContext";
import { CONFIG_DEFAULT, fmtBRL, calcularSalarioLiquido, type ConfigSistema } from "../../util/calculos";

function SectionHeader({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800">{title}</h2>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function Configuracoes() {
  const { config, salvar } = useConfig();
  const { manager } = useAuth();
  const [form, setForm] = useState<ConfigSistema>({ ...config });
  const [salvo, setSalvo] = useState(false);
  const [salarioSim, setSalarioSim] = useState("5000");

  const set = <K extends keyof ConfigSistema>(campo: K, valor: ConfigSistema[K]) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setSalvo(false);
  };

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    salvar(form);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  const handleReset = () => {
    setForm({ ...CONFIG_DEFAULT });
    setSalvo(false);
  };

  const salarioNum = Math.max(0, Number(salarioSim) || 0);
  const preview = calcularSalarioLiquido(salarioNum, 0, form);

  return (
    <main className="min-h-screen bg-custom-beige pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <Link
            to="/colaboradores"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-fade-in-up">
          <div className="bg-purple px-8 py-7 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Gear size={22} className="text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-custom-beige uppercase tracking-widest">
                Configurações do Sistema
              </h1>
              <p className="text-white/40 text-xs mt-0.5">
                {manager?.nome} &mdash; {manager?.email}
              </p>
            </div>
          </div>

          <div className="px-6 py-4 bg-primary/5 border-b border-primary/10 flex items-start gap-2">
            <Users size={14} className="text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-700">Escopo global</span> — estas configurações se aplicam a
              todos os colaboradores do sistema. Apenas o manager autenticado pode alterá-las.
            </p>
          </div>

          <form onSubmit={handleSalvar} className="px-8 py-8 flex flex-col gap-8">

            <section className="flex flex-col gap-5">
              <SectionHeader
                icon={<CalendarBlank size={16} className="text-primary" />}
                title="Gestão de Férias"
                description="Parâmetros aplicados nos cálculos de férias de todos os colaboradores"
              />

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                    Antecedência do alerta de vencimento
                  </label>
                  <span className="text-sm font-bold text-primary">{form.alertaFeriasEmDias} dias</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={120}
                  step={15}
                  value={form.alertaFeriasEmDias}
                  onChange={(e) => set("alertaFeriasEmDias", Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-300">
                  <span>15 dias</span><span>120 dias</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  O sistema exibirá um alerta no perfil do colaborador quando o período concessivo vencer
                  em até <strong>{form.alertaFeriasEmDias} dias</strong> (CLT art. 134 — prazo máximo 12 meses após o aquisitivo).
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  Duração padrão das férias concedidas
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { dias: 30, desc: "Integral" },
                    { dias: 20, desc: "Fracionado" },
                    { dias: 15, desc: "Mínimo CLT" },
                  ] as const).map(({ dias, desc }) => (
                    <button
                      key={dias}
                      type="button"
                      onClick={() => set("diasFeriasDefault", dias)}
                      className={`flex flex-col items-center py-3 rounded-xl border text-sm font-bold transition-colors ${
                        form.diasFeriasDefault === dias
                          ? "bg-purple text-custom-beige border-purple"
                          : "bg-white text-gray-600 border-gray-200 hover:border-purple hover:text-purple"
                      }`}
                    >
                      <span className="text-lg">{dias}</span>
                      <span className="text-xs font-normal uppercase tracking-widest mt-0.5">{desc}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  CLT art. 134 §1º — férias podem ser fracionadas em até 3 períodos: mínimo de 14 + 5 + 5 dias.
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-5">
              <SectionHeader
                icon={<Calculator size={16} className="text-primary" />}
                title="Encargos Trabalhistas"
                description="Percentuais usados nos cálculos de custo da empresa"
              />

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                    FGTS — percentual de recolhimento
                  </label>
                  <span className="text-sm font-bold text-primary">{form.percentualFGTS}%</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={8}
                  step={2}
                  value={form.percentualFGTS}
                  onChange={(e) => set("percentualFGTS", Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-300">
                  <span>2% (aprendiz)</span><span>8% (CLT padrão)</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Lei 8.036/1990 — encargo da empresa, não descontado do colaborador.
                  Padrão CLT: 8%. Contratos de aprendizagem: 2%.
                </p>
              </div>
            </section>

            <section className="flex flex-col gap-5">
              <SectionHeader
                icon={<Info size={16} className="text-primary" />}
                title="Simulador de Salário"
                description="Prévia dos cálculos com as configurações atuais — não afeta nenhum colaborador"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                  Salário bruto para simulação
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">R$</span>
                  <input
                    type="number"
                    min={0}
                    value={salarioSim}
                    onChange={(e) => setSalarioSim(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  />
                </div>
              </div>

              {salarioNum > 0 && (
                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <div className="grid grid-cols-2 divide-x divide-y divide-gray-100">
                    <div className="p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-widest">Salário Bruto</p>
                      <p className="font-semibold text-gray-800 mt-1">{fmtBRL(preview.bruto)}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-widest">INSS (colaborador)</p>
                      <p className="font-semibold text-red-500 mt-1">− {fmtBRL(preview.inss.valorDescontado)}</p>
                      <p className="text-xs text-gray-400">Alíq. efetiva: {preview.inss.aliquotaEfetiva.toFixed(2)}%</p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-widest">IRRF (colaborador)</p>
                      <p className="font-semibold text-red-500 mt-1">
                        {preview.irrf.isento ? "Isento" : `− ${fmtBRL(preview.irrf.valorDescontado)}`}
                      </p>
                      {!preview.irrf.isento && (
                        <p className="text-xs text-gray-400">Alíq.: {preview.irrf.aliquota.toFixed(1)}%</p>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-widest">FGTS (empresa)</p>
                      <p className="font-semibold text-gray-600 mt-1">{fmtBRL(preview.fgts)}</p>
                      <p className="text-xs text-gray-400">{form.percentualFGTS}% sobre bruto</p>
                    </div>
                    <div className="col-span-2 p-4 bg-white">
                      <p className="text-xs text-gray-400 uppercase tracking-widest">Salário Líquido</p>
                      <p className="text-2xl font-extrabold text-primary mt-1">{fmtBRL(preview.liquido)}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Descontos totais: {fmtBRL(preview.totalDescontos)} ({((preview.totalDescontos / preview.bruto) * 100).toFixed(1)}% do bruto)
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-primary/5 border-t border-primary/10">
                    <p className="text-xs text-gray-500">
                      INSS: tabela progressiva 2024 (Portaria MPS 914/2024) &bull; IRRF: tabela 2024 (Lei 14.663/2023) &bull; FGTS: encargo da empresa
                    </p>
                  </div>
                </div>
              )}
            </section>

            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-3 rounded-lg border border-gray-200 text-gray-500 text-sm uppercase tracking-widest hover:border-gray-400 transition-colors"
              >
                Restaurar padrões
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold uppercase tracking-widest transition-colors"
              >
                {salvo ? "Salvo!" : "Salvar configurações"}
              </button>
            </div>

          </form>
        </div>

        {salvo && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up bg-white border border-green-200 shadow-xl rounded-xl px-5 py-4 flex items-center gap-3 max-w-xs">
            <CheckCircle size={22} className="text-green-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Configurações salvas!</p>
              <p className="text-xs text-gray-500">Aplicadas a todos os colaboradores.</p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default Configuracoes;
