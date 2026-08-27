# Implementation Prompt: Implement Vertex Course Page

## 1. Goal
Implement the course detail page at `/courses/[slug]` exactly reproducing the desktop visual design in `design/vertex-course.png` and responsive down to mobile, fully wired to live Sanity content (`production` dataset) fetched server-side.

---

## 2. Skills & References Read
- `AGENTS.md` (Section 1 "What you are building", Section 3 "UI work", Section 5 "How the app is structured", Section 7 "Decisions already made for you", Section 8 "The data you are modeling", Section 13 "Checks to run")
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`, `references/nextjs.md`, `references/groq.md`)
- `portable-text-serialization` (`.agents/skills/portable-text-serialization/SKILL.md`)
- `node_modules/next/dist/docs/` (App Router dynamic routing, generateStaticParams, generateMetadata)

---

## 3. Code & Design Inspected
- `design/vertex-course.png`: Reference image containing:
  - Top Navigation with Vertex branding, Courses / My Learning links, notification bell, and user avatar.
  - Breadcrumbs: `All Courses > [Course Title]` linking back to catalog.
  - Hero section (2-column layout):
    - Left: Large rounded cover image card (`aspect-square` ~320px).
    - Right: POPULAR pill badge (if `popular`), large serif title (`text-[40px]`), summary text, 4-item metadata row (Level, Total Duration, Modules Count, Student Count), and action buttons ("Continue Learning" with arrow, "Bookmark" button).
  - "What you'll learn" card: Large white container with 2x2 grid of learning outcome cards with warm stroke outline icons, title, and description.
  - "Course Content" section: Header with `X modules • Yh Zm`, followed by an accordion of module cards with numbered circles (`1`, `2`, `3`...), title, summary, module duration, chevron indicator, and expandable list of lesson items with play icon, title, duration, and free preview badge.
  - Bottom Progress Bar: Floating / footer bar with "Your Progress", completion percentage, progress indicator, and "Continue Learning" button.
  - Ambient glowing pillars background at the bottom.
- `sanity/lib/data.ts`: `getCourseBySlug(slug)` and `getCourses()`.
- `sanity/lib/queries.ts`: `COURSE_BY_SLUG_QUERY`.
- `components/ui/*`: `Navigation`, `Breadcrumbs`, `Button`, `ProgressBar`, `Badge`, `icons.tsx`.
- `next.config.ts`: Configures image optimization and remote patterns for `cdn.sanity.io`.

---

## 4. Decisions and Assumptions
- **App Router Architecture**:
  - `app/courses/[slug]/page.tsx` is a Server Component that fetches course data via `getCourseBySlug(slug)` on the server with private dataset read token.
  - Includes `generateStaticParams()` to pre-render all 10 seeded courses.
  - Includes `generateMetadata()` for dynamic page title and OpenGraph tags.
  - Handles invalid slugs with Next.js `notFound()`.
- **UI & Client Components**:
  - `components/course/course-detail-view.tsx`: Client container rendering the course detail view, breadcrumbs, hero, learning outcomes grid, module accordion, and sticky progress bar.
  - `components/course/course-modules-accordion.tsx`: Interactive accordion allowing learners to expand/collapse modules and see individual lesson rows with durations and free preview badges.
- **Visual Faithfulness**:
  - Exact match of colors (`#FAFAFC` background, `#F97316` primary orange, `#0F172A` neutral-900 typography, `#FFF1EB` popular pill, borders, shadow styles).
  - Responsive adaptation: On mobile, hero stacks vertically (cover image full width or centered square), learning outcomes stack to 1 column, bottom progress bar wraps gracefully.
- **Link & CTA Target**:
  - Primary CTA "Continue Learning" / "Start Course" links to the course's first lesson URL (`/courses/${course.slug.current}/lessons/${firstLesson.slug.current}` or first module lesson).
  - Each lesson row in the accordion links to its lesson page.

---

## 5. Files Expected to Touch
- `prompts/implement-vertex-course-page.md` [NEW]
- `app/courses/[slug]/page.tsx` [NEW]
- `components/course/course-detail-view.tsx` [NEW]
- `components/course/course-modules-accordion.tsx` [NEW]
- `components/ui/icons.tsx` [MODIFY] (add learning outcome icon mappings)
- `next.config.ts` [MODIFY] (add `images.remotePatterns` for `cdn.sanity.io`)

---

## 6. Requirements
1. **Server Data Integration**:
   - Fetch complete course data from Sanity via `getCourseBySlug(slug)`.
   - Render course cover image using `urlFor(course.coverImage).url()`.
   - Derive module numbers (`1`, `2`, `3`...), total lesson counts, and format durations (`Xh Ym`).
2. **Design Reproduction**:
   - Replicate the exact layout, spacing, typography (serif headings, sans body), and colors from `design/vertex-course.png`.
   - Render the "What you'll learn" grid with corresponding icons for all learning outcomes.
   - Render the "Course Content" accordion with expandable lesson lists.
   - Render the bottom progress bar card with completion status and continue CTA.
3. **Responsiveness & Accessibility**:
   - Fluid responsive layout down to mobile viewports (375px+).
   - Semantic HTML (`<main>`, `<section>`, `<nav>`, `<h1>`, `<h2>`, `<button>`).

---

## 7. Security Considerations
- Sanity read token remains strictly server-side inside `sanity/lib/server-client.ts`.
- No sensitive keys or tokens are passed to client components.

---

## 8. Acceptance Criteria
- [ ] Navigating to `/courses/[slug]` (e.g. `/courses/nextjs-app-router-in-depth`) renders the complete course detail page.
- [ ] Cover image, title, summary, level, duration, module count, and student count match Sanity data.
- [ ] "What you'll learn" renders all course learning outcomes with warm outline icons.
- [ ] "Course Content" renders all modules and allows expanding/collapsing lesson lists.
- [ ] All 10 seeded courses resolve and render without errors.
- [ ] Invalid slug returns 404 via `notFound()`.
- [ ] `npx tsc --noEmit` and `npm run lint` pass with 0 errors.
- [ ] `npm run build` succeeds cleanly.

---

## 9. Checks to Run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

---

## 10. Manual Test Steps
1. Run `npm run dev` and navigate to `http://localhost:3000/courses/nextjs-app-router-in-depth`.
2. Verify visual match with `design/vertex-course.png`:
   - Hero cover image, title, summary, popular badge, metadata row, CTA buttons.
   - "What you'll learn" 2x2 outcomes grid.
   - "Course Content" module accordion with lesson rows and durations.
   - Bottom progress bar with continue CTA.
3. Click module accordion headers to verify smooth expanding and collapsing of lessons.
4. Test with other seeded courses (e.g. `/courses/building-ai-apps-with-llms`, `/courses/react-performance-engineering`).
5. Resize browser to mobile width (< 640px) to verify responsive stacking and layout.
