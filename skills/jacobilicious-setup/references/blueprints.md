# Repo blueprints

Defaults per repo type. Adapt them with the rules at the end.

## Business (readers: the whole team)

| Folder | Holds |
|---|---|
| `company/` | Mission, values, positioning, audience, brand voice, goals |
| `product/<product>/` | 1 folder per product or offer: what it is, pricing, features, FAQ |
| `marketing/<channel>/` | 1 folder per channel in use: strategy, content, results |

Add only when the interview shows the need: `sales/` (offers, customer talks),
`support/` (recurring answers), `operations/` (processes, suppliers).

## Confidential (readers: owner and executives)

| Folder | Holds |
|---|---|
| `legal/` | Company documents, contracts, insurance |
| `finance/` | Taxes, bookkeeping, planning, bank |
| `hr/` | Roles, employment contracts, personnel files |
| `_ctx/` | Master data (register, tax, bank numbers) and contacts (tax advisor, bank, lawyer) |

More than 1 legal company: 1 top folder per company, each with `legal/`,
`finance/`, `hr/`. `_ctx/` stays shared.

## Private (reader: the user)

| Folder | Holds |
|---|---|
| `finance/` | Personal taxes, investments, insurance, bank |
| `home/` | Housing, vehicles, household contracts |
| `health/` | Medical reports, lab results, routines, health insurance |
| `growth/` | Personal goals, learning, courses, reflections |
| `_ctx/` | Personal master data and contacts |

## Every repo

`people/` (profiles), `.agents/` (skills, conventions), `bin/` (save scripts),
`skill-data/` (working data of skills).

## Rules to adapt

- At most 7 top-level folders per repo, not counting the folders every repo has.
- Name folders and files in the user's language, with the word the user
  uses. Lowercase, ASCII, no spaces. Translate the default names above.
  Keep `people/`, `.agents/`, `bin/`, `skill-data/`, `_ctx/`, and
  `_archive/` as they are.
- Add a folder only for a kind of document the user named that fits no existing one.
- Each document has 1 home. If 2 folders could fit, state in the Structure
  table which one wins.
- Create subfolders when the first document arrives. Exception: the products
  and channels the user named, and `legal/`, `finance/`, `hr/` of each company.
- If the user merges repo types, keep each type's folders under 1 top folder
  named after the type.
