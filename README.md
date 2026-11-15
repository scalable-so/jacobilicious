<p align="center">
  <img src="assets/banner.png" alt="Jacobilicious: An agent setup built to scale. Finally." width="100%">
</p>

# Jacobilicious

Jacobilicious sets up Claude Code on your computer.
You type 1 command, answer a few questions, and your workspace is ready.

You need no technical knowledge. Every step is explained to you.

## What you get

- **Claude knows you.** Who you are, what your business does and what your goals are sits in 1 file. You never explain it again.
- **Every document has 1 home.** Fixed folders, each with a table of contents. You and the agent find everything without searching.
- **Nothing gets lost.** Your computer saves privately to GitHub every hour. You never need a Git command.

## How to start

1. Download the package: at the top of this page, click **Code**, then **Download ZIP**. It then sits in your Downloads folder.
2. Open Claude Code and send this prompt:

   ```text
   Install Jacobilicious on this computer.

   1. My Downloads folder holds the file jacobilicious.zip or jacobilicious-main.zip, or the unpacked folder jacobilicious or jacobilicious-main. If there are several copies, take the newest one.
   2. If it is a zip file, unpack it in Downloads. Do not overwrite any existing folder.
   3. In the unpacked folder, run: bash install.sh
   4. Show me briefly what was installed.
   5. At the end, tell me to type /jacobilicious-setup. If the command is missing, I start a new session.

   Change nothing else on my computer.
   ```

3. Type `/jacobilicious-setup`. If Claude does not know the command yet, start a new session.

It also works without the prompt: unpack the file. Open a terminal (on Windows: Git Bash) and type `bash ` (with a space). Drag the file `install.sh` into the window and press Enter.

That is all you need to know. The setup guides you through the rest.
You can pause at any time. The same command picks up where you left off.

## What you need

| What | What for |
|---|---|
| A computer | macOS, Windows or Linux. |
| Claude Code | As the desktop app or in the terminal. Not in the browser. |
| A GitHub account | It holds your private backup. The setup helps you create one. |

## The 4 skills

A skill is a guide that Claude Code loads for a task.
You only start the setup yourself. The other 3 start on their own when they are needed.

| Skill | Starts when | What it does |
|---|---|---|
| `jacobilicious-setup` | you type `/jacobilicious-setup` | Takes you in 9 steps from a bare computer to a ready workspace. |
| `jacobilicious-context` | a document or knowledge needs a place | Puts it in the right place and keeps the tables of contents current. |
| `jacobilicious-audit` | you want to know if everything works | Checks the backup and finds what makes your sessions slow. |
| `jacobilicious-engineer` | you want to turn a task into a skill | Writes new skills and rules for your agent. |

## What the setup creates

The setup suggests 3 private folders with history. Such a folder is called a repo.
3 repos, because GitHub gives access per repo: your team can read marketing, while taxes and private files stay hidden.

```
~/Repositories/
├── <company>/                Business: for the whole team
│   ├── company/              Mission, audience, goals
│   ├── product/              1 folder per offer
│   └── marketing/            1 folder per channel
├── <company>-confidential/   Confidential: only for you and the executives
│   ├── legal/                Contracts, insurance
│   ├── finance/              Taxes, bookkeeping, bank
│   └── hr/                   Roles, employment contracts
└── <firstname>-private/      Private: only for you
    ├── finance/              Taxes, insurance, bank
    ├── home/                 Housing, vehicles, contracts
    ├── health/               Medical reports, lab results
    └── growth/               Goals, learning, courses
```

This is the suggestion. You decide on names, folders and language during the setup.

Each repo also gets:

- `AGENTS.md`: the house rules the agent reads at the start of every session.
- `_INDEX.md` in every folder: the table of contents.
- `people/`: a short profile per person, so the repo works for a team later.
- `bin/`: the scripts for the backup. You never run them yourself.

## How it stays safe

- Every repo is private. The setup checks this.
- A check before every save blocks passwords and keys.
- The setup never asks for a password in the chat.
- Nothing that exists gets overwritten or deleted.
- The agent sends, pays, signs and deletes only after your yes.

## What is in this package

```
jacobilicious/
├── README.md        this file
├── install.sh       copies the skills to ~/.claude
├── brand.md         the voice of Jacobilicious in the chat
└── skills/          the 4 skills
```

`install.sh` deletes nothing. An older copy of the skills moves to the archive in `~/.claude/skills-archive/`.

## Common questions

**I have a new computer. What now?**
Install the package and type `/jacobilicious-setup join`. The setup brings your repos back from GitHub.

**Can I work with PDFs?**
Yes. The setup installs the official PDF skill from Anthropic for this.

**I already have folders and a `CLAUDE.md`. Will I lose them?**
No. The setup shows you before and after and waits for your yes.

**How do I remove it?**
Delete the 4 folders `jacobilicious-*` in `~/.claude/skills/`. Your repos and files stay.

## Please do not share

This package is your personal copy. The file `ACCESS.md` names you as the recipient.
Anyone else who wants it gets access on the page where you got it.

Set up with Jacobilicious, Founder at [scalable.so](https://scalable.so)
