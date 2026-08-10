export type FieldType = "currency" | "number" | "date" | "select";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string;
  options?: { value: string; label: string }[];
}

export interface ResultLine {
  label: string;
  value: string;
  tone?: "add" | "sub" | "info";
}

export interface CalcResult {
  lines: ResultLine[];
  total: { label: string; value: string };
}

export type Values = Record<string, string>;

export interface Calculator {
  slug: string;
  name: string;
  short: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  fields: Field[];
  compute: (v: Values) => CalcResult;
  validate?: (v: Values) => Record<string, string>;
  explanation: string[];
  example: string;
  faq: { q: string; a: string }[];
}
