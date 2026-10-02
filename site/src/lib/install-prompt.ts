/** The prompt a person pastes into Claude Code. The package README carries the same text; a test keeps them equal. */
export const INSTALL_PROMPT = `Installiere Jacobilicious auf diesem Mac.

1. In meinem Ordner Downloads liegt die Datei jacobilicious.zip oder schon der entpackte Ordner jacobilicious. Gibt es mehrere Kopien, nimm die zuletzt geladene.
2. Ist es eine zip-Datei, entpacke sie in Downloads. Überschreibe dabei keinen vorhandenen Ordner.
3. Führe im entpackten Ordner aus: bash install.sh
4. Zeig mir kurz, was installiert wurde.
5. Sag mir zum Schluss, dass ich /jacobilicious-setup tippen soll. Fehlt der Befehl, starte ich eine neue Sitzung.

Ändere sonst nichts auf meinem Mac.`;
