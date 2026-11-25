// Setzt alle Karten aus karten/*.html in den Rahmen und schreibt _site/index.html.
// Läuft bei jedem Push auf Vercel (vercel.json, buildCommand). Eine Karte mit <script> oder
// on…-Attributen wird ohne sie übernommen, damit keine Karte die Wand kaputt macht.
import fs from "node:fs";
import path from "node:path";

const wurzel = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const rahmen = fs.readFileSync(path.join(wurzel, "bau", "rahmen.html"), "utf8");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const dateien = fs.readdirSync(path.join(wurzel, "karten")).filter((f) => f.endsWith(".html")).sort();
const karten = dateien.map((f) => {
  let t = fs.readFileSync(path.join(wurzel, "karten", f), "utf8");
  t = t.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi, "");
  if (!t.includes("<article")) {
    const name = esc(path.basename(f, ".html"));
    t = `<article id="karte-${name}"><h2>${name}</h2><p>${esc(t.trim().slice(0, 300))}</p></article>`;
  }
  return `<!-- ${f} -->\n${t.trim()}`;
});

// Was Vercel beim Bauen über den letzten Push weiß: Nachricht, Person, Commit.
const e = process.env;
const nachricht = e.VERCEL_GIT_COMMIT_MESSAGE ? e.VERCEL_GIT_COMMIT_MESSAGE.split("\n")[0] : "lokal gebaut";
const wer = e.VERCEL_GIT_COMMIT_AUTHOR_LOGIN || e.VERCEL_GIT_COMMIT_AUTHOR_NAME || "";
const sha = (e.VERCEL_GIT_COMMIT_SHA || "").slice(0, 7);
const jetzt = new Date().toLocaleTimeString("de-DE", { timeZone: "Europe/Berlin" });
const leer = Math.max(0, 6 - (karten.length % 6 || 6)) + (karten.length < 12 ? 6 : 0);
const platzhalter = Array.from({ length: leer }, () => '<div class="frei"><span>Hier kommt Deine Karte.</span></div>').join("\n");

const seite = rahmen
  .replace("{{KARTEN}}", karten.join("\n") + "\n" + platzhalter)
  .replaceAll("{{ZAHL}}", String(karten.length))
  .replace("{{NACHRICHT}}", esc(nachricht))
  .replace("{{WER}}", wer ? esc("@" + wer) : "")
  .replace("{{SHA}}", esc(sha || "–"))
  .replace("{{ZEIT}}", esc(jetzt));

fs.mkdirSync(path.join(wurzel, "_site"), { recursive: true });
fs.writeFileSync(path.join(wurzel, "_site", "index.html"), seite);
console.log(`${karten.length} Karten gebaut`);
