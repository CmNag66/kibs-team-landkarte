"""Setzt alle Karten aus karten/*.html in den Rahmen und schreibt _site/index.html.

Läuft bei jedem Push in GitHub Actions (.github/workflows/wand.yml). Eine Karte, die
<script> enthält, wird ohne Skript übernommen, damit keine Karte die Wand kaputt macht.
"""

import datetime
import html
import pathlib
import re

WURZEL = pathlib.Path(__file__).resolve().parents[2]
RAHMEN = (WURZEL / ".github" / "bau" / "rahmen.html").read_text(encoding="utf-8")

karten = []
for datei in sorted((WURZEL / "karten").glob("*.html")):
    text = datei.read_text(encoding="utf-8", errors="replace")
    text = re.sub(r"<script\b.*?</script>", "", text, flags=re.S | re.I)
    text = re.sub(r"\son\w+\s*=\s*(\"[^\"]*\"|'[^']*')", "", text, flags=re.I)
    if "<article" not in text:
        name = html.escape(datei.stem)
        text = f'<article id="karte-{name}"><h2>{name}</h2><p>{html.escape(text.strip()[:300])}</p></article>'
    karten.append(f"<!-- {datei.name} -->\n{text.strip()}")

jetzt = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=1))).strftime("%d.%m.%Y, %H:%M:%S")
seite = (
    RAHMEN.replace("{{KARTEN}}", "\n".join(karten))
    .replace("{{ZAHL}}", str(len(karten)))
    .replace("{{STAND}}", jetzt)
)
ziel = WURZEL / "_site"
ziel.mkdir(exist_ok=True)
(ziel / "index.html").write_text(seite, encoding="utf-8")
print(f"{len(karten)} Karten gebaut")
