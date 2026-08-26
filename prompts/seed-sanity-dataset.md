# Implementation Prompt: Seed Sanity Dataset from Provided Files

## 1. Goal
Seed the Sanity `production` dataset using the provided `script/seed.ndjson` and `script/videos.json` files using the Sanity CLI (`npx sanity dataset import`), without modifying either source file. Following the import, verify all document counts, references, and asset uploads via GROQ queries and data layer checks.

---

## 2. Skills & References Read
- `AGENTS.md` (Sanity content architecture, check protocols, data modeling specifications)
- `sanity-migration` (`.agents/skills/sanity-migration/SKILL.md`, `references/general.md`)
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)

---

## 3. Code & Assets Inspected
- `script/seed.ndjson`: 141 pre-formatted Sanity documents containing:
  - 10 `course` documents with embedded modules, learning outcomes, and references.
  - 120 `lesson` documents with Portable Text notes, key points, pro tips, resources, and YouTube URLs.
  - 5 `instructor` documents with photo assets, expertise tags, and bio blocks.
  - 6 `category` documents.
  - Remote asset descriptors (`_sanityAsset: "image@..."`) for automated image asset downloading and caching.
- `script/videos.json`: 120 video metadata entries keyed by lesson slug with YouTube IDs, titles, channels, and durations.
- Target Sanity configuration: Project ID `vdf582jx`, Dataset `production`.
- `sanity.cli.ts` & `sanity.config.ts`: Configured and authenticated with Administrator privileges.

---

## 4. Decisions and Assumptions
- **Strict File Immutability**: Neither `script/seed.ndjson` nor `script/videos.json` will be modified in any way.
- **Sanity CLI Import**: Use `npx sanity dataset import script/seed.ndjson production --replace` to import all 141 documents idempotently, upload referenced images, and link references.
- **Post-Import Verification**:
  - Query Sanity using the authenticated CLI / GROQ to verify document counts by `_type`.
  - Verify that `category` (6), `instructor` (5), `lesson` (120), and `course` (10) are present and published.
  - Verify that references from courses to instructors, categories, and module lessons resolve without broken references.
  - Verify all 120 lessons map to the videos in `script/videos.json`.

---

## 5. Files Expected to Touch
- `prompts/seed-sanity-dataset.md` [NEW]
*(Note: `script/seed.ndjson` and `script/videos.json` are read-only and will NOT be modified)*

---

## 6. Requirements
1. Execute `npx sanity dataset import script/seed.ndjson production --replace`.
2. Ensure image assets from `_sanityAsset` are downloaded and uploaded to the Sanity asset store during import.
3. Verify document counts against expected numbers:
   - Total: 141 documents
   - Categories: 6
   - Instructors: 5
   - Lessons: 120
   - Courses: 10
4. Verify reference integrity across courses, modules, and lessons.

---

## 7. Security Considerations
- Authentication is handled via existing CLI credentials and server environment tokens.
- No secrets or keys written to tracked files.

---

## 8. Acceptance Criteria
- [ ] `script/seed.ndjson` and `script/videos.json` remain completely unmodified.
- [ ] `npx sanity dataset import` executes successfully with 0 errors.
- [ ] Document counts in Sanity match exactly: 6 categories, 5 instructors, 120 lessons, 10 courses.
- [ ] Course-to-lesson module relationships resolve cleanly.
- [ ] `npm run lint` and `npx tsc --noEmit` pass with 0 errors.

---

## 9. Checks to Run
- Sanity dataset import command.
- GROQ count verification script.
- `npx tsc --noEmit`.
- `npm run lint`.

---

## 10. Manual Test Steps
1. Run `npx sanity documents query '{"total": count(*), "courses": count(*[_type == "course"]), "lessons": count(*[_type == "lesson"]), "instructors": count(*[_type == "instructor"]), "categories": count(*[_type == "category"])}'` to inspect counts in the live dataset.
2. Open `http://localhost:3000/studio` and inspect the populated course and lesson catalogs.
3. Verify that all 10 courses show their full modules and lessons, and all 120 lessons have notes and video embeds.
