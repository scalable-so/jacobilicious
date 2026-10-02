<!-- jacobilicious:start -->
## Me

<Name>, <role>. <1 sentence on the business.> Language: <language>.
<Only if voice input: I dictate. Read through transcription errors.>
Daily tools: <email, calendar, bookkeeping, documents>.

## How to work with me

- Answer first, reasons after. Short sections. Tables for comparisons.
- Tone: <short and factual / warm and detailed>.
- Decide routine matters yourself. Ask when 2 readings lead to different work.
- Never <limits from the interview> without asking.

## Repos

| Repo | Path | Holds | Readers |
|---|---|---|---|
| <name> | <path> | <1 line> | <who> |

Work in the repo that owns the topic. Its `AGENTS.md` adds the repo rules.
Never copy content from a repo with fewer readers into a repo with more readers.

## Skills

- Global skill you build: works in every repo and holds no repo data. It lives in
  `<backup-repo-path>/.agents/global-skills/<name>/`, and
  `~/.claude/skills/<name>` is a symlink to it.
- Repo skill, `<repo>/.agents/skills/` with a symlink in `.claude/skills/`:
  needs that repo's files, or the team shares it.
- A skill may start on its own by default. Set `disable-model-invocation: true`
  when a run sends, pays, publishes, or deletes without asking for a yes
  first, or is costly.
- Archive instead of deleting: move a skill to the `_archive/` folder next
  to it and remove its symlink. A real folder in `~/.claude/skills/` goes to
  `~/.claude/skills-archive/`.
- Use `jacobilicious-engineer` for every text an agent reads as instructions:
  skills and their files, rules, prompts, commands, subagent briefs, tests.
<!-- jacobilicious:end -->
