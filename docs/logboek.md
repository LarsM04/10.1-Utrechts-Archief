# Logboek

Ik werk alleen aan deze opdracht, op dinsdag van 12:15 tot 16:30 (4,25 uur). In de offerte staan 19 uur: vier dinsdagen plus de eindpresentatie van 2 uur. Wat ik precies heb veranderd, staat ook in de [commitgeschiedenis](https://github.com/LarsM04/10.1-Utrechts-Archief/commits/main).

| Datum | Uren | Wat |
| --- | --- | --- |
| Dinsdag 10 november 2026 | 4,25 | Start opdracht, GitHub-repository en README |
| Dinsdag 17 november 2026 | 3,75 | Offerte, debriefing, plan van aanpak en technisch ontwerp |
| Woensdag 25 november 2026 | 4,25 | Schermontwerp, film met meelopende kaart, informatiepunten en wachtstand |
| **Totaal** | **12,25 van 19** | |

## Dinsdag 10 november 2026

- De briefing van Het Utrechts Archief en de Notion-pagina's van de module doorgenomen.
- De GitHub-repository aangemaakt met een mappenstructuur (`docs` en `src`) en een README met uitleg over de opdracht.

## Dinsdag 17 november 2026

- Besloten de opdracht alleen te doen en de README daarop aangepast.
- Offerte gemaakt volgens het format van school: 19 uur tegen € 60 per uur, met planning en voorwaarden. De offerte is geprint.
- Debriefing gemaakt volgens het format van school, op basis van de briefing en de vragen en antwoorden op Notion.
- Dit logboek toegevoegd.
- Plan van aanpak gemaakt volgens het format van school, met SMART-doelen, SCRUM per dinsdag, planning en risicoanalyse.
- Takenbord in GitHub Projects gemaakt met de kolommen Te doen, Bezig en Klaar en alle taken uit de planning.
- Technisch ontwerp gemaakt volgens het format van school: techniek (HTML, CSS, JavaScript, PHP en MySQL), database met ERD, beveiliging, wireframes en testgevallen.
- De film uit 1929 gedownload (3 minuten, 768 × 576) en in `src/media` gezet. De film is van het archief en staat daarom niet in de repository.
- Vandaag gestopt om 16:00 in plaats van 16:30.

**Review:** alle voorbereidende documenten zijn af, dus de mijlpaal van 17 november is gehaald. De bouw is nog niet begonnen.

**Retrospective:** de film was lastig te vinden, omdat de pagina met films op de website van het archief niet werkt. Volgende keer regel ik het materiaal eerder.

**Volgende keer (24 november):** schermontwerp in de huisstijl, de videospeler met de meelopende kaart en de informatiepunten.

## Woensdag 25 november 2026

Dit is de sprint van dinsdag 24 november. Die dag kon ik niet werken, daarom haal ik het vandaag in.

- Schermontwerp gemaakt in de huisstijl van het archief en vastgelegd in [schermontwerp.md](schermontwerp.md), met het contrast van de kleuren.
- Het eerste ontwerp zag er ouderwets uit. Daarom een tweede versie gemaakt volgens de huidige website van het archief: rood en wit, een eigen kaart en grote ronde knoppen. Daarin vulde de film het scherm, maar hij was slecht te zien door alles wat eroverheen lag. In de derde versie is de hele film te zien en staan de kaart en de informatie ernaast.
- Uitgezocht op welk moment in de film de boot bij welke brug is. Op het bordje in de film staat de Maartensbrug, en op een ander bordje de Kalisbrug. Met OpenStreetMap heb ik daar de vaarroute bij gemaakt.
- De film, de bedieningsknoppen en de tijdlijn gebouwd.
- De kaart met Leaflet gebouwd. Het bootje vaart mee met de film, en als je een punt aantikt springt de film ernaartoe.
- Het bronmateriaal van het archief gekregen en verwerkt: acht plekken met de letterlijke teksten en 17 afbeeldingen. Bij plekken met meer dan drie afbeeldingen heb ik de drie gekozen die het beste bij de film passen. Daarvoor had ik eigen voorbeeldpunten gemaakt; die zijn vervangen. De punten staan nu in een JSON-bestand, op 1 december komen ze uit de database.
- Het startscherm, het colofon en de wachtstand gemaakt.
- Getest in Edge op zes schermformaten en 200% zoom, met touch-simulatie, met het toetsenbord en met Axe (geen fouten). Daarbij ontdekt en opgelost: een punt op de kaart reageerde niet op Enter, en de kaart kon te ver weg worden gesleept. Na het nieuwe ontwerp alles opnieuw getest.

**Afwijkingen van het technisch ontwerp:** de kleuren zijn die van de website in plaats van de manual. De kaart gebruikt geen tegels van internet, maar vormen uit OpenStreetMap die in een eigen bestand staan. Het bootje volgt een vaste route door de gracht in plaats van rechte lijnen tussen de punten, omdat het anders door huizen vaart. Het informatiekaartje is geen `<dialog>`, omdat het vanzelf verschijnt en dan de focus zou afpakken. Een punt kan meer afbeeldingen hebben, dus er komt een extra tabel voor afbeeldingen met bijschrift, bron en alt-tekst. De wachttijd van 90 seconden telt alleen als de film stilstaat of er een venster openstaat, anders wordt iemand die rustig naar de film kijkt onderbroken.

**Review:** de mijlpaal van 24 november is gehaald: de film, de meelopende kaart en de informatiepunten werken.

**Retrospective:** het ontwerp had drie versies nodig, omdat ik de website van het archief niet vooraf goed had bekeken. Volgende keer bekijk ik eerst de huidige stijl en kies ik de indeling voordat ik ga bouwen.

**Volgende keer (1 december):** CMS met database, testen, testrapport, demonstratievideo en presentatie.
