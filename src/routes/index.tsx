import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { calculators } from "../calculators";
import { Page } from "../components/Layout";
import { AdBanner } from "../components/AdBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Calculadoras Trabalhistas Gratuitas | De Tudo Um Pouco" },
      {
        name: "description",
        content:
          "Calcule salário líquido, férias, 13º, rescisão, horas extras e outros valores trabalhistas de forma simples, rápida e gratuita.",
      },
      { property: "og:title", content: "Calculadoras Trabalhistas Gratuitas | De Tudo Um Pouco" },
      {
        property: "og:description",
        content:
          "Calcule salário líquido, férias, 13º, rescisão, horas extras e outros valores trabalhistas de forma simples, rápida e gratuita.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const lista = useMemo(() => {
    const termo = q.trim().toLowerCase();
    if (!termo) return calculators;
    return calculators.filter(
      (c) =>
        c.name.toLowerCase().includes(termo) ||
        c.short.toLowerCase().includes(termo) ||
        c.slug.includes(termo),
    );
  }, [q]);

  return (
    <Page>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Calculadoras trabalhistas gratuitas
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Calcule salário líquido, férias, 13º, rescisão, horas extras e outros valores
            trabalhistas de forma simples e rápida.
          </p>
          <div className="mt-6 max-w-md">
            <label htmlFor="busca" className="mb-1 block text-sm font-medium text-foreground">
              Buscar calculadora
            </label>
            <input
              id="busca"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ex.: férias, rescisão, hora extra"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <AdBanner slot="top" />
        <h2 className="font-display text-xl font-bold text-foreground">Escolha uma calculadora</h2>
        {lista.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Nenhuma calculadora encontrada para “{q}”.
          </p>
        ) : (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/${c.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60"
                >
                  <span className="font-display text-base font-semibold text-foreground">
                    Calculadora de {c.name}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.short}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <AdBanner slot="bottom" />
      </div>
    </Page>
  );
}
