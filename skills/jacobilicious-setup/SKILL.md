---
name: jacobilicious-setup
description: "Start only when the user types /jacobilicious-setup: to set up this Mac for the first time, to resume an unfinished setup, or to join a repo that already exists."
disable-model-invocation: true
argument-hint: "[empty = start or resume | join <github-repo>]"
---

# Jacobilicious setup

Take a business owner from a bare Mac to a working agent workspace.
The result: Claude Code knows who the user is, every document has 1 home,
and everything saves to GitHub without the user touching git.

Before your first message, read `~/.claude/jacobilicious/brand.md` and use its
voice in chat. If the file is missing, use a plain, friendly tone.

## The user

- Assume no technical knowledge. Explain a new term in half a sentence.
  Example: a repo is a folder with full history, saved on GitHub.
- Send 1 step per message.
  A step that asks nothing continues without waiting for a reply.
- Number your questions. For a decision, give 2 or 3 options and recommend 1.
  Ask a question of fact plainly, without options.
- Never ask for a password or token in chat.

## Explain every step

The user should understand the setup, not only receive it. Before each step,
say in 2 to 4 short sentences:

1. What happens now.
2. Why it is built this way.
3. What the user gains from it.

Take the reason from the "Why" line of the step. Use everyday words. 1 everyday
comparison per step is fine. Give every recommendation with its reason.
State only benefits named in this file. Do not add numbers or promises.

## Before you start

1. Run `uname`. If it is not `Darwin`, stop: this version supports macOS only.
2. Check that you can write to the home folder. If you cannot, stop and tell
   the user to run Claude Code as the desktop app or in the terminal, not in the web.
3. Read `~/.claude/jacobilicious/setup-state.md` if it exists and continue at
   the first open step. Update this file after every answer and every finished
   substep. It holds the answers so far, what step 2 found, the confirmed
   plan with the full tree, the finished substeps, and the next step.

If the user wants to stop, save the state and say that typing
`/jacobilicious-setup` again continues at the same point.

## Steps

Follow this order. Each step needs the result of the one before.

### 1. Welcome

First ask which language the user wants for chat and for generated files.
Use the language the user wrote in until you have the answer. If the user
typed only the command, ask in English.

Then tell the user what they will have at the end, name the 8 steps that
follow, and say that the setup can pause and resume at any point.

Why: A person who knows the route follows it with less doubt.

### 2. Inspect the Mac

Check:

- `~/.claude/CLAUDE.md` and folders such as `~/Repositories`, `~/Code`, or
  `~/Projects` that already hold repos.
- `brew`, `git`, `gh`, `gitleaks` with `command -v`. `poppler`, `tesseract`,
  `tesseract-lang`, `ocrmypdf` with `brew list <name>`.
- `gh auth status`.
- Whether the skill list of this session holds a skill named `pdf`.

Report what exists and what is missing in 1 short list.

Why: Nothing that exists gets overwritten, and the user is not asked what the
Mac can answer.

### 3. Interview

Ask only what step 2 did not answer. Ask 1 topic per message. Ask a question
of fact plainly, without options. If step 2 answered part of a question, say
what you found and ask only for the rest.

1. Name, role, email address, and how the user works (typing or voice input).
2. The business: what it sells and to whom. The names of its products or
   offers. How many legal companies, and their names.
3. Marketing channels in use.
4. Team: solo or team. Who needs access to what.
5. The 3 goals for the next 90 days that this workspace should support.
6. Tools used daily: email, calendar, bookkeeping, documents.
7. Tone: short and factual, or warm and detailed. Give no recommendation.
8. Limits: what the agent must never do without asking.
   Default: send, pay, sign, delete.

Then repeat the answers in 5 to 8 lines and get a confirmation.

Why: The answers are stored once. Every later session starts with the agent
knowing who the user is and what the business does, so the user never
explains it again.

### 4. Plan the repos and folders

Read `references/blueprints.md`.

- Recommend 3 repos: business, confidential, private. The user may choose 2 or 1.
- Default root folder: `~/Repositories`.
- Repo names are lowercase with hyphens: `<company>`, `<company>-confidential`,
  `<firstname>-private`.
  With more than 1 company, use the company that runs the business.
- Propose names and folders. Show the full tree and how it serves the user's
  3 goals. Get a confirmation.

Why 3 repos: GitHub gives access per repo, not per folder. Separate repos are
the only way to let a team read marketing while tax and private files stay hidden.

Why few fixed folders: Each document has 1 home. People and agents find it
without searching, and the agent reads 1 short list instead of opening every file.

### 5. Install tools and log in to GitHub

Install what is missing with `brew install`: `git`, `gh`, `gitleaks`, `poppler`,
`tesseract`, `tesseract-lang`, `ocrmypdf`.

Some steps need a password or a browser login: installing Homebrew, creating a
GitHub account, `gh auth login`. The user runs these in the Terminal app.
Give the exact command, say what will appear, wait, then verify the result
yourself, for example with `gh auth status`.

Set `git config --global user.name` and `user.email` from the interview if unset.
Then ask whether the repos belong to the user's own GitHub account or to an
organization. Default: own account.

Why: git remembers every version of every file, so nothing is ever lost.
GitHub keeps a private copy away from the Mac: a backup, and later the way to
share with a team. `gh` lets the agent do the GitHub work for the user.
`gitleaks` stops a password from being saved by mistake. The other 4 tools
make scans searchable.

### 6. Create the repos

Create the business repo first and finish all substeps, including the checks.
Then create the others the same way. An error then shows up once, not 3 times.

