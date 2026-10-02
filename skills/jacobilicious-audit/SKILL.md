---
name: jacobilicious-audit
description: "Start when the user asks to audit, check, review, or tidy the workspace or setup. Start when saving, syncing, or backup looks broken or the user doubts that files reached GitHub. Start when sessions feel slow or costly, when the user mentions a long CLAUDE.md or AGENTS.md, too many or unused skills or MCP servers, or asks which tool, CLI, or MCP server to connect or remove. Start when the user wants CLAUDE.md or AGENTS.md shortened or cleaned up."
---

# Jacobilicious audit

Find what is broken, bloated, or unused in the user's agent workspace.
Report it. Fix only what the user confirms.
Exception: index and Structure drift. Repair it with `jacobilicious-context`
and report it in 1 line.
If a repo is public, report that first. Save and push nothing in that repo
until it is private.

Before your first message, read `~/.claude/jacobilicious/brand.md` and use its
voice in chat. If the file is missing, use a plain, friendly tone.

## Scope

Read the Repos table in `~/.claude/CLAUDE.md`. Audit the global setup and
every listed repo that exists on this Mac. If the table is missing, say that
`/jacobilicious-setup` has not run and audit only the global files and the
current folder.

If the request is only about choosing or connecting 1 tool, run check 4 for
that tool only. Skip the other checks and the report file.

## Checks

### 1. Setup health, per repo

- The branch is `main` and no merge or rebase is in progress.
- No unsaved change is older than 2 hours: `git status`, `git log origin/main..HEAD`.
- `launchctl list` shows the repo's autosave job. If the log
  `~/Library/Logs/jacobilicious-<repo>-autosave.log` exists, its last line
  does not contain `failed`. A missing log passes.
- `gh repo view --json visibility -q .visibility` returns `PRIVATE`.
- `git config core.hooksPath` returns `.githooks`, and `gitleaks` is installed.
- `CLAUDE.md` imports `AGENTS.md`.
- Every link in `.claude/skills/` and in `~/.claude/skills/` resolves.
- `people/_index.md` contains the current `git config user.email`, and the
  profile it names exists and holds no `<...>` placeholder.
- `bin/context-check` reports nothing: every file has an index row, every
  row has a file, and the top-level folders match the Structure table.

### 2. Always-loaded text

Count characters in `~/.claude/CLAUDE.md`, each repo's `AGENTS.md`, and the
descriptions of skills without `disable-model-invocation: true`. Estimate
tokens as characters divided by 4. Report 1 number per repo: global file,
that repo's `AGENTS.md`, and the descriptions. Do not add repos together.

Flag:

- An instruction file over 200 lines.
- Lines that repeat another instruction file or a skill. Do not flag a rule
  that comes from the template
  `~/.claude/skills/jacobilicious-setup/assets/repo/AGENTS.md`, also when translated.
- Rules that name a file, folder, tool, or skill that no longer exists.
- Rules that contradict each other.
- Content that only 1 task needs. Propose moving it into a skill.

### 3. Skills

List the skills in `~/.claude/skills/`, in each repo's `.agents/skills/`, and
from plugins. Count uses in `~/.claude/projects/**/*.jsonl` with the patterns
`"name":"Skill","input":{"skill":"<name>"` and `<command-name>/<name></command-name>`.
State the date range the transcripts cover.

Flag:

- 0 uses, when the range covers 30 days or more. Propose archiving.
  Skip `jacobilicious-*` skills and plugin skills.
- 2 skills whose descriptions start on the same request.
- A skill that sends, pays, publishes, or deletes without asking for a yes
  first and lacks `disable-model-invocation: true`.
- The same skill name in 2 places.
- A global skill that reads 1 repo's files, or a repo skill that reads none.
- A self-built global skill that is a real folder in `~/.claude/skills/`
  while a backup repo exists. Propose moving it to `.agents/global-skills/`
  and linking it. Skip `jacobilicious-*` skills.

### 4. MCP servers and CLIs

List the servers with `claude mcp list`. Count uses with the pattern
`"name":"mcp__<server>__`.

Flag:

- A server with 0 uses, when the range covers 30 days or more. Propose removing it.
- A used server where a maintained official CLI covers the same actions.
  Confirm the CLI exists before you propose it. If you cannot confirm it, say so.
- A tool on the `Daily tools` line of `~/.claude/CLAUDE.md` that has no connection yet.
  Say whether an official CLI or MCP server exists and which costs less context.

## Report

Show 1 table, worst first: Finding, Where, Effect (risk or tokens saved),
Proposed fix. Below it, give the always-loaded tokens now and after all fixes.
If an earlier report exists in `~/.claude/jacobilicious/audits/`, start with
what changed since then. Ask which fixes to apply: all, some by number, or none.

## Fix

- Apply only confirmed fixes. Write the new wording of an instruction with
  `jacobilicious-engineer`. Show before and after for every instruction edit.
- Archive instead of deleting. Move a skill to the `_archive/` folder next
  to it (`.agents/skills/_archive/` or `.agents/global-skills/_archive/`)
  and remove its symlink. A skill that is a real folder in
  `~/.claude/skills/` goes to `~/.claude/skills-archive/`.
- For a public repo, run `gh repo edit <owner>/<name> --visibility private
  --accept-visibility-change-consequences`, then check again.
- Remove an MCP server with `claude mcp remove <name>` only after the user
  confirmed that exact server.
- Connect a tool only after the user's yes, and only when you found its
  official MCP server address or CLI on the vendor's own website in this
  session. Give the link. If you cannot confirm it, say so and connect
  nothing. After connecting, check with `claude mcp list`. A browser login
  is the user's step: say what will open.
- For a failed health check, run the repo's `bin/setup`, then check again.
- Save each changed repo with `bin/save "audit: <what>"`.
- Write the report to `~/.claude/jacobilicious/audits/YYYY-MM-DD.md`.

## Done when

Every finding is fixed, declined, or left open with a reason. Each applied
fix passed its check again or is listed as open with the error text. The
report file is written.
