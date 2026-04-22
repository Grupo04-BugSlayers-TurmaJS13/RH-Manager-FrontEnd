/**
 * calculos.ts — Biblioteca de cálculos trabalhistas (CLT)
 *
 * Referências legais:
 *  - Férias: CLT arts. 129–145
 *  - 13º salário: Lei 4.090/1962
 *  - FGTS: Lei 8.036/1990 (8% sobre remuneração bruta)
 *  - INSS: Tabela progressiva 2024 (Portaria MPS 914/2024)
 *  - IRRF: Tabela progressiva 2024 (Lei 14.663/2023)
 */

export interface ConfigSistema {
  alertaFeriasEmDias: number;
  percentualFGTS: number;
  diasFeriasDefault: 30 | 20 | 15 | 14 | 10 | 5;
}

export const CONFIG_DEFAULT: ConfigSistema = {
  alertaFeriasEmDias: 60,
  percentualFGTS: 8,
  diasFeriasDefault: 30,
};

// ---------------------------------------------------------------------------
// UTILITÁRIOS DE DATA
// ---------------------------------------------------------------------------

/** Diferença em dias corridos entre duas datas (sem horas) */
export function diffDias(a: Date, b: Date): number {
  const ms = 1000 * 60 * 60 * 24;
  const dA = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const dB = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((dB.getTime() - dA.getTime()) / ms);
}

/** Diferença em meses completos entre duas datas */
export function diffMesesCompletos(inicio: Date, fim: Date): number {
  const i = new Date(inicio);
  const f = new Date(fim);
  let meses = (f.getFullYear() - i.getFullYear()) * 12 + (f.getMonth() - i.getMonth());
  if (f.getDate() < i.getDate()) meses -= 1;
  return Math.max(0, meses);
}

/** Adiciona N dias a uma data (imutável) */
export function addDias(data: Date, dias: number): Date {
  const d = new Date(data);
  d.setDate(d.getDate() + dias);
  return d;
}

/** Adiciona N meses a uma data (imutável) */
export function addMeses(data: Date, meses: number): Date {
  const d = new Date(data);
  d.setMonth(d.getMonth() + meses);
  return d;
}

// ---------------------------------------------------------------------------
// TEMPO DE EMPRESA
// ---------------------------------------------------------------------------

export interface TempoEmpresa {
  anos: number;
  meses: number;
  dias: number;
  totalMeses: number;
  texto: string;
}

export function calcularTempoEmpresa(dataAdmissao: Date, referencia: Date = new Date()): TempoEmpresa {
  const i = new Date(dataAdmissao);
  const f = new Date(referencia);

  let anos = f.getFullYear() - i.getFullYear();
  let meses = f.getMonth() - i.getMonth();
  let dias = f.getDate() - i.getDate();

  if (dias < 0) {
    meses -= 1;
    const ultimoDiaMesAnterior = new Date(f.getFullYear(), f.getMonth(), 0).getDate();
    dias += ultimoDiaMesAnterior;
  }
  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }

  const totalMeses = anos * 12 + meses;
  let texto = "";
  if (totalMeses < 1) texto = `${dias} ${dias === 1 ? "dia" : "dias"}`;
  else if (anos === 0) texto = `${meses} ${meses === 1 ? "mês" : "meses"}`;
  else texto = `${anos} ${anos === 1 ? "ano" : "anos"}${meses > 0 ? ` e ${meses} ${meses === 1 ? "mês" : "meses"}` : ""}`;

  return { anos, meses, dias, totalMeses, texto };
}

// ---------------------------------------------------------------------------
// FÉRIAS — CLT arts. 129–145
// ---------------------------------------------------------------------------

export interface SituacaoFerias {
  direitoAdquirido: boolean;
  mesesNoAquisitivo: number;
  periodoAquisitivoInicio: Date;
  periodoAquisitivoFim: Date;
  periodoConcessivoInicio: Date;
  periodoConcessivoFim: Date;
  diasDireito: number;
  diasProporcional: number;
  diasRestantes: number | null;
  vencimentoEmDias: number | null;
  alertaVencimento: boolean;
  emFerias: boolean;
  retornoPrevisto: Date | null;
  diasDecorridos: number | null;
  diasRestantesFerias: number | null;
}

/**
 * Calcula a situação completa de férias de um colaborador.
 *
 * Regras CLT:
 * - Período aquisitivo: 12 meses contados da admissão (art. 130)
 * - Período concessivo: 12 meses após o fim do aquisitivo (art. 134)
 * - Direito a 30 dias após 12 meses sem faltas injustificadas (art. 130, I)
 * - Proporcional: (meses no aquisitivo / 12) × 30 dias
 */
