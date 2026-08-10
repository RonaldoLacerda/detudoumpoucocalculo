/**
 * Regras, tabelas e parâmetros trabalhistas.
 * Atualize apenas este arquivo quando a legislação mudar.
 */

export interface Faixa {
  ate: number;
  aliquota: number;
  deducao?: number;
}

/** Tabela progressiva do INSS (empregado CLT). */
export const INSS_FAIXAS: Faixa[] = [
  { ate: 1621.0, aliquota: 0.075 },
  { ate: 2902.84, aliquota: 0.09 },
  { ate: 4354.27, aliquota: 0.12 },
  { ate: 8475.55, aliquota: 0.14 },
];

export const INSS_TETO_SALARIAL_2026 = 8475.55;
export const INSS_TETO_CONTRIBUICAO = 988.09;

/** Tabela mensal do IRRF. */
export const IRRF_FAIXAS: Faixa[] = [
  { ate: 2428.8, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 0.075, deducao: 182.16 },
  { ate: 3751.05, aliquota: 0.15, deducao: 394.16 },
  { ate: 4664.68, aliquota: 0.225, deducao: 675.49 },
  { ate: Infinity, aliquota: 0.275, deducao: 908.73 },
];

export const IRRF_DEDUCAO_DEPENDENTE = 189.59;
/** Desconto simplificado mensal alternativo às deduções legais. */
export const IRRF_DESCONTO_SIMPLIFICADO = 607.2;

export const IRRF_REDUCAO_2026_LIMITE_INTEGRAL = 5000;
export const IRRF_REDUCAO_2026_LIMITE_FINAL = 7350;
export const IRRF_REDUCAO_2026_MAXIMA = 312.89;
export const IRRF_REDUCAO_2026_FORMULA_BASE = 978.62;
export const IRRF_REDUCAO_2026_FORMULA_COEFICIENTE = 0.133145;

/** Limite legal de desconto do vale-transporte sobre o salário. */
export const VALE_TRANSPORTE_PERCENTUAL = 0.06;

/** FGTS mensal depositado pelo empregador. */
export const FGTS_PERCENTUAL = 0.08;
/** Multa rescisória sobre o saldo de FGTS. */
export const FGTS_MULTA_SEM_JUSTA_CAUSA = 0.4;
export const FGTS_MULTA_ACORDO = 0.2;

/** Aviso prévio: 30 dias + 3 por ano completo, limitado a 90 dias. */
export const AVISO_PREVIO_DIAS_BASE = 30;
export const AVISO_PREVIO_DIAS_POR_ANO = 3;
export const AVISO_PREVIO_DIAS_MAX = 90;

/** Adicionais de hora extra usuais. */
export const HORA_EXTRA_ADICIONAIS = { normal: 0.5, especial: 1.0 };

/** Adicional noturno urbano e hora noturna reduzida (52min30s). */
export const ADICIONAL_NOTURNO_PERCENTUAL = 0.2;
export const HORA_NOTURNA_REDUZIDA = 52.5 / 60;

export const JORNADA_MENSAL_PADRAO = 220;

export const SALARIO_MINIMO_2026 = 1621.0;

export const AVISO_LEGAL =
  "Os resultados são estimativas calculadas com base nas informações fornecidas e nas regras consideradas pela ferramenta. O resultado pode variar conforme a situação individual, convenções coletivas e legislação vigente.";