1. Create the folder and run `git init -b main`.
2. Copy `assets/repo/` into it, including hidden files and folders.
3. Fill `AGENTS.md` from its template. Keep headings, field names, and
   `type` and `status` values in English, because scripts read them. Leave
   the copied files under `.agents/` and `bin/` as they are. Write folder
   names, file names, and all other text in the user's language, including
   the word for "save" in rule 1.
4. Create each folder from the plan with an `_INDEX.md`. A subfolder also
   gets a row in its parent's `_INDEX.md`.
5. Write the user's short profile to `people/<firstname>.md` (lowercase, ASCII)
   from `people/_template.md`
   and add the row to `people/_index.md`.
6. Write 1 start context file from the interview, following
   `.agents/conventions/context-files.md`: the company file with the 3 goals
   in the business repo, the master-data file in the confidential and
   private repos.
   Keep finance, legal, and HR facts and goals out of the business repo.
   They go into the master-data file of the confidential repo.
7. Write a short `README.md` for humans: what the repo holds, how a new
   person joins, how saving works.
8. In the private repo only, or in the repo with the fewest readers if
   there is no private repo: create `.agents/global-skills/README.md` with
   the line "Global skills of this Mac. `~/.claude/skills/` holds symlinks
   to them." This repo is now the backup repo.
9. Run `git config core.hooksPath .githooks`, then make the first commit.
   The secret check must be active before anything is committed.
10. Run `gh repo create <owner>/<name> --private --source . --push`.
11. Run `bin/setup`. It links skills and loads the hourly autosave.
    The autosave needs the GitHub copy, so this comes after substep 10.
12. Check:
    - `gh repo view --json visibility -q .visibility` returns `PRIVATE`.
    - `bin/save "setup check"` ends without error and `git status` is clean.
    - `launchctl list` shows the repo's autosave job.
    - `git config core.hooksPath` returns `.githooks`.
    - `bin/context-check` reports nothing.

    Fix what fails and check again before the next repo.

Why `AGENTS.md`: These are the house rules the agent reads at the start of
every session. They are short on purpose, because the agent pays for every
line in every session.

Why indexes: An index is a table of contents per folder. The agent reads it
first and opens only the files it needs. That is faster and costs less.

Why profiles: The repo knows who works in it, so it works for a whole team
later. How each person likes to work stays in 1 place on that person's Mac.

Why autosave: The Mac saves to GitHub every hour by itself. The user never
needs a git command, and every hour is a point to go back to.

Why the checks: They prove that saving works today, not on the day a file is lost.

Why the backup repo: Skills that work in every repo and the global file
live outside all repos. Kept in the private repo, they are saved every hour
and come back on a new Mac.

### 7. Write the global block

Fill `assets/global-claude.md` and place it in `~/.claude/CLAUDE.md` between
its 2 marker lines. If the file exists, show before and after, wait for a
yes, and leave all text outside the markers unchanged. If the markers exist,
replace only what is between them.
Then run `bin/save` in the backup repo. It stores a copy of this file.

Why: This file applies in every folder on this Mac. It tells the agent who
the user is and which repo holds what, so the agent picks the right repo by itself.

### 8. PDF skill

If no PDF skill is available in this session, run
`claude plugin marketplace add anthropics/skills` and
`claude plugin install document-skills@anthropic-agent-skills`.
If a command fails, show the error and continue. PDF work is optional for setup.
The skill shows up only in a new session. List it as an open item to check.

Why: Most business documents arrive as PDF. With this skill the agent reads,
fills, and merges them.

### 9. Final report

Tell the user:

- What exists, with local paths and GitHub links.
- How saving works: it happens every hour, and "save" saves now.
- What the other skills do and that they start on their own:
  `jacobilicious-context` puts documents and knowledge away and keeps the
  indexes current, `jacobilicious-engineer` builds skills,
  `jacobilicious-audit` checks the setup.
- The acceptance test: open the business repo in a new session and ask
  "Who am I, and where does a new contract go?" The right answer names the
  user and the contract folder in the repo that holds contracts.
- Open items, if any.

Why: The user sees proof that it works and knows what to do next.

## Join mode

Use it when the argument is `join <github-repo>`, or the user says the repos
already exist, for example on a new Mac.

1. Run steps 1, 2, and 5. In step 1, name the join steps below instead of
   the 8 setup steps. Leave git name and email for substep 4.
2. Find the repos. Use the argument, or run `gh repo list`, show the list,
   and ask which repos to bring back. Root folder: `~/Repositories` unless
   the user names another.
3. Clone each repo with `gh repo clone`.
4. If git name or email is unset, take them from the user's profile in
   `people/` when its GitHub name matches the `gh` login. If not, ask.
5. Run `bin/setup` in each repo, then the 5 checks of step 6.
6. If `people/_index.md` lacks the user's email, write the short profile.
   Ask only for what is missing.
7. Run steps 7 to 9. If `bin/setup` restored `~/.claude/CLAUDE.md`, show the
   block and change only repo paths that do not exist.

## Rules

- Never overwrite or delete an existing file or folder. If a target name is
  taken, ask for another name.
- Every repo is private.
- Write only facts the user gave. Leave a field out instead of guessing.
- No secret goes into any file.
- While setup runs, start no other jacobilicious skill. Setup writes the
  files of steps 6 and 7 itself.
- When a step fails, show the error text, say in 1 sentence what it means,
  and give the fix.

## Done when

Every confirmed repo exists locally and on GitHub as private, all checks of
step 6 passed for each, the global block is in place, and the user has seen
the final report.
