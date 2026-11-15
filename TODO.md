# Capy Active Sprint Execution Queue (`TODO.md`)

Focused **Sprint 1 Queue** (EPIC-2 | Milestone #2). Holds **only** approved, unblocked `1-PR` slices for the active sprint (`--base beta`). Strategic Epics, unapproved features (EPIC-3), and shipped archives live in [`ROADMAP.md`](./ROADMAP.md); workflow & GitHub CLI rules live in [`PROJECT.md`](./PROJECT.md#2-lean-agile-lifecycle-and-backlog-governance).

**Related Guides**: [`README.md`](./README.md) | [`PROJECT.md`](./PROJECT.md) | [`ROADMAP.md`](./ROADMAP.md) | [`DEV.md`](./DEV.md) | [`WEB.md`](./WEB.md) | [`PUZZLE.md`](./PUZZLE.md) | [`APP.md`](./APP.md) | [`CLOUD.md`](./CLOUD.md) | [`TESTING.md`](./TESTING.md) | [`CHANGELOG.md`](./CHANGELOG.md)

---

## Sprint 1 Dev Queue (`v3.0.x` Stabilization)

Zero active contributor dev tasks remain in `TODO.md`—`v3.0.19` Android TV Leanback manifest/banner (`LEANBACK_LAUNCHER`, `320x180` `tv_banner.png`), 100% ad-free `privacy-policy.html` alignment, `AndroidTvManifestAndBridgeTest.kt` + Node TV static checks, and CI review workflow `CI-3.8-flash`/`CI-4-argon`/`ACTIONS_GITHUB_TOKEN`/`synchronize` unit tests alongside `dev environment config` & cutover tracking (#544) are staged on `beta`, and all prior Sprint 1 stabilization and UI slices (`v3.0.2`--`v3.0.18`) are promoted to `main` (`Production`) (`v3.0.2`--`v3.0.8` via #501; `v3.0.9`--`v3.0.13` via #517--#532; `v3.0.14`--`v3.0.18` via #538). Earlier `v3.0.0`--`v3.0.1` Production slices: `BUG-1` & `BUG-3` (#484, #485), `BUG-2` (#485), and `BUG-5` mobile `GameTopBar` overlap & `99%` progress cap (#486, promoted to `main` in #488). Promoted to `main` (`v3.0.2`--`v3.0.18`): prebaked sample `1x` viewport reset & one-click PR approval workflow (#490), prior `TASK-2.5` backlog sync (#487), CI/CD & governance hardening (#491--#494), `TASK-2.6` post-load replay controls, `Capy Forest` default, onboarding tutorial & `About` tab (#489), `v3.0.7` storage sandbox isolation, DPR/settings/import/deep-link/Play Games fixes & `.changelog/` / Epic tracker automation (#495), cross-chat `status notes` coordination rule (#496), `v3.0.8` topbar zoom pill removal & 360px `SettingsModal` tab clipping fix (#497), backlog/roadmap & `%`-first PR checklist governance (#502, #509), `main -> beta` `project docs` syncs (#499, #500, #504, #505, #507, #508), `v3.0.9` `PaletteDock` replay visibility & `Saves` tab `Thumbnails` list-first layout (#517), `v3.0.10` Low-Vision Large Text mode, sorted/centered `PaletteDock` & default Undo (#518), `v3.0.11` 14-step `OnboardingTutorial`, 9 `FeatureOfferBanner` quick tips & 100% PR/review workflows (#519), `100%` PR checklist & `beta` syncs (#520, #522, #524, #526), CapyBoop handbook (#521), `v3.0.12` tutorial target spotlight ring, replay auto-dismiss & mobile badge polish (#523), `v3.0.13` viewport-save progress preservation, async Android/E2E/Pages CI speedup & strict `100%` CI auto-merge (#528, #530, #531, #532), and `v3.0.14`--`v3.0.18` review workflow, storage/canvas/Co-op, Android API 36/bridge, E2E wait, and viewport-save reload hardening (#534, #535, #537, #539, #540). `TASK-2.5` (Android App Verification & Google Play Store Deployment) moved to EPIC-3 in [`ROADMAP.md`](./ROADMAP.md#2-epic-3-touch-assist-sensory-polish-retention-accessibility--replays-awaiting-owner-review--approval). Delete #543 — Production capypaint.com DNS, Cloudflare Worker & /env-setup cutover below once shipped to Production.

## Release & Human Ops Gates

### #543 — Production capypaint.com DNS, Cloudflare Worker & /env-setup cutover

- **Status**: `Open -- Human Ops Gate (Cloudflare Nameservers Active; Awaiting Dashboard DNS Cleanup & Workers Builds Cutover)`
- **Live & Target Links**: [capypaint.com](https://capypaint.com/) | [www.capypaint.com](https://www.capypaint.com/) | [capypaint.com/api/health](https://capypaint.com/api/health) | [Capy Production (GitHub Pages)](https://capyboop.github.io/capy/) | [Capy Beta (GitHub Pages)](https://capyboop.github.io/capy/beta/)
- **Action**: Delete the legacy Squarespace `A`/`CNAME` records on `@` and `www` in [Cloudflare Dashboard](https://dash.cloudflare.com/) (nameservers `guy.ns.cloudflare.com` and `maleah.ns.cloudflare.com` are already active, with zero `MX` records), connect [capyboop/paint](https://github.com/capyboop/paint) (`main`) to Cloudflare Workers Builds per [`CLOUD.md` Section 4](./CLOUD.md#4-step-by-step-developer-guide-deploying-capypaintcom-and-capyboopcom-on-cloudflare-workers), and add the [www.capypaint.com](https://www.capypaint.com/) to [capypaint.com](https://capypaint.com/) edge `301` Redirect Rule.
- **Value**: Replaces the Squarespace placeholder on [capypaint.com](https://capypaint.com/) with the live `v3.0.x` production SPA, `/api/health`, and `CoopRoomDurableObject` WebSocket relay.

<details>
<summary>Engineering Metadata, Estimates, Files & Acceptance Criteria</summary>

- **Type & Priority**: `Environment & Ops` (supersedes legacy `BUG-4`) | EPIC-2 (Milestone #2) | `priority: critical` | `domain: cloud, ci`
- **Model & Estimate**: `ops` (Human Cloudflare Dashboard Cutover)
- **Target Files**: `dev environment config`, [`wrangler.jsonc`](./wrangler.jsonc), [`worker/index.ts`](./worker/index.ts), [`.github/workflows/deploy-cloudflare.yml`](./.github/workflows/deploy-cloudflare.yml), [`CLOUD.md`](./CLOUD.md)
- **Acceptance Criteria**:
  - [capypaint.com](https://capypaint.com/) serves the live Capy Paint SPA and [www.capypaint.com](https://www.capypaint.com/) `301`-redirects to [capypaint.com](https://capypaint.com/).
  - [capypaint.com/api/health](https://capypaint.com/api/health) returns `{"ok":true,"service":"capy-paint",...}` and `wss://capypaint.com/api/room?room=<ROOM6>` upgrades to `CoopRoomDurableObject`.

</details>

### Companion Studio Domain: [capyboop.com](https://capyboop.com/) (`CapyGame 3D` Cloudflare Workers & Non-Fork Mirror)

- **Status**: `Open -- Human Ops Gate (Currently serving stale unbuilt v2.5.11 source HTML; awaiting public Cloudflare Workers cutover)`
- **Live & Target Links**: [capyboop.com](https://capyboop.com/) | [www.capyboop.com](https://www.capyboop.com/) | [CapyGame (GitHub Pages)](https://capyboop.github.io/capygame/) | [capyboop/paintgame](https://github.com/capyboop/paintgame) | [capyboop/paintgame](https://github.com/capyboop/paintgame)
- **Action**: Recreate [capyboop/paintgame](https://github.com/capyboop/paintgame) as a standalone non-fork public repository (paired with `release token`), connect it to Cloudflare Workers Builds in [Cloudflare Dashboard](https://dash.cloudflare.com/) retaining `public/_headers` (`COOP`/`COEP` headers for `SharedArrayBuffer` in `physics.worker.ts`) and `workers_dev: false`, and add a [www.capyboop.com](https://www.capyboop.com/) to [capyboop.com](https://capyboop.com/) edge `301` Single Redirect rule.
- **Value**: Replaces the stale unbuilt `v2.5.11` `/src/main.tsx` placeholder on [capyboop.com](https://capyboop.com/) with the compiled **CapyGame 3D** production bundle cleanly alongside [capypaint.com](https://capypaint.com/).
