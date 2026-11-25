# Die Modul-4-Wand

Eine Website, an der die ganze Gruppe der KI Business School gleichzeitig baut. Jede Person hat eine
eigene Karte als eigene Datei in `karten/`. Bei jedem Push nach GitHub baut Vercel die Seite neu und
veröffentlicht sie nach etwa 30 Sekunden unter https://modul4-wand.vercel.app

## Regeln für Claude

- Antworte auf Deutsch und duze.
- **Lege nur eine einzige Datei an oder ändere nur sie: `karten/<vorname>.html`**, Vorname klein, ohne
  Umlaute und Leerzeichen (z. B. `karten/juergen.html`). Ändere nie eine andere Datei, auch nicht die
  Karte einer anderen Person und nichts in `bau/`.
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
- Gibt es `karten/<vorname>.html` schon und gehört sie jemand anderem, häng den ersten Buchstaben des
  Nachnamens an (`karten/anna-m.html`, `id="karte-anna-m"`).
- Links nur mit `https://`.
- Dann: nur die eigene Datei vormerken (`git add karten/<vorname>.html`), `git pull --rebase`, committen mit „Karte von <Vorname>“, `git push`. Wird der Push abgelehnt,
  noch einmal `git pull --rebase` und pushen. Da jede Person nur ihre eigene Datei ändert, gibt es keine
  Konflikte.
- Sag am Ende in einem Satz, dass Vercel die Karte jetzt baut und sie in etwa 30 Sekunden auf https://modul4-wand.vercel.app erscheint.

## Seiten-Check

Im Projekt liegt der Skill `.claude/skills/seiten-check/`. `/seiten-check` prüft die Wand
(`bau/rahmen.html` und die Karten) an fünf Punkten, bevor man sie teilt.
