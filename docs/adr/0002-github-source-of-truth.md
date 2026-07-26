# ADR-0002: GitHub jako jediný zdroj pravdy

- **Stav:** přijato
- **Datum:** 25. 7. 2026

## Kontext

Dlouhodobý vývoj přes lokální kopie, ZIP balíčky a ruční přenosy vytváří nejasnost, která verze je aktuální, a zvyšuje riziko ztráty změn.

## Rozhodnutí

Verzovaný zdrojový kód, obsah, schémata a řídicí dokumentace SAOS mají kanonický stav v GitHub repozitáři. Změny vznikají na samostatných větvích a vstupují do `main` přes pull request.

## Důsledky

- `main` představuje stabilní, publikovatelný stav.
- ChatGPT Work před změnou načte aktuální stav repozitáře.
- Každá ucelená změna má dohledatelnou větev, commit a pull request.
- Lokální kopie jsou pracovní cache, nikoli samostatný zdroj pravdy.
- Tajemství a přístupové údaje nejsou verzovány; používají se GitHub Secrets.
