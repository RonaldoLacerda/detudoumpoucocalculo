import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { calculators } from "../calculators";
import { AdBanner } from "./AdBanner";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-base font-bold text-primary-foreground">
            D
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold leading-tight text-foreground">
              De Tudo Um Pouco
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Calculadoras trabalhistas simples, rápidas e gratuitas
            </span>
          </span>
        </Link>
        <nav aria-label="Principal" className="flex shrink-0 items-center gap-4 text-sm font-medium">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Início
          </Link>
          <Link
            to="/calculadora-salario-liquido"
            className="rounded-lg bg-primary px-3 py-1.5 text-primary-foreground hover:bg-primary/90"
          >
            Salário líquido
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Todas as calculadoras
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/${c.slug}`}
                className="text-sm text-foreground underline-offset-4 hover:underline"
              >
                Calculadora de {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          De Tudo Um Pouco — Calculadoras trabalhistas simples, rápidas e gratuitas. Conteúdo
          informativo, sem coleta de dados pessoais. Os cálculos são realizados no seu navegador.
        </p>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex-1">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-4 lg:grid-cols-[160px_minmax(0,1fr)_160px] lg:px-6 xl:grid-cols-[220px_minmax(0,1fr)_220px]">
          <aside aria-label="Publicidade lateral esquerda" className="hidden min-w-0 lg:block">
            <div className="sticky top-24 pt-8">
              <AdBanner slot="left" />
            </div>
          </aside>
          <main className="min-w-0">{children}</main>
          <aside aria-label="Publicidade lateral direita" className="hidden min-w-0 lg:block">
            <div className="sticky top-24 pt-8">
              <AdBanner slot="right" />
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
