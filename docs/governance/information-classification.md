# Klasifikace a publikace obsahu SAOS

- **Stav:** závazné pravidlo M0
- **Platnost od:** 25. 7. 2026

## 1. Základní pravidlo

Označení `internal` není samo o sobě bezpečnostní ochrana. Citlivá data nesmí být vložena do veřejného repozitáře ani tehdy, pokud je veřejný web nezobrazuje.

## 2. Třídy viditelnosti

### Public

Obsah schválený pro veřejný web: pravidla značky, veřejné design tokeny, dokumentované komponenty, veřejné návody a schválená aktiva.

### Internal

Provozní obsah určený jen členům týmu: detailní workflow, pracovní postupy, interní marketingové plány, nepublikované návrhy, interní decision log a provozní znalosti.

Obsah `internal` smí být ve stejném repozitáři pouze tehdy, pokud je repozitář privátní a build jej prokazatelně vylučuje. V současném veřejném repozitáři se interní obsah zatím neukládá.

### Restricted

Citlivý obsah s omezeným přístupem: osobní údaje, smlouvy, neveřejné finanční údaje, bezpečnostní informace a přístupové údaje. Tato třída do tohoto repozitáře nepatří.

### Secret

Hesla, tokeny, API klíče a jiné autentizační údaje. Patří pouze do správy tajemství, například GitHub Secrets. Nesmí být v obsahu, commitech, issues ani pull requestech.

## 3. Povinná metadata

Budoucí obsahové schéma musí u každé položky vyžadovat minimálně:

- `visibility`
- `status`
- `owners`
- `version`
- `updatedAt`

U aktiv navíc licenci, původ a schválení k použití.

## 4. Publikační brána

Veřejný build musí:

1. přijímat pouze obsah a aktiva `public`,
2. odmítnout chybějící nebo neplatnou klasifikaci,
3. neindexovat interní cesty,
4. kontrolovat odkazy z veřejného obsahu na neveřejné cíle,
5. ukončit build chybou při úniku interního obsahu.

## 5. Odpovědnost

Autor navrhuje klasifikaci. Vlastník modulu ji kontroluje. Publikace do `main` proběhne až po review. Při pochybnosti se použije přísnější třída.

## 6. Současná hranice

Dokud nebude vytvořena privátní interní vrstva SAOS, tento veřejný repozitář obsahuje pouze veřejnou dokumentaci, veřejná aktiva a neškodné architektonické popisy. Skutečné interní procesy, citlivé rozhodovací záznamy a restricted data se sem nevkládají.
