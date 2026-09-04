# ALJADY RECORDS — Contatore visite & like (Cloudflare Worker)

Questa cartella contiene il codice del "backend" leggero che conta le visite al sito
e i like per ogni canzone, usando Cloudflare Workers + KV (piano gratuito).

**Nessuna chiave/token va condivisa con nessuno per farlo funzionare** — tutto avviene
nella tua dashboard Cloudflare personale.

## Passi per pubblicarlo

1. Vai su **dash.cloudflare.com** → nel menu laterale **Workers e Pages**.
2. Clicca **Crea applicazione** → **Crea Worker**.
3. Dagli un nome, ad esempio `aljady-counters` → **Distribuisci** (per ora con codice di default, lo sostituiamo subito dopo).
4. Apri il Worker appena creato → **Modifica codice**.
5. Cancella tutto il contenuto e incolla il contenuto del file `worker.js` di questa cartella.
6. Clicca **Distribuisci** in alto a destra.
7. Ora crea lo storage: torna alla dashboard del Worker → scheda **Impostazioni** → **Variabili** → sezione **Associazioni spazi dei nomi KV** (Bindings → KV Namespace Bindings).
   - Se non hai ancora un namespace KV, creane uno nuovo (es. nome `aljady-counts`).
   - **Nome variabile**: scrivi esattamente `COUNTS` (deve corrispondere al nome usato nel codice).
   - Salva/distribuisci di nuovo se richiesto.
8. Copia l'URL pubblico del Worker, tipo:
   `https://aljady-counters.<tuo-sottodominio>.workers.dev`
9. Mandami quell'URL in chat — collego il sito a quell'indirizzo e il gioco è fatto.

## Cosa fa

- `POST /visit` → conta una visita, ritorna il totale.
- `POST /like` con `{"song":"Ghost_Me"}` → aggiunge un like a quella canzone (max 1 al giorno per visitatore), ritorna il conteggio aggiornato.
- `GET /stats` → ritorna tutto: visite totali + like per ogni canzone. Puoi aprire questo indirizzo
  nel browser in qualsiasi momento per vedere i numeri reali (es. `https://aljady-counters.tuo-nome.workers.dev/stats`).

## Costi

Il piano gratuito di Cloudflare Workers include 100.000 richieste al giorno e KV gratuito
per volumi molto superiori a quello che un sito come questo genererà — nessun costo previsto.
