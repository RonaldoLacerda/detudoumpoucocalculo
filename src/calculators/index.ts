import { salarioLiquido, ferias, decimoTerceiro, rescisao, avisoPrevio } from "./rescisorias";
import { horaExtra, adicionalNoturno, salarioPorHora, diasTrabalhados, cltPj } from "./horas";
import type { Calculator } from "../types/calculator";

export const calculators: Calculator[] = [
  salarioLiquido,
  rescisao,
  ferias,
  decimoTerceiro,
  horaExtra,
  avisoPrevio,
  adicionalNoturno,
  salarioPorHora,
  diasTrabalhados,
  cltPj,
];

export const getCalculator = (slug: string) => calculators.find((c) => c.slug === slug);

export {
  salarioLiquido,
  ferias,
  decimoTerceiro,
  rescisao,
  avisoPrevio,
  horaExtra,
  adicionalNoturno,
  salarioPorHora,
  diasTrabalhados,
  cltPj,
};
