import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage, calcHead } from "../components/CalculatorPage";
import { Page } from "../components/Layout";
import { decimoTerceiro as calc } from "../calculators";

export const Route = createFileRoute("/calculadora-13-salario")({
  head: () => calcHead(calc),
  component: () => (
    <Page>
      <CalculatorPage calc={calc} />
    </Page>
  ),
});
