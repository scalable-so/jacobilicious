<!-- jacobilicious:start -->
## Me

<Name>, <role>. <1 sentence on the business.> Language: <language>.
<Only if voice input: I dictate. Read through transcription errors.>

## How to work with me

- Answer first, reasons after. Short sections. Tables for comparisons.
- Decide routine matters yourself. Ask when 2 readings lead to different work.
- Never <limits from the interview> without asking.

## Repos

| Repo | Path | Holds | Readers |
|---|---|---|---|
| <name> | <path> | <1 line> | <who> |

Work in the repo that owns the topic. Its `AGENTS.md` adds the repo rules.
Never copy content from a repo with fewer readers into a repo with more readers.

## Skills

- Global skill, `~/.claude/skills/`: works in every repo and holds no repo data.
- Repo skill, `<repo>/.agents/skills/` with a symlink in `.claude/skills/`:
  needs that repo's files, or the team shares it.
- A skill may start on its own by default. Set `disable-model-invocation: true`
  when a run sends, pays, publishes, deletes, or is costly.
- Archive instead of deleting: `~/.claude/skills-archive/` for global skills,
  `.agents/skills/_archive/` for repo skills.
- Build or change skills with `jacobilicious-engineer`.
<!-- jacobilicious:end -->
