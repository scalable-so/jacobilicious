/** The prompt a person pastes into Claude Code. The package README carries the same text; a test keeps them equal. */
export const INSTALL_PROMPT = `Install Jacobilicious on this computer.

1. My Downloads folder holds the file jacobilicious.zip or jacobilicious-main.zip, or the unpacked folder jacobilicious or jacobilicious-main. If there are several copies, take the newest one.
2. If it is a zip file, unpack it in Downloads. Do not overwrite any existing folder.
3. In the unpacked folder, run: bash install.sh
4. Show me briefly what was installed.
5. At the end, tell me to type /jacobilicious-setup. If the command is missing, I start a new session.

Change nothing else on my computer.`;
