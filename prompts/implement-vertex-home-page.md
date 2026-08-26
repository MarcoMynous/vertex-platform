# Implementation Prompt: Vertex Home Page

## 1. Goal
Implement the production-ready **Vertex Home Page** at `app/page.tsx` replicating the exact layout, typography, colors, spacing, and component states from `design/vertex-home.png`. Relocate the design system showcase to `app/design-system/page.tsx` so both surfaces remain accessible.

---

## 2. Skills & References Read
- `AGENTS.md` (Project specifications, UI reproduction fidelity, boundary constraints, check protocols)
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
- `create-agent-with-sanity-context` (`.agents/skills/create-agent-with-sanity-context/SKILL.md`)
- `dial-your-context` (`.agents/skills/dial-your-context/SKILL.md`)
- `shape-your-agent` (`.agents/skills/shape-your-agent/SKILL.md`)
- `node_modules/next/dist/docs/` (Next.js App Router conventions and performance)

---

## 3. Code & Assets Inspected
- `design/vertex-home.png`: Desktop visual specification for the Home page featuring:
  - Top navigation bar with Vertex logo, navigation links ("Courses", "My Learning"), notification bell, and user avatar.
  - Centered hero section with "INTELLIGENT LEARNING" pill badge, large Playfair Display serif heading ("Search your learning in plain English."), supporting subtitle, orange "Explore Courses ->" CTA button, and interactive search bar with `⌘ K` keyboard shortcut badge.
  - "All Courses" section with section heading, "View all courses ->" action link, and a 3-column course grid:
    1. Next.js for Production (Intermediate, 18h 24m, 12 modules)
    2. Docker Essentials (Beginner, 10h 12m, 8 modules)
    3. TypeScript Deep Dive (Intermediate, 14h 36m, 10 modules)
  - Footer banner: Centered star icon with "New courses and lessons added every week." flanked by subtle dividers.
  - Ambient warm gradient pillars graphic glow emerging from the bottom.
- `app/globals.css`: Theme tokens (Playfair Display, Inter, Primary colors #F97316-#FFEEE5, Neutral colors #0F172A-#FFFFFF, shadows, and radii).
- `components/ui/*`: Existing design system primitives (`Button`, `Input`, `CourseCard`, `Navigation`, `Icons`).

---

## 4. Decisions and Assumptions
- **Route Structure**:
  - `app/page.tsx`: The primary Home page matching `design/vertex-home.png`.
  - `app/design-system/page.tsx`: Relocated design system sheet preserving the full 14-section component showcase.
- **Visual Reproduction & Fidelity**:
  - Reproduce exact fonts (`Playfair Display` for Hero headline "Search your learning in plain English." and section title "All Courses"; `Inter` for body, labels, metadata).
  - Background: Warm off-white `#FAFAFC` with subtle diagonal background styling and orange ambient gradient silhouette at the bottom.
  - User Avatar & Bell: Top header includes interactive notifications bell and user avatar with graceful fallback image.
  - Course Cards: Render the 3 featured courses with custom SVG brand badges (Next.js "N", Docker whale, TypeScript "TS"), titles, descriptions, and metadata rows with icons.
  - Responsive downscaling: Desktop 3-column grid stacks cleanly into single-column or 2-column layout on tablet/mobile while preserving desktop proportions.

---

## 5. Files Expected to Touch
- `app/page.tsx` (Implement the Vertex Home page)
- `app/design-system/page.tsx` (Relocate the design system showcase)
- `components/ui/icons.tsx` (Add `StarOutlineIcon`, `DockerIcon`, `TypeScriptIcon`, `ArrowRightIcon`)
- `components/ui/navigation.tsx` (Enhance header navigation with right slot for notifications and avatar)
- `components/ui/course-card.tsx` (Ensure icon and typography styling match home page cards)

---

## 6. Requirements
1. **Header Navigation**:
   - Left: Vertex Logo + "Vertex" brand name, "Courses" link (active/bold), "My Learning" link.
   - Right: Notification bell icon with hover state, circular learner profile avatar.
2. **Hero Section**:
   - "INTELLIGENT LEARNING" pill badge with light orange background `#FFEEE5` and orange text `#F97316`.
   - Headline: "Search your learning in plain English." in Playfair Display Bold.
   - Subtitle: "Vertex understands what you want to learn and finds the exact lessons across all your courses." in Inter Regular.
   - Button: "Explore Courses ->" in solid Primary orange with hover transition.
   - Search input: 44px/48px height search input with search icon, "Ask anything about your learning..." placeholder, and `⌘ K` keyboard badge.
3. **Courses Section**:
   - Header: "All Courses" (Playfair Display) with "View all courses ->" link.
   - 3 Course cards:
     - Next.js for Production
     - Docker Essentials
     - TypeScript Deep Dive
4. **Footer Banner**:
   - Orange outline star icon + "New courses and lessons added every week."
   - Atmospheric warm gradient pillars at bottom.

---

## 7. Security Considerations
- Pure client/server presentation components with no exposed secrets or private tokens.
- Accessible, sanitized markup.

---

## 8. Acceptance Criteria
- [ ] Vertex Home page at `app/page.tsx` matches `design/vertex-home.png` layout, typography, colors, and components.
- [ ] Design system showcase preserved at `app/design-system/page.tsx`.
- [ ] Interactive elements (search input, buttons, navigation links) functional.
- [ ] Responsive down to mobile without visual regressions.
- [ ] `npm run lint` passes with 0 errors.
- [ ] `npx tsc --noEmit` passes with 0 errors.
- [ ] `npm run build` succeeds cleanly.

---

## 9. Checks to Run
- `npm run lint`
- `npm run build`

---

## 10. Manual Test Steps
1. Run `npm run dev` and navigate to `http://localhost:3000`.
2. Verify header navigation, logo, links, notifications bell, and user avatar.
3. Verify Hero section typography (Playfair Display for heading), pill badge, "Explore Courses" CTA, and search bar with `⌘ K` shortcut.
4. Verify the 3 course cards under "All Courses" with accurate icons (Next.js, Docker, TypeScript) and metadata.
5. Verify the star icon banner and bottom ambient glow.
6. Navigate to `http://localhost:3000/design-system` to verify the design system showcase remains fully functional.
