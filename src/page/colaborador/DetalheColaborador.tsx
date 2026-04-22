import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Briefcase, Calendar,
  Cake, Gift, CheckCircle, X,
  Confetti, Warning, SunHorizon, Phone, EnvelopeSimple, MapPin,
} from "@phosphor-icons/react";
import { useColaboradores } from "../../context/ColaboradorContext";
import { useConfig } from "../../context/ConfigContext";
import type Colaborador from "../../models/Colaborador";
import { EditarColaborador } from "../../component/colaborador/editarColaborador/EditarColaborador";
import {
  calcularFerias,
  calcularSalarioLiquido,
  calcularDecimoTerceiro,
  calcularTempoEmpresa,
  fmtBRL,
  fmtData,
} from "../../util/calculos";

const STATUS_STYLE: Record<Colaborador["status"], string> = {
  Ativo:    "bg-green-100 text-green-700 border border-green-200",
  Férias:   "bg-blue-100 text-blue-700 border border-blue-200",
  Afastado: "bg-red-100 text-red-600 border border-red-200",
};

function isAniversarioHoje(dataNascimento: Date): boolean {
  const hoje = new Date();
  const nasc = new Date(dataNascimento);
  return nasc.getDate() === hoje.getDate() && nasc.getMonth() === hoje.getMonth();
}

function InfoRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
      {sub && <p className="text-xs text-primary mt-0.5">{sub}</p>}
    </div>
  );
}