export function calcularFerias(
  dataAdmissao: Date,
  feriasAtivas?: { inicio: Date; fim: Date },
  periodoConcessivoFimOverride?: Date,
  config: ConfigSistema = CONFIG_DEFAULT,
  hoje: Date = new Date()
): SituacaoFerias {
  const admissao = new Date(dataAdmissao);
  const tempoTotal = calcularTempoEmpresa(admissao, hoje);

  // Quantos períodos aquisitivos completos já se passaram
  const periodosCompletos = Math.floor(tempoTotal.totalMeses / 12);

  // Início do período aquisitivo atual
  const periodoAquisitivoInicio = addMeses(admissao, periodosCompletos * 12);
  const periodoAquisitivoFim = addMeses(periodoAquisitivoInicio, 12);
  addDias(periodoAquisitivoFim, -1);

  // Período concessivo: 12 meses após o fim do aquisitivo
  const periodoConcessivoInicio = new Date(periodoAquisitivoFim);
  const periodoConcessivoFim = periodoConcessivoFimOverride
    ? new Date(periodoConcessivoFimOverride)
    : addMeses(periodoConcessivoInicio, 12);

  // Meses trabalhados no período aquisitivo atual
  const mesesNoAquisitivo = diffMesesCompletos(periodoAquisitivoInicio, hoje);

  // Direito adquirido: completou pelo menos 1 período aquisitivo
  const direitoAdquirido = periodosCompletos >= 1;

  // Dias de direito (30 dias para quem não tem faltas — simplificado)
  const diasDireito = direitoAdquirido ? config.diasFeriasDefault : 0;

  // Dias proporcionais ao período atual (arredondado para baixo — CLT não arredonda para cima)
  const diasProporcional = Math.floor((Math.min(mesesNoAquisitivo, 12) / 12) * 30);

  // Dias restantes do período concessivo
  const vencimentoEmDias = direitoAdquirido ? diffDias(hoje, periodoConcessivoFim) : null;
  const alertaVencimento = vencimentoEmDias !== null && vencimentoEmDias <= config.alertaFeriasEmDias && vencimentoEmDias > 0;

  // Situação atual de férias
  let emFerias = false;
  let retornoPrevisto: Date | null = null;
  let diasDecorridos: number | null = null;
  let diasRestantesFerias: number | null = null;

  if (feriasAtivas) {
    const inicio = new Date(feriasAtivas.inicio);
    const fim = new Date(feriasAtivas.fim);
    emFerias = hoje >= inicio && hoje <= fim;
    if (emFerias) {
      diasDecorridos = diffDias(inicio, hoje);
      diasRestantesFerias = diffDias(hoje, fim);
      retornoPrevisto = addDias(fim, 1);
    }
  }

  return {
    direitoAdquirido,
    mesesNoAquisitivo,
    periodoAquisitivoInicio,
    periodoAquisitivoFim,
    periodoConcessivoInicio,
    periodoConcessivoFim,
    diasDireito,
    diasProporcional,
    diasRestantes: vencimentoEmDias,
    vencimentoEmDias,
    alertaVencimento,
    emFerias,
    retornoPrevisto,
    diasDecorridos,
    diasRestantesFerias,
  };
}

// ---------------------------------------------------------------------------
// INSS — Tabela progressiva 2024 (Portaria MPS 914/2024)
// ---------------------------------------------------------------------------

interface FaixaINSS {
  ate: number;
  aliquota: number;
}

const FAIXAS_INSS_2024: FaixaINSS[] = [
  { ate: 1412.00, aliquota: 0.075 },
  { ate: 2666.68, aliquota: 0.09  },
  { ate: 4000.03, aliquota: 0.12  },
  { ate: 7786.02, aliquota: 0.14  },
];

export interface ResultadoINSS {
  baseCalculo: number;
  aliquotaEfetiva: number;
  valorDescontado: number;
  detalhamento: { faixa: string; base: number; aliquota: number; valor: number }[];
}

/** Cálculo progressivo do INSS — cada faixa incide apenas sobre a parcela dentro dela */
export function calcularINSS(salarioBruto: number): ResultadoINSS {
  const teto = 7786.02;
  const base = Math.min(salarioBruto, teto);
  let valorTotal = 0;
  let faixaAnterior = 0;
  const detalhamento: ResultadoINSS["detalhamento"] = [];

  for (const faixa of FAIXAS_INSS_2024) {
    if (base <= faixaAnterior) break;
    const parcela = Math.min(base, faixa.ate) - faixaAnterior;
    const valor = parcela * faixa.aliquota;
    valorTotal += valor;
    detalhamento.push({
      faixa: `Até R$ ${faixa.ate.toFixed(2).replace(".", ",")}`,
      base: parcela,
      aliquota: faixa.aliquota * 100,
      valor,
    });
    faixaAnterior = faixa.ate;
  }

  return {
    baseCalculo: base,
    aliquotaEfetiva: base > 0 ? (valorTotal / base) * 100 : 0,
    valorDescontado: valorTotal,
    detalhamento,
  };
}

