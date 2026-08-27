# Implementation Prompt: Implement All Courses Page

## 1. Goal
Implement the clean, production-ready **All Courses catalog page** at `/courses` (`app/courses/page.tsx`), fetching courses and categories dynamically from the Sanity `production` dataset. The page will provide an intuitive category filter, quick search, course cards linking to `/courses/[slug]`, and match Vertex design aesthetics (typography, colors, and responsive layouts).

---

## 2. Skills & References Read
- `AGENTS.md` (Section 1 "What you are building", Section 3 "UI work", Section 5 "How the app is structured", Section 7 "Decisions already made for you", Section 13 "Checks to run")
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`, `references/nextjs.md`)
- `node_modules/next/dist/docs/` (Server and Client Component boundaries in App Router)

---

## 3. Code & Configuration Inspected
- `sanity/lib/data.ts`: `getCourses()` and `getCategories()` returning typed Sanity records.
- `components/ui/course-card.tsx`: `CourseCard` component with icon, title, description, level, duration, and module count.
- `components/ui/navigation.tsx`: Header navigation with Clerk auth integration.
- `components/ui/icons.tsx`: Visual icons for course topics and UI elements.
- `components/home/home-page-client.tsx`: Formatter utilities and icon mapping for courses.

---

## 4. Decisions and Assumptions
- **Keep it Simple & Fast**:
  - `app/courses/page.tsx` is an `async` Server Component with `revalidate = 60` fetching all courses via `getCourses()` and categories via `getCategories()`.
  - `components/course/all-courses-view.tsx` is a focused Client Component handling instant client-side category filtering (e.g. "All", "Web Development", "AI Engineering", etc.) and optional keyword search.
- **Layout & Visual Design**:
  - Header with "COURSE CATALOG" pill badge, Playfair Display title "All Courses", and subtitle.
  - Interactive filter pills showing available categories with course counts.
  - 3-column responsive course card grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) linking to `/courses/[slug]`.
  - Graceful empty state when filters match no courses.
  - Consistent header navigation, star banner, and ambient bottom pillars.
- **Navigation & Links**:
  - Update `Navigation` defaults to link "Courses" to `/courses`.
  - Ensure "View all courses" link on the home page navigates directly to `/courses`.

---

## 5. Files Expected to Touch
- `app/courses/page.tsx` [NEW]
- `components/course/all-courses-view.tsx` [NEW]
- `components/ui/navigation.tsx` [MODIFY] (default Courses href to `/courses`)
- `components/home/home-page-client.tsx` [MODIFY] (ensure "View all courses" links to `/courses`)
- `prompts/implement-all-courses-page.md` [NEW]

---

## 6. Requirements
1. The `/courses` route must render all courses fetched from Sanity server-side.
2. Category filter pills must dynamically filter the displayed courses in real time.
3. Every course card must link to its detail page (`/courses/[slug]`).
4. Page must be fully responsive down to mobile viewports.
5. Include descriptive SEO metadata for the `/courses` route.
6. `npx tsc --noEmit`, `npm run lint`, and `npm run build` must pass with 0 errors.

---

## 7. Security Considerations
- Read-only data access performed server-side with no exposed tokens in client bundles.

---

## 8. Acceptance Criteria
- [ ] Navigating to `/courses` displays all courses from Sanity.
- [ ] Category filter pills filter the course list smoothly.
- [ ] Course cards navigate to `/courses/[slug]`.
- [ ] TypeScript check (`npx tsc --noEmit`), ESLint (`npm run lint`), and Next.js build pass cleanly.

---

## 9. Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

---

## 10. Manual Test Steps
1. Navigate to `http://localhost:3000/courses`.
2. Verify all 10 courses render with titles, summaries, levels, durations, and module counts.
3. Click category filter pills (e.g., "AI Engineering", "Web Development") to verify filtering.
4. Click on any course card to verify navigation to `/courses/[slug]`.
5. Check mobile responsiveness by resizing the browser window.
