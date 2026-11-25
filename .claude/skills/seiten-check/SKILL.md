---
name: seiten-check
description: Prüft die Website in diesem Projekt, bevor sie jemand anderem gezeigt wird. Fünf Punkte mit Ampel (Zweck, Handy, Lesbarkeit, Daten, Technik), danach drei Verbesserungen. Nutze ihn, wenn jemand sagt „check die Seite“, „ist das fertig?“, „bevor ich das teile“ oder „/seiten-check“.
---

# Seiten-Check

Du prüfst die Website in diesem Projekt, bevor sie geteilt wird. **Du änderst nichts, bevor ich zustimme.**

## So gehst Du vor

1. Lies zuerst die `CLAUDE.md` und dann die Startseite. In diesem Projekt ist das die Wand: `bau/rahmen.html` und alle Karten in `karten/`. Live steht sie unter https://modul4-wand.vercel.app. In anderen Projekten `index.html`, `app/page.tsx` oder `src/App.jsx`.
2. Prüfe diese fünf Punkte. Je Punkt eine Ampel (grün, gelb, rot) und **ein** Satz Begründung mit der Stelle im Code:
   - **Zweck:** Versteht eine fremde Person in zehn Sekunden, wofür die Seite ist und was sie als Nächstes tun soll?
   - **Handy:** Passt alles in 390 Pixel Breite, ohne seitliches Scrollen? Sind Knöpfe und Links mindestens 44 Pixel hoch?
   - **Lesbarkeit:** Schrift mindestens 16 Pixel, genug Kontrast, Überschriften in der richtigen Reihenfolge, jedes Bild mit Alternativtext.
   - **Daten:** Sammelt die Seite Eingaben (Formular, Speicher, Analyse-Skript)? Wenn ja: Wohin gehen sie, und steht das auf der Seite?
   - **Technik:** tote Links, Platzhalter wie „Lorem ipsum“ oder „TODO“, Fehler in der Browser-Konsole, wenn Du sie sehen kannst.
3. Danach die **drei wichtigsten Verbesserungen**, nach Wirkung sortiert, je mit einem konkreten Änderungsvorschlag.
4. Frag mich, welche davon Du umsetzen sollst. Erst nach meinem Ja änderst Du etwas, danach committest Du mit einer Nachricht, die sagt, was besser wurde.

## Form der Antwort

Deutsch, Du-Form, kurz. Erst eine Tabelle mit fünf Zeilen (Punkt, Ampel, Begründung), dann die drei Verbesserungen als Liste, dann die Frage. Keine Einleitung, kein Lob vorweg.
