# Capy Active Sprint Execution Queue (`TODO.md`)

Focused **Sprint 1 Queue** (EPIC-2 | Milestone #2). Holds **only** approved, unblocked `1-PR` slices for the active sprint (`--base beta`). Strategic Epics, unapproved features (EPIC-3), and shipped archives live in [`ROADMAP.md`](./ROADMAP.md); workflow & GitHub CLI rules live in [`PROJECT.md`](./PROJECT.md#2-lean-agile-lifecycle-and-backlog-governance).

**Related Guides**: [`README.md`](./README.md) | [`PROJECT.md`](./PROJECT.md) | [`ROADMAP.md`](./ROADMAP.md) | [`DEV.md`](./DEV.md) | [`WEB.md`](./WEB.md) | [`PUZZLE.md`](./PUZZLE.md) | [`APP.md`](./APP.md) | [`CLOUD.md`](./CLOUD.md) | [`TESTING.md`](./TESTING.md) | [`CHANGELOG.md`](./CHANGELOG.md)

---

## Sprint 1 Dev Queue (`v3.0.x` Stabilization)

Zero active contributor dev tasks remain in `TODO.md`—the Play Store compliance cleanup (`v3.0.19`--`v3.0.20` gating `cloud-coop-hub`/`topbar-coop-btn`/`cloud_coop` behind `isCloudCoopUiEnabled()` + [`docs/play-store/`](./docs/play-store/) graphics/screenshots #547, Android TV Leanback manifest/banner & ad-free `privacy-policy.html` #545, `dev environment config` #544, and the `v3.0.31` store-clean remediation removing Android `Optional Ad (+2)` / `AI Credits` / `showRewardedAd` + fake idea votes + default About/startup Play Games login leaks and syncing `PLAY_STORE_LISTING.md` + refreshed screenshots #571, with explicit post-launch deferral of Android TV D-pad `US-3.6` & TV Party `US-4.4`) alongside all prior Sprint 1 stabilization and UI slices (`v3.0.2`--`v3.0.18`: #501, #517--#532, #538; `v3.0.21`--`v3.0.24` via #556; and `v3.0.25`--`v3.0.30` including `deploy-cloudflare.yml` #550, `auto-merge` fallback #560, `test.mjs` standardization #563, pre-generated Max sample/daily archives #565, `lintVitalRelease` Android Fragment fix #566 promoted in #568, and `[E2E 12]` Daily race fix #569) keeps the branch ready for Human Ops `TASK-2.5` Play Console release upload (uploading Phone & Tablet builds/screenshots only; keep Android TV form factor unchecked until post-launch). Earlier `v3.0.0`--`v3.0.1` Production slices: `BUG-1` & `BUG-3` (#484, #485), `BUG-2` (#485), and `BUG-5` mobile `GameTopBar` overlap & `99%` progress cap (#486, promoted to `main` in #488). `TASK-2.5` (Play Console Keystore/Tag/Upload Ops) is tracked in EPIC-3 in [`ROADMAP.md`](./ROADMAP.md#2-epic-3-touch-assist-sensory-polish-retention-accessibility--replays-awaiting-owner-review--approval). Delete #543 — Production capypaint.com DNS, Cloudflare Worker & /env-setup cutover below once shipped to Production.

## Release & Human Ops Gates

### #543 — Production capypaint.com DNS, Cloudflare Worker & /env-setup cutover

- **Status**: `In Progress -- Apex & /api/health LIVE; Awaiting www 301 Edge Redirect, HTTPS Toggle & release token`
- **Live & Target Links**: [capypaint.com](https://capypaint.com/) | [www.capypaint.com](https://www.capypaint.com/) | [capypaint.com/api/health](https://capypaint.com/api/health) | [capyboop/paint Issues](https://github.com/capyboop/paint/issues) | [Capy Production (GitHub Pages)](https://capyboop.github.io/capy/) | [Capy Beta (GitHub Pages)](https://capyboop.github.io/capy/beta/)
- **Action**: [capypaint.com](https://capypaint.com/) (`capy-paint` Worker + `CoopRoomDurableObject`) is now live via [`.github/workflows/deploy-cloudflare.yml`](./.github/workflows/deploy-cloudflare.yml). Remaining Human Ops: add the [www.capypaint.com](https://www.capypaint.com/) to [capypaint.com](https://capypaint.com/) edge `301` Single Redirect rule, enable **Always Use HTTPS** in [Cloudflare Dashboard](https://dash.cloudflare.com/), and promote `beta` -> `main` once ready (`capyboop.com` deferred out of active Sprint 1 scope per project guideline).
- **Value**: Completes canonical HTTPS routing on [capypaint.com](https://capypaint.com/) and establishes [capyboop/paint](https://github.com/capyboop/paint/issues) as the clean public-facing issue tracker.

<details>
<summary>Engineering Metadata, Estimates, Files & Acceptance Criteria</summary>

- **Type & Priority**: `Environment & Ops` (supersedes legacy `BUG-4`) | EPIC-2 (Milestone #2) | `priority: critical` | `domain: cloud, ci`
- **Model & Estimate**: `ops` (Human Cloudflare Dashboard & GitHub PAT Config)
- **Target Files**: `dev environment config`, `.github/ISSUE_TEMPLATE/`, [`wrangler.jsonc`](./wrangler.jsonc), [`worker/index.ts`](./worker/index.ts), [`.github/workflows/deploy-cloudflare.yml`](./.github/workflows/deploy-cloudflare.yml), [`CLOUD.md`](./CLOUD.md)
- **Acceptance Criteria**:
  - [capypaint.com](https://capypaint.com/) serves the live Capy Paint SPA and [www.capypaint.com](https://www.capypaint.com/) `301`-redirects to [capypaint.com](https://capypaint.com/).
  - [capypaint.com/api/health](https://capypaint.com/api/health) returns `{"ok":true,"service":"capy-paint",...}` and `wss://capypaint.com/api/room?room=<ROOM6>` upgrades to `CoopRoomDurableObject`.
  - [capyboop/paint](https://github.com/capyboop/paint/issues) serves as the clean public-facing issue tracker (`Bug Report`, `Feature Request`, `Puzzle Idea` forms + automated public repository sync).

</details>
