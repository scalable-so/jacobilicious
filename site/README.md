# Jacobilicious Site

The landing page. It shows the benefits, and every button opens the public repo on GitHub (`REPO_URL` in `src/lib/config.ts`). There you download the package with Code, then Download ZIP.

## The old access gate

Until November 2026, the package was only available after rating the talk. This gate is switched off:

- The form at `/zugang` is removed. `/zugang` redirects to the GitHub repo (`next.config.ts`).
- `/admin` stays, so the collected requests and the CSV export remain reachable.
- Personal links at `/freischalten` keep working until they expire.

The route names `/zugang` (access) and `/freischalten` (unlock) stay German, because links already sent out point to them.

The rest of this document describes the gate as it ran.

## The protection

| Protection | Effect |
|---|---|
| Access per address | Only approved addresses open the package. Each address has 3 downloads. |
| Signed link | Valid for 7 days. It cannot be forged. |
| 1 rating per address | The first rating counts. A 2nd, higher rating changes nothing. |
| `ACCESS.md` in the package | Every copy carries the recipient's name, address, date and ID. |
| Block in `/admin` | All links of a person stop working at once. |
| `ACCESS_MODE=manual` | Jacob approves every access himself, even at 10 points. |
| No public download | The package is not stored as a file on the server. It is built on request. |

The protection fits a small circle. Anyone who knows the address of the site can request access. The site does not check whether an address belongs to the person: anyone who knows an approved address can download its package. Anyone who has the package can copy the folder. `ACCESS.md` then shows whose copy it was.

## Pages

| Address | Purpose |
|---|---|
| `/` | Landing page |
| `/zugang` | Redirects to the GitHub repo (formerly rating and request) |
| `/freischalten?t=…` | Download and start, only with a valid link |
| `/admin` | Read requests, approve, block, copy link, download CSV |
| `/admin/qr` | Slide with a QR code for the talk |

## Settings

All values are explained in `.env.local.example`.

| Variable | Required | Purpose |
|---|---|---|
| `GATE_SECRET` | yes | Signs links and the admin session. 32 characters or more. |
| `ADMIN_PIN` | recommended | Opens `/admin`. Empty means: admin is off. |
| `ACCESS_MODE` | no | `auto` (default) or `manual`. |
| `BLOB_READ_WRITE_TOKEN` | on Vercel | Comes by itself when a Blob store is connected. |
| `SITE_URL` | no | Fixed address for links and the QR code. |

## Run locally

```bash
cd site
cp .env.local.example .env.local   # fill in the values
npm install
npm run dev                        # http://localhost:9200
```

`npm run dev` and `npm run build` first pack the package from the repo into `src/generated/`. Requests land locally in `.data/requests/`.

Check: `npm test` (rules, links, zip) and `npm run build`.

## Live on Vercel

- **Address:** https://jacobilicious.vercel.app
- **Project:** `jacobilicious` in the team `scalableso`, Root Directory `site`.
- **Data:** private Blob store `jacobilicious-requests` (region `fra1`), connected to the project.
- **Values:** `JACOBILICIOUS_GATE_SECRET` and `JACOBILICIOUS_ADMIN_PIN` live in Doppler (`scalable/prd_personal`). In Vercel they are called `GATE_SECRET` and `ADMIN_PIN`.

If `GATE_SECRET` is missing in Vercel, the gate stays closed: requests and downloads fail.

### Deploy again

```bash
cd ~/Code/jacobilicious     # repo root, not site/
vercel deploy --prod
```

The build needs `skills/`, `README.md` and `install.sh` from the repo root. A deploy from `site/` does not find them.

### Bring values from Doppler to Vercel

A human does this, not an agent. The terminal must find `vercel` (`command -v vercel`); otherwise use the full path to the CLI. The command shows no value. It reads the value first and then passes it on, because `vercel env add` waits only 0.5 seconds for input:

```bash
cd ~/Code/jacobilicious
for n in GATE_SECRET ADMIN_PIN; do
  v=$(secret-get JACOBILICIOUS_$n scalable prd_personal)
  printf %s "$v" | vercel env add $n production
done
unset v
vercel deploy --prod
```

## Change the package

Change skills, `README.md` or `install.sh` in the repo and build again. `scripts/pack.mjs` decides what goes into the package. `site/`, tests and Git data never go in.

## Rebuild the banner

```bash
PYTHON=/path/to/python CHROME_PATH=/path/to/chrome assets/src/render.sh
```

The script needs Python with `numpy` and `pillow`, and Google Chrome. It writes `assets/banner.png` and the portrait of the landing page.
