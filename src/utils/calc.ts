import {
  INSS_FAIXAS,
  IRRF_DEDUCAO_DEPENDENTE,
  IRRF_DESCONTO_SIMPLIFICADO,
  IRRF_FAIXAS,
} from "../constants/labor";

export const round = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100;

export const brl = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Number.isFinite(v) ? v : 0,
  );

export const num = (v: number, casas = 2) =>
  new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: casas,
  }).format(Number.isFinite(v) ? v : 0);

/** INSS progressivo por faixas. */
export function calcularINSS(base: number): number {
  let restante = base;
  let anterior = 0;
  let total = 0;
  for (const faixa of INSS_FAIXAS) {
    if (restante <= 0) break;
    const tributavel = Math.min(base, faixa.ate) - anterior;
    if (tributavel > 0) {
      total += tributavel * faixa.aliquota;
      restante -= tributavel;
    }
    anterior = faixa.ate;
  }
  return round(total);
}

/** IRRF mensal, usando o modelo mais vantajoso (legal x simplificado). */
export function calcularIRRF(baseBruta: number, inss: number, dependentes = 0): number {
  const baseLegal = baseBruta - inss - dependentes * IRRF_DEDUCAO_DEPENDENTE;
  const baseSimplificada = baseBruta - IRRF_DESCONTO_SIMPLIFICADO;
  const base = Math.max(0, Math.min(baseLegal, baseSimplificada));
  const faixa = IRRF_FAIXAS.find((f) => base <= f.ate);
  if (!faixa) return 0;
  return round(Math.max(0, base * faixa.aliquota - (faixa.deducao ?? 0)));
}

/** Diferença em dias entre duas datas ISO (inclusiva). */
export function diasEntre(inicio: string, fim: string): number {
  const a = new Date(inicio + "T00:00:00");
  const b = new Date(fim + "T00:00:00");
  return Math.floor((b.getTime() - a.getTime()) / 86400000) + 1;
}

/** Meses completos para fins de 13º/férias (fração ≥ 15 dias conta como mês). */
export function mesesAvos(inicio: string, fim: string): number {
  const a = new Date(inicio + "T00:00:00");
  const b = new Date(fim + "T00:00:00");
  let meses = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  const diasFracao = b.getDate() - a.getDate() + 1;
  if (diasFracao >= 15) meses += 1;
  return Math.max(0, Math.min(12, meses));
}

export function anosCompletos(inicio: string, fim: string): number {
  const a = new Date(inicio + "T00:00:00");
  const b = new Date(fim + "T00:00:00");
  let anos = b.getFullYear() - a.getFullYear();
  const mesDia =
    b.getMonth() > a.getMonth() || (b.getMonth() === a.getMonth() && b.getDate() >= a.getDate());
  if (!mesDia) anos -= 1;
  return Math.max(0, anos);
}
