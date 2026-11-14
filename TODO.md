# Capy Active Sprint Execution Queue (`TODO.md`)

Focused **Sprint 1 Queue** (EPIC-2 | Milestone #2). Holds **only** approved, unblocked `1-PR` slices for the active sprint (`--base beta`). Strategic Epics, unapproved features (EPIC-3), and shipped archives live in [`ROADMAP.md`](./ROADMAP.md); workflow & GitHub CLI rules live in [`PROJECT.md`](./PROJECT.md#2-lean-agile-lifecycle-and-backlog-governance).

**Related Guides**: [`README.md`](./README.md) | [`PROJECT.md`](./PROJECT.md) | [`ROADMAP.md`](./ROADMAP.md) | [`DEV.md`](./DEV.md) | [`WEB.md`](./WEB.md) | [`PUZZLE.md`](./PUZZLE.md) | [`APP.md`](./APP.md) | [`CLOUD.md`](./CLOUD.md) | [`TESTING.md`](./TESTING.md) | [`CHANGELOG.md`](./CHANGELOG.md)

---

## Sprint 1 Dev Queue (`v3.0.x` Stabilization)

Zero active contributor dev tasks remain in `TODO.md`—all approved Sprint 1 stabilization and UI slices (`v3.0.2`--`v3.0.8`) are promoted to `main` (`Production`) via #501 (`beta -> main`). Earlier `v3.0.0`--`v3.0.1` Production slices: `BUG-1` & `BUG-3` (#484, #485), `BUG-2` (#485), and `BUG-5` mobile `GameTopBar` overlap & `99%` progress cap (#486, promoted to `main` in #488). Promoted to `main` (`v3.0.2`--`v3.0.8` via #501): prebaked sample `1x` viewport reset & one-click PR approval workflow (#490), prior `TASK-2.5` backlog sync (#487), CI/CD & governance hardening (#491--#494), `TASK-2.6` post-load replay controls, `Capy Forest` default, onboarding tutorial & `About` tab (#489), `v3.0.7` storage sandbox isolation, DPR/settings/import/deep-link/Play Games fixes & `.changelog/` / Epic tracker automation (#495), cross-chat `status notes` coordination rule (#496), `v3.0.8` topbar zoom pill removal & 360px `SettingsModal` tab clipping fix (#497), backlog/roadmap & `%`-first PR checklist governance (#502, #509), and `main -> beta` `project docs` syncs (#499, #500, #504, #505, #507, #508). `TASK-2.5` (Android App Verification & Google Play Store Deployment) moved to EPIC-3 in [`ROADMAP.md`](./ROADMAP.md#2-epic-3-touch-assist-sensory-polish-retention-accessibility--replays-awaiting-owner-review--approval). Delete `BUG-4` below once shipped to Production.

## Release & Human Ops Gates

### BUG-4: `capypaint.com` Live DNS & Cloudflare Worker Cutover

- **Status**: `Open -- Human Ops Gate (Awaiting Cloudflare Zone & DNS Cutover)`
- **Action**: Point `capypaint.com` registrar nameservers to Cloudflare, connect the repository to Cloudflare Workers Builds per [`CLOUD.md` Section 4](./CLOUD.md#4-step-by-step-developer-guide-deploying-capypaintcom-on-cloudflare-workers), and add the `www.capypaint.com -> https://capypaint.com` edge `301` Redirect Rule.
- **Value**: Replaces the Squarespace "under construction" placeholder on `capypaint.com` with the live `v3.0.x` production SPA, `/api/health`, and `CoopRoomDurableObject` WebSocket relay.

<details>
<summary>Engineering Metadata, Estimates, Files & Acceptance Criteria</summary>

- **Type & Priority**: `Bug` | EPIC-2 (Milestone #2) | `priority: critical` | `domain: cloud, ci`
- **Model & Estimate**: `ops` (Human Cloudflare & Registrar Cutover)
- **Target Files**: [`wrangler.jsonc`](./wrangler.jsonc), [`worker/index.ts`](./worker/index.ts), [`.github/workflows/deploy-cloudflare.yml`](./.github/workflows/deploy-cloudflare.yml), [`CLOUD.md`](./CLOUD.md)
- **Acceptance Criteria**:
  - `https://capypaint.com/` serves the live Capy Paint SPA and `https://www.capypaint.com/` `301`-redirects to `https://capypaint.com/`.
  - `https://capypaint.com/api/health` returns `{"ok":true,"service":"capy-paint",...}` and `wss://capypaint.com/api/room?room=<ROOM6>` upgrades to `CoopRoomDurableObject`.

</details>
