---
name: jacobilicious-context
description: "Start when the user wants a document, scan, photo, or Downloads file put away or asks where something belongs. Start when a decision, rule, process, deadline, or finished result comes up that someone will need after this session. Start when work grows past 1 session or 3 files. Start when a file or folder was added, moved, or renamed, when `bin/context-check` reports drift, or when the user says file this, save this as knowledge, remember this, or update the index."
argument-hint: "[<path> | empty = look through ~/Downloads]"
---

# Jacobilicious context

Keep every repo easy to navigate. Each lasting document and fact has 1 home,
a clear name, an index row, and current metadata. The instruction files
describe the structure as it really is.

Before your first message, read `~/.claude/jacobilicious/brand.md` and use its
voice in chat. If the file is missing, use a plain, friendly tone.

## First decision: keep or drop

Apply the "Keep or drop" section of the repo's `AGENTS.md`. If the repo has
none, keep only what someone will need after this session.

If the item is a drop, say so in 1 line and stop. Scratch work goes to `/tmp/`.

## What you may change

| Change | How |
|---|---|
| Index rows, frontmatter fields, the Structure table in `AGENTS.md`, the Repos table in `~/.claude/CLAUDE.md` | Change at once. Report in 1 line. |
| A knowledge file, new or changed | Show the full text (new) or before and after (change). Offer 3 options: save, change, save without asking for the rest of this session. |
| Moving or renaming documents | Show the plan as 1 table. Move after the user's go. |
| Any other part of `AGENTS.md` or `CLAUDE.md` | Only after a yes. Use `jacobilicious-engineer` for the wording. |

Never delete or overwrite a file. If the target file exists, compare both.
Then add a suffix such as `_signed`, or report a duplicate and leave the new file.

Content from a repo with fewer readers never goes into a repo with more readers.

## Jobs

Pick the job that fits. A request can need more than 1.

### File a document

1. Get the item. If a path is given, use it. If nothing is given, list the
   20 newest files in `~/Downloads` and ask which.
2. Read it. Use the PDF skill when available, else `pdftotext -l 3 -layout`.
   Empty text means a scan: run `ocrmypdf --skip-text` with the document's
   languages so the file stays searchable. Read images directly.
   Pull out: sender, addressee, document type, document date, reference
   number, amount, deadline. If a field is unreadable, say so and leave it out.
3. Route it. The addressee and topic decide the repo, using the Repos table
   in `~/.claude/CLAUDE.md`. The Structure table in that repo's `AGENTS.md`
   decides the folder.
   - If no folder fits, say so and leave the file where it is.
   - If 2 folders fit, ask with those 2 plus "elsewhere". Say which you
     would pick and why.
4. Name it. Read the sibling files and follow their pattern. Default:
   `Topic_Detail_YYYY-MM-DD.ext`, the document's own date, ASCII, no spaces.
5. Show the plan table: File, Target, New name. Move after the go.
6. Add the index row. If the document holds a lasting fact (a deadline, a
   rate, a decision, a duty), also do "Save knowledge".

Give no legal or tax judgment. Say what the document states and its deadline.

### Save knowledge

1. Find the home: the folder that owns the topic. Check its `_INDEX.md` for
   an existing file on the same topic. Extend that file instead of writing
   a second one.
2. Write the file per `.agents/conventions/context-files.md`. It states the
   rule or decision and its reason, and links the evidence instead of copying it.
3. Show it with the 3 options. Write after the user's choice.
4. Add or update the index row.

### Start a project folder

Use it when work runs over more than 1 session or produces 3 or more files.

1. Create `<topic>-<year>/` in the folder that owns the topic.
2. Add an `_INDEX.md` and 1 status file: goal, decisions, open points.
   Show the status file with the 3 options.
3. Move the project's existing files in, using the plan table.
4. At the end of each later work session on the project, update the status file.

### Repair the map

Use it when `bin/context-check` reports drift, or after files or folders
were added, moved, or renamed by hand.

- A file without an index row: read it and add the row with a 1-sentence summary.
- A knowledge file without frontmatter: add it.
- An index row whose file is gone: look for the file under its new path and
  fix the row. If the file no longer exists, remove the row and report it.
- A top-level folder missing from the Structure table: add its row.
  If the repo then has more than 7 top-level folders, report it and propose a merge.
- A repo missing from the Repos table: add its row.

Run `bin/context-check` again. It must report nothing.

## Finish

1. Save each changed repo with `bin/save "context: <what> in <where>"`.
2. Report in this order: what was filed or written and where, deadlines
   with date and needed action, map changes in 1 line, open items.

## Done when

Every item is filed or written at a path the user has seen, dropped with a
reason, or left in place with a reason. Each index matches its folder, each
changed repo is saved, and every deadline found is named once.