function DetalheColaborador() {
  const { id } = useParams<{ id: string }>();
  const { colaboradores } = useColaboradores();
  const { config } = useConfig();

  const index = colaboradores.findIndex((c) => c.id === Number(id));
  const colaborador = index !== -1 ? colaboradores[index] : null;
  const anterior = index > 0 ? colaboradores[index - 1] : null;
  const proximo = index < colaboradores.length - 1 ? colaboradores[index + 1] : null;

  const [dayOffEnviado, setDayOffEnviado] = useState(false);
  const [confirmar, setConfirmar] = useState(false);

  if (!colaborador) {
    return (
      <main className="min-h-screen bg-custom-beige flex flex-col items-center justify-center gap-4 pt-16">
        <p className="text-gray-500 text-lg">Colaborador não encontrado.</p>
        <Link to="/colaboradores" className="text-sm uppercase tracking-widest text-primary hover:underline">
          Voltar à lista
        </Link>
      </main>
    );
  }

  const aniversario = isAniversarioHoje(colaborador.dataNascimento);
  const tempo = calcularTempoEmpresa(colaborador.dataAdimissao);
  const ferias = calcularFerias(
    colaborador.dataAdimissao,
    colaborador.ferias,
    colaborador.periodoConcessivoFim,
    config
  );
  const salario = calcularSalarioLiquido(colaborador.salario, 0, config);
  const decimoTerceiro = calcularDecimoTerceiro(colaborador.salario, colaborador.dataAdimissao);

  const handleDayOff = () => {
    setConfirmar(false);
    setDayOffEnviado(true);
    setTimeout(() => setDayOffEnviado(false), 5000);
  };

  return (
    <main className="min-h-screen bg-custom-beige pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-4">

        <div className="flex items-center justify-between">
          <Link
            to="/colaboradores"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Colaboradores
          </Link>
          <div className="flex items-center gap-4">
            {anterior && (
              <Link to={`/colaboradores/${anterior.id}`} className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
                <ArrowLeft size={14} />{anterior.nome.split(" ")[0]}
              </Link>
            )}
            {proximo && (
              <Link to={`/colaboradores/${proximo.id}`} className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
                {proximo.nome.split(" ")[0]}<ArrowRight size={14} />
              </Link>
            )}
            <EditarColaborador colaborador={colaborador} />
          </div>
        </div>

        {aniversario && (
          <div className="animate-fade-in-up bg-primary/5 border border-primary/20 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Confetti size={22} className="text-primary shrink-0" />
              <div>
                <p className="font-bold text-gray-800 uppercase tracking-widest text-sm">
                  Aniversário de {colaborador.nome.split(" ")[0]}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Conceda um day-off como reconhecimento.</p>
              </div>
            </div>
            <button
              onClick={() => setConfirmar(true)}
              disabled={dayOffEnviado}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors shadow-sm shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Gift size={14} />
              Conceder Day-Off
            </button>
          </div>
        )}

        {ferias.alertaVencimento && !ferias.emFerias && (
          <div className="animate-fade-in-up bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 flex items-start gap-3">
            <Warning size={20} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800 uppercase tracking-widest text-sm">
                Férias a vencer em {ferias.vencimentoEmDias} dias
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                Período concessivo encerra em {fmtData(ferias.periodoConcessivoFim)}. Agende com antecedência mínima de 30 dias (CLT art. 135).
              </p>
            </div>
          </div>
        )}

        {ferias.emFerias && (
          <div className="animate-fade-in-up bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 flex items-start gap-3">
            <SunHorizon size={20} className="text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-blue-800 uppercase tracking-widest text-sm">Em férias</p>
              <p className="text-xs text-blue-600 mt-0.5">
                {ferias.diasDecorridos}º dia de férias — retorno previsto em {ferias.retornoPrevisto ? fmtData(ferias.retornoPrevisto) : "—"} ({ferias.diasRestantesFerias} dias restantes).
              </p>
            </div>
          </div>
        )}

        {confirmar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full animate-fade-in-up">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Gift size={20} className="text-primary shrink-0" />
                  <h2 className="font-bold text-gray-800 uppercase tracking-widest text-sm">Conceder Day-Off</h2>
                </div>
                <button onClick={() => setConfirmar(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Você está prestes a conceder um <span className="font-semibold text-primary">day-off</span> para{" "}
                <span className="font-semibold">{colaborador.nome}</span> como presente de aniversário.
                Esta ação será registrada no sistema.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmar(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-500 text-sm uppercase tracking-widest hover:border-gray-400 transition-colors">
                  Cancelar
                </button>
                <button onClick={handleDayOff} className="flex-1 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold uppercase tracking-widest transition-colors">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {dayOffEnviado && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up bg-white border border-green-200 shadow-xl rounded-xl px-5 py-4 flex items-center gap-3 max-w-xs">
            <CheckCircle size={22} className="text-green-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Day-off concedido!</p>
              <p className="text-xs text-gray-500">{colaborador.nome.split(" ")[0]} foi notificado(a).</p>
            </div>
            <button onClick={() => setDayOffEnviado(false)} className="ml-auto text-gray-300 hover:text-gray-500 transition-colors">
              <X size={16} />
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-fade-in-up">
          <div className="bg-purple px-8 py-10 flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={colaborador.foto}
                alt={`Foto de ${colaborador.nome}`}
                className="w-28 h-28 rounded-full aspect-square object-cover ring-4 ring-primary/40"
              />
              {aniversario && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Confetti size={11} className="text-white" weight="fill" />
                </span>
              )}
            </div>
            <div className="text-center flex flex-col items-center gap-2">
              <h1 className="text-2xl font-bold text-custom-beige uppercase tracking-widest">{colaborador.nome}</h1>
              <p className="text-primary text-sm tracking-widest uppercase">{colaborador.cargo}</p>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLE[colaborador.status]}`}>
                {colaborador.status}
              </span>
            </div>
          </div>

          <div className="px-8 py-8 flex flex-col gap-8">

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Briefcase size={20} className="text-primary mt-0.5 shrink-0" />
                <InfoRow label="Cargo" value={colaborador.cargo} />
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={20} className="text-primary mt-0.5 shrink-0" />
                <InfoRow
                  label="Admissão"
                  value={fmtData(colaborador.dataAdimissao)}
                  sub={`${tempo.texto} de empresa`}
                />
              </div>
              <div className="flex items-start gap-3">
                <Cake size={20} className="text-primary mt-0.5 shrink-0" />
                <InfoRow
                  label="Nascimento"
                  value={fmtData(colaborador.dataNascimento)}
                  sub={aniversario ? "Aniversário hoje" : undefined}
                />
              </div>
            </section>

            <section className="border-t border-gray-100 pt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Contato</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <EnvelopeSimple size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">E-mail</p>
                    <p className="text-gray-800 font-medium text-sm break-all">{colaborador.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Telefone</p>
                    <p className="text-gray-800 font-medium text-sm">{colaborador.telefone}</p>
                  </div>
                </div>
                {colaborador.endereco && (
                  <div className="sm:col-span-2 flex items-start gap-3">
                    <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest">Endereço</p>
                      <p className="text-gray-800 font-medium text-sm">
                        {colaborador.endereco.logradouro}, {colaborador.endereco.numero}
                        {colaborador.endereco.complemento ? ` — ${colaborador.endereco.complemento}` : ""}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {colaborador.endereco.bairro} &bull; {colaborador.endereco.cidade}/{colaborador.endereco.estado} &bull; CEP {colaborador.endereco.cep}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="border-t border-gray-100 pt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Remuneração</h2>
              <div className="bg-gray-50 rounded-xl p-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Salário Bruto</p>
                  <p className="font-semibold text-gray-800">{fmtBRL(salario.bruto)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">INSS</p>
                  <p className="font-semibold text-red-500">− {fmtBRL(salario.inss.valorDescontado)}</p>
                  <p className="text-xs text-gray-400">Alíq. efetiva: {salario.inss.aliquotaEfetiva.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">IRRF</p>
                  <p className="font-semibold text-red-500">
                    {salario.irrf.isento ? "Isento" : `− ${fmtBRL(salario.irrf.valorDescontado)}`}
                  </p>
                  {!salario.irrf.isento && (
                    <p className="text-xs text-gray-400">Alíq.: {salario.irrf.aliquota.toFixed(1)}%</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">FGTS (empresa)</p>
                  <p className="font-semibold text-gray-600">{fmtBRL(salario.fgts)}</p>
                  <p className="text-xs text-gray-400">{config.percentualFGTS}% sobre bruto</p>
                </div>
                <div className="col-span-2 border-t border-gray-200 pt-3">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Salário Líquido</p>
                  <p className="text-2xl font-extrabold text-primary">{fmtBRL(salario.liquido)}</p>
                </div>
              </div>
            </section>

            <section className="border-t border-gray-100 pt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Férias</h2>
              <div className="bg-gray-50 rounded-xl p-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Situação</p>
                  <p className="font-semibold text-gray-800">
                    {ferias.emFerias ? "Em gozo" : ferias.direitoAdquirido ? "Direito adquirido" : "Em aquisição"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Dias de direito</p>
                  <p className="font-semibold text-gray-800">{ferias.diasDireito} dias</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Proporcional atual</p>
                  <p className="font-semibold text-gray-800">{ferias.diasProporcional} dias</p>
                  <p className="text-xs text-gray-400">{ferias.mesesNoAquisitivo}/12 meses</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Período aquisitivo</p>
                  <p className="font-semibold text-gray-800 text-xs">
                    {fmtData(ferias.periodoAquisitivoInicio)} → {fmtData(ferias.periodoAquisitivoFim)}
                  </p>
                </div>
                {ferias.direitoAdquirido && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Período concessivo</p>
                    <p className={`font-semibold text-xs ${ferias.alertaVencimento ? "text-amber-600" : "text-gray-800"}`}>
                      {fmtData(ferias.periodoConcessivoInicio)} → {fmtData(ferias.periodoConcessivoFim)}
                      {ferias.vencimentoEmDias !== null && ferias.vencimentoEmDias > 0 && (
                        <span className="ml-2 text-gray-400">({ferias.vencimentoEmDias} dias restantes)</span>
                      )}
                    </p>
                  </div>
                )}
                {ferias.emFerias && ferias.retornoPrevisto && (
                  <div className="col-span-2 border-t border-gray-200 pt-3">
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Retorno previsto</p>
                    <p className="font-semibold text-blue-600">{fmtData(ferias.retornoPrevisto)}</p>
                    <p className="text-xs text-gray-400">{ferias.diasRestantesFerias} dias restantes de férias</p>
                  </div>
                )}
              </div>
            </section>

            <section className="border-t border-gray-100 pt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">13º Salário</h2>
              <div className="bg-gray-50 rounded-xl p-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Meses trabalhados no ano</p>
                  <p className="font-semibold text-gray-800">{decimoTerceiro.mesesTrabalhados}/12</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Valor proporcional</p>
                  <p className="font-semibold text-gray-800">{fmtBRL(decimoTerceiro.valorProporcional)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">1ª parcela (nov.)</p>
                  <p className="font-semibold text-gray-800">{fmtBRL(decimoTerceiro.primeiraParcelaLiquida)}</p>
                  <p className="text-xs text-gray-400">50% sem descontos</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">2ª parcela (dez.)</p>
                  <p className="font-semibold text-gray-800">{fmtBRL(decimoTerceiro.segundaParcelaLiquida)}</p>
                  <p className="text-xs text-gray-400">Com INSS + IRRF</p>
                </div>
              </div>
            </section>

          </div>

          <div className="px-8 pb-6 border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-300 text-center tracking-wide uppercase">
              Dados fictícios — uso exclusivo para demonstração (LGPD)
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}

export default DetalheColaborador;
