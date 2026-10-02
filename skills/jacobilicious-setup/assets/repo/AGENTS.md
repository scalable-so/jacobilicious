# <repo-name>

<1 or 2 sentences: what this repo holds, who reads it, what does not belong
here and which repo holds that instead.>

This file is the only instruction source. `CLAUDE.md` imports it.

## Who works here

Each person has a short profile in `people/<firstname>.md`: name, role here,
email, GitHub name. At session start, run `git config user.email` and look
the address up in `people/_index.md` to know who is working. If the address
is missing, ask the user to run `bin/setup`. How to work with the person is
in their global `~/.claude/CLAUDE.md`.

## Structure

| Folder | Holds |
|---|---|
| <folders from the plan> | <1 line each> |
| `people/` | Profiles and `_index.md` (email to profile) |
| `.agents/skills/` | Repo skills. `.claude/skills/` holds symlinks |
| `skill-data/` | Working data of skills. Not knowledge |

## Find

1. Pick the folder from the Structure table.
2. Read its `_INDEX.md` before opening files.
3. Open only files whose summary fits the task.
4. Search file contents only when the index has no match.

## Keep or drop

Decide before you write a file:

- Drop: scratch work, exports, drafts in progress, one-off answers, anything
  nobody needs after this session. Use `/tmp/`, never the repo.
- Keep as a knowledge file: a decision and its reason, a rule or process to
  repeat, master data, a duty, a finished result that later work builds on.
  A deadline or amount stays in its document and its index row. A process an
  agent should run becomes a skill. A correction the user gave twice becomes
  a rule, see Improve.
- Keep as a project folder: work that runs over more than 1 session or
  produces 3 or more files. Create `<topic>-<year>/` with an `_INDEX.md` and
  1 status file (goal, decisions, open points).

When something to keep comes up, offer to save it without being asked.
Use the `jacobilicious-context` skill for every keep.

## File

- A new document goes into its folder, named `Topic_Detail_YYYY-MM-DD.ext`
  with the document's own date.
- Knowledge files follow `.agents/conventions/context-files.md` and are named
  `topic-detail.md`: lowercase, hyphens, no date.
- Each piece of knowledge has 1 home. Keep no second copy.
- If a document fits no folder, ask. Create a top-level folder only after a yes.

## Keep the map current

- Show before you write: for a knowledge file, show the full text (new file)
  or before and after (change) in chat. Offer 3 options: save, change, save
  without asking for the rest of this session.
- Update without asking, and report in 1 line: the row in the folder's
  `_INDEX.md`, the `updated` date in frontmatter, and the Structure table
  when a top-level folder is added, renamed, or moved.
- Change any other part of this file only after a yes.
- At session start, `bin/context-check` lists files without an index row and
  folders missing from the Structure table. Repair what it lists first.

## Rules

1. Only `main`, no branches. `bin/autosave` saves every hour.
   When the user says "save", run `bin/save "<what changed>"`.
2. Never force-push or rewrite history. The history is the backup.
3. No secrets in the repo. The commit check blocks keys.
4. Never <limits from the interview> without asking. Move files to
   `_archive/` instead of deleting them.
5. Numbers, dates, and deadlines come from documents, never from memory.
   Name the source.

## Improve

When a correction repeats, propose: "Proposed AGENTS.md rule: <rule>.
Reason: <what happened>." Change this file only after a yes.
