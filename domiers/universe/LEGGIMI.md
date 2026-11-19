# Univers DOMIER — come si aggiorna

- L'Univers è un'opera del titolare. Da novembre 2026 **lo gestisce l'assistente al 100%**: il titolare manda il nuovo HTML (con le immagini dentro), l'assistente lo pubblica qui.
- **Mai pubblicare l'HTML così com'è** (≈2 MB): prima passarlo nello strumento di alleggerimento:
  `python3 tools/univers_opt.py <file-ricevuto.html> domiers/universe`
  → `index.html` leggero (~230 KB) + immagini in `domiers/universe/img/` (senza doppioni).
- Da conservare a ogni aggiornamento (se il file nuovo non li ha già): la musica d'apertura (gate + hook FR/EN), il titolo «ALJADY R. INTERVENTIONS» al plurale, titolo «L’univers DOMIER» + «by ALJADY R.», riga «cosa facciamo» (.what), il motto sotto il titolo, il mini pianeta alieno «Annonceurs ?» con il messaggio agli annunciatori (.alien) («Nous intervenons, vous êtes en sécurité.» / «We step in, you stay safe.»), il sistema solare DOMIER spostato a destra (`.hub .hsys{left:180px}`, mini sistema `.hub .msys{left:150px;top:507px}`).
- Indirizzi: `/domiers/universe/` (vero); `/univers/`, `/domier/`, `/domiers/` e `ajr-interventions.pages.dev` rinviano qui.
- Le immagini vecchie che non servono più in `img/` si possono togliere dopo il controllo (nessun riferimento in `index.html`).

## Da fare (deciso col titolare il 19/11/2026)
- ✅ (19/11/2026) «Devenir client» e «Partenaires et domistes»: email obbligatoria, spunta CGU (solo cliente) + consenso RGPD separato (uso, 12 mesi, cancellazione); invio bloccato senza spunte; riga di consenso con data nell’email. Durata 12 mesi = proposta da confermare col titolare/avvocato.
- Pagamento online delle licenze (provider da scegliere: consigliato Stripe + bonifico; conto a nome di ALJADY RECORDS LTD aperto dal titolare).
- Messaggio annunciatori: prezzo «dès 3,99 € HT» (IVA esclusa, confermato dal titolare il 19/11/2026); da precisare a cosa corrisponde (giorno / settimana / posto).
- **Da aggiungere più avanti, solo quando è vero e documentato:** numero dei follower dei social AJR/DOMIER (quando avviati); «plus de 4 000 logements dans le réseau» quando il cliente con quegli appartamenti sarà iscritto nella nuova rete con contratto (senza nominarlo).
