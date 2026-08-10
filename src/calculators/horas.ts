import type { Calculator } from "../types/calculator";
import { brl, calcularINSS, calcularIRRF, diasEntre, num, round } from "../utils/calc";
import {
  ADICIONAL_NOTURNO_PERCENTUAL,
  HORA_EXTRA_ADICIONAIS,
  HORA_NOTURNA_REDUZIDA,
  JORNADA_MENSAL_PADRAO,
} from "../constants/labor";

const n = (v: string | undefined) => {
  const parsed = Number(String(v ?? "").replace(/\./g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const horaExtra: Calculator = {
  slug: "calculadora-hora-extra",
  name: "Hora Extra",
  short: "Calcule horas extras de 50%, 100% ou percentual personalizado.",
  title: "Calculadora de Hora Extra 50% e 100% | De Tudo Um Pouco",
  description:
    "Calcule o valor das suas horas extras com adicional de 50%, 100% ou percentual personalizado a partir do salário e da jornada mensal.",
  h1: "Calculadora de Hora Extra",
  intro: "Informe o salário, a jornada mensal e a quantidade de horas extras realizadas.",
  fields: [
    { name: "salario", label: "Salário bruto mensal", type: "currency", required: true, min: 0 },
    { name: "jornada", label: "Jornada mensal (horas)", type: "number", required: true, min: 1, defaultValue: String(JORNADA_MENSAL_PADRAO) },
    { name: "h50", label: "Horas extras com 50%", type: "number", min: 0, defaultValue: "0", step: 0.5 },
    { name: "h100", label: "Horas extras com 100%", type: "number", min: 0, defaultValue: "0", step: 0.5 },
    { name: "hCustom", label: "Horas extras com percentual personalizado", type: "number", min: 0, defaultValue: "0", step: 0.5 },
    { name: "pCustom", label: "Percentual personalizado (%)", type: "number", min: 0, defaultValue: "70" },
  ],
  compute: (v) => {
    const salario = n((v["salario"] ?? ""));
    const jornada = Math.max(1, n((v["jornada"] ?? "")));
    const valorHora = round(salario / jornada);
    const v50 = round(valorHora * (1 + HORA_EXTRA_ADICIONAIS.normal) * n((v["h50"] ?? "")));
    const v100 = round(valorHora * (1 + HORA_EXTRA_ADICIONAIS.especial) * n((v["h100"] ?? "")));
    const vCustom = round(valorHora * (1 + n((v["pCustom"] ?? "")) / 100) * n((v["hCustom"] ?? "")));
    return {
      lines: [
        { label: "Valor da hora normal", value: brl(valorHora), tone: "info" },
        { label: `Horas extras 50% (${num(n((v["h50"] ?? "")))}h)`, value: brl(v50), tone: "add" },
        { label: `Horas extras 100% (${num(n((v["h100"] ?? "")))}h)`, value: brl(v100), tone: "add" },
        { label: `Horas extras ${num(n((v["pCustom"] ?? "")))}% (${num(n((v["hCustom"] ?? "")))}h)`, value: brl(vCustom), tone: "add" },
      ],
      total: { label: "Total estimado de horas extras", value: brl(round(v50 + v100 + vCustom)) },
    };
  },
  explanation: [
    "O valor da hora normal é o salário dividido pela jornada mensal (geralmente 220 horas para 44h semanais).",
    "A hora extra tem adicional mínimo de 50% em dias úteis. Em domingos e feriados não compensados, o adicional costuma ser de 100%.",
    "Convenções coletivas podem prever percentuais maiores — use o campo personalizado nesses casos.",
  ],
  example:
    "Salário de R$ 2.200,00 com jornada de 220h resulta em hora de R$ 10,00. Dez horas extras a 50% valem R$ 150,00.",
  faq: [
    { q: "Horas extras habituais geram reflexos?", a: "Sim. Elas refletem em DSR, férias, 13º e FGTS, valores não incluídos nesta estimativa." },
    { q: "Posso trocar hora extra por folga?", a: "Sim, por meio de banco de horas previsto em acordo ou convenção coletiva." },
    { q: "Qual a jornada mensal correta?", a: "Para 44h semanais são 220h mensais; para 40h semanais, 200h. Confira o seu contrato." },
  ],
};

export const adicionalNoturno: Calculator = {
  slug: "calculadora-adicional-noturno",
  name: "Adicional Noturno",
  short: "Calcule o adicional pelas horas trabalhadas à noite.",
  title: "Calculadora de Adicional Noturno | De Tudo Um Pouco",
  description:
    "Calcule o adicional noturno de 20% (ou percentual da sua convenção) sobre as horas trabalhadas entre 22h e 5h.",
  h1: "Calculadora de Adicional Noturno",
  intro: "Informe as horas noturnas trabalhadas no mês para estimar o adicional devido.",
  fields: [
    { name: "salario", label: "Salário bruto mensal", type: "currency", required: true, min: 0 },
    { name: "jornada", label: "Jornada mensal (horas)", type: "number", required: true, min: 1, defaultValue: String(JORNADA_MENSAL_PADRAO) },
    { name: "horas", label: "Horas noturnas no mês", type: "number", required: true, min: 0, defaultValue: "0", step: 0.5 },
    { name: "percentual", label: "Percentual do adicional (%)", type: "number", min: 0, defaultValue: String(ADICIONAL_NOTURNO_PERCENTUAL * 100) },
    {
      name: "reducao",
      label: "Aplicar hora noturna reduzida (52min30s)",
      type: "select",
      defaultValue: "sim",
      options: [
        { value: "sim", label: "Sim" },
        { value: "nao", label: "Não" },
      ],
    },
  ],
  compute: (v) => {
    const salario = n((v["salario"] ?? ""));
    const jornada = Math.max(1, n((v["jornada"] ?? "")));
    const valorHora = round(salario / jornada);
    const horas = n((v["horas"] ?? ""));
    const horasEquivalentes = (v["reducao"] ?? "") === "sim" ? round(horas / HORA_NOTURNA_REDUZIDA) : horas;
    const perc = n((v["percentual"] ?? "")) / 100;
    const adicional = round(valorHora * horasEquivalentes * perc);
    const horasPagas = round(valorHora * horasEquivalentes);
    return {
      lines: [
        { label: "Valor da hora normal", value: brl(valorHora), tone: "info" },
        { label: "Horas noturnas consideradas", value: `${num(horasEquivalentes)}h`, tone: "info" },
        { label: "Valor das horas noturnas", value: brl(horasPagas), tone: "info" },
        { label: `Adicional noturno (${num(n((v["percentual"] ?? "")))}%)`, value: brl(adicional), tone: "add" },
      ],
      total: { label: "Adicional noturno estimado", value: brl(adicional) },
    };
  },
  explanation: [
    "Para o trabalhador urbano, é considerado noturno o trabalho entre 22h e 5h, com adicional mínimo de 20% sobre a hora normal.",
    "A hora noturna é reduzida: 52 minutos e 30 segundos equivalem a uma hora, o que aumenta a quantidade de horas pagas.",
  ],
  example:
    "Com hora normal de R$ 10,00 e 40 horas noturnas, a redução gera cerca de 45,7 horas e o adicional de 20% fica em torno de R$ 91,00.",
  faq: [
    { q: "O adicional noturno é cumulativo com hora extra?", a: "Sim. A hora extra noturna recebe os dois adicionais, calculados de forma cumulativa." },
    { q: "Trabalhador rural tem o mesmo percentual?", a: "Não. No meio rural o adicional é de 25% e os horários noturnos são diferentes." },
    { q: "O adicional integra o salário?", a: "Quando habitual, sim: reflete em férias, 13º, FGTS e demais verbas." },
  ],
};

export const salarioPorHora: Calculator = {
  slug: "calculadora-salario-por-hora",
  name: "Salário por Hora",
  short: "Converta seu salário mensal em valor por hora, dia e minuto.",
  title: "Calculadora de Salário por Hora | De Tudo Um Pouco",
  description:
    "Descubra quanto vale sua hora, seu dia e seu minuto de trabalho a partir do salário mensal e da jornada.",
  h1: "Calculadora de Salário por Hora",
  intro: "Converta o salário mensal em valores por hora, por dia e por minuto.",
  fields: [
    { name: "salario", label: "Salário bruto mensal", type: "currency", required: true, min: 0 },
    { name: "jornada", label: "Horas trabalhadas por mês", type: "number", required: true, min: 1, defaultValue: String(JORNADA_MENSAL_PADRAO) },
    { name: "diasMes", label: "Dias trabalhados por mês", type: "number", required: true, min: 1, max: 31, defaultValue: "22" },
  ],
  compute: (v) => {
    const salario = n((v["salario"] ?? ""));
    const jornada = Math.max(1, n((v["jornada"] ?? "")));
    const dias = Math.max(1, n((v["diasMes"] ?? "")));
    const hora = round(salario / jornada);
    return {
      lines: [
        { label: "Valor por hora", value: brl(hora), tone: "info" },
        { label: "Valor por dia", value: brl(round(salario / dias)), tone: "info" },
        { label: "Valor por minuto", value: brl(round((salario / jornada / 60) * 100) / 100), tone: "info" },
        { label: "Valor por semana (aprox.)", value: brl(round((salario * 12) / 52)), tone: "info" },
      ],
      total: { label: "Valor estimado da sua hora", value: brl(hora) },
    };
  },
  explanation: [
    "O valor da hora é o salário mensal dividido pela jornada mensal contratada. Para 44 horas semanais, considera-se 220 horas por mês.",
    "Esse valor é a base para horas extras, adicional noturno e descontos por atraso.",
  ],
  example: "Um salário de R$ 3.300,00 com 220 horas mensais resulta em R$ 15,00 por hora.",
  faq: [
    { q: "Devo usar o salário bruto ou líquido?", a: "Use o bruto. Os cálculos trabalhistas de hora extra e adicionais partem sempre da remuneração bruta." },
    { q: "Como calcular para jornada de 40h?", a: "Informe 200 horas no campo de jornada mensal." },
    { q: "O DSR está incluído?", a: "Não. O descanso semanal remunerado é calculado separadamente sobre os adicionais recebidos." },
  ],
};

export const diasTrabalhados: Calculator = {
  slug: "calculadora-dias-trabalhados",
  name: "Dias Trabalhados",
  short: "Valor proporcional aos dias efetivamente trabalhados.",
  title: "Calculadora de Dias Trabalhados | De Tudo Um Pouco",
  description:
    "Calcule o valor proporcional aos dias trabalhados entre duas datas, com estimativa de descontos e valor líquido.",
  h1: "Calculadora de Dias Trabalhados",
  intro: "Informe o período trabalhado para estimar o valor proporcional do salário.",
  fields: [
    { name: "salario", label: "Salário bruto mensal", type: "currency", required: true, min: 0 },
    { name: "inicio", label: "Data inicial", type: "date", required: true },
    { name: "fim", label: "Data final", type: "date", required: true },
  ],
  validate: (v) => {
    const erros: Record<string, string> = {};
    if ((v["inicio"] ?? "") && (v["fim"] ?? "") && new Date((v["fim"] ?? "")) < new Date((v["inicio"] ?? ""))) {
      erros["fim"] = "A data final deve ser posterior à data inicial.";
    }
    return erros;
  },
  compute: (v) => {
    const salario = n((v["salario"] ?? ""));
    const dias = Math.max(0, diasEntre((v["inicio"] ?? ""), (v["fim"] ?? "")));
    const bruto = round((salario / 30) * dias);
    const inss = calcularINSS(bruto);
    const irrf = calcularIRRF(bruto, inss, 0);
    return {
      lines: [
        { label: "Dias no período", value: `${dias} dias`, tone: "info" },
        { label: "Valor do dia", value: brl(round(salario / 30)), tone: "info" },
        { label: "Valor bruto proporcional", value: brl(bruto), tone: "add" },
        { label: "INSS", value: `- ${brl(inss)}`, tone: "sub" },
        { label: "IRRF", value: `- ${brl(irrf)}`, tone: "sub" },
      ],
      total: { label: "Valor líquido estimado", value: brl(round(bruto - inss - irrf)) },
    };
  },
  explanation: [
    "O salário proporcional considera o mês comercial de 30 dias: divide-se o salário por 30 e multiplica-se pelos dias trabalhados no período.",
    "É o cálculo usado para saldo de salário em admissões e desligamentos no meio do mês.",
  ],
  example:
    "Com salário de R$ 3.000,00 e 12 dias trabalhados, o valor bruto proporcional é de R$ 1.200,00.",
  faq: [
    { q: "Domingos e feriados contam?", a: "Sim. No cálculo por mês comercial os dias de descanso remunerado dentro do período são considerados." },
    { q: "Serve para calcular saldo de salário?", a: "Sim, é exatamente o mesmo cálculo utilizado na rescisão." },
    { q: "Faltas devem ser descontadas?", a: "Faltas injustificadas são descontadas à parte, junto com o respectivo DSR." },
  ],
};

export const cltPj: Calculator = {
  slug: "calculadora-clt-pj",
  name: "CLT x PJ",
  short: "Compare a remuneração real entre CLT e PJ.",
  title: "Calculadora CLT x PJ: comparação mensal e anual | De Tudo Um Pouco",
  description:
    "Compare CLT e PJ considerando benefícios, impostos, contador e reservas de férias e 13º. Veja o resultado mensal e anual.",
  h1: "Calculadora CLT x PJ",
  intro: "Compare uma proposta CLT com uma proposta PJ de forma realista.",
  fields: [
    { name: "clt", label: "Salário bruto CLT", type: "currency", required: true, min: 0 },
    { name: "beneficios", label: "Benefícios CLT por mês (VA/VR, saúde etc.)", type: "currency", min: 0, defaultValue: "0" },
    { name: "pj", label: "Valor mensal PJ", type: "currency", required: true, min: 0 },
    { name: "impostos", label: "Impostos PJ (%)", type: "number", min: 0, max: 100, defaultValue: "6" },
    { name: "contador", label: "Contador por mês", type: "currency", min: 0, defaultValue: "200" },
    { name: "saudePj", label: "Plano de saúde pago como PJ", type: "currency", min: 0, defaultValue: "0" },
    { name: "vaPj", label: "Alimentação paga como PJ", type: "currency", min: 0, defaultValue: "0" },
  ],
  compute: (v) => {
    const cltBruto = n((v["clt"] ?? ""));
    const inss = calcularINSS(cltBruto);
    const irrf = calcularIRRF(cltBruto, inss, 0);
    const beneficios = n((v["beneficios"] ?? ""));
    const fgts = round(cltBruto * 0.08);
    const decimoMensal = round(cltBruto / 12);
    const feriasMensal = round((cltBruto * (4 / 3)) / 12);
    const cltTotal = round(cltBruto - inss - irrf + beneficios + fgts + decimoMensal + feriasMensal);

    const pjBruto = n((v["pj"] ?? ""));
    const impostos = round(pjBruto * (n((v["impostos"] ?? "")) / 100));
    const custos = n((v["contador"] ?? "")) + n((v["saudePj"] ?? "")) + n((v["vaPj"] ?? ""));
    const reservaFerias = round((pjBruto * (4 / 3)) / 12);
    const reservaDecimo = round(pjBruto / 12);
    const pjTotal = round(pjBruto - impostos - custos - reservaFerias - reservaDecimo);

    const dif = round(pjTotal - cltTotal);
    return {
      lines: [
        { label: "CLT — líquido do mês", value: brl(round(cltBruto - inss - irrf)), tone: "info" },
        { label: "CLT — benefícios + FGTS + provisões", value: brl(round(beneficios + fgts + decimoMensal + feriasMensal)), tone: "add" },
        { label: "CLT — total mensal equivalente", value: brl(cltTotal), tone: "info" },
        { label: "PJ — impostos e custos", value: `- ${brl(round(impostos + custos))}`, tone: "sub" },
        { label: "PJ — reservas de férias e 13º", value: `- ${brl(round(reservaFerias + reservaDecimo))}`, tone: "sub" },
        { label: "PJ — total mensal equivalente", value: brl(pjTotal), tone: "info" },
        { label: "CLT no ano", value: brl(round(cltTotal * 12)), tone: "info" },
        { label: "PJ no ano", value: brl(round(pjTotal * 12)), tone: "info" },
      ],
      total: {
        label: dif >= 0 ? "PJ é maior por mês em" : "CLT é maior por mês em",
        value: brl(Math.abs(dif)),
      },
    };
  },
  explanation: [
    "A comparação justa entre CLT e PJ precisa considerar o que o CLT recebe além do salário: FGTS, 13º, férias com 1/3 e benefícios.",
    "No PJ, é preciso descontar impostos, contador e reservar mensalmente o equivalente a férias e 13º, já que não existem esses direitos.",
    "Direitos como seguro-desemprego, estabilidade e licenças não têm valor monetário direto aqui, mas devem entrar na sua decisão.",
  ],
  example:
    "Uma proposta CLT de R$ 6.000,00 com R$ 800,00 de benefícios costuma equivaler a algo entre R$ 8.500,00 e R$ 9.500,00 como PJ, dependendo dos impostos.",
  faq: [
    { q: "Qual percentual de imposto usar no PJ?", a: "No Simples Nacional para serviços, a faixa inicial costuma ficar entre 6% e 15,5%. Confira com seu contador." },
    { q: "Devo considerar o INSS como PJ?", a: "Sim, se você contribui como pró-labore. Some esse custo ao campo de impostos ou de custos mensais." },
    { q: "PJ sempre compensa mais?", a: "Não. Além do valor, considere estabilidade, benefícios, FGTS e proteção previdenciária." },
  ],
};
