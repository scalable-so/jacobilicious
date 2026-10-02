# Context file convention

Knowledge files (master data, playbooks, decisions, research) carry YAML
frontmatter, so an agent can judge relevance without reading the file.
Raw documents (PDF, CSV, contracts, exports) carry none.

## Frontmatter

    ---
    title: Legal protection concept 2026
    summary: 1 sentence. What is this, and when do I open it?
    type: decision
    status: canonical
    updated: 2026-01-15
    last_verified: 2026-01-15
    ---

- `summary` is the most important field. 1 sentence that answers "why open this?".
- `type` and `status` use only the values below.
- Bump `updated` when the content changes.
- Put a value that contains a colon in double quotes.
- `last_verified` is optional. Use it for facts that expire (deadlines,
  amounts, terms). Older than 60 days means: check against the source.

## Values

| Field | Values |
|---|---|
| `type` | `master-data`, `contract`, `decision`, `playbook`, `report`, `research`, `correspondence`, `kb`, `status`, `index` |
| `status` | `canonical`, `draft`, `archived` |

If a value is missing, add it here first, then use it.

## Content

A knowledge file holds the why (rule, decision, frame) and links to the
evidence instead of copying it. Facts that expire stay with their source.
If they must appear, stamp the file with `last_verified`.

## Indexes

Every folder that holds files has an `_INDEX.md` (`type: index`): 1 row per
file with file name, summary, and status. The row changes in the same step
as the file.

## Not knowledge: `skill-data/`

`skill-data/<skill>/` holds working data of skills. No frontmatter, no index.
When something there becomes lasting, move it into a knowledge file in the
right folder.
