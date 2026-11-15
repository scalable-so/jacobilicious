---
name: jacobilicious-ai-native
description: "Start when the user asks how AI-native their setup or repos are, wants a score, grade, or maturity check of their agent setup, asks how far they are from a fully AI-native way of working, or wants to compare their setup with the target. Not for fixing what is broken, slow, or unused in the workspace: `jacobilicious-audit` does that."
---

# Jacobilicious AI-native score

Score how close the user's repos and agent setup are to an AI-native way of
working. Back every score with evidence. Name the steps worth taking first.
This skill only reads. Its 1 write is the report file.

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

Gather evidence with read-only commands. For every item below, record a level
and its evidence: a path, a command and its result, or the user's answer.

- Report that a credential exists, never its value. From a file that may hold
  secrets, read key names only.
- Score what exists. Do not install, log in, start services, or change
  settings to test something.
- Level 2 or 3 needs evidence that the thing works, not only that a file exists.
- Some items need facts you cannot see: paid plans, a server on another
  computer, accounts connected in a web page. Ask for them once, in 1 message
  with a numbered list. If the user does not answer, or nobody is there, score
  them `unknown`: 0 points, listed apart. Never guess.

## Checklist

Levels: 0 = missing, 1 = exists, 2 = works (checked), 3 = target.
A tool counts when it gives the named ability. The tools in brackets are
examples, not requirements.

| # | Item | Weight | 1 | 2 | 3 |
|---|---|---|---|---|---|
| A1 | Repo instruction file | 6 | `AGENTS.md` or `CLAUDE.md` exists | 1 source; other agent files point to it | Under 200 lines, every path it names exists, changed in the last 90 days |
| A2 | Runnable commands | 6 | Build and test commands are named | They run without errors here | 1 command runs the full check |
| B | Skills in the repo | 8 | 1 or more skills or commands in the repo | They cover the repo's repeated work (ship, test, release) | Used and kept up to date, as git history shows |
| C | Skills across repos | 7 | Own skills exist outside any 1 repo | 1 source under version control, linked into every agent tool | No copies: every installed skill links to the source |
| D1 | Skill descriptions | 5 | Every skill has 1 | Most say when to start and when not to | No 2 skills start on the same request |
| D2 | Skill bodies | 5 | Valid frontmatter | Each says when the job is done | Each checks its own result; tests or evals exist |
| E1 | CLIs | 5 | git and a GitHub or GitLab CLI, logged in | CLIs logged in for every core system the repos use (cloud, database, tickets, deploy) | Small scripts with JSON output for repeated work |
| E2 | MCP servers | 5 | 1 or more configured | They connect and were used | Only where no CLI does the job; unused ones removed |
| F1 | Always-loaded text | 5 | Global instructions exist | Global instructions, memory, and skill descriptions together under about 20,000 tokens (characters ÷ 4) | Measured and tracked over time |
| F2 | Memory | 3 | Agent memory is in use | It has an index and no duplicates | It is cleaned up regularly |
| G | Scheduled agent jobs | 7 | Any scheduled job (OS scheduler, cron, CI schedule) | 1 or more jobs run an agent and succeeded recently | Several jobs; a failure alerts the user |
| H1 | Communication channels | 4 | The agent reads 1 of mail, Slack, or chat | It reads and drafts in the user's main channels | It sends under clear yes-first rules |
| H2 | Reaching the user | 4 | Results only inside the session | The agent can send a push message outside the session | The user answers from the phone and the agent continues |
| I | Browser control | 6 | Browser automation is installed | The agent uses a logged-in browser for real tasks | It checks web changes with screenshots as routine |
| J | Always-on computer | 7 | A second computer or server exists | Agents run there in sessions the user reaches from anywhere | Work goes on with the laptop closed; several agents in parallel |
| K1 | Model providers | 4 | 1 paid agent plan | 2 or more providers usable (Anthropic, OpenAI, Google, others) | Model chosen per task; a second model reviews |
| K2 | Cost visibility | 3 | Monthly spend is roughly known | Usage and limits are visible | Spend per tool is tracked against a budget |
| L | Check loop | 5 | Tests run on every pull request | Agent pull requests get an automatic review | Merge waits for checks and review; the agent fixes red checks |
| M | Secrets and permissions | 5 | No passwords or keys in repo files | Agents read secrets from a password manager or secret store | Each agent gets only the secrets it needs; production writes need a yes |

Points per item = weight × level ÷ 3. The total is out of 100.
For repo items (A, B, L, and D for repo skills), score each repo and use the
average in the total. Round the total to a whole number.

Levels: 0–39 Assisted, 40–64 Enabled, 65–84 AI-native, 85–100 Frontier.

## Next steps (ICE)

For every item below level 3, write 1 concrete next step that raises it.
Rate each step from 1 to 10:

- Impact: the points it adds, 1 point = 1, at most 10.
- Confidence: how sure you are it works here. 10 when the evidence shows
  exactly what is missing and the fix is standard. Lower when the item was
  `unknown` or the fix depends on another person or a purchase.
- Ease: how little work it takes. 10 = under 10 minutes. 1 = days of work or
  a new paid plan.

ICE = Impact × Confidence × Ease. Sort the steps by ICE, highest first.

## Report

Show it in chat, in this order:

1. Summary: 3 to 5 short sentences in plain words, no jargon, as one person
   talks to another. Say where the user stands, the biggest gap, and the
   first step.
2. Total, level, and the change since the newest earlier report in
   `~/.claude/jacobilicious/ai-native/`.
3. Scorecard: item, points of maximum, 1 line of evidence.
4. Next steps: the top 5 by ICE, each with its action, Impact, Confidence,
   Ease, and ICE. Mention how many more there are.
5. Unknown items and what would settle each.

Write the same content to `~/.claude/jacobilicious/ai-native/YYYY-MM-DD.md`,
neutral and without voice or branding, with all next steps.

Offer to start `jacobilicious-audit` for steps that fix the workspace, and
`jacobilicious-engineer` for steps that write skills or rules. Change nothing
yourself.

## Done when

Every item has a level and evidence, or is `unknown`. The report file is
written. You read the file back, added up its scorecard, and the sum matches
the total. You searched the file for key-like strings (`sk-`, `ghp_`, `token`,
`secret`, `password` followed by a value) and found none. Say in 1 line that
you did both checks.
