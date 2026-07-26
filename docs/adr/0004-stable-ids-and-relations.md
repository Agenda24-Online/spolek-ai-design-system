# ADR-0004: Stabilní ID a explicitní vztahy mezi moduly

- **Stav:** přijato
- **Datum:** 25. 7. 2026

## Kontext

SAOS propojí procesy, role, rozhodnutí, komponenty, znalosti a aktiva. Propojení pouze přes URL nebo názvy je křehké: přejmenování a přesun rozbije vazby.

## Rozhodnutí

Každá obsahová jednotka a každé aktivum má stabilní, globálně jedinečné ID. Vztahy se zapisují explicitně pomocí těchto ID; URL a navigační umístění jsou odvozené údaje.

## Důsledky

- Schémata budou kontrolovat unikátnost ID a existenci cílových referencí.
- Přesun nebo změna názvu nemusí měnit identitu záznamu.
- Z jednoho vztahového modelu lze generovat související obsah, mapy procesů a dopadové přehledy.
- Formát ID a registr modulů se implementují v M1/M3.
