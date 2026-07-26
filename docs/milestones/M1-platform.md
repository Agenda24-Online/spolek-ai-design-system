# M1 — Platforma SAOS

- **Stav:** připraveno ke kontrole
- **Větev:** `feat/saos-interface-foundation`
- **Rozsah:** technický základ interního pracovního rozhraní SAOS

## Cíl

M1 nevytváří prezentační web Spolek.ai. Zavádí technický motor pro živý Brand Manual a operační systém podnikání, který bude dostupný přes jeden odkaz a rozšiřitelný bez ručního kopírování HTML.

## Dodané části

- samostatná Astro aplikace v `apps/web`
- typované schéma společných metadat obsahu
- první migrovaná obsahová jednotka `saos-home`
- společný layout pracovního rozhraní
- registr deseti hlavních modulů
- responzivní dashboard modulů
- kontrolní GitHub Actions build
- zachování dosavadního statického prototypu beze změny

## Bezpečné zavedení

Nová aplikace je během M1 umístěna vedle stávajícího prototypu. M1 automaticky nepřepíná GitHub Pages ani nemaže původní HTML. Přechod publikované adresy bude samostatně schválený krok po úspěšném buildu a vizuální kontrole.

## Kritéria dokončení

- `npm ci` proběhne bez chyby
- `npm run build` proběhne bez chyby
- metadata neplatného obsahu zastaví build
- dashboard používá společný layout a registr modulů
- stávající kořenové HTML, CSS a JavaScript soubory zůstávají nezměněné
- pull request obsahuje pouze rozsah M1
