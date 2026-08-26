# Implementation Prompt: Sanity Content Model, Studio, and Server Data Layer

## 1. Goal
Implement the complete Sanity content model and Studio workspace for Vertex (`course`, `module`, `lesson`, `instructor`, `category`, and supporting objects), alongside a type-safe server-side read client and data access layer adhering to the boundary constraints in `AGENTS.md`.

---

## 2. Skills & References Read
- `AGENTS.md` (Section 1 "What you are building", Section 5 "How the app is structured", Section 6 "Tech stack", Section 8 "The data you are modeling", Section 12 "Things that will trip you up", Section 13 "Checks to run")
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`, `references/schema.md`, `references/groq.md`, `references/nextjs.md`)
- `content-modeling-best-practices` (`.agents/skills/content-modeling-best-practices/SKILL.md`)
- `portable-text-serialization` (`.agents/skills/portable-text-serialization/SKILL.md`)

---

## 3. Code & Configuration Inspected
- `sanity.config.ts`: Studio config mounted at `/app/studio/[[...tool]]/page.tsx` using `structureTool` and `visionTool`.
- `sanity/env.ts`: Exports `apiVersion`, `dataset`, `projectId`.
- `sanity/schemaTypes/index.ts`: Empty `types` array.
- `sanity/structure.ts`: Basic default structure builder.
- `sanity/lib/client.ts`: Basic client without private dataset token support.
- `sanity/lib/image.ts`: Image URL builder helper.
- `package.json`: Includes `sanity` (5.31.2), `next-sanity` (13.3.3), `@sanity/image-url`, `@portabletext/react`, `@sanity/icons`.

---

## 4. Decisions and Assumptions
- **Content Model Structure (Section 8 of AGENTS.md)**:
  - **`course` (Document)**: Top-level document with `title`, `slug`, `summary`, `coverImage` (image with hotspot), `level` ('Beginner' | 'Intermediate' | 'Advanced'), `price`, `popular` (boolean flag), `studentCount`, `learningOutcomes` (array of objects with `icon`, `title`, `description`), `instructor` (reference to `instructor`), `category` (reference to `category`), and `modules` (ordered array of embedded `module` objects).
  - **`module` (Object)**: Embedded inside `course` (not its own document) containing `title`, `summary`, and an ordered list of references to `lesson`. Module/lesson numbers (e.g., Module 1, Lesson 1.1) are derived at query/render time.
  - **`lesson` (Document)**: Standalone document with `title`, `slug`, `videoUrl` (YouTube/Vimeo/Bunny), `thumbnail` (image with hotspot), `duration` (number of seconds), `freePreview` (boolean), `studentCount`, `notes` (Portable Text `blockContent`), `keyPoints` (array of strings), `proTip` (text), and `resources` (array of objects with `type`, `title`, `description`, `url`). Parent course is resolved via reverse reference lookup (`*[_type == "course" && references(^._id)][0]`).
  - **`instructor` (Document)**: `name`, `slug`, `photo` (image with hotspot), `expertise`, `bio`.
  - **`category` (Document)**: `title`, `slug`, `description`.
  - **Supporting Objects**: `learningOutcome`, `resource`, `module`, and `blockContent`.
- **Sanity Studio UX (`sanity/structure.ts`)**:
  - Structured list items with icons from `@sanity/icons` for Courses, Lessons, Instructors, and Categories.
- **Server Data Layer (`sanity/lib/`)**:
  - `sanity/env.ts`: Add support for server-side `readToken` via `SANITY_API_READ_TOKEN`.
  - `sanity/lib/server-client.ts`: Dedicated server-only client using `SANITY_API_READ_TOKEN` with private dataset security (token never exposed to client).
  - `sanity/lib/types.ts`: Comprehensive TypeScript interfaces for all schema entities, query responses, and UI payloads.
  - `sanity/lib/queries.ts`: GROQ queries written with `defineQuery` covering courses catalog, course detail by slug, lesson by slug with reverse course lookup, instructors, and categories.
  - `sanity/lib/data.ts`: High-level data retrieval functions (`getCourses`, `getCourseBySlug`, `getLessonBySlug`, `getInstructors`, `getInstructorBySlug`, `getCategories`, `getCategoryBySlug`).
- **Canonical Environment Configuration**:
  - Add committed `.env.example` documenting all required Sanity and Clerk variables.

---

## 5. Files Expected to Touch
- `sanity/schemaTypes/courseType.ts` [NEW]
- `sanity/schemaTypes/lessonType.ts` [NEW]
- `sanity/schemaTypes/instructorType.ts` [NEW]
- `sanity/schemaTypes/categoryType.ts` [NEW]
- `sanity/schemaTypes/objects/moduleType.ts` [NEW]
- `sanity/schemaTypes/objects/learningOutcomeType.ts` [NEW]
- `sanity/schemaTypes/objects/resourceType.ts` [NEW]
- `sanity/schemaTypes/objects/blockContentType.ts` [NEW]
- `sanity/schemaTypes/index.ts` [MODIFY]
- `sanity/structure.ts` [MODIFY]
- `sanity/env.ts` [MODIFY]
- `sanity/lib/server-client.ts` [NEW]
- `sanity/lib/types.ts` [NEW]
- `sanity/lib/queries.ts` [NEW]
- `sanity/lib/data.ts` [NEW]
- `.env.example` [NEW]

---

## 6. Requirements
1. **Schema Definitions**:
   - Use `defineType`, `defineField`, `defineArrayMember` from `sanity` across all schemas.
   - Enforce exact field requirements, relationships, and validation constraints matching Section 8 of `AGENTS.md`.
   - Assign intuitive icons from `@sanity/icons` to all document types and objects.
2. **Studio Structure**:
   - Configure desk structure in `sanity/structure.ts` organizing documents with clear titles and icons.
3. **Data Layer & Type Safety**:
   - Build server-only read client utilizing `SANITY_API_READ_TOKEN` for secure private dataset access.
   - Write GROQ queries with projection of related references (instructors, categories, lessons) and reverse references (course for a lesson).
   - Export typed data access functions from `sanity/lib/data.ts`.
4. **Security & Boundaries**:
   - Never expose `SANITY_API_READ_TOKEN` to the browser or client bundle.

---

## 7. Security Considerations
- Read token is strictly server-side only in `server-client.ts`.
- `client.ts` remains public/client-safe with no write token or secrets.
- `.env.local` contains live credentials and remains ignored in `.gitignore`; `.env.example` is committed without real secrets.

---

## 8. Acceptance Criteria
- [ ] Schema types for `course`, `module`, `lesson`, `instructor`, `category`, and supporting objects created and registered in `sanity/schemaTypes/index.ts`.
- [ ] Sanity Studio at `/studio` loads with organized structure and icons for all content types.
- [ ] GROQ queries in `sanity/lib/queries.ts` correctly resolve relationships (references and reverse references).
- [ ] Data access functions in `sanity/lib/data.ts` fetch and return strongly typed data.
- [ ] `.env.example` contains canonical list of environment variables.
- [ ] `npm run lint` passes with 0 errors.
- [ ] `npx tsc --noEmit` passes with 0 errors.
- [ ] `npm run build` succeeds cleanly.

---

## 9. Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

---

## 10. Manual Test Steps
1. Run `npm run dev` and navigate to `http://localhost:3000/studio`.
2. Verify that Sanity Studio renders the custom structure with Courses, Lessons, Instructors, and Categories.
3. Inspect document creation forms to verify all required fields (e.g. course learning outcomes, embedded modules, lesson notes Portable Text, resources, etc.).
4. Verify server data layer modules compile and export clean TypeScript types.
