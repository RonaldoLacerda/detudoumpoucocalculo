import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage, calcHead } from "../components/CalculatorPage";
import { Page } from "../components/Layout";
import { salarioLiquido as calc } from "../calculators";

export const Route = createFileRoute("/calculadora-salario-liquido")({
  head: () => calcHead(calc),
  component: () => (
    <Page>
      <CalculatorPage calc={calc} />
    </Page>
  ),
});
