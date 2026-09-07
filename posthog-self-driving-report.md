# PostHog Self-driving setup report

PostHog Self-driving is now configured for Vertex. Session replay, error tracking, and support products were enabled; six native signal sources are wired; the scout troop is tuned to 8 active scouts including 3 custom ones for Vertex's unique surfaces; and two Replay Vision scanners are watching course and lesson recordings. Findings will start appearing in your [Self-driving inbox](https://us.posthog.com/project/576528/inbox) within ~30 minutes.

---

## AI data processing

**Status:** Approved. Organization-level AI data processing consent was granted before this run (enforced by the wizard's auth gate).

---

## GitHub

**Status:** Connected during this run.

- Integration ID: `255237`
- Account: `MarcoMynous`
- Connected at: 2026-08-27T14:55:02Z
- Self-driving can now research findings in your code and open draft fix PRs.

---

## Products enabled

| Product | Status | Notes |
|---|---|---|
| Session Replay | **Already enabled** | Recordings confirmed; `posthog.init` has no `disable_session_recording` override — clean |
| Error Tracking | **Enabled** | `capture_exceptions: true` already set in `instrumentation-client.ts` — consistent |
| Support (Conversations) | **Enabled** | Tickets will reach the inbox once an inbound channel is connected — see Follow-ups |

---

## Signal sources

| Source product | Source type | Action |
|---|---|---|
| `health_checks` | `health_issue` | **Enabled** (id: `01a043b8-a798-7dfd-817a-50e839c2936e`) |
| `error_tracking` | `issue_created` | **Enabled** (id: `01a043b8-abaa-7c98-b241-e03f825505bf`) |
| `error_tracking` | `issue_reopened` | **Enabled** (id: `01a043b8-adf5-779e-9de9-d32d1401963d`) |
| `error_tracking` | `issue_spiking` | **Enabled** (id: `01a043b8-b363-7f6b-8d73-f0a16ce70155`) |
| `session_replay` | `session_analysis_cluster` | **Enabled** (id: `01a043b8-b662-7c2d-956e-c9d3b015e416`, sample_rate: 0.1) |
| `conversations` | `ticket` | **Enabled** (id: `01a043b8-bad2-744b-b3f0-b3df45faa093`) |
| `signals_scout` | `cross_source_issue` | **Enabled by default** — no config row needed; scout findings reach the inbox automatically |
| `replay_vision` | — | **Self-authorizing** — scanners set `emits_signals: true` directly; no config row needed |

---

## Connected tools

No connected-tool sources were selected. All external tool connectors (GitHub Issues, Linear, Jira, Sentry, Zendesk, and others) were offered and declined.

| Tool | Status |
|---|---|
| GitHub Issues | Not used |
| Linear | Not used |
| Jira | Not used |
| Sentry | Not used |
| Zendesk | Not used |

---

## Scout troop

Run budget: **could not be read** (`scout-metadata-get` returned a network error). The published early-access default is 100 runs per day — treat that as the assumed limit, not a confirmed one for this project.

**8 scouts active** (general + 4 built-in specialists + 3 custom) — well under the 10-scout quality ceiling.

### Enabled

| Scout | Why |
|---|---|
| `signals-scout-general` | Always on — cross-product correlations and unspecialized surfaces |
| `signals-scout-product-analytics` | posthog-js installed; primary analytics product for Vertex |
| `signals-scout-web-analytics` | Web analytics listed as set up; Next.js web app where traffic patterns matter |
| `signals-scout-health-checks` | Fresh setup — catches instrumentation issues early (missing events, proxy gaps, SDK version drift) |
| `signals-scout-observability-gaps` | New project — surfaces events with no insight/dashboard/alert coverage to guide what to build next |
| `signals-scout-learning-funnel` | **Custom** — watches course→lesson→completion funnel for conversion regressions; uncovered by built-ins |
| `signals-scout-search-quality` | **Custom** — watches AI-powered search for zero-result rate and click-through degradation; uncovered by built-ins |
| `signals-scout-video-engagement` | **Custom** — watches per-lesson video watch-through rates; uncovered by built-ins |

### Disabled (with reason)

| Scout | Reason |
|---|---|
| `signals-scout-error-tracking` | Covered by the native `error_tracking` source (steps 4); enabling both duplicates findings |
| `signals-scout-session-replay` | Covered by the native `session_replay` source (step 4); same duplication concern |
| `signals-scout-ai-observability` | No `$ai_*` events or LLM SDK in use yet — enable when AI observability is instrumented |
| `signals-scout-apm` | No APM/OpenTelemetry tracing configured |
| `signals-scout-conversations` | No support channel connected yet; enable once a channel is live |
| `signals-scout-csp-violations` | No Content-Security-Policy reporting configured |
| `signals-scout-customer-analytics` | No group/accounts analytics in use |
| `signals-scout-data-pipelines` | No CDP destinations or batch exports configured |
| `signals-scout-data-warehouse` | No data warehouse sources connected |
| `signals-scout-experiments` | No A/B experiments in use yet — enable when experiments start |
| `signals-scout-feature-flags` | No feature flags in use yet — enable when flags are created |
| `signals-scout-inbox-validation` | Fresh setup — no resolved reports to validate yet |
| `signals-scout-insight-alerts` | No configured insight alerts yet |
| `signals-scout-logs` | PostHog logs product not in use |
| `signals-scout-mcp-tool-calls` | No `$mcp_tool_call` telemetry |
| `signals-scout-replay-vision` | Keeps off intentionally here — reads trends *across* accumulated observations; no history yet |
| `signals-scout-revenue-analytics` | No payment SDK or revenue data |
| `signals-scout-skills-store` | Not applicable for this project type |
| `signals-scout-surveys` | No surveys in use |
| `signals-scout-tasks` | Minimal PostHog task usage |
| `signals-scout-web-vitals` | No `$web_vitals` events confirmed |
| `signals-scout-anomaly-detection` | No dashboards/insights saved yet — enable once you have a few key insights |

To re-enable any of these later, go to your inbox settings in PostHog.

**Noise escape hatch:** if any scout turns noisy, set `emit: false` on its config in PostHog — that switches it to dry-run (it still runs and logs, but writes nothing to the inbox).

---

## Custom scouts

Three custom scouts were proposed and approved. Each fills a gap the built-in troop doesn't cover for a learning platform.

### `signals-scout-learning-funnel`

- **Watches:** The core learning funnel — course page views → lesson page views → `lesson_completed` events
- **Discriminator:** Lesson completion rate (completions / lesson views) drops >10% period-over-period while lesson view volume holds within 20%
- **Why uncovered:** `signals-scout-product-analytics` watches *saved* funnels and retention insights; none exist yet and the custom scout queries raw events directly
- **Closes out quietly** when `lesson_completed` count < 10 in 14 days (monitors itself before burning a run)

### `signals-scout-search-quality`

- **Watches:** AI-powered search — zero-result rate and search-to-lesson click-through rate
- **Discriminator:** Zero-result rate up >5 percentage points OR click-through rate down >15% week-over-week while search volume holds
- **Why uncovered:** `signals-scout-web-analytics` tracks session volume and attribution; neither it nor `signals-scout-general` monitors search quality metrics specific to an AI-search experience
- **Closes out quietly** when `search_performed` count < 5 in 7 days

### `signals-scout-video-engagement`

- **Watches:** Per-lesson video watch-through rates — median `watch_percentage` per lesson
- **Discriminator:** A lesson's median watch-through drops >15 percentage points vs. prior period (for lessons ≥5 plays), OR >60% of plays show <30% watch-through (chronic signal)
- **Why uncovered:** No built-in scout watches video engagement depth; product-analytics watches funnels, not video-specific metrics
- **Closes out quietly** when `video_played` count < 10 in 14 days

**Surfaces considered and ruled out:**

| Surface | Filter that killed it |
|---|---|
| Auth funnel (signup → course enroll) | Same step-level discriminator as the learning funnel — covered by overlap |
| Sanity data sync health | Not a PostHog event surface — no events to watch |

---

## Replay Vision scanners

Replay Vision scanners are LLMs that watch individual session recordings on a schedule and push what they find directly to the inbox. Findings arrive at **half weight** — corroboration from a second observation is needed before a report is promoted. Each scanner spends Replay Vision quota (credits); the project currently has **0 observations this month**.

Two monitors were created with `emits_signals: true`:

| Scanner | Type | Query scope | Sampling rate | Est. monthly credits |
|---|---|---|---|---|
| Vertex course and lesson breakage | monitor | Sessions with URL containing `/courses/` | 0.5 | 0 (no recordings on-scope yet) |
| Vertex learner frustration | monitor | Sessions with a `$rageclick` event | 1.0 | 0 (no rage-click recordings yet) |

**Breakage monitor** (`Vertex course and lesson breakage`): scoped to course and lesson pages — the core completion flow where a visible break has the highest user impact. Watches for broken video embeds, empty module lists, unresponsive buttons, search errors, and mid-session auth prompts.

**Frustration monitor** (`Vertex learner frustration`): gated on `$rageclick` events (high-precision entry gate). Watches for learners stuck on video playback, navigation, search, or module controls.

**Query disjointness:** the breakage monitor owns the *where* axis (URL scope on `/courses/`); the frustration monitor owns the *what they did* axis (`$rageclick` gate only). The queries are intentionally disjoint to prevent the same defect from self-corroborating.

The project currently has recordings (confirmed in setup), so scanners begin observing immediately. Session recordings from `localhost:3000` are captured — production recordings will flow once the app is deployed to a public URL.

---

## Follow-ups

- [ ] **Connect a Support inbound channel** — Conversations is enabled, but tickets only reach the inbox after you connect an email, inbox, or Slack channel in PostHog → [Settings → Conversations](https://us.posthog.com/project/576528/settings)
- [ ] **Instrument custom events** — the three custom scouts (`lesson_completed`, `search_performed`, `video_played`) need these events capturing in your app before they produce findings. Wire them in your PostHog analytics instrumentation per the event names the scouts expect.
- [ ] **Enable `signals-scout-feature-flags`** once feature flags are created in PostHog
- [ ] **Enable `signals-scout-experiments`** once A/B experiments are running
- [ ] **Enable `signals-scout-anomaly-detection`** once you have a few saved insights and dashboards
- [ ] **Enable `signals-scout-replay-vision`** (the trend-reading analyst scout) once the Replay Vision scanners have accumulated several weeks of observations
- [ ] **Verify scout run budget** — `scout-metadata-get` failed during this run; check your project's actual daily budget in PostHog to confirm it matches the 100-runs/day early-access default
- [ ] **Deploy to production** — current session recordings are from `localhost:3000`; real learner sessions will flow once the app is live at a public URL

---

## What happens next

- The scout coordinator picks up fresh configs within **~30 minutes** and begins running the 8 enabled scouts on their daily schedules
- Each scout run draws from the project's daily run budget (100/day default during early access, unconfirmed for this project)
- Session recordings matching the Replay Vision scanner queries are analyzed continuously
- Findings cluster into reports in your [inbox](https://us.posthog.com/project/576528/inbox)
- Immediately-actionable reports can auto-start coding tasks via Self-driving
