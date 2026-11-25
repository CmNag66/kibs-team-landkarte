# Die Modul-4-Wand

Eine Website, an der die ganze Gruppe der KI Business School gleichzeitig baut. Jede Person hat eine
eigene Karte als eigene Datei in `karten/`. Bei jedem Push setzt GitHub Actions alle Karten zu einer
Seite zusammen und veröffentlicht sie nach etwa einer Minute unter
https://cmnag66.github.io/kibs-team-landkarte/

## Regeln für Claude

- Antworte auf Deutsch und duze.
- **Lege nur eine einzige Datei an oder ändere nur sie: `karten/<vorname>.html`**, Vorname klein, ohne
  Umlaute und Leerzeichen (z. B. `karten/juergen.html`). Ändere nie eine andere Datei, auch nicht die
  Karte einer anderen Person und nichts in `.github/`.
- Frag zuerst nach Vorname, Rolle, was die Person in Modul 4 baut (ein Satz), optional dem Link zur
  eigenen Seite, und wie verrückt die Karte aussehen soll (Farben, Stimmung, Effekt).
- Aufbau der Datei, genau so:
  ```html
  <article id="karte-<vorname>">
    <style> /* jede Regel beginnt mit #karte-<vorname> */ </style>
    <p class="rolle">…</p>
    <h2>Vorname</h2>
    <p>Was ich baue …</p>
    <p><a href="https://…">Meine Seite ↗</a></p>
  </article>
  ```
- Gestaltung nur mit CSS im `<style>` der Karte, jede Regel mit `#karte-<vorname>` vorn, damit nichts
  auf andere Karten wirkt. Animationen, Farbverläufe, Hover-Effekte sind ausdrücklich erwünscht.
  Keyframes mit dem Vornamen als Präfix benennen (`@keyframes juergen-wackeln`). Kein `<script>`, keine
  Bilder oder Schriften von fremden Servern.
- Keine vertraulichen Daten, keine Namen von Kundschaft.
- Dann: `git pull --rebase`, committen mit „Karte von <Vorname>“, `git push`. Wird der Push abgelehnt,
  noch einmal `git pull --rebase` und pushen. Da jede Person nur ihre eigene Datei ändert, gibt es keine
  Konflikte.
- Sag am Ende in einem Satz, dass die Karte in etwa einer Minute auf der Wand erscheint, mit Link.

## Seiten-Check

Im Projekt liegt der Skill `.claude/skills/seiten-check/`. `/seiten-check` prüft die Wand
(`.github/bau/rahmen.html` und die Karten) an fünf Punkten, bevor man sie teilt.
