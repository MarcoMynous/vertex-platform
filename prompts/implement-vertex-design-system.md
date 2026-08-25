# Implementation Prompt: Vertex Design System

## 1. Goal
Implement the complete, production-ready **Vertex Design System** for the Next.js web application based exactly on the design reference `design/vertex-designsystem.png`. This includes defining all foundational design tokens (colors, typography, spacing, border radii, shadows), icon set, UI primitives (buttons, inputs, selects, badges, status indicators, progress bar), complex cards (course, video lesson, standard lesson, resource), navigation patterns (header nav, breadcrumbs, pagination), and an interactive design system showcase page reproducing the reference design specification.

---

## 2. Skills & References Read
- `AGENTS.md` (Project core guidelines, UI reproduction fidelity, boundary constraints, check protocols)
- `sanity-best-practices` (`.agents/skills/sanity-best-practices/SKILL.md`)
- `create-agent-with-sanity-context` (`.agents/skills/create-agent-with-sanity-context/SKILL.md`)
- `dial-your-context` (`.agents/skills/dial-your-context/SKILL.md`)
- `shape-your-agent` (`.agents/skills/shape-your-agent/SKILL.md`)
- `node_modules/next/dist/docs/` (Next.js App Router guidelines, font optimization with `next/font/google`)

---

