---
name: jacobilicious-ai-native
description: "Start when the user asks how AI-native their setup or repos are, wants a score, grade, or maturity check of their agent setup, asks how far they are from a fully AI-native way of working, or wants to compare their setup with the target. Not for fixing what is broken, slow, or unused in the workspace: `jacobilicious-audit` does that."
---

# Jacobilicious AI-native score

Score how close the user's repos and agent setup are to an AI-native way of
working. Back every score with evidence. Name the steps worth taking first.
This skill only reads. Its 1 write is the report file. Temporary files
outside the repos are fine; delete them at the end.

Before your first message, read `~/.claude/jacobilicious/brand.md` and use its
voice in chat. If the file is missing, use a plain, friendly tone.

## Scope

- Repos: the paths the user names. Else every repo in the Repos table of
  `~/.claude/CLAUDE.md` that exists on this computer. Else the current folder
  if it is a git repo. With no repo, score the setup only and say so.
- Setup: the user's agent configuration on this computer, in every agent tool
  present (Claude Code, Codex, Cursor, Gemini CLI, others), on any operating
  system.

## Inspect

Some items need facts you cannot see: paid plans, a server on another
computer, accounts connected in a web page. Ask for them in your first
message, as 1 numbered list, before you inspect. If nobody can answer (the
run is scheduled, or the user said not to ask), skip the questions.

Gather evidence with read-only commands. For every item below, record a level
and its evidence: a path, a command and its result, or the user's answer.

- Report that a credential exists, never its value. From a file that may hold
  secrets, read key names only. Check a CLI login with that CLI's own status
  command. Never read a key to test a login.
- If a repo holds a password or key in a tracked file, report only the path
  and the number of keys. Changing the keys is the owner's job.
- Score what exists. Do not install, log in, start services, or change
  settings to test something.
- Level 2 or 3 needs evidence that the thing works, not only that a file exists.
- For usage counts, read agent transcripts from the last 30 days only.

## Checklist

Levels: 0 = missing, 1 = exists, 2 = works (checked), 3 = target.
An item's level is the highest level whose condition holds together with
every lower one. A tool counts when it gives the named ability. The tools in
brackets are examples, not requirements. "Most" means more than half.

| # | Item | Weight | 1 | 2 | 3 |
|---|---|---|---|---|---|
| A1 | Repo instruction file | 6 | `AGENTS.md` or `CLAUDE.md` exists | 1 source; other agent files point to it | Under 200 lines, every repo path it names exists (skip placeholders and patterns), changed in the last 90 days |
| A2 | Runnable commands | 6 | Build and test commands are named | A recent CI run or log shows them passing. Do not run them yourself: they can write files or reach live services | 1 command runs the full check |
| B | Skills in the repo | 8 | 1 or more skills or commands in the repo | They cover the repo's repeated work (ship, test, release) | Skill changes in git in the last 90 days |
| C | Skills across repos | 7 | Own skills exist outside any 1 repo | 1 source under version control, linked into every agent tool | No copies: every installed own skill links to the source (skills installed from a vendor do not count) |
| D1 | Skill descriptions | 5 | Every skill has 1 | Most say when to start and when not to | No 2 skills start on the same request |
| D2 | Skill bodies | 5 | Valid frontmatter | Most say when the job is done, such as a `Done when` section | Each checks its own result; tests or evals exist |
| E1 | CLIs | 5 | git and a GitHub or GitLab CLI, logged in | CLIs logged in for every core system the repos use (cloud, database, tickets, deploy) | Small scripts with JSON output for repeated work |
| E2 | MCP servers | 5 | 1 or more configured | They connect and were used | Only where no CLI does the job; unused ones removed |
| F1 | Always-loaded text | 5 | Global instructions exist | Global instructions, memory, and skill descriptions of the main agent tool together under about 20,000 tokens (characters ÷ 4) | Measured and tracked over time |
| F2 | Memory | 3 | Agent memory is in use | It has an index and no duplicates | It is cleaned up regularly |
| G | Scheduled agent jobs | 7 | Any scheduled job (OS scheduler, cron, CI schedule) | 1 or more jobs run an agent and succeeded recently | 3 or more agent jobs; a failure alerts the user |
| H1 | Communication channels | 4 | The agent reads 1 of mail, Slack, or chat | It reads and drafts in the user's main channels | It sends under clear yes-first rules |
| H2 | Reaching the user | 4 | Results only inside the session | The agent can send a push message outside the session | The user answers from the phone and the agent continues |
| I | Browser control | 6 | Browser automation is installed | The agent uses a logged-in browser for real tasks | It checks web changes with screenshots as routine |
| J | Always-on computer | 7 | A second computer or server exists | Agents run there in sessions the user reaches from anywhere | Work goes on with the laptop closed; several agents in parallel |
| K1 | Model providers | 4 | 1 paid agent plan | 2 or more providers usable (Anthropic, OpenAI, Google, others) | Model chosen per task; a second model reviews |
| K2 | Cost visibility | 3 | Monthly spend is roughly known | Usage and limits are visible | Spend per tool is tracked against a budget |
| L | Check loop | 5 | Tests run on every pull request | Agent pull requests get an automatic review | Merge waits for checks and review; the agent fixes red checks |
| M | Secrets and permissions | 5 | No passwords or keys in repo files | Agents read secrets from a password manager or secret store | Each agent gets only the secrets it needs; production writes need a yes |

