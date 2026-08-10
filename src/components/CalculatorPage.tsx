import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { Calculator, Field, Values } from "../types/calculator";
import { AVISO_LEGAL } from "../constants/labor";
import { calculators } from "../calculators";
import { AdBanner } from "./AdBanner";

function initialValues(fields: Field[]): Values {
  const v: Values = {};
  for (const f of fields) v[f.name] = f.defaultValue ?? "";
  return v;
}

function validateField(f: Field, raw: string): string {
  const value = raw.trim();
  if (f.required && value === "") return `Informe ${f.label.toLowerCase()}.`;
  if (value === "") return "";
  if (f.type === "currency" || f.type === "number") {
    const parsed = Number(value.replace(/\./g, "").replace(",", "."));
    if (!Number.isFinite(parsed)) return "Digite um número válido.";
    if (parsed < (f.min ?? 0)) return `O valor não pode ser menor que ${f.min ?? 0}.`;
    if (f.max !== undefined && parsed > f.max) return `O valor não pode ser maior que ${f.max}.`;
  }
  if (f.type === "date") {
    const d = new Date(value + "T00:00:00");
    if (Number.isNaN(d.getTime())) return "Digite uma data válida.";
  }
  return "";
}

export function CalculatorPage({ calc }: { calc: Calculator }) {
  const [values, setValues] = useState<Values>(() => initialValues(calc.fields));
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    for (const f of calc.fields) {
      const msg = validateField(f, values[f.name] ?? "");
      if (msg) e[f.name] = msg;
    }
    if (calc.validate) Object.assign(e, calc.validate(values));
    return e;
  }, [calc, values]);

  const isValid = Object.keys(errors).length === 0;
  const result = useMemo(() => (isValid ? calc.compute(values) : null), [calc, values, isValid]);

  const related = calculators.filter((c) => c.slug !== calc.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <nav aria-label="Trilha de navegação" className="text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link to="/" className="hover:text-foreground hover:underline">
              Início
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Calculadora de {calc.name}</li>
        </ol>
      </nav>

      <AdBanner slot="top" />

      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {calc.h1}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{calc.intro}</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <form
          className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <h2 className="font-display text-lg font-semibold text-foreground">Seus dados</h2>
          <div className="mt-4 space-y-4">
            {calc.fields.map((f) => {
              const id = `${calc.slug}-${f.name}`;
              const err = touched[f.name] ? errors[f.name] : undefined;
              const common = {
                id,
                name: f.name,
                value: values[f.name] ?? "",
                "aria-invalid": err ? true : undefined,
                "aria-describedby": err ? `${id}-error` : undefined,
                onBlur: () => setTouched((t) => ({ ...t, [f.name]: true })),
                onChange: (
                  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
                ) => setValues((v) => ({ ...v, [f.name]: e.target.value })),
                className:
                  "w-full rounded-lg border border-input bg-background px-3 py-2 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
              };
              return (
                <div key={f.name}>
                  <label htmlFor={id} className="mb-1 block text-sm font-medium text-foreground">
                    {f.label}
                  </label>
                  {f.type === "select" ? (
                    <select {...common}>
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...common}
                      type={f.type === "date" ? "date" : "number"}
                      inputMode={f.type === "date" ? undefined : "decimal"}
                      step={f.step ?? (f.type === "currency" ? 0.01 : 1)}
                      min={f.min}
                      max={f.max}
                      placeholder={f.type === "currency" ? "0,00" : undefined}
                    />
                  )}
                  {f.help ? (
                    <p className="mt-1 text-xs text-muted-foreground">{f.help}</p>
                  ) : null}
                  {err ? (
                    <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-destructive">
                      {err}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </form>

        <section aria-live="polite" className="md:sticky md:top-24 md:self-start">
          <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
            <h2 className="font-display text-lg font-semibold text-foreground">Resultado</h2>
            {result ? (
              <>
                <dl className="mt-4 space-y-2 text-sm">
                  {result.lines.map((l) => (
                    <div key={l.label} className="flex items-baseline justify-between gap-3">
                      <dt className="text-muted-foreground">{l.label}</dt>
                      <dd
                        className={
                          l.tone === "sub"
                            ? "font-medium text-destructive"
                            : "font-medium text-foreground"
                        }
                      >
                        {l.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 rounded-xl bg-primary px-4 py-4 text-primary-foreground">
                  <p className="text-xs uppercase tracking-wide opacity-80">{result.total.label}</p>
                  <p className="font-display text-3xl font-bold">{result.total.value}</p>
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Preencha os campos obrigatórios para ver o resultado.
              </p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{AVISO_LEGAL}</p>
          </div>
          <AdBanner slot="result" />
        </section>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-foreground">Como funciona o cálculo</h2>
        {calc.explanation.map((p) => (
          <p key={p} className="mt-3 text-base leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
        <h3 className="mt-6 font-display text-lg font-semibold text-foreground">Exemplo prático</h3>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">{calc.example}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-foreground">Perguntas frequentes</h2>
        <dl className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
          {calc.faq.map((item) => (
            <div key={item.q} className="p-5">
              <dt className="font-medium text-foreground">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-foreground">Calculadoras relacionadas</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {related.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/${c.slug}`}
                className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <span className="block font-medium text-foreground">Calculadora de {c.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{c.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <AdBanner slot="bottom" />
    </div>
  );
}

export function calcHead(calc: Calculator) {
  return {
    meta: [
      { title: calc.title },
      { name: "description", content: calc.description },
      { property: "og:title", content: calc.title },
      { property: "og:description", content: calc.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/${calc.slug}` },
    ],
    links: [{ rel: "canonical", href: `/${calc.slug}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: calc.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  };
}
