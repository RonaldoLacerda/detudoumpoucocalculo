import type { Calculator } from "../types/calculator";
import {
  brl,
  calcularINSS,
  calcularIRRF,
  round,
  anosCompletos,
  mesesAvos,
} from "../utils/calc";
import {
  AVISO_PREVIO_DIAS_BASE,
  AVISO_PREVIO_DIAS_MAX,
  AVISO_PREVIO_DIAS_POR_ANO,
  FGTS_MULTA_ACORDO,
  FGTS_MULTA_SEM_JUSTA_CAUSA,
  FGTS_PERCENTUAL,
  VALE_TRANSPORTE_PERCENTUAL,
} from "../constants/labor";

const n = (v: string | undefined) => {
  const parsed = Number(String(v ?? "").replace(/\./g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const salarioLiquido: Calculator = {
  slug: "calculadora-salario-liquido",
  name: "Salário Líquido",
  short: "Descubra quanto cai na conta depois de INSS, IRRF e descontos.",
  title: "Calculadora de Salário Líquido 2026 | De Tudo Um Pouco",
  description:
    "Calcule seu salário líquido com desconto de INSS, IRRF, vale-transporte e outros descontos. Gratuito, rápido e sem cadastro.",
  h1: "Calculadora de Salário Líquido",
  intro:
    "Informe o salário bruto e os descontos para estimar quanto você realmente recebe no fim do mês.",
  fields: [
    { name: "bruto", label: "Salário bruto mensal", type: "currency", required: true, min: 0 },
    { name: "dependentes", label: "Número de dependentes", type: "number", min: 0, defaultValue: "0" },
    {
      name: "vt",
      label: "Desconto de vale-transporte",
      type: "select",
      defaultValue: "nao",
      options: [
        { value: "nao", label: "Não desconta" },
        { value: "sim", label: "Sim (até 6% do salário)" },
      ],
    },
    { name: "outros", label: "Outros descontos (plano, adiantamento...)", type: "currency", min: 0, defaultValue: "0" },
  ],
  compute: (v) => {
    const bruto = n((v["bruto"] ?? ""));
    const inss = calcularINSS(bruto);
    const irrf = calcularIRRF(bruto, inss, n((v["dependentes"] ?? "")));
    const vt = (v["vt"] ?? "") === "sim" ? round(bruto * VALE_TRANSPORTE_PERCENTUAL) : 0;
    const outros = n((v["outros"] ?? ""));
    const liquido = round(bruto - inss - irrf - vt - outros);
    return {
      lines: [
        { label: "Salário bruto", value: brl(bruto), tone: "add" },
        { label: "INSS", value: `- ${brl(inss)}`, tone: "sub" },
        { label: "IRRF", value: `- ${brl(irrf)}`, tone: "sub" },
        { label: "Vale-transporte", value: `- ${brl(vt)}`, tone: "sub" },
        { label: "Outros descontos", value: `- ${brl(outros)}`, tone: "sub" },
        { label: "Total de descontos", value: brl(round(inss + irrf + vt + outros)), tone: "info" },
      ],
      total: { label: "Salário líquido estimado", value: brl(liquido) },
    };
  },
  explanation: [
    "O salário líquido é o valor que sobra após os descontos obrigatórios (INSS e Imposto de Renda) e os descontos autorizados, como vale-transporte e plano de saúde.",
    "O INSS é progressivo: cada faixa do salário é tributada por uma alíquota diferente. Já o IRRF usa a base de cálculo após o INSS, considerando dependentes ou o desconto simplificado, o que for mais vantajoso.",
    "O vale-transporte pode ser descontado em até 6% do salário base, conforme a legislação.",
  ],
  example:
    "Para um salário bruto de R$ 4.000,00 sem dependentes e sem vale-transporte, o INSS fica em torno de R$ 375,00 e o IRRF em torno de R$ 87,00, resultando em cerca de R$ 3.538,00 líquidos.",
  faq: [
    {
      q: "O cálculo considera o desconto simplificado do IRRF?",
      a: "Sim. A ferramenta compara a dedução por dependentes com o desconto simplificado e aplica automaticamente o modelo mais vantajoso para você.",
    },
    {
      q: "Benefícios como vale-alimentação entram no cálculo?",
      a: "Não. Benefícios geralmente não integram o salário para fins de INSS e IRRF. Se houver desconto em folha, informe no campo 'Outros descontos'.",
    },
    {
      q: "Horas extras e adicionais mudam o resultado?",
      a: "Sim. Eles aumentam a base de cálculo. Some esses valores ao salário bruto para uma estimativa mais próxima do holerite.",
    },
  ],
};

export const ferias: Calculator = {
  slug: "calculadora-ferias",
  name: "Férias",
  short: "Calcule férias com 1/3 constitucional, abono e descontos.",
  title: "Calculadora de Férias com 1/3 | De Tudo Um Pouco",
  description:
    "Calcule o valor das suas férias com o adicional de 1/3, venda de 10 dias (abono pecuniário) e descontos de INSS e IRRF.",
  h1: "Calculadora de Férias",
  intro: "Estime quanto você vai receber de férias, com ou sem venda de dias.",
  fields: [
    { name: "salario", label: "Salário bruto mensal", type: "currency", required: true, min: 0 },
    { name: "dias", label: "Dias de férias", type: "number", required: true, min: 1, max: 30, defaultValue: "30" },
    {
      name: "abono",
      label: "Vender 1/3 das férias (10 dias)",
      type: "select",
      defaultValue: "nao",
      options: [
        { value: "nao", label: "Não" },
        { value: "sim", label: "Sim, vender 10 dias" },
      ],
    },
    { name: "dependentes", label: "Número de dependentes", type: "number", min: 0, defaultValue: "0" },
  ],
  compute: (v) => {
    const salario = n((v["salario"] ?? ""));
    const dias = Math.min(30, n((v["dias"] ?? "")));
    const diaria = salario / 30;
    const vender = (v["abono"] ?? "") === "sim";
    const diasGozo = vender ? Math.min(dias, 20) : dias;
    const feriasValor = round(diaria * diasGozo);
    const terco = round(feriasValor / 3);
    const abono = vender ? round(diaria * 10) : 0;
    const tercoAbono = vender ? round(abono / 3) : 0;
    const baseTributavel = feriasValor + terco;
    const inss = calcularINSS(baseTributavel);
    const irrf = calcularIRRF(baseTributavel, inss, n((v["dependentes"] ?? "")));
    const liquido = round(baseTributavel + abono + tercoAbono - inss - irrf);
    return {
      lines: [
        { label: `Férias (${diasGozo} dias)`, value: brl(feriasValor), tone: "add" },
        { label: "Adicional de 1/3", value: brl(terco), tone: "add" },
        { label: "Abono pecuniário (10 dias)", value: brl(abono), tone: "add" },
        { label: "1/3 sobre o abono", value: brl(tercoAbono), tone: "add" },
        { label: "INSS", value: `- ${brl(inss)}`, tone: "sub" },
        { label: "IRRF", value: `- ${brl(irrf)}`, tone: "sub" },
      ],
      total: { label: "Valor líquido estimado das férias", value: brl(liquido) },
    };
  },
  explanation: [
    "As férias são pagas com base no salário mensal proporcional aos dias gozados, acrescidas do adicional de 1/3 previsto na Constituição.",
    "O trabalhador pode vender até 1/3 das férias (10 dias), chamado de abono pecuniário. Esse valor não sofre desconto de INSS nem de IRRF.",
    "Os descontos incidem sobre o valor das férias somado ao terço constitucional.",
  ],
  example:
    "Com salário de R$ 3.000,00 e 30 dias de férias, o valor bruto é R$ 3.000,00 + R$ 1.000,00 de terço, com descontos de INSS e IRRF sobre R$ 4.000,00.",
  faq: [
    { q: "O abono pecuniário sofre desconto?", a: "Não. A venda de até 10 dias de férias é isenta de INSS e de Imposto de Renda." },
    { q: "Posso tirar férias em períodos separados?", a: "Sim, em até três períodos, sendo um deles de no mínimo 14 dias corridos e os demais de no mínimo 5 dias." },
    { q: "Faltas reduzem os dias de férias?", a: "Sim. Faltas injustificadas ao longo do período aquisitivo podem reduzir o direito para 24, 18 ou 12 dias." },
  ],
};

export const decimoTerceiro: Calculator = {
  slug: "calculadora-13-salario",
  name: "13º Salário",
  short: "Calcule o 13º proporcional e as duas parcelas.",
  title: "Calculadora de 13º Salário Proporcional | De Tudo Um Pouco",
  description:
    "Calcule o 13º salário proporcional aos meses trabalhados, com primeira e segunda parcela e descontos de INSS e IRRF.",
  h1: "Calculadora de 13º Salário",
  intro: "Informe o salário e os meses trabalhados no ano para estimar o seu 13º.",
  fields: [
    { name: "salario", label: "Salário bruto mensal", type: "currency", required: true, min: 0 },
    { name: "meses", label: "Meses trabalhados no ano", type: "number", required: true, min: 1, max: 12, defaultValue: "12" },
    { name: "dependentes", label: "Número de dependentes", type: "number", min: 0, defaultValue: "0" },
  ],
  compute: (v) => {
    const salario = n((v["salario"] ?? ""));
    const meses = Math.min(12, n((v["meses"] ?? "")));
    const bruto = round((salario / 12) * meses);
    const inss = calcularINSS(bruto);
    const irrf = calcularIRRF(bruto, inss, n((v["dependentes"] ?? "")));
    const primeira = round(bruto / 2);
    const segunda = round(bruto - primeira - inss - irrf);
    return {
      lines: [
        { label: `13º bruto (${meses}/12)`, value: brl(bruto), tone: "add" },
        { label: "1ª parcela (até 30/11, sem descontos)", value: brl(primeira), tone: "info" },
        { label: "INSS (na 2ª parcela)", value: `- ${brl(inss)}`, tone: "sub" },
        { label: "IRRF (na 2ª parcela)", value: `- ${brl(irrf)}`, tone: "sub" },
        { label: "2ª parcela (até 20/12)", value: brl(segunda), tone: "info" },
      ],
      total: { label: "13º líquido estimado", value: brl(round(bruto - inss - irrf)) },
    };
  },
  explanation: [
    "O 13º salário corresponde a 1/12 da remuneração por mês trabalhado. Frações iguais ou superiores a 15 dias contam como mês completo.",
    "A primeira parcela é paga até 30 de novembro, sem descontos. Os descontos de INSS e IRRF incidem integralmente sobre a segunda parcela.",
  ],
  example:
    "Com salário de R$ 2.400,00 e 8 meses trabalhados, o 13º bruto é R$ 1.600,00, sendo R$ 800,00 na primeira parcela.",
  faq: [
    { q: "Quem trabalhou menos de 15 dias no mês tem direito?", a: "Não. Apenas frações de 15 dias ou mais contam como mês completo para o 13º." },
    { q: "Horas extras entram no 13º?", a: "Sim. A média de horas extras e adicionais habituais integra a base de cálculo." },
    { q: "Demissão por justa causa dá direito ao 13º?", a: "Não. Na justa causa o trabalhador perde o direito ao 13º proporcional." },
  ],
};

export const rescisao: Calculator = {
  slug: "calculadora-rescisao",
  name: "Rescisão",
  short: "Simule as verbas rescisórias por tipo de desligamento.",
  title: "Calculadora de Rescisão Trabalhista CLT | De Tudo Um Pouco",
  description:
    "Calcule sua rescisão: saldo de salário, aviso prévio, férias vencidas e proporcionais, 13º proporcional e multa do FGTS.",
  h1: "Calculadora de Rescisão",
  intro: "Informe as datas e o motivo do desligamento para estimar as verbas rescisórias.",
  fields: [
    { name: "salario", label: "Salário bruto mensal", type: "currency", required: true, min: 0 },
    { name: "admissao", label: "Data de admissão", type: "date", required: true },
    { name: "saida", label: "Data de desligamento", type: "date", required: true },
    {
      name: "motivo",
      label: "Motivo do desligamento",
      type: "select",
      defaultValue: "sem_justa_causa",
      options: [
        { value: "sem_justa_causa", label: "Dispensa sem justa causa" },
        { value: "pedido", label: "Pedido de demissão" },
        { value: "acordo", label: "Acordo entre as partes" },
        { value: "justa_causa", label: "Dispensa por justa causa" },
      ],
    },
    {
      name: "aviso",
      label: "Aviso prévio",
      type: "select",
      defaultValue: "indenizado",
      options: [
        { value: "indenizado", label: "Indenizado (pago pela empresa)" },
        { value: "trabalhado", label: "Trabalhado" },
        { value: "nao", label: "Não se aplica / dispensado" },
      ],
    },
    {
      name: "feriasVencidas",
      label: "Possui férias vencidas?",
      type: "select",
      defaultValue: "nao",
      options: [
        { value: "nao", label: "Não" },
        { value: "sim", label: "Sim (1 período)" },
      ],
    },
  ],
  validate: (v) => {
    const erros: Record<string, string> = {};
    if ((v["admissao"] ?? "") && (v["saida"] ?? "") && new Date((v["saida"] ?? "")) < new Date((v["admissao"] ?? ""))) {
      erros["saida"] = "A data de desligamento deve ser posterior à admissão.";
    }
    return erros;
  },
  compute: (v) => {
    const salario = n((v["salario"] ?? ""));
    const diaria = salario / 30;
    const saida = new Date((v["saida"] ?? "") + "T00:00:00");
    const motivo = (v["motivo"] ?? "") || "sem_justa_causa";

    const saldoDias = saida.getDate();
    const saldo = round(diaria * saldoDias);

    const anos = anosCompletos((v["admissao"] ?? ""), (v["saida"] ?? ""));
    let avisoDias = Math.min(
      AVISO_PREVIO_DIAS_MAX,
      AVISO_PREVIO_DIAS_BASE + anos * AVISO_PREVIO_DIAS_POR_ANO,
    );
    let avisoValor = 0;
    if (motivo === "justa_causa" || (v["aviso"] ?? "") === "nao" || (v["aviso"] ?? "") === "trabalhado") {
      avisoValor = 0;
    } else if (motivo === "acordo") {
      avisoValor = round(diaria * avisoDias * 0.5);
    } else if (motivo === "pedido") {
      avisoDias = 0;
      avisoValor = 0;
    } else {
      avisoValor = round(diaria * avisoDias);
    }

    const inicioPeriodo = new Date(saida.getFullYear(), 0, 1).toISOString().slice(0, 10);
    const mesesAno = mesesAvos(inicioPeriodo, (v["saida"] ?? ""));
    const temProporcionais = motivo !== "justa_causa";
    const decimo = temProporcionais ? round((salario / 12) * mesesAno) : 0;
    const feriasProp = temProporcionais ? round(((salario / 12) * mesesAno * 4) / 3) : 0;
    const vencidas =
      (v["feriasVencidas"] ?? "") === "sim" && motivo !== "justa_causa" ? round(salario * (4 / 3)) : 0;

    const mesesTotais = Math.max(1, Math.round((saida.getTime() - new Date((v["admissao"] ?? "") + "T00:00:00").getTime()) / (30.44 * 86400000)));
    const fgtsSaldo = round(salario * FGTS_PERCENTUAL * mesesTotais);
    let multa = 0;
    if (motivo === "sem_justa_causa") multa = round(fgtsSaldo * FGTS_MULTA_SEM_JUSTA_CAUSA);
    if (motivo === "acordo") multa = round(fgtsSaldo * FGTS_MULTA_ACORDO);

    const bruto = saldo + avisoValor + decimo + feriasProp + vencidas;
    const inss = calcularINSS(saldo + decimo);
    const irrf = calcularIRRF(saldo + decimo, inss, 0);
    const total = round(bruto - inss - irrf + multa);

    return {
      lines: [
        { label: `Saldo de salário (${saldoDias} dias)`, value: brl(saldo), tone: "add" },
        { label: `Aviso prévio (${avisoDias} dias)`, value: brl(avisoValor), tone: "add" },
        { label: `13º proporcional (${mesesAno}/12)`, value: brl(decimo), tone: "add" },
        { label: "Férias proporcionais + 1/3", value: brl(feriasProp), tone: "add" },
        { label: "Férias vencidas + 1/3", value: brl(vencidas), tone: "add" },
        { label: "INSS", value: `- ${brl(inss)}`, tone: "sub" },
        { label: "IRRF", value: `- ${brl(irrf)}`, tone: "sub" },
        { label: "Saldo estimado de FGTS", value: brl(fgtsSaldo), tone: "info" },
        { label: "Multa do FGTS", value: brl(multa), tone: "add" },
      ],
      total: { label: "Total estimado da rescisão", value: brl(total) },
    };
  },
  explanation: [
    "As verbas rescisórias variam conforme o motivo do desligamento. Na dispensa sem justa causa o trabalhador recebe aviso prévio, 13º e férias proporcionais, além da multa de 40% do FGTS.",
    "No pedido de demissão não há aviso prévio indenizado pela empresa nem multa do FGTS. No acordo, o aviso é pago pela metade e a multa cai para 20%.",
    "Na justa causa o trabalhador recebe apenas o saldo de salário e as férias vencidas, quando existirem.",
    "O saldo de FGTS aqui é uma estimativa de 8% do salário por mês trabalhado; o valor real depende dos depósitos efetivos e da variação salarial.",
  ],
  example:
    "Um empregado com salário de R$ 2.500,00, admitido em 10/01/2023 e desligado sem justa causa em 15/06/2025, recebe saldo de salário de 15 dias, aviso de 36 dias, 13º e férias proporcionais e multa de 40% do FGTS.",
  faq: [
    { q: "A multa do FGTS é paga direto ao trabalhador?", a: "A multa é depositada na conta vinculada do FGTS e liberada para saque junto com o saldo, nos casos previstos em lei." },
    { q: "O aviso prévio aumenta com o tempo de casa?", a: "Sim. São 30 dias mais 3 dias por ano completo trabalhado, limitados a 90 dias." },
    { q: "O resultado serve como termo de rescisão?", a: "Não. É uma estimativa para conferência; o valor oficial é o do termo de rescisão emitido pela empresa." },
  ],
};

export const avisoPrevio: Calculator = {
  slug: "calculadora-aviso-previo",
  name: "Aviso Prévio",
  short: "Quantos dias e quanto vale o seu aviso prévio.",
  title: "Calculadora de Aviso Prévio Proporcional | De Tudo Um Pouco",
  description:
    "Calcule os dias de aviso prévio proporcional ao tempo de empresa e o valor estimado quando indenizado.",
  h1: "Calculadora de Aviso Prévio",
  intro: "Descubra quantos dias de aviso prévio você tem direito e o valor correspondente.",
  fields: [
    { name: "salario", label: "Salário bruto mensal", type: "currency", required: true, min: 0 },
    { name: "anos", label: "Anos completos de empresa", type: "number", required: true, min: 0, max: 50, defaultValue: "1" },
    {
      name: "tipo",
      label: "Tipo de desligamento",
      type: "select",
      defaultValue: "sem_justa_causa",
      options: [
        { value: "sem_justa_causa", label: "Dispensa sem justa causa" },
        { value: "acordo", label: "Acordo entre as partes" },
        { value: "pedido", label: "Pedido de demissão" },
      ],
    },
  ],
  compute: (v) => {
    const salario = n((v["salario"] ?? ""));
    const anos = n((v["anos"] ?? ""));
    const dias = Math.min(AVISO_PREVIO_DIAS_MAX, AVISO_PREVIO_DIAS_BASE + anos * AVISO_PREVIO_DIAS_POR_ANO);
    const tipo = (v["tipo"] ?? "") || "sem_justa_causa";
    const diasDevidos = tipo === "pedido" ? AVISO_PREVIO_DIAS_BASE : dias;
    const fator = tipo === "acordo" ? 0.5 : 1;
    const valor = round((salario / 30) * diasDevidos * fator);
    return {
      lines: [
        { label: "Dias de aviso prévio", value: `${diasDevidos} dias`, tone: "info" },
        { label: "Valor do dia", value: brl(round(salario / 30)), tone: "info" },
        {
          label: tipo === "pedido" ? "Valor descontável do empregado" : "Percentual aplicado",
          value: tipo === "acordo" ? "50%" : "100%",
          tone: "info",
        },
      ],
      total: { label: "Valor estimado do aviso prévio", value: brl(valor) },
    };
  },
  explanation: [
    "O aviso prévio é de 30 dias, acrescido de 3 dias por ano completo de trabalho na mesma empresa, até o limite de 90 dias.",
    "Na dispensa sem justa causa, o aviso indenizado é pago integralmente. No acordo entre as partes, apenas metade. No pedido de demissão, o empregado cumpre ou indeniza 30 dias.",
  ],
  example:
    "Com 5 anos de empresa, o aviso é de 30 + 15 = 45 dias. Com salário de R$ 3.000,00, o valor indenizado fica em R$ 4.500,00.",
  faq: [
    { q: "A proporcionalidade vale para quem pede demissão?", a: "Não. Os dias adicionais por ano trabalhado são um direito do empregado dispensado, não uma obrigação de quem pede demissão." },
    { q: "O aviso indenizado conta como tempo de serviço?", a: "Sim, o período do aviso indenizado é projetado no contrato para efeito de férias e 13º." },
    { q: "Posso reduzir a jornada durante o aviso trabalhado?", a: "Sim, em 2 horas por dia ou faltando 7 dias corridos ao final do aviso." },
  ],
};