Points per item = weight × level ÷ 3. Show points with 1 decimal. The total
is out of 100: add the unrounded points, then round to a whole number.
For repo items (A, B, L, M, and D for repo skills), score each repo and use
the average.
If a level is proven but the next one needs a fact nobody gave, keep the
proven level and list the missing fact under Unknown. Score `unknown`
(0 points, listed apart) only when no level can be checked. Never guess.

Levels: 0–39 Assisted, 40–64 Enabled, 65–84 AI-native, 85–100 Frontier.

## Next steps (ICE)

For every item below level 3, write 1 concrete next step that raises it.
Rate each step from 1 to 10:

- Impact: the points the item gains at the level the step reaches, 1 point = 1,
  rounded, at least 1, at most 10.
- Confidence: how sure you are it works here. 10 when the evidence shows
  exactly what is missing and the fix is standard. Lower when the item was
  `unknown` or the fix depends on another person or a purchase.
- Ease: how little work it takes. 10 = under 10 minutes. 1 = days of work or
  a new paid plan.

ICE = Impact × Confidence × Ease. Sort the steps by ICE, highest first.
Exception: a password or key found in a repo file always comes first.

## Report

Show it in chat, in this order:

1. Summary: 3 to 5 short sentences in plain words, no jargon, as one person
   talks to another. Say where the user stands, the biggest gap, and the
   first step from the list below.
2. Total, level, and the change since the newest earlier report in
   `~/.claude/jacobilicious/ai-native/`.
3. Scorecard: item, points of maximum, 1 line of evidence.
4. Next steps: the top 5 by ICE, each with its action, Impact, Confidence,
   Ease, and ICE. Mention how many more there are.
5. Unknown items and what would settle each.

Write the same content to `~/.claude/jacobilicious/ai-native/YYYY-MM-DD.md`
(create the folder if missing),
neutral and without voice or branding, with all next steps.

Offer to start `jacobilicious-audit` for steps that fix the workspace, and
`jacobilicious-engineer` for steps that write skills or rules. Change nothing
yourself.

## Done when

Every item has a level and evidence, or is `unknown`. The report file is
written. You read the file back and recomputed the total from each item's
weight and level; it matches. The shown points can add up to a slightly
different number because of rounding; that is fine. This search, run on the report file, finds nothing:
`grep -nE "(sk-|ghp_|github_pat_|xox[bp]-|AKIA)[A-Za-z0-9_-]{10,}|(api[_-]?key|token|secret|password)[\"']?[[:space:]]*[:=][[:space:]]*[^[:space:]<]{8,}" ~/.claude/jacobilicious/ai-native/YYYY-MM-DD.md`.
Say in 1 line that you did both checks.
