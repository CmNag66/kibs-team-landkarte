# Team-Landkarte: Wer kann was mit KI?

Eine kleine Seite, auf der ein Team festhält, wer welches KI-Werkzeug wofür nutzt. Beispielprojekt aus
der KI Business School, Modul 4, Woche 4 (25.11.2026): Daran üben wir, ein Projekt über GitHub zu teilen
und einen Skill laufen zu lassen, der mit dem Projekt mitreist.

## Was hier liegt

- `index.html`: die ganze Seite, ohne Framework, läuft so auf Vercel
- `.claude/skills/seiten-check/`: ein Skill, der die Seite prüft, bevor man sie teilt. Wer dieses Projekt
  öffnet, hat ihn automatisch. Aufruf: `/seiten-check`

## Regeln für Claude

- Antworte auf Deutsch und duze.
- Die Seite sammelt keine Daten: kein Formular, das etwas verschickt, kein Analyse-Skript, keine Cookies.
- Vor jeder Änderung kurz sagen, was Du ändern willst, und auf mein Ja warten.
- Nach jeder Änderung committen, mit einer Nachricht, die sagt, was besser wurde.
- Wir arbeiten zu mehreren an diesem Projekt. Hol Dir vor dem Arbeiten den neuesten Stand (`git pull`).

## Eigene Karte eintragen

Die Gruppe der KI Business School arbeitet gleichzeitig in diesem Repository. Jede Person trägt eine
eigene Karte ein.

1. Hol den neuesten Stand (`git pull`).
2. Frag nach Vorname, Rolle, ein bis drei KI-Werkzeugen und einem Satz, wofür die Person sie nutzt.
3. Füge eine neue Karte im selben Aufbau wie die anderen direkt über dem Kommentar
   `Neue Karten hier drüber einfügen` ein. Ändere keine Karte einer anderen Person.
4. Committe mit der Nachricht „Karte von [Vorname]“ und pushe direkt auf `main`.
5. Wird der Push abgelehnt, weil jemand schneller war: `git pull --rebase`. Gibt es dabei einen Konflikt
   in `index.html`, behalte alle Karten, die eigene zuletzt, und pushe erneut. Sag mir in einem Satz,
   was passiert ist.
