# SAOS Architecture v1.0

- **Stav:** schváleno
- **Schváleno:** 25. 7. 2026
- **Vlastník:** Agenda24 / Spolek.ai
- **Rozsah:** dlouhodobá cílová architektura Spolek.ai Operating System
- **Implementace:** postupně podle milestone M0–M10

## 1. Účel

SAOS není pouze HTML Brand Manual. Je to dlouhodobě rozšiřitelný operační, znalostní a designový systém, který propojuje pravidla značky, design systém, firemní procesy, AI tým, workflow, marketing, znalosti, rozhodnutí, budoucí návrhy a knihovnu aktiv.

Systém musí růst na stovky až tisíce stránek bez ručního kopírování layoutu, navigace a vyhledávacího indexu.

## 2. Výchozí stav

Současný repozitář je funkční statický vizuální prototyp. Obsahuje ručně psané HTML stránky, sdílenou CSS a JavaScript vrstvu, ručně spravovanou navigaci a jednoduché vyhledávání. Tento stav se v M0 zachovává, ale není cílovou architekturou.

## 3. Cílové moduly

1. Brand Manual
2. Design System
3. Business Operating System
4. AI Team
5. Workflow
6. Marketing
7. Knowledge Base
8. Decision Log
9. Future Ideas
10. Asset Library
11. SVG infografiky
12. Dokumentace a firemní procesy
13. UI Components
14. Design Tokens

Každý modul je samostatná obsahová doména se společnými metadaty, navigací, vztahy, vyhledáváním a pravidly přístupu.

## 4. Architektonické principy

- GitHub je jediný zdroj pravdy pro verzovaný obsah a zdrojový kód.
- Obsah, data, komponenty a výsledný web jsou oddělené vrstvy.
- Jedna informace má jedno kanonické umístění a může být odkazována z více modulů.
- Navigace a vyhledávání se generují z metadat, ne z ručně duplikovaných seznamů.
- Veřejný a interní obsah musí být fyzicky a procesně oddělený.
- Každé zásadní rozhodnutí má ADR.
- Design Tokens jsou zdroj hodnot; komponenty nesmí vytvářet paralelní systém barev, typografie a rozestupů.
- Asset Library používá metadata, stabilní identifikátory a odvozené exporty.
- Automatizace nesmí publikovat interní obsah do veřejného buildu.

## 5. Technologická architektura

Cílovou prezentační vrstvou je **Astro** s obsahem v **Markdown/MDX**, typovanými content collections, opakovaně použitelnými komponentami a statickým výstupem pro GitHub Pages.

Doporučené vrstvy:

- obsah: Markdown/MDX a strukturovaná data
- schémata: validace metadat při buildu
- UI: Astro komponenty
- design: verzované tokeny a generované CSS proměnné
- vztahy: stabilní ID a explicitní reference mezi záznamy
- vyhledávání: index generovaný při buildu
- kvalita: lint, kontrola odkazů, validace schémat a build v CI
- publikace: GitHub Actions a GitHub Pages
- interní obsah: mimo veřejný build a bez spoléhání pouze na skrytí v navigaci

## 6. Obsahový model

Každá obsahová jednotka má minimálně:

- `id` – stabilní unikátní identifikátor
- `title`
- `slug`
- `module`
- `status` – draft, review, approved, deprecated, archived
- `visibility` – public nebo internal
- `version`
- `owners`
- `createdAt`
- `updatedAt`
- `tags`
- `relations` – odkazy na související záznamy a aktiva

Moduly mohou přidávat vlastní typovaná pole, ale nesmí obcházet společná metadata.

## 7. Cílová struktura

```text
/
├─ apps/
│  └─ web/
├─ content/
│  ├─ public/
│  └─ internal/
├─ packages/
│  ├─ ui/
│  ├─ tokens/
│  ├─ schemas/
│  └─ search/
├─ assets/
│  ├─ source/
│  ├─ metadata/
│  └─ generated/
├─ docs/
│  ├─ architecture/
│  ├─ adr/
│  └─ governance/
├─ scripts/
├─ tests/
└─ .github/workflows/
```

Tato struktura je cílová. M0 ji nevytváří prázdnými složkami; vzniká postupně s reálným obsahem.

## 8. Navigace a propojení

Primární navigace vychází z registru modulů a metadat obsahu. Každý modul má landing page, lokální navigaci a filtr. Globální vyhledávání indexuje pouze obsah povolený pro daný build.

Vazby mezi moduly používají stabilní ID. Například proces může odkazovat na roli AI Teamu, rozhodnutí v Decision Logu, komponentu Design Systemu a související aktiva bez duplikace jejich obsahu.

## 9. Verzování

- produktové vydání SAOS: Semantic Versioning
- obsahová jednotka: vlastní pole `version` a Git historie
- zásadní rozhodnutí: číslovaná ADR
- stabilní vydání: Git tag a release notes
- změny: větev → kontrola → pull request → schválení → merge
- `main`: publikovatelný a stabilní stav

## 10. Asset Library

Zdrojové soubory, metadata a odvozené exporty jsou oddělené. Každé aktivum má stabilní ID, licenci, autora/vlastníka, typ, varianty, stav, viditelnost, datum aktualizace a vazby na použití. Veřejný build smí převzít pouze aktiva označená jako veřejná a schválená.

Velké binární soubory se nemají bez řízení hromadit v běžné Git historii. Konkrétní limit a případné externí úložiště budou potvrzeny před masovou migrací aktiv.

## 11. Workflow ChatGPT Work ↔ GitHub

1. GitHub je zdroj pravdy.
2. ChatGPT Work nejprve čte aktuální `main` a relevantní dokumentaci.
3. Každý ucelený úkol vzniká na samostatné větvi.
4. Agent mění jen schválený rozsah.
5. Proběhne validace a kontrola diffu.
6. Agent otevře návrh pull requestu.
7. Vlastník změny zkontroluje a schválí.
8. Teprve merge do `main` spouští publikaci.

Citlivé hodnoty patří do GitHub Secrets, nikoli do repozitáře nebo promptů.

## 12. Roadmapa

- **M0 Foundation:** schválená architektura, ADR-0001 až ADR-0004, klasifikace obsahu
- **M1 Platform:** Astro/MDX základ, schémata, build, první migrovaná stránka
- **M2 Design Core:** tokeny, layout, základní UI komponenty
- **M3 Content Platform:** registry modulů, navigace, vztahy, vyhledávání
- **M4 Brand & Design System:** migrace Brand Manualu a Design Systemu
- **M5 Operating System:** procesy, workflow, role a šablony
- **M6 AI Team:** registr agentů, kompetence, vstupy, výstupy a bezpečnost
- **M7 Knowledge & Decisions:** Knowledge Base, Decision Log, Future Ideas
- **M8 Asset Library:** metadata, validace, náhledy a distribuční workflow
- **M9 Governance & Quality:** přístupy, audit, CI kontroly, zálohy
- **M10 Scale & Release:** optimalizace, dokumentace, první stabilní vydání

## 13. Kritéria dokončení M0

M0 je hotové, když:

- tento dokument je verzovaný v repozitáři jako schválený základ,
- existují ADR-0001 až ADR-0004,
- existuje závazná klasifikace veřejného a interního obsahu,
- změny jsou předloženy v samostatném pull requestu,
- produkční prototyp zůstane funkčně beze změny.
