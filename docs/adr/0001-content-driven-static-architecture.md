# ADR-0001: Obsahově řízená statická architektura

- **Stav:** přijato
- **Datum:** 25. 7. 2026

## Kontext

Současný prototyp používá samostatné ručně psané HTML stránky. Při stovkách stránek by se duplikoval layout, navigace, metadata a vyhledávací seznamy.

## Rozhodnutí

Cílová platforma bude staticky generovaný web postavený na Astro. Obsah bude spravovaný v Markdown/MDX a typovaných content collections. Sdílený vzhled a chování zajistí komponenty; výsledný web zůstane snadno publikovatelný na GitHub Pages.

## Důsledky

- M1 musí zavést validaci obsahu a reprodukovatelný build.
- Stávající HTML se bude migrovat postupně, nikoli jednorázovým přepsáním.
- Ruční HTML může dočasně fungovat vedle nové vrstvy, dokud nebude konkrétní stránka ověřeně převedena.
- Navigace, související obsah a vyhledávání se budou generovat z metadat.