## 3. Code & Assets Inspected
- `design/vertex-designsystem.png`: High-resolution visual specification detailing colors (Primary 100-500, Neutral 50-900, White), typography (Playfair Display, Inter, 8-level type scale), spacing system (4px to 64px), radius tokens (4px to Full), shadows (Sm to Xl), icons (outline & filled 24x24px), buttons (Primary, Secondary, Tertiary, Text), inputs & selects (44px height, 12px radius, #E2E8F0 border, #FB923C focus), badges (Video, Lesson, Popular), status indicators (In Progress, Completed, Now Playing, Locked), progress bar (35% complete format), cards (Course, Lesson Video, Lesson Standard, Resource), navigation, breadcrumbs, pagination, and platform principles.
- `package.json`: Next.js 16.3.3, React 19.2.8, Tailwind CSS v4 (`tailwindcss: "^4"`, `@tailwindcss/postcss: "^4"`).
- `app/globals.css`: Base Tailwind CSS v4 `@import "tailwindcss";` and root CSS variable structure.
- `app/layout.tsx`: Root layout with font imports.

---

## 4. Decisions and Assumptions
- **Tailwind CSS v4 Token Architecture**: Use `@theme` directives in `app/globals.css` to declare the exact Vertex color palette (`--color-primary-100` to `--color-primary-500`, `--color-neutral-50` to `--color-neutral-900`), font families (`--font-playfair`, `--font-inter`), border radii, and shadows (`--shadow-sm` through `--shadow-xl`).
- **Typography Integration**: Import `Playfair_Display` and `Inter` via `next/font/google` in `app/layout.tsx` with CSS variable mapping (`--font-playfair`, `--font-inter`).
- **Component Primitives**: Build reusable, type-safe, accessible React/Tailwind components under `components/ui/` with clean APIs:
  - `components/ui/icons.tsx`: Optical SVG icon collection (Outline and Filled) adhering to the 24x24px grid and 2px stroke guidelines.
  - `components/ui/button.tsx`: Supporting `primary`, `secondary`, `tertiary`, `text` variants, hover/disabled states, 44px default height, 12px radius.
  - `components/ui/input.tsx` & `components/ui/select.tsx`: 44px height, 12px radius, `#E2E8F0` border, `#FB923C` focus ring, shortcut badge integration (`⌘K`).
  - `components/ui/badge.tsx`: `video`, `lesson`, `popular` badges with exact typography and palette mappings.
  - `components/ui/status-indicator.tsx`: `in-progress`, `completed`, `now-playing`, `locked`.
  - `components/ui/progress-bar.tsx`: Rounded bar with percentage indicator.
  - `components/ui/course-card.tsx`, `components/ui/lesson-card.tsx`, `components/ui/resource-card.tsx`: Exact replica of the 4 card types with metadata, badges, and action buttons.
  - `components/ui/navigation.tsx`, `components/ui/breadcrumbs.tsx`, `components/ui/pagination.tsx`: Nav bar with brand logo, breadcrumb hierarchy, and interactive pagination.
- **Showcase / Reference Page**: Build `app/page.tsx` (or a dedicated design system view) rendering the exact visual layout of `design/vertex-designsystem.png` numbered sections 01 through 14.
- **Responsiveness**: Maintain exact desktop layout as reference while allowing fluid flex/grid downscaling for smaller screens without layout breaks.

---

## 5. Files Expected to Touch
- `app/layout.tsx` (Configure `Inter` and `Playfair_Display` Google Fonts)
- `app/globals.css` (Define theme tokens, colors, type scale utility classes, shadows, radii)
- `components/ui/icons.tsx` (Icon system with 24x24 SVG definitions)
- `components/ui/button.tsx` (Button component with 4 variants and states)
- `components/ui/input.tsx` (Search and text inputs with shortcut badge)
- `components/ui/select.tsx` (Custom styled select component)
- `components/ui/badge.tsx` (Tag / Badge component)
- `components/ui/status-indicator.tsx` (Status indicator component)
- `components/ui/progress-bar.tsx` (Progress bar component)
- `components/ui/course-card.tsx` (Course card component)
- `components/ui/lesson-card.tsx` (Lesson card component for video and topic modes)
- `components/ui/resource-card.tsx` (Downloadable resource card)
- `components/ui/navigation.tsx` (Vertex navigation header)
- `components/ui/breadcrumbs.tsx` (Breadcrumb trails)
- `components/ui/pagination.tsx` (Pagination control)
- `app/page.tsx` (Full visual design system sheet showcasing sections 01-14)

---

## 6. Requirements
1. **01 Colors**:
   - Primary: 500 (`#F97316`), 400 (`#FB923C`), 300 (`#FDBA74`), 200 (`#FED7AA`), 100 (`#FFEEE5`).
   - Neutral: 900 (`#0F172A`), 700 (`#334155`), 500 (`#64748B`), 300 (`#CBD5E1`), 200 (`#E2E8F0`), 100 (`#F1F5F9`), 50 (`#FAFAFC`), White (`#FFFFFF`).
2. **02 & 03 Typography & Type Scale**:
   - Display 1: Playfair Display 48/56px Bold
   - Display 2: Playfair Display 36/44px Bold
   - Heading 1: Inter 28/36px SemiBold
   - Heading 2: Inter 22/30px SemiBold
   - Heading 3: Inter 18/26px Medium
   - Body Large: Inter 16/24px Regular
   - Body: Inter 14/20px Regular
   - Small: Inter 12/16px Regular
3. **04 Spacing**: 4px base (4, 8, 12, 16, 24, 32, 40, 48, 64).
4. **05 Radius & Shadows**:
   - Radius: 4px (xs), 8px (sm), 12px (md), 16px (lg), 24px (xl), Full (circle).
   - Shadows:
     - Sm: `0 1px 2px 0 rgba(15, 23, 42, 0.05)`
     - Md: `0 4px 12px -2px rgba(15, 23, 42, 0.08)`
     - Lg: `0 12px 24px -4px rgba(15, 23, 42, 0.10)`
     - Xl: `0 20px 40px -8px rgba(15, 23, 42, 0.12)`
5. **06 Icons**: Outline & filled variants on 24x24 grid, 2px stroke width, rounded caps.
6. **07 Buttons**: Primary (solid orange), Secondary (light orange border/bg), Tertiary (neutral border), Text (orange link with play icon). Default, hover, disabled states. Height 44px, radius 12px.
7. **08 Inputs**: Search Input with `⌘K` badge, Select dropdown with chevron. 44px height, 12px radius, `#E2E8F0` border, `#FB923C` focus.
8. **09 Badges**: Video (`#FFEEE5`/`#F97316`), Lesson (`#EFF6FF`/`#2563EB`), Popular (`#FFF7ED`/`#EA580C`).
9. **10 Status / Indicators**: In Progress, Completed, Now Playing, Locked.
10. **11 Progress Bar**: Orange track fill with trailing percentage text.
11. **12 Cards**: Course Card, Lesson Card (Video with "Watch from timestamp"), Lesson Card (Lesson with "View lesson"), Resource Card.
12. **13 Navigation**: Header nav (Vertex logo + links), Breadcrumbs (`All Courses > Next.js for Production > Data Fetching & Caching`), Pagination (`< [1] 2 3 ... 8 >`).
13. **14 Principles**: 4 principle cards (Clarity First, Consistency, Focus & Calm, Accessible).

---

## 7. Security Considerations
- All design system components are pure UI presentation primitives.
- No client-side exposure of secret keys or sensitive tokens.
- Safe SVG rendering without arbitrary HTML injection.

---

## 8. Acceptance Criteria
- [ ] All design tokens configured in CSS (`globals.css`) matching hex values, font families, shadows, and radii.
- [ ] Google fonts `Inter` and `Playfair_Display` loaded properly via `next/font/google`.
- [ ] Complete set of UI components implemented under `components/ui/`.
- [ ] Showcase page renders all 14 numbered sections matching `design/vertex-designsystem.png`.
- [ ] Responsive behavior working smoothly on mobile/tablet while maintaining desktop fidelity.
- [ ] TypeScript type checks pass (`tsc --noEmit`).
- [ ] ESLint lint checks pass (`npm run lint`).
- [ ] Next.js build succeeds (`npm run build`).

---

## 9. Checks to Run
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

---

## 10. Manual Test Steps
1. Run `npm run dev` and open `http://localhost:3000`.
2. Compare the live rendering of the design system page against `design/vertex-designsystem.png`.
3. Test hover and disabled states on buttons and links.
4. Test typing in the search input and selecting options in the dropdown.
5. Verify font rendering for Display 1/2 (Playfair Display) and Headings/Body (Inter).
6. Verify shadows, borders, and colors match the spec across cards, badges, and controls.
