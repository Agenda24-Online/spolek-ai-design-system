# Dokumentace SAOS

Tato složka je řídicí dokumentací projektu **Spolek.ai Operating System (SAOS)**.

## Stav projektu

- Schválená architektura: **SAOS Architecture v1.0**
- Aktuální milestone: **M0 – Foundation**
- Publikovaný web zůstává během M0 beze změny.
- Implementace nové publikační vrstvy Astro/MDX začne až v M1.

## Struktura dokumentace

- `architecture/` – schválená cílová architektura systému
- `adr/` – Architecture Decision Records; neměnná historie zásadních rozhodnutí
- `governance/` – pravidla správy, klasifikace a publikace obsahu

## Pravidlo změn

Zásadní technické nebo obsahové rozhodnutí se zapisuje jako nové ADR. Přijaté ADR se zpětně nepřepisuje; změna vzniká novým ADR, které předchozí rozhodnutí nahrazuje.

## Hranice M0

M0 zavádí pouze rozhodovací a řídicí základ. Nemigruje stávající HTML stránky, nemění design, build ani nasazení GitHub Pages.
