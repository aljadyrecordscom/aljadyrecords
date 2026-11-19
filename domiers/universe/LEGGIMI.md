# Univers DOMIER — come si aggiorna

- L'Univers è un'opera del titolare. Da novembre 2026 **lo gestisce l'assistente al 100%**: il titolare manda il nuovo HTML (con le immagini dentro), l'assistente lo pubblica qui.
- **Mai pubblicare l'HTML così com'è** (≈2 MB): prima passarlo nello strumento di alleggerimento:
  `python3 tools/univers_opt.py <file-ricevuto.html> domiers/universe`
  → `index.html` leggero (~230 KB) + immagini in `domiers/universe/img/` (senza doppioni).
- Da conservare a ogni aggiornamento (se il file nuovo non li ha già): la musica d'apertura (gate + hook FR/EN), il titolo «ALJADY R. INTERVENTIONS» al plurale, il motto sotto «L’univers ALJADY» («Nous intervenons, vous êtes en sécurité.» / «We step in, you stay safe.»), il sistema solare DOMIER spostato a destra (`.hub .hsys{left:310px}`, mini sistema `.hub .msys{left:280px}`).
- Indirizzi: `/domiers/universe/` (vero); `/univers/`, `/domier/`, `/domiers/` e `ajr-interventions.pages.dev` rinviano qui.
- Le immagini vecchie che non servono più in `img/` si possono togliere dopo il controllo (nessun riferimento in `index.html`).
