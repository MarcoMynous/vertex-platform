# Implementation Prompt: Wire Homepage Courses from Sanity

## 1. Goal
Wire the Homepage at `/` (`app/page.tsx`) to dynamically fetch and display courses from the seeded Sanity `production` dataset using the server data layer (`getCourses()`), preserving the exact visual design, responsive layout, search input, and navigation.

---

## 2. Skills & References Read
- `AGENTS.md` (Section 1 "What you are building", Section 3 "UI work", Section 5 "How the app is structured", Section 7 "Decisions already made for you", Section 13 "Checks to run")
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`, `references/nextjs.md`)
- `node_modules/next/dist/docs/` (Server and Client Component boundaries in App Router)

---

## 3. Code & Configuration Inspected
- `app/page.tsx`: Current homepage rendering static hardcoded courses.
- `sanity/lib/data.ts`: `getCourses()` returning all courses with `modulesCount`, `lessonsCount`, `totalDuration`, `instructor`, `category`.
- `components/ui/course-card.tsx`: `CourseCard` component accepting `icon`, `title`, `description`, `level`, `duration`, `modulesCount`, `href`.
- `components/ui/icons.tsx`: Branded icon components (`NextJsIcon`, `DockerIcon`, `TypeScriptIcon`, `OutcomeIcon`, etc.).

---

## 4. Decisions and Assumptions
- **Server/Client Separation**:
  - `app/page.tsx` becomes an `async` Server Component that fetches courses on the server via `getCourses()`.
  - `components/home/home-page-client.tsx` manages interactive client state (search input state, smooth scroll to `#courses`, navigation active states) and renders the dynamic grid of courses.
- **Dynamic Course Cards Mapping**:
  - Each course card displays:
    - Branded icon or initial badge corresponding to the course topic/slug.
    - Title (`course.title`).
    - Description (`course.summary`).
    - Difficulty level (`course.level`, capitalized for display).
    - Calculated total duration formatted (e.g. `1h 59m` from `course.totalDuration`).
    - Modules count formatted (e.g. `4 modules` from `course.modulesCount`).
    - Clickable navigation link to `/courses/${course.slug.current}`.
- **Visual Faithfulness**:
  - Preserves the exact hero headline, pill badge, search bar with ⌘K shortcut, "All Courses" section header, "View all courses" link, footer star note, and bottom glowing pillars graphic.

---

## 5. Files Expected to Touch
- `prompts/wire-homepage-courses-from-sanity.md` [NEW]
- `app/page.tsx` [MODIFY]
- `components/home/home-page-client.tsx` [NEW]
- `components/ui/course-card.tsx` [MODIFY] (ensure level/duration/icon rendering)

---

## 6. Requirements
1. Homepage must fetch course summaries server-side from Sanity using `getCourses()`.
2. Courses grid must render real data from the Sanity dataset.
3. Every course card must link to its corresponding course page (`/courses/[slug]`).
4. Keep search bar and interactive elements functioning smoothly.
5. `npx tsc --noEmit`, `npm run lint`, and `npm run build` must pass cleanly.

---

## 7. Security Considerations
- Sanity read token is accessed strictly server-side in `app/page.tsx` via `sanity/lib/data.ts`.
- No sensitive keys or tokens are passed to client components.

---

## 8. Acceptance Criteria
- [ ] Homepage renders courses fetched dynamically from Sanity.
- [ ] Clicking any course card navigates to the corresponding course detail page.
- [ ] Course metadata (level, duration, modules count, summary) matches Sanity dataset.
- [ ] TypeScript check (`npx tsc --noEmit`), ESLint (`npm run lint`), and Next.js build pass with 0 errors.

---

## 9. Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

---

## 10. Manual Test Steps
1. Navigate to `http://localhost:3000/`.
2. Verify that course cards are populated from Sanity data.
3. Click on a course card to verify navigation to its `/courses/[slug]` page.
4. Verify responsive layout on mobile and desktop viewports.
