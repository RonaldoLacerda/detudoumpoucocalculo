import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage, calcHead } from "../components/CalculatorPage";
import { Page } from "../components/Layout";
import { salarioPorHora as calc } from "../calculators";

export const Route = createFileRoute("/calculadora-salario-por-hora")({
  head: () => calcHead(calc),
  component: () => (
    <Page>
      <CalculatorPage calc={calc} />
    </Page>
  ),
});
