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
- Number your questions. Give 2 or 3 options and recommend 1.
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
   the first open step. Update this file after every finished step with the
   user's answers and the step status.

## Steps

Follow this order. Each step needs the result of the one before.

### 1. Welcome

Tell the user what they will have at the end, name the 8 steps that follow,
and say that the setup can pause and resume at any point.

Why: A person who knows the route follows it with less doubt.

### 2. Inspect the Mac

Check: `~/.claude/CLAUDE.md`, an existing repositories folder, `brew`, `git`, `gh`,
`gitleaks`, `gh auth status`, and whether a PDF skill is available in this session.
Report what exists and what is missing in 1 short list.

Why: Nothing that exists gets overwritten, and the user is not asked what the
Mac can answer.

### 3. Interview

Ask only what step 2 did not answer. Ask 1 topic per message.

1. Language for chat and for generated files.
2. Name, role, and how the user works (typing or voice input).
3. The business: what it sells and to whom. How many legal companies, and their names.
4. Team: solo or team. Who needs access to what.
5. The 3 goals for the next 90 days that this workspace should support.
6. Tools used daily: email, calendar, bookkeeping, documents.
7. Limits: what the agent must never do without asking.
   Default: send, pay, sign, delete.

Then repeat the answers in 5 to 8 lines and get a confirmation.

Why: The answers are stored once. Every later session starts with the agent
knowing who the user is and what the business does, so the user never
explains it again.

### 4. Plan the repos and folders

Read `references/blueprints.md`.

- Recommend 3 repos: business, confidential, private. The user may choose 2 or 1.
- Default root folder: `~/Repositories`.
- Propose names and folders. Show the full tree and get a confirmation.

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
`gitleaks` stops a password from being saved by mistake. The other 3 tools
make scans searchable.

### 6. Create the repos

Create the business repo first and finish all substeps, including the checks.
Then create the others the same way. An error then shows up once, not 3 times.

1. Create the folder and run `git init -b main`.
2. Copy `assets/repo/` into it, including hidden files and folders.
3. Fill `AGENTS.md` from its template in the user's language.
4. Create each folder from the plan with an `_INDEX.md`.
5. Write the user's profile to `people/<name>.md` from `people/_template.md`
   and add the row to `people/_index.md`.
6. Write 1 start context file from the interview, following
   `.agents/conventions/context-files.md`: the company file in the business
   repo, the master-data file in the confidential and private repos.
7. Write a short `README.md` for humans: what the repo holds, how a new
   person joins, how saving works.
8. Run `git config core.hooksPath .githooks`, then make the first commit.
   The secret check must be active before anything is committed.
9. Run `gh repo create <owner>/<name> --private --source . --push`.
10. Run `bin/setup`. It links skills and loads the hourly autosave.
    The autosave needs the GitHub copy, so this comes after substep 9.
11. Check:
    - `gh repo view --json visibility` returns `PRIVATE`.
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

Why profiles: Each person's preferences live in 1 file, so the same repo works
for a whole team later.

Why autosave: The Mac saves to GitHub every hour by itself. The user never
needs a git command, and every hour is a point to go back to.

Why the checks: They prove that saving works today, not on the day a file is lost.

### 7. Write the global block

Fill `assets/global-claude.md` and place it in `~/.claude/CLAUDE.md` between
its 2 marker lines. If the file exists, show before and after first and leave
all text outside the markers unchanged. If the markers exist, replace only
what is between them.

Why: This file applies in every folder on this Mac. It tells the agent who
the user is and which repo holds what, so the agent picks the right repo by itself.

### 8. PDF skill

If no PDF skill is available in this session, run
`claude plugin marketplace add anthropics/skills` and
`claude plugin install document-skills@anthropic-agent-skills`.
If a command fails, show the error and continue. PDF work is optional for setup.

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
  "Who am I, and where does a new contract go?"
- Open items, if any.

## Join mode

Use it when the argument is `join <github-repo>` or the user says the repo
already exists. Run steps 1, 2, and 5. Then clone the repo into the root
folder with `gh repo clone`, run `bin/setup`, create the user's profile, and
run steps 7 to 9. Ask only the interview questions the repo does not answer.

## Rules

- Never overwrite or delete an existing file or folder. If a target name is
  taken, ask for another name.
- Every repo is private.
- Write only facts the user gave. Leave a field out instead of guessing.
- No secret goes into any file.
- When a step fails, show the error text, say in 1 sentence what it means,
  and give the fix.

## Done when

Every confirmed repo exists locally and on GitHub as private, all checks of
step 6 passed for each, the global block is in place, and the user has seen
the final report.
