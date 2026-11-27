// Gruppen-Code vor der Wand (seit 27.11.2026).
// Die Seite zeigt Vornamen, Rollen und Projekte der Gruppe. Wer den Code kennt, kommt rein;
// alle anderen sehen nur ein Eingabefeld. Der Code steht nicht hier, sondern als
// Umgebungsvariable WAND_CODE im Vercel-Projekt. Diese Datei bitte nicht ändern.

export const config = { matcher: "/:path*" };

const COOKIE = "wand_zugang";
const TAGE = 120;

async function hash(text) {
  const daten = new TextEncoder().encode("modul4-wand:" + text);
  const roh = await crypto.subtle.digest("SHA-256", daten);
  return [...new Uint8Array(roh)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function weiter() {
  return new Response(null, { headers: { "x-middleware-next": "1" } });
}

function cookieLesen(request) {
  const kopf = request.headers.get("cookie") || "";
  for (const teil of kopf.split(";")) {
    const [name, ...rest] = teil.trim().split("=");
    if (name === COOKIE) return rest.join("=");
  }
  return "";
}

function zugangSetzen(ziel, wert) {
  return new Response(null, {
    status: 303,
    headers: {
      location: ziel,
      "set-cookie": `${COOKIE}=${wert}; Path=/; Max-Age=${TAGE * 86400}; HttpOnly; Secure; SameSite=Lax`,
      "cache-control": "no-store",
    },
  });
}

function maske(fehler) {
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Die Modul-4-Wand</title>
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#021E2B;color:#E9F5FA;font:18px/1.5 system-ui,sans-serif}
form{background:#052F42;padding:32px 36px;border-radius:16px;max-width:360px;width:calc(100% - 48px)}
h1{font:600 26px Georgia,serif;margin:0 0 8px}p{margin:0 0 20px;color:#C9E3EE}
input{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;border:1px solid #28A1D7;background:#021E2B;color:#fff;font-size:18px}
button{margin-top:14px;width:100%;padding:12px;border:0;border-radius:10px;background:#28A1D7;color:#021E2B;font-weight:700;font-size:18px;cursor:pointer}
.f{color:#FFBD59;margin-top:12px}
</style></head><body>
<form method="post" action="/">
<h1>Die Modul-4-Wand</h1>
<p>Nur für die Gruppe der KI Business School. Den Code bekommst Du im Teams-Chat der Session.</p>
<input name="code" type="password" autocomplete="off" placeholder="Gruppen-Code" autofocus aria-label="Gruppen-Code">
<button type="submit">Zur Wand</button>
${fehler ? '<p class="f">Der Code stimmt nicht.</p>' : ""}
</form></body></html>`;
  return new Response(html, {
    status: 401,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" },
  });
}

export default async function middleware(request) {
  const code = process.env.WAND_CODE;
  if (!code) {
    return new Response("Die Wand ist gerade gesperrt (kein Gruppen-Code hinterlegt).", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    });
  }
  const soll = await hash(code);
  if (cookieLesen(request) === soll) return weiter();

  const url = new URL(request.url);

  // Ein-Klick-Link: /?zugang=<code>
  const ausLink = url.searchParams.get("zugang");
  if (ausLink !== null) {
    if (ausLink.trim() === code) {
      url.searchParams.delete("zugang");
      return zugangSetzen(url.pathname + (url.search || ""), soll);
    }
    return maske(true);
  }

  // Eingabefeld
  if (request.method === "POST") {
    const form = await request.formData().catch(() => null);
    const eingabe = form ? String(form.get("code") || "").trim() : "";
    if (eingabe === code) return zugangSetzen("/", soll);
    return maske(true);
  }

  return maske(false);
}