// ---------------------------------------------------------------------------
// IRRF — Tabela progressiva 2024 (Lei 14.663/2023)
// ---------------------------------------------------------------------------

interface FaixaIRRF {
  ate: number | null;
  aliquota: number;
  deducao: number;
}

const FAIXAS_IRRF_2024: FaixaIRRF[] = [
  { ate: 2259.20, aliquota: 0,    deducao: 0       },
  { ate: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { ate: 3751.05, aliquota: 0.15,  deducao: 381.44 },
  { ate: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { ate: null,    aliquota: 0.275, deducao: 896.00 },
];

const DEDUCAO_DEPENDENTE = 189.59;

export interface ResultadoIRRF {
  baseCalculo: number;
  aliquota: number;
  valorDescontado: number;
  isento: boolean;
}

export function calcularIRRF(
  salarioBruto: number,
  inss: number,
  numeroDependentes: number = 0
): ResultadoIRRF {
  const base = salarioBruto - inss - numeroDependentes * DEDUCAO_DEPENDENTE;

  if (base <= 0) return { baseCalculo: 0, aliquota: 0, valorDescontado: 0, isento: true };

  for (const faixa of FAIXAS_IRRF_2024) {
    if (faixa.ate === null || base <= faixa.ate) {
      const valor = Math.max(0, base * faixa.aliquota - faixa.deducao);
      return {
        baseCalculo: base,
        aliquota: faixa.aliquota * 100,
        valorDescontado: valor,
        isento: faixa.aliquota === 0,
      };
    }
  }

  return { baseCalculo: base, aliquota: 0, valorDescontado: 0, isento: true };
}

// ---------------------------------------------------------------------------
// SALÁRIO LÍQUIDO
// ---------------------------------------------------------------------------

export interface ResultadoSalario {
  bruto: number;
  inss: ResultadoINSS;
  irrf: ResultadoIRRF;
  fgts: number;
  liquido: number;
  totalDescontos: number;
}

export function calcularSalarioLiquido(
  salarioBruto: number,
  numeroDependentes: number = 0,
  config: ConfigSistema = CONFIG_DEFAULT
): ResultadoSalario {
  const inss = calcularINSS(salarioBruto);
  const irrf = calcularIRRF(salarioBruto, inss.valorDescontado, numeroDependentes);
  const fgts = salarioBruto * (config.percentualFGTS / 100);
  const totalDescontos = inss.valorDescontado + irrf.valorDescontado;
  const liquido = salarioBruto - totalDescontos;

  return { bruto: salarioBruto, inss, irrf, fgts, liquido, totalDescontos };
}

// ---------------------------------------------------------------------------
// 13º SALÁRIO — Lei 4.090/1962
// ---------------------------------------------------------------------------

export interface Resultado13Salario {
  mesesTrabalhados: number;
  valorProporcional: number;
  primeiraParcelaLiquida: number;
  segundaParcelaLiquida: number;
}

/**
 * 13º proporcional: (meses trabalhados no ano / 12) × salário bruto
 * Fração >= 15 dias no mês conta como mês completo (art. 1º §1º Lei 4.090/62)
 */
export function calcularDecimoTerceiro(
  salarioBruto: number,
  dataAdmissao: Date,
  hoje: Date = new Date()
): Resultado13Salario {
  const admissao = new Date(dataAdmissao);
  const anoAtual = hoje.getFullYear();
  const inicioAno = new Date(anoAtual, 0, 1);
  const referenciaInicio = admissao > inicioAno ? admissao : inicioAno;

  let meses = hoje.getMonth() - referenciaInicio.getMonth() + 1;
  if (hoje.getDate() < 15 && referenciaInicio.getMonth() === hoje.getMonth()) meses = 0;
  meses = Math.max(0, Math.min(12, meses));

  const valorProporcional = (salarioBruto / 12) * meses;

  // 1ª parcela: 50% do bruto proporcional (sem descontos — art. 2º Lei 4.090/62)
  const primeiraParcelaLiquida = valorProporcional * 0.5;

  // 2ª parcela: restante com desconto de INSS e IRRF sobre o valor total
  const inss13 = calcularINSS(valorProporcional);
  const irrf13 = calcularIRRF(valorProporcional, inss13.valorDescontado);
  const segundaParcelaLiquida = valorProporcional * 0.5 - inss13.valorDescontado - irrf13.valorDescontado;

  return { mesesTrabalhados: meses, valorProporcional, primeiraParcelaLiquida, segundaParcelaLiquida };
}

// ---------------------------------------------------------------------------
// FORMATADORES
// ---------------------------------------------------------------------------

export const fmtBRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export const fmtData = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR").format(new Date(d));

export const fmtPct = (v: number) =>
  `${v.toFixed(2).replace(".", ",")}%`;
