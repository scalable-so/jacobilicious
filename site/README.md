# Jacobilicious Site

Die Landing Page mit Zugangsschranke. Sie zeigt den Nutzen, sammelt Feedback zum Vortrag und gibt das Paket nur an Personen aus, die freigeschaltet sind.

## Der Ablauf

1. Jacob zeigt die QR-Folie (`/admin/qr`). Der QR-Code trägt den Code vom Vortrag.
2. Die Person bewertet den Vortrag von 1 bis 10 und schreibt 1 Satz Feedback.
3. Sie trägt Vorname und E-Mail-Adresse ein.
4. Ab 8 Punkten ist ihre Adresse sofort freigegeben.
5. Bis 7 Punkte kommt sie auf die Warteliste. Jacob liest das Feedback und entscheidet in `/admin`.
6. Am Mac öffnet sie `/zugang`, wählt "Schon angefragt?" und gibt ihre Adresse ein. Dort lädt sie das Paket und sieht die 3 Schritte zum Start.

Die Seite verschickt keine Mails. Der Zugang hängt an der E-Mail-Adresse. Jacob kann den persönlichen Link in `/admin` kopieren und selbst schicken.

## Der Schutz

| Schutz | Wirkung |
|---|---|
| Code vom Vortrag | Nur wer im Raum war, kann anfragen. |
| Zugang pro Adresse | Nur freigegebene Adressen öffnen das Paket. Jede Adresse hat 3 Downloads. |
| Signierter Link | Gilt 7 Tage. Er lässt sich nicht fälschen. |
| 1 Bewertung pro Adresse | Die erste Bewertung zählt. Eine zweite, höhere Bewertung ändert nichts. |
| `ACCESS.md` im Paket | Jede Kopie trägt Name, Adresse, Datum und Kennung des Empfängers. |
| Sperren in `/admin` | Alle Links einer Person gelten sofort nicht mehr. |
| `ACCESS_MODE=manual` | Jacob gibt jeden Zugang selbst frei, auch bei 10 Punkten. |
| Kein öffentlicher Download | Das Paket liegt nicht als Datei auf dem Server. Es entsteht erst bei der Anfrage. |

Der Schutz passt zu einem kleinen Kreis. Die Seite prüft nicht, ob eine Adresse der Person gehört: Wer eine freigegebene Adresse kennt, kann deren Paket laden. Wer das Paket hat, kann den Ordner kopieren. `ACCESS.md` zeigt dann, von wem die Kopie stammt.

## Seiten

| Adresse | Zweck |
|---|---|
| `/` | Landing Page |
| `/zugang` | Bewertung und Anfrage, oder mit freigegebener Adresse zurückkommen |
| `/freischalten?t=…` | Download und Start, nur mit gültigem Link |
| `/admin` | Anfragen lesen, freigeben, sperren, Link kopieren, CSV laden |
| `/admin/qr` | Folie mit QR-Code für den Vortrag |

## Einstellungen

Alle Werte stehen mit Erklärung in `.env.local.example`.

| Variable | Pflicht | Zweck |
|---|---|---|
| `GATE_SECRET` | ja | Signiert Links und die Admin-Sitzung. 32 Zeichen oder mehr. |
| `EVENT_CODE` | empfohlen | Der Code vom Vortrag. Leer heißt: kein Code nötig. |
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

## Auf Vercel bringen

1. Lege ein Vercel-Projekt für dieses Repo an. Root Directory: `site`.
2. Aktiviere "Include files outside the root directory", damit der Build `skills/`, `README.md` und `install.sh` findet.
3. Verbinde einen privaten Blob Store mit dem Projekt.
4. Trage die Werte aus der Tabelle oben ein. Die Quelle ist Doppler.
5. Öffne `/admin`, prüfe den Modus und zeige `/admin/qr` im Vortrag.

## Paket ändern

Ändere Skills, `README.md` oder `install.sh` im Repo und baue neu. `scripts/pack.mjs` legt fest, was ins Paket kommt. `site/`, Tests und Git-Daten kommen nie hinein.

## Banner neu bauen

```bash
PYTHON=/pfad/zu/python assets/src/render.sh
```

Das Skript braucht Python mit `numpy` und `pillow` und Google Chrome. Es schreibt `assets/banner.png` und das Porträt der Landing Page.
