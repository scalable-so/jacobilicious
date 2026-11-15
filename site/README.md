# Jacobilicious Site

Die Landing Page. Sie zeigt den Nutzen, und jeder Button öffnet das öffentliche Repo auf GitHub (`REPO_URL` in `src/lib/config.ts`). Dort lädt man das Paket über Code, dann Download ZIP.

## Die alte Zugangsschranke

Bis November 2026 gab es das Paket nur nach einer Bewertung des Vortrags. Diese Schranke ist abgeschaltet:

- Das Formular unter `/zugang` ist entfernt. `/zugang` leitet auf das GitHub-Repo weiter (`next.config.ts`).
- `/admin` bleibt, damit die gesammelten Anfragen und der CSV-Export erreichbar sind.
- Persönliche Links unter `/freischalten` funktionieren weiter, bis sie ablaufen.

Der Rest dieses Dokuments beschreibt die Schranke, wie sie lief.

## Der Schutz

| Schutz | Wirkung |
|---|---|
| Zugang pro Adresse | Nur freigegebene Adressen öffnen das Paket. Jede Adresse hat 3 Downloads. |
| Signierter Link | Gilt 7 Tage. Er lässt sich nicht fälschen. |
| 1 Bewertung pro Adresse | Die erste Bewertung zählt. Eine zweite, höhere Bewertung ändert nichts. |
| `ACCESS.md` im Paket | Jede Kopie trägt Name, Adresse, Datum und Kennung des Empfängers. |
| Sperren in `/admin` | Alle Links einer Person gelten sofort nicht mehr. |
| `ACCESS_MODE=manual` | Jacob gibt jeden Zugang selbst frei, auch bei 10 Punkten. |
| Kein öffentlicher Download | Das Paket liegt nicht als Datei auf dem Server. Es entsteht erst bei der Anfrage. |

Der Schutz passt zu einem kleinen Kreis. Jeder, der die Adresse der Seite kennt, kann anfragen. Die Seite prüft nicht, ob eine Adresse der Person gehört: Wer eine freigegebene Adresse kennt, kann deren Paket laden. Wer das Paket hat, kann den Ordner kopieren. `ACCESS.md` zeigt dann, von wem die Kopie stammt.

## Seiten

| Adresse | Zweck |
|---|---|
| `/` | Landing Page |
| `/zugang` | Leitet auf das GitHub-Repo weiter (früher Bewertung und Anfrage) |
| `/freischalten?t=…` | Download und Start, nur mit gültigem Link |
| `/admin` | Anfragen lesen, freigeben, sperren, Link kopieren, CSV laden |
| `/admin/qr` | Folie mit QR-Code für den Vortrag |

## Einstellungen

Alle Werte stehen mit Erklärung in `.env.local.example`.

| Variable | Pflicht | Zweck |
|---|---|---|
| `GATE_SECRET` | ja | Signiert Links und die Admin-Sitzung. 32 Zeichen oder mehr. |
| `ADMIN_PIN` | empfohlen | Öffnet `/admin`. Leer heißt: Admin ist aus. |
| `ACCESS_MODE` | nein | `auto` (Standard) oder `manual`. |
| `BLOB_READ_WRITE_TOKEN` | auf Vercel | Kommt von selbst, wenn ein Blob Store verbunden ist. |
| `SITE_URL` | nein | Feste Adresse für Links und QR-Code. |

## Lokal starten

```bash
cd site
cp .env.local.example .env.local   # Werte eintragen
npm install
npm run dev                        # http://localhost:9200
```

`npm run dev` und `npm run build` packen vorher das Paket aus dem Repo in `src/generated/`. Anfragen landen lokal in `.data/requests/`.

Prüfen: `npm test` (Regeln, Links, Zip) und `npm run build`.

## Live auf Vercel

- **Adresse:** https://jacobilicious.vercel.app
- **Projekt:** `jacobilicious` im Team `scalableso`, Root Directory `site`.
- **Daten:** privater Blob Store `jacobilicious-requests` (Region `fra1`), mit dem Projekt verbunden.
- **Werte:** `JACOBILICIOUS_GATE_SECRET` und `JACOBILICIOUS_ADMIN_PIN` liegen in Doppler (`scalable/prd_personal`). In Vercel heißen sie `GATE_SECRET` und `ADMIN_PIN`.

Fehlt `GATE_SECRET` in Vercel, bleibt die Schranke zu: Anfragen und Downloads schlagen fehl.

### Neu deployen

```bash
cd ~/Code/jacobilicious     # Repo-Wurzel, nicht site/
vercel deploy --prod
```

Der Build braucht `skills/`, `README.md` und `install.sh` aus der Repo-Wurzel. Ein Deploy aus `site/` findet sie nicht.

### Werte von Doppler nach Vercel bringen

Das macht ein Mensch, kein Agent. `vercel` muss im Terminal gefunden werden (`command -v vercel`), sonst nimm den vollen Pfad zur CLI. Der Befehl zeigt keinen Wert an. Er liest den Wert zuerst und reicht ihn dann weiter, weil `vercel env add` nur 0,5 Sekunden auf die Eingabe wartet:

```bash
cd ~/Code/jacobilicious
for n in GATE_SECRET ADMIN_PIN; do
  v=$(secret-get JACOBILICIOUS_$n scalable prd_personal)
  printf %s "$v" | vercel env add $n production
done
unset v
vercel deploy --prod
```

## Paket ändern

Ändere Skills, `README.md` oder `install.sh` im Repo und baue neu. `scripts/pack.mjs` legt fest, was ins Paket kommt. `site/`, Tests und Git-Daten kommen nie hinein.

## Banner neu bauen

```bash
PYTHON=/pfad/zu/python assets/src/render.sh
```

Das Skript braucht Python mit `numpy` und `pillow` und Google Chrome. Es schreibt `assets/banner.png` und das Porträt der Landing Page.
