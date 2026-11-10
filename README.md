# 10.1 Utrechts Archief - Ontmoet de Oudegracht

Schoolproject voor Het Utrechts Archief (HUA), module 6.1 van de opleiding Webdevelopment (GLU), schooljaar 2026-2027.

In maart 2027 opent Het Utrechts Archief de tijdelijke tentoonstelling **Ontmoet de Oudegracht**, omdat de Oudegracht in 2027 900 jaar bestaat. Voor deze tentoonstelling maken wij een interactieve webapplicatie rond een filmopname uit 1929. De film is gemaakt vanaf een varende boot op de Oudegracht, van de Gaardbrug tot de Bezembrug.

## Makers

- Lars
- Sultan

## De opdracht

De opdrachtgever is Ellen Blom, educator bij Het Utrechts Archief. De doelgroep is families: mensen van verschillende leeftijden en achtergronden die samen de tentoonstelling bezoeken.

### Wat de opdrachtgever wil zien

- De video staat in beeld en is de basis van de applicatie.
- Naast de video staat een interactieve kaart die live meeloopt met de video.
- Je krijgt informatie en bronnen uit het archief bij punten langs de gracht, op basis van waar je vaart.
- Je kunt punten op de kaart aanklikken om er naartoe te "varen" (vooruit of achteruit in de video).
- Bij het starten staat er een korte uitleg over wat de applicatie is en kan.
- De applicatie ziet er ook aantrekkelijk uit als niemand hem bedient.

### Wat er vanuit school bij komt

- Een CMS waarmee medewerkers van het archief de applicatie zonder technische kennis kunnen beheren.
- Het logo van Het Utrechts Archief in de applicatie.
- Een knop die een pop-up (colofon) opent met informatie over het archief, de applicatie en de makers.

### Wensen (geen must)

- Een taal kunnen kiezen.
- Geluiden (geen muziek).
- Een quiz of game.
- Google Maps in 3D.

## Technische eisen

- Geschikt voor een groot touchscreen (digibord), dus geen functies die alleen met mouse-over werken.
- Responsive: werkt op schermen met verschillende formaten en verhoudingen.
- Toegankelijk volgens WCAG 2.1 niveau AA.
- De huisstijl van Het Utrechts Archief: kleuren, lettertype en logo van [hetutrechtsarchief.nl](https://hetutrechtsarchief.nl/).

## Toegankelijkheid

Het Utrechts Archief is een overheidsinstelling, daarom moet de applicatie voldoen aan WCAG 2.1 AA. Wij letten op de vier principes: waarneembaar, bedienbaar, begrijpelijk en robuust.

Waar wij tijdens het bouwen op letten:

- Semantische HTML (`header`, `nav`, `main`, `footer`) en een goede volgorde van koppen.
- Alt-teksten bij afbeeldingen en labels bij formuliervelden.
- Genoeg kleurcontrast (minimaal 4.5:1 voor tekst) en informatie niet alleen met kleur aangeven.
- Een duidelijk zichtbare focus en alles ook met het toetsenbord te bedienen.
- De layout blijft werken als je inzoomt tot 200%.
- ARIA alleen gebruiken als HTML zelf niet genoeg is.

Testen doen wij met Lighthouse, Axe DevTools, een screenreader en alleen het toetsenbord.

Handige links:

- [WCAG quick reference (W3C)](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1)
- [WCAG checklist van WebAIM](https://webaim.org/standards/wcag/checklist)
- [Toegankelijkheid bij de Rijksoverheid](https://www.rijksoverheid.nl/toegankelijkheid)

## Mappenstructuur

```
README.md       uitleg over het project
docs/           documenten (debriefing, technisch ontwerp, planning, offerte, testrapport)
src/            de broncode
  index.html    de startpagina van de webapplicatie
  css/          de stylesheets
  js/           de JavaScript bestanden
```

De code houden wij simpel en overzichtelijk. HTML, CSS en JavaScript staan in aparte bestanden.

## De applicatie bekijken

Open `src/index.html` in de browser.

## Planning

| Wanneer | Wat |
| --- | --- |
| Week 1 | Voorbereiden, kick-off en vragen stellen aan de opdrachtgever (woensdag 11 november 2026) |
| Week 2 | Werken aan de opdracht |
| Week 3 | Werken aan de opdracht en testen |
| Week 4 | Afronden en de eindpresentatie voorbereiden |
| Week 5 | Eindpresentatie bij Het Utrechts Archief (maandag 7 december 2026, 10:00-12:00) |
