import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { calculators } from "../calculators";

// TODO: substituir pela URL do projeto quando um domínio for definido.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = ["/", ...calculators.map((c) => `/${c.slug}`)];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map((p) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${p}</loc>`,
              `    <changefreq>monthly</changefreq>`,
              `    <priority>${p === "/" ? "1.0" : "0.8"}</priority>`,
              `  </url>`,
            ].join("\n"),
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
