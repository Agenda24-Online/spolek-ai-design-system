# ADR-0003: Fyzické oddělení veřejného a interního obsahu

- **Stav:** přijato
- **Datum:** 25. 7. 2026

## Kontext

SAOS má obsahovat veřejný Brand/Design System i interní procesy, rozhodnutí, marketingové podklady a znalosti. Skrytí interní stránky pouze z menu není ochrana; soubor může zůstat ve veřejném buildu.

## Rozhodnutí

Veřejný a interní obsah musí mít oddělené zdrojové umístění a oddělená pravidla buildu. Veřejný GitHub Pages build nesmí kopírovat, indexovat ani odkazovat obsah nebo aktiva označená `internal`.

## Důsledky

- Každý záznam a aktivum má explicitní pole `visibility`.
- CI musí selhat při pokusu publikovat interní položku ve veřejném výstupu.
- Citlivý obsah se nesmí ukládat do veřejného repozitáře jen s příznakem `internal`; bude potřebovat skutečně privátní úložiště nebo privátní repozitář.
- Konkrétní model autentizované interní aplikace bude řešen v pozdějším milestone.
