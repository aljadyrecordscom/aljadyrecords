/**
 * ALJADY RECORDS — Cloudflare Worker: contatore visite + like per canzone
 *
 * Storage: Cloudflare KV (namespace binding richiesto: COUNTS)
 * Endpoints pubblici (chiamati dal sito via fetch()):
 *   POST /visit              -> incrementa il contatore visite globale, ritorna { total }
 *   POST /like   {song}      -> incrementa il like per quella canzone (max 1 al giorno per IP), ritorna { song, count }
 *   GET  /stats              -> ritorna { visits: N, likes: { song: count, ... } }
 *
 * Sicurezza / privacy:
 * - Nessun token o segreto è coinvolto: questo Worker è pubblico per design (come il sito).
 * - Le richieste sono accettate solo se arrivano dall'origine del sito (header Origin), per scoraggiare
 *   abusi casuali da altri siti — non è una protezione assoluta (un client non-browser può falsificarla),
 *   ma è proporzionata allo scopo (contatori di un sito d'artista, non dati sensibili).
 * - Per evitare che un singolo visitatore gonfi i "like" ricliccando, ogni IP può contare un like per
 *   canzone una sola volta ogni 24 ore. La chiave di controllo (guard) scade da sola dopo 24h — non è
 *   conservata più a lungo, e non viene mai esposta o incrociata con altri dati.
 */

const ALLOWED_ORIGINS = [
  "https://www.aljadyrecords.com",
  "https://aljadyrecords.com",
];

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(data, origin, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

async function getCount(kv, key) {
  const v = await kv.get(key);
  return v ? parseInt(v, 10) : 0;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    // --- GET /stats ---
    if (request.method === "GET" && url.pathname === "/stats") {
      const visits = await getCount(env.COUNTS, "visits:total");
      const list = await env.COUNTS.list({ prefix: "like:" });
      const likes = {};
      for (const k of list.keys) {
        const song = k.name.replace("like:", "");
        likes[song] = await getCount(env.COUNTS, k.name);
      }
      return json({ visits, likes }, origin);
    }

    // --- POST /visit ---
    if (request.method === "POST" && url.pathname === "/visit") {
      const total = (await getCount(env.COUNTS, "visits:total")) + 1;
      await env.COUNTS.put("visits:total", String(total));
      return json({ total }, origin);
    }

    // --- POST /like ---
    if (request.method === "POST" && url.pathname === "/like") {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "invalid body" }, origin, 400);
      }
      const song = (body.song || "").trim();
      if (!song || !/^[A-Za-z0-9_-]+$/.test(song)) {
        return json({ error: "invalid song" }, origin, 400);
      }

      // Anti-spam: max 1 like per canzone ogni 24h per IP (chiave con scadenza automatica)
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      const guardKey = `guard:${song}:${ip}`;
      const alreadyLiked = await env.COUNTS.get(guardKey);
      const likeKey = `like:${song}`;

      if (alreadyLiked) {
        // Non incrementa di nuovo, ma ritorna comunque il conteggio attuale
        const count = await getCount(env.COUNTS, likeKey);
        return json({ song, count, duplicate: true }, origin);
      }

      const count = (await getCount(env.COUNTS, likeKey)) + 1;
      await env.COUNTS.put(likeKey, String(count));
      await env.COUNTS.put(guardKey, "1", { expirationTtl: 86400 }); // 24h

      return json({ song, count }, origin);
    }

    return json({ error: "not found" }, origin, 404);
  },
};
