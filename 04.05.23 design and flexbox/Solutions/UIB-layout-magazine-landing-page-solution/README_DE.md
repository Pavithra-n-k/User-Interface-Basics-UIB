# Magazin Landing Page
[![Statusübersicht-Badge](../../blob/badges/.github/badges/autograding/badge.svg)](#results)


Für diese Übung erstellen wir die Landing Page, die im Referenzbild unten gezeigt wird.

![Referenzbild](/assets/reference-image.png)

### Anleitung

> - Die Pfeilsymbole stammen von **Fontawesome** - verwende die Pseudo-Elemente `::before` und `::after`.
> - Verwende die Klasse `.flex-container` für den übergeordneten Flex-Container
> - Verwende semantische html-Tags, z.B. `<section>` für deine Abschnitte
> - Die Schriftart, die wir verwenden, ist _Roboto_ von **Google Fonts**.
> - Nutze die Eigenschaft `flex` - `position` wird für dieses Layout nicht benötigt
> - Verwende `:hover`-Effekte, wo du sie für nötig hältst
> - Wie immer gilt: **Pixel perfekt** :)

[//]: # (autograding info start)
## Ergebnisse


### UIB - Magazin Layout

| Status | Prüfen |
| :-------------------------------------: | :--------------------------------------------------------------------------------------- |
| ![Status](../../blob/badges/.github/badges/autograding/status0.svg) | Klasse von '.flex-container' sollte vorhanden sein |
| ![Status](../../blob/badges/.github/badges/autograding/status1.svg) | Font-awesome CDN sollte geladen sein |
| ![Status](../../blob/badges/.github/badges/autograding/status2.svg) | Stylesheet sollte einen Google-Importlink für die Schriftart Roboto enthalten |
| ![Status](../../blob/badges/.github/badges/autograding/status3.svg) | Flex Container sollte die volle Höhe des Viewports einnehmen |
| ![Status](../../blob/badges/.github/badges/autograding/status4.svg) | 'section' Tags sollten mit der css-Eigenschaft 'flex-basis' gleichmäßig auf der Seite verteilt werden |
| ![Status](../../blob/badges/.github/badges/autograding/status5.svg) | Das mittlere 'section'-Element sollte ein Bild-Tag mit einem definierten 'href' enthalten |
| ![Status](../../blob/badges/.github/badges/autograding/status6.svg) | 'section' mit dem 'reserve your copy' sollte die Hintergrundfarbe bei hover() ändern |



[🔬 Ergebnisdetails](https://github.com/DigitalCareerInstitute/UIB-layout-magazine-landing-page/actions)

[📢 Feedback geben oder Problem melden](https://docs.google.com/forms/d/e/1FAIpQLSfS8wPh6bCMTLF2wmjiE5_UhPiOEnubEwwPLN_M8zTCjx5qbg/viewform?usp=pp_url&entry.652569746=UIB-layout-magazine-landing-page&entry.2115011968=https%3A%2F%2Fgithub.com%2FDigitalCareerInstitute%2FUIB-layout-magazine-landing-page)

### Debugging deines Codes
> [Lesen der Testausgaben](https://github.com/DCI-EdTech/autograding-setup/wiki/Reading-test-outputs)

Es gibt zwei Möglichkeiten, um herauszufinden, warum Aufgaben nicht erledigt werden können:
#### 1. Tests lokal ausführen
- Führe `npm install` aus
- Führe `npm test` im Terminal aus. Du wirst sehen, wo deine Lösung vom erwarteten Ergebnis abweicht.

#### 2. Überprüfen der Testausgabe auf GitHub
- Gehe auf die [Registerkarte Aktionen deines Übungsrepos](https://github.com/DigitalCareerInstitute/UIB-layout-magazine-landing-page/actions)
- Dort siehst du eine Liste mit den Testläufen. Klicke auf den obersten.
- Klicke auf "Autograding".
- Erweitere den Punkt 'Run DCI-EdTech/autograding-action@main'
- Hier siehst du alle Ausgaben des Testlaufs

[//]: # (autograding info end)
