import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage, calcHead } from "../components/CalculatorPage";
import { Page } from "../components/Layout";
import { cltPj as calc } from "../calculators";

export const Route = createFileRoute("/calculadora-clt-pj")({
  head: () => calcHead(calc),
  component: () => (
    <Page>
      <CalculatorPage calc={calc} />
    </Page>
  ),
});
