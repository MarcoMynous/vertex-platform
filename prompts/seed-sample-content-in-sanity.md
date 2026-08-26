# Implementation Prompt: Seed Sample Content in Sanity

## 1. Goal
Seed and verify a comprehensive dataset in Sanity containing 6 categories, 5 instructors, and 10 full-featured courses spanning Web Development, AI Engineering, Backend & Infrastructure, Data, Languages, and Security. Each course contains 4 structured modules with 3 lessons each (120 lessons total), with consistent hierarchical relationships where each module equals the sum of its lessons and each course equals the sum of its modules in both lesson counts and video durations.

---

## 2. Skills & References Read
- `AGENTS.md` (Section 1 "What you are building", Section 5 "How the app is structured", Section 7 "Decisions already made for you", Section 8 "The data you are modeling", Section 12 "Things that will trip you up", Section 13 "Checks to run")
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`, `references/schema.md`, `references/groq.md`)
- `sanity-migration` (`.agents/skills/sanity-migration/SKILL.md`)
- `portable-text-conversion` (`.agents/skills/portable-text-conversion/SKILL.md`)
- `content-modeling-best-practices` (`.agents/skills/content-modeling-best-practices/SKILL.md`)

---

## 3. Code & Configuration Inspected
- `sanity/schemaTypes/`: Schema definitions for `category`, `instructor`, `course`, `lesson`, `module`, `learningOutcome`, `resource`, `blockContent`.
- `sanity/lib/queries.ts`: GROQ queries for catalog, course by slug, lesson by slug with reverse course lookup, instructors, and categories.
- `sanity/lib/data.ts`: Server-side data fetching helper functions.
- `sanity/lib/server-client.ts`: Server client using `SANITY_API_READ_TOKEN`.
- `script/seed.ndjson`: 141 structured documents (6 categories, 5 instructors, 10 courses, 120 lessons).
- `script/videos.json`: Video metadata index matching lesson video URLs and durations.
- `.env.local`: Local environment variables for Sanity dataset and API tokens.

---

## 4. Decisions and Assumptions
- **Content Scope & Categorization**:
  - 6 distinct categories: `Web Development`, `AI Engineering`, `Backend & Infrastructure`, `Data`, `Languages`, `Security`.
  - 5 industry-expert instructors with avatars, expertise lists, and rich biographies.
  - 10 comprehensive courses:
    1. *Next.js App Router in Depth* (Web Development, Mira Kovac, 4 modules, 12 lessons, 119m)
    2. *React Performance Engineering* (Web Development, Mira Kovac, 4 modules, 12 lessons, 141m)
    3. *TypeScript for Application Developers* (Languages, Daniel Okafor, 4 modules, 12 lessons, 115m)
    4. *Building AI Apps with LLMs* (AI Engineering, Priya Raman, 4 modules, 12 lessons, 147m)
    5. *Retrieval-Augmented Generation from Scratch* (AI Engineering, Priya Raman, 4 modules, 12 lessons, 117m)
    6. *Python for Data Work* (Data, Tomas Berg, 4 modules, 12 lessons, 215m)
    7. *System Design Foundations* (Backend & Infrastructure, Tomas Berg, 4 modules, 12 lessons, 97m)
    8. *PostgreSQL for Developers* (Data, Daniel Okafor, 4 modules, 12 lessons, 133m)
    9. *DevOps with Docker and Kubernetes* (Backend & Infrastructure, Alina Costa, 4 modules, 12 lessons, 160m)
    10. *Practical Web Security* (Security, Alina Costa, 4 modules, 12 lessons, 120m)
- **Relational Integrity & Sum Consistency**:
  - Each module contains 3 direct references to specific lessons belonging to that module.
  - Each course contains an ordered array of 4 embedded module objects.
  - Course total lessons = exactly 12 (sum of lessons across all 4 modules).
  - Course total duration = exactly the sum of durations of all 12 referenced lessons.
  - Reverse references (`*[_type == "course" && references(^._id)][0]`) properly resolve a lesson to its parent course with module context and sibling navigation (previous/next lesson).
- **Reproducible Seed Tooling**:
  - Provide an automated seed script (`script/seed.js`) executable via `npm run seed` using Sanity client mutations or dataset import to allow deterministic re-seeding.
- **Environment Token Fix**:
  - Ensure `.env.local` contains the valid `SANITY_API_READ_TOKEN` matching the active Sanity project `vdf582jx`.

---

## 5. Files Expected to Touch
- `prompts/seed-sample-content-in-sanity.md` [NEW]
- `script/seed.js` [NEW]
- `package.json` [MODIFY] (add `"seed": "node script/seed.js"`)
- `.env.local` [MODIFY] (ensure valid `SANITY_API_READ_TOKEN`)

---

## 6. Requirements
1. **Sanity Dataset Content**:
   - Seed at least 6 categories with titles, slugs, and descriptions.
   - Seed at least 5 instructors with names, slugs, photos, expertise, and bio.
   - Seed 10 courses across programming, web development, AI, backend, data, and security.
   - Seed 120 lessons with video URLs, durations, free preview flags, key points, notes in Portable Text, and resources.
2. **Relational Consistency**:
   - Every module must reference existing lesson documents.
   - Every course must reference an existing instructor and category.
   - Module lesson counts and durations must equal the mathematical sum of referenced lessons.
   - Course lesson counts and durations must equal the mathematical sum of all module lessons.
3. **Data Access Verification**:
   - Validate that `COURSES_QUERY`, `POPULAR_COURSES_QUERY`, `COURSE_BY_SLUG_QUERY`, `LESSON_BY_SLUG_QUERY`, `INSTRUCTORS_QUERY`, `INSTRUCTOR_BY_SLUG_QUERY`, `CATEGORIES_QUERY`, and `CATEGORY_BY_SLUG_QUERY` return valid, populated, coherent data.

---

## 7. Security Considerations
- Read tokens remain strictly server-side in `SANITY_API_READ_TOKEN`.
- Write/Admin tokens used for seeding remain in developer environment / CLI config and are never exposed to the client application.

---

## 8. Acceptance Criteria
- [ ] 6 categories, 5 instructors, 10 courses, and 120 lessons exist in Sanity `production` dataset.
- [ ] Course-to-module and module-to-lesson relationships are 100% consistent with zero dangling references.
- [ ] Reverse lookup from lessons to parent courses succeeds for all lessons.
- [ ] GROQ aggregate queries (`count(modules[].lessons[])`, `math::sum(modules[].lessons[]->duration)`) calculate accurate totals for all 10 courses.
- [ ] `npm run seed` script exists and executes successfully.
- [ ] TypeScript check (`npx tsc --noEmit`) and lint (`npm run lint`) pass with 0 errors.

---

## 9. Checks to Run
- `node -e '...'` verification script validating all 10 courses, 120 lessons, reverse references, and aggregations.
- `npx tsc --noEmit`
- `npm run lint`

---

## 10. Manual Test Steps
1. Run `node script/seed.js` or `npm run seed` to verify idempotent content seeding.
2. Open Sanity Studio at `/studio` (or run `npx sanity documents query`) and inspect:
   - Categories list (6 items)
   - Instructors list (5 items)
   - Courses list (10 items)
   - Lessons list (120 items)
3. Open any course document (e.g. *Next.js App Router in Depth*) and verify all 4 modules display their 3 lesson references.
4. Verify that querying any lesson (e.g. *File-system routing and the app directory*) resolves its parent course and navigation correctly.
