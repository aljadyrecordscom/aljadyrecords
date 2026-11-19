# Ottimizza l'Univers DOMIER: immagini base64 → file (senza doppioni), tela più leggera su tablet, livelli GPU per le animazioni
import re, base64, hashlib, os, sys
src, outdir = sys.argv[1], sys.argv[2]
s = open(src, encoding='utf-8').read()
os.makedirs(outdir + '/img', exist_ok=True)
seen = {}
def rep(m):
    typ, b = m.group(1), m.group(2)
    data = base64.b64decode(b); h = hashlib.sha1(data).hexdigest()[:12]; ext = {'jpeg': 'jpg', 'svg+xml': 'svg'}.get(typ, typ)
    name = f'img/{h}.{ext}'
    if name not in seen: open(f'{outdir}/{name}', 'wb').write(data); seen[name] = len(data)
    return name
n0 = len(s)
s = re.sub(r'data:image/([a-z+]+);base64,([A-Za-z0-9+/=]+)', rep, s)
# tela: sui tablet (schermo touch) 70 % della risoluzione
a = "const DZ={k:(Math.max(screen.width,screen.height)<1100?0.5:1),"
if a in s: s = s.replace(a, "const DZ={k:(Math.max(screen.width,screen.height)<1100?0.5:(matchMedia('(pointer:coarse)').matches?0.7:1)),")
else: print('ATTENZIONE: DZ non trovato')
# immagini decodificate senza bloccare
s = re.sub(r'<img (?![^>]*decoding=)', '<img decoding="async" ', s)
# (will-change provato e tolto: nelle misure peggiorava la diapositiva «univers»)
open(f'{outdir}/index.html', 'w', encoding='utf-8').write(s)
print('html', n0, '→', len(s), '| immagini', len(seen), sum(seen.values()))
