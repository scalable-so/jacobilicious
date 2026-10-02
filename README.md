<p align="center">
  <img src="assets/banner.png" alt="Jacobilicious: An agent setup built to scale. Finally." width="100%">
</p>

# Jacobilicious

Jacobilicious richtet Claude Code auf deinem Mac ein.
Du tippst 1 Befehl, beantwortest ein paar Fragen, und dein Arbeitsplatz steht.

Du brauchst kein technisches Wissen. Jeder Schritt wird dir erklärt.

## Was du danach hast

- **Claude kennt dich.** Wer du bist, was dein Business macht und was deine Ziele sind, steht einmal in einer Datei. Du erklärst es nie wieder.
- **Jedes Dokument hat 1 Zuhause.** Feste Ordner, jeder mit Inhaltsverzeichnis. Du und der Agent finden alles ohne Suchen.
- **Nichts geht verloren.** Dein Mac sichert jede Stunde privat auf GitHub. Du brauchst nie einen Git-Befehl.

## So startest du

1. Lade das Paket. Es liegt danach in deinem Ordner Downloads.
2. Öffne Claude Code und schick diesen Prompt ab:

   ```text
   Installiere Jacobilicious auf diesem Mac.

   1. In meinem Ordner Downloads liegt die Datei jacobilicious.zip oder schon der entpackte Ordner jacobilicious. Gibt es mehrere Kopien, nimm die zuletzt geladene.
   2. Ist es eine zip-Datei, entpacke sie in Downloads. Überschreibe dabei keinen vorhandenen Ordner.
   3. Führe im entpackten Ordner aus: bash install.sh
   4. Zeig mir kurz, was installiert wurde.
   5. Sag mir zum Schluss, dass ich /jacobilicious-setup tippen soll. Fehlt der Befehl, starte ich eine neue Sitzung.

   Ändere sonst nichts auf meinem Mac.
   ```

3. Tippe `/jacobilicious-setup`. Kennt Claude den Befehl noch nicht, starte eine neue Sitzung.

Ohne Prompt geht es auch: Entpacke die Datei per Doppelklick. Öffne die App "Terminal" und tippe `bash ` (mit Leerzeichen). Ziehe die Datei `install.sh` ins Fenster und drücke Enter.

Mehr musst du nicht wissen. Das Setup führt dich durch den Rest.
Du kannst jederzeit pausieren. Derselbe Befehl macht an der gleichen Stelle weiter.

## Was du brauchst

| Was | Wozu |
|---|---|
| Einen Mac | Diese Version läuft nur auf macOS. |
| Claude Code | Als Desktop-App oder im Terminal. Nicht im Browser. |
| Ein GitHub-Konto | Dort liegt deine private Sicherung. Das Setup hilft dir beim Anlegen. |

## Die 4 Skills

Ein Skill ist eine Anleitung, die Claude Code für eine Aufgabe lädt.
Nur das Setup startest du selbst. Die anderen 3 starten von allein, wenn sie gebraucht werden.

| Skill | Startet, wenn | Was er tut |
|---|---|---|
| `jacobilicious-setup` | du `/jacobilicious-setup` tippst | Führt dich in 9 Schritten vom leeren Mac zum fertigen Arbeitsplatz. |
| `jacobilicious-context` | ein Dokument oder Wissen einen Platz braucht | Legt es an den richtigen Ort und hält die Inhaltsverzeichnisse aktuell. |
| `jacobilicious-audit` | du wissen willst, ob alles läuft | Prüft die Sicherung und findet, was deine Sitzungen langsam macht. |
| `jacobilicious-engineer` | du eine Aufgabe zum Skill machen willst | Schreibt neue Skills und Regeln für deinen Agenten. |

## Was das Setup anlegt

Das Setup schlägt 3 private Ordner mit Verlauf vor. So ein Ordner heißt Repo.
3 Repos, weil GitHub Zugriff pro Repo vergibt: Dein Team kann Marketing lesen, Steuern und Privates bleiben verborgen.

```
~/Repositories/
├── <firma>/                  Business: für das ganze Team
│   ├── company/              Mission, Zielgruppe, Ziele
│   ├── product/              1 Ordner pro Angebot
│   └── marketing/            1 Ordner pro Kanal
├── <firma>-confidential/     Vertraulich: nur für dich und die Geschäftsführung
│   ├── legal/                Verträge, Versicherungen
│   ├── finance/              Steuern, Buchhaltung, Bank
│   └── hr/                   Rollen, Arbeitsverträge
└── <vorname>-private/        Privat: nur für dich
    ├── finance/              Steuern, Versicherungen, Bank
    ├── home/                 Wohnen, Fahrzeuge, Verträge
    ├── health/               Befunde, Laborwerte
    └── growth/               Ziele, Lernen, Kurse
```

Das ist der Vorschlag. Du entscheidest im Setup über Namen, Ordner und Sprache.

Jedes Repo bekommt außerdem:

- `AGENTS.md`: die Hausregeln, die der Agent zu Beginn jeder Sitzung liest.
- `_INDEX.md` in jedem Ordner: das Inhaltsverzeichnis.
- `people/`: ein kurzes Profil pro Person, damit das Repo später für ein Team funktioniert.
- `bin/`: die Skripte für die Sicherung. Du rufst sie nie selbst auf.

## So bleibt es sicher

- Jedes Repo ist privat. Das Setup prüft das.
- Eine Prüfung vor jeder Sicherung blockiert Passwörter und Schlüssel.
- Das Setup fragt nie nach einem Passwort im Chat.
- Nichts Bestehendes wird überschrieben oder gelöscht.
- Senden, bezahlen, unterschreiben und löschen macht der Agent nur nach deinem Ja.

## Was in diesem Paket liegt

```
jacobilicious/
├── README.md        diese Datei
├── install.sh       kopiert die Skills nach ~/.claude
├── brand.md         die Stimme von Jacobilicious im Chat
└── skills/          die 4 Skills
```

`install.sh` löscht nichts. Eine ältere Kopie der Skills wandert ins Archiv unter `~/.claude/skills-archive/`.

## Häufige Fragen

**Ich habe einen neuen Mac. Was jetzt?**
Installiere das Paket und tippe `/jacobilicious-setup join`. Das Setup holt deine Repos von GitHub zurück.

**Kann ich PDFs bearbeiten?**
Ja. Das Setup installiert dafür den offiziellen PDF-Skill von Anthropic.

**Ich habe schon Ordner und eine `CLAUDE.md`. Gehen die verloren?**
Nein. Das Setup zeigt dir vorher und nachher und wartet auf dein Ja.

**Wie werde ich es wieder los?**
Lösche die 4 Ordner `jacobilicious-*` in `~/.claude/skills/`. Deine Repos und Dateien bleiben.

## Bitte nicht weitergeben

Dieses Paket ist deine persönliche Kopie. Die Datei `ACCESS.md` nennt dich als Empfänger.
Wer es auch haben will, holt sich den Zugang auf der Seite, von der du es hast.

Set up with Jacobilicious, Founder at [scalable.so](https://scalable.so)
