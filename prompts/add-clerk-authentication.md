# Implementation Prompt: Add Clerk Authentication

## 1. Goal
Set up and integrate **Clerk Authentication** into Vertex using the Clerk CLI linked to Clerk application `app_3IPliaMzSShwI5fxfKASNcDbVHt`. This includes CLI verification/installation, authentication via `clerk auth login`, initializing Clerk with `@clerk/nextjs`, configuring Next.js proxy/middleware, placing `ClerkProvider` inside `<body>` in `app/layout.tsx`, integrating auth controls (`SignInButton`, `SignUpButton`, `Show`, `UserButton`) seamlessly into the navigation header, and verifying the setup with `clerk doctor`.

---

## 2. Skills & References Read
- `AGENTS.md` (Tech stack, Clerk auth boundaries, rules for server/client keys, check protocols)
- `clerk` (`.agents/skills/clerk/SKILL.md`)
- `clerk-cli` (`.agents/skills/clerk-cli/SKILL.md`)
- `clerk-setup` (`.agents/skills/clerk-setup/SKILL.md`)
- `clerk-nextjs-patterns` (`.agents/skills/clerk-nextjs-patterns/SKILL.md`)
- `clerk-custom-ui` (`.agents/skills/clerk-custom-ui/SKILL.md`)
- Next.js App Router documentation (`node_modules/next/dist/docs/`)

---

## 3. Code & Configuration Inspected
- `package.json`: Next.js 16.3.3, React 19.2.8, Tailwind CSS v4.
- `app/layout.tsx`: Root layout with `Inter` and `Playfair_Display` fonts, currently without `ClerkProvider`.
- `components/ui/navigation.tsx`: Header navigation component currently rendering static avatar and bell placeholder.
- `app/page.tsx`: Vertex home page using `Navigation`.
- Environment & CLI: Target Clerk application is `app_3IPliaMzSShwI5fxfKASNcDbVHt`.

---

## 4. Decisions and Assumptions
- **Clerk CLI Execution**:
  - Verify and update or install Clerk CLI.
  - Run `clerk auth login` to ensure authentication before initialization.
  - Run `clerk init --app app_3IPliaMzSShwI5fxfKASNcDbVHt` to link the repository to the specified application and install `@clerk/nextjs`.
- **Next.js 16 Proxy / Middleware**:
  - Verify or configure `proxy.ts` / `middleware.ts` with Clerk's `clerkMiddleware()` helper.
  - Ensure `config.matcher` includes `'/(api|trpc)(.*)'` followed by `'/__clerk/:path*'`.
- **Layout & Provider Placement**:
  - Wrap `{children}` inside `<body>` with `<ClerkProvider>` in `app/layout.tsx` (never wrap `<html>`).
- **UI Integration in Navigation**:
  - Update `components/ui/navigation.tsx` using `@clerk/nextjs` components:
    - When signed out (`<Show when="signed-out">`): Display polished "Sign In" and "Sign Up" buttons matching Vertex design system.
    - When signed in (`<Show when="signed-in">`): Display notifications bell and `<UserButton />`.
- **Design System Consistency**:
  - Style sign-in / sign-up buttons using existing Tailwind tokens (`primary-500`, `neutral-700`, `neutral-900`, rounded corners, typography).
- **Security & Secrets**:
  - Keep `CLERK_SECRET_KEY` server-side only; only `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` may reach the client.

---

## 5. Files Expected to Touch
- `package.json` / `package-lock.json` (Add `@clerk/nextjs`)
- `proxy.ts` or `middleware.ts` (Clerk middleware and matcher configuration)
- `app/layout.tsx` (Wrap body contents with `ClerkProvider`)
- `components/ui/navigation.tsx` (Integrate `SignInButton`, `SignUpButton`, `Show`, `UserButton`)
- `.env.local` / `.env` (Created/updated by `clerk init` with Clerk keys)

---

## 6. Requirements
1. **Clerk CLI Setup**:
   - Check if `clerk` CLI is installed; update if present, or install latest via `npm install -g clerk`.
   - Run `clerk auth login`.
   - Run `clerk init --app app_3IPliaMzSShwI5fxfKASNcDbVHt`.
2. **Next.js Integration**:
   - Configure Next.js middleware with `clerkMiddleware()` and proper matcher (`/(api|trpc)(.*)` and `/__clerk/:path*`).
   - Add `<ClerkProvider>` in `app/layout.tsx` inside `<body>`.
3. **Navigation Auth Controls**:
   - Integrate `<Show when="signed-out">` with `<SignInButton mode="modal">` and `<SignUpButton mode="modal">`.
   - Integrate `<Show when="signed-in">` with `<UserButton />` and notifications bell.
4. **Verification**:
   - Run `clerk doctor` to confirm health.
   - Run TypeScript type checks and linting to ensure zero errors.

---

## 7. Security Considerations
- Never expose `CLERK_SECRET_KEY` in client-side code or browser bundles.
- Keep browsing public as specified in `AGENTS.md` and gate protected routes through middleware/server-side checks as features require.
- Ensure `.env.local` containing keys is ignored in `.gitignore`.

---

## 8. Acceptance Criteria
- [ ] Clerk CLI installed and authenticated.
- [ ] Project initialized with Clerk application `app_3IPliaMzSShwI5fxfKASNcDbVHt`.
- [ ] `@clerk/nextjs` installed and configured in `app/layout.tsx` and `proxy.ts` / `middleware.ts`.
- [ ] Navigation displays sign-in and sign-up actions when signed out.
- [ ] Navigation displays `<UserButton />` when signed in.
- [ ] `clerk doctor` passes without blocking errors.
- [ ] `npm run lint` passes with 0 errors.
- [ ] `npx tsc --noEmit` passes with 0 errors.
- [ ] `npm run build` passes cleanly.

---

## 9. Checks to Run
- `clerk doctor`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

---

## 10. Manual Test Steps
1. Start the development server with `npm run dev`.
2. Open `http://localhost:3000` in the browser.
3. Verify that the navigation bar shows "Sign in" and "Sign up" buttons when signed out.
4. Click "Sign up" or "Sign in" to open the Clerk modal and authenticate.
5. Verify that upon signing in, the navigation bar updates to display the `<UserButton />` avatar and notifications bell.
6. Click `<UserButton />` to verify account management controls open properly.
7. Sign out and confirm the UI reverts back to the "Sign in" / "Sign up" buttons.
