---
name: jacobilicious-engineer
description: "Start whenever you are about to write or change text that an agent will read as instructions: a skill or its reference and data files, a rule in CLAUDE.md or AGENTS.md, a prompt, a command, a brief for a subagent, or a test or eval for any of these. Start when the user wants a new skill or a repeated task turned into a skill. Start when a skill does not start, starts at the wrong time, or should be archived, or when the agent keeps getting something wrong and a rule should fix it. When the user wants CLAUDE.md or AGENTS.md shortened or cleaned up, `jacobilicious-audit` starts first and uses this skill for the wording."
---

# Jacobilicious engineer

Write instructions that make the intended work clear.
Use the least instruction needed to express the complete task.

Before your first message, read `~/.claude/jacobilicious/brand.md` and use its
voice in chat. If the file is missing, use a plain, friendly tone.

## Understand

Identify:

- The outcome and who uses it.
- What the model receives, including other instructions and schemas.
- Which tools, files, memory, and outside information it can access.
- Which decisions it may make and which require human input.
- The required output and what counts as complete.
- Observed failures and their effect on the user.

Distinguish the execution setting:

- A production call receives defined input and returns a result.
  Assume no tools, conversation history, or opportunity to ask questions
  unless the pipeline supplies them.
- A working agent may inspect information, use tools, ask questions,
  and perform several steps within its granted authority.

For existing instructions, read their callers, related instructions,
and output consumers. Check what actually loads and when.

Separate confirmed facts from assumptions. Keep investigation moving where
it does not depend on an unresolved decision.

## Align with the human

Before designing the approach, explain your understanding in chat and
surface unclear decisions and meaningful optimization options.

For a decision, ask a short multiple-choice question. Give 2 or 3 options,
recommend 1 with a brief reason, and allow a different answer. Ask a
question of fact plainly, without options. Use the available
question tool; if it is unavailable, present the choices in chat.

Reuse decisions already confirmed in the conversation. Wait for answers
before designing the parts that depend on them. Silence is not agreement.

If nothing remains unresolved, summarize the confirmed direction and continue.

## Design

Define the task, relevant context, allowed decisions, and completion condition.
Add process only where the task needs it.

Keep investigation notes, test history, and rejected ideas outside
the instructions used on future runs.

Choose instructions using these rules:

- Start with the job. Add a role only when it adds a useful perspective.
- State the desired action. Add a prohibition when a specific forbidden
  action needs an explicit boundary.
- When requirements compete, state which wins and what the model should do.
- Add ordered steps only when their order matters.
- Reference files only when the agent can access them. State when to read them.
- Define behavior for missing information: ask, inspect, omit, or return
  a specified result, according to the execution setting.
- Use code and schemas for checks they can enforce reliably.
- Keep decisions open when several approaches satisfy the task.
- Put a number, limit, or time range into an instruction only when the human
  gave or confirmed it.

Use an example only when it:

- Explains a real ambiguity.
- Applies across different tasks and inputs.
- Does not suggest content the model should invent.
- Helps more than a plain instruction alone.

## Skills

Start with 1 SKILL.md. Add another file only when a concrete need
makes the skill easier to use and maintain.

Write the description as a start condition, not as a summary of the skill.
Name the distinct situations and the user's own phrases that should start it.
Put procedures and explanations in the body.

Allow automatic invocation unless the human requests manual invocation, a
run sends, pays, publishes, or deletes without asking for a yes first, or a
run is costly. In those cases set `disable-model-invocation: true`.
A skill that stops for the user's yes before such an action may start on its own.
Check nearby skills for overlapping triggers. Give each a clear scope.

Place the skill:

- Global: it works in every repo and holds no repo data. Create it in the
  backup repo at `.agents/global-skills/<name>/` and link it with
  `ln -s <backup-repo>/.agents/global-skills/<name> ~/.claude/skills/<name>`.
  The backup repo is the repo in the Repos table that has
  `.agents/global-skills/`. If there is none, create the skill in
  `~/.claude/skills/<name>/` and tell the user it has no backup.
- Repo, `<repo>/.agents/skills/<name>/`, linked with
  `ln -s ../../.agents/skills/<name> .claude/skills/<name>`: it needs that
  repo's files, or the team shares it.
- A skill name lives in 1 place.

Archive instead of deleting. Move a replaced or unused skill to the
`_archive/` folder next to it (`.agents/skills/_archive/` or
`.agents/global-skills/_archive/`) and remove its symlink. A skill that is
a real folder in `~/.claude/skills/` goes to `~/.claude/skills-archive/`.

Tell the user that a new skill appears only in a new session.

Avoid adding helper scripts, mandatory skill chains, or extra review
stages without a demonstrated need.

## Review

Behavior:

- Each instruction serves the stated outcome or a relevant failure mode.
- The model has the information and abilities the instructions assume.
- Responsibilities, authority, and completion conditions are clear.
- Instructions agree with each other and with the surrounding system.
- Production calls do not depend on unavailable conversation or tools.
- The process works beyond the examples used during drafting.

Language and format:

- Use familiar words and short sentences, aiming at grades 5–7.
- Write quantities as digits in instructions and explanations. Keep quoted
  source text and identifiers unchanged.
- Keep exact field names and necessary technical terms. Explain unclear terms.
- Use 1 consistent name for each concept.
- Prefer a clear sentence to an ambiguous compressed term.
- Separate instructions, input data, and examples clearly.
- Use headings for distinct topics, bullets for related rules, and numbers
  for ordered steps. Skip sections that have no job.
- Remove repetition, vague praise, double negatives, and repeated warnings.

Shorter is useful only while the meaning stays complete.
Treat improved results as unproven until tested.

## Deliver and apply

Keep proposals and discussion in chat.

For new instructions, show the complete proposed text.
For existing instructions, show the before and after for every changed passage,
with enough context to judge the result. Show the complete proposed document
when changes affect its structure or several sections.

Explain the few decisions that matter. Distinguish wording changes from
changes to behavior or authority. Name unresolved assumptions.

Wait for human confirmation before creating or editing files or changing
skill activation. Apply only the confirmed proposal.
Bring further material changes back to chat.
After a change inside a repo that has `bin/save`, run it.
If the skill needs a tool that is not connected, say so. Where possible,
write the skill so that it also works without the tool. Then offer to start
`jacobilicious-audit` for that 1 tool.

When testing is in scope, use realistic tasks with the actual available
context and tools. For skills, check both intended invocation and nearby
requests that should not trigger them.
State what was tested and what remains unknown.

## Failure modes

- Imagined access: instructions depend on unavailable tools or context.
  Supply the missing input or change the task.
- Process growth: a simple task gains unnecessary stages. Remove steps
  that do not change the outcome.
- Unclear completion: the agent stops early or continues unnecessarily.
  Define an observable stopping condition.
