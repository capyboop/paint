### 3.0.7 - 2026-11-13 (Beta)

- Isolate alpha/beta preview browser storage (`StorageNamespace`), harden canvas DPR listeners and settings persistence, add `.changelog/` fragment compiler, fix `PaletteDock` accessibility labels, and sync Agile docs #495

### 3.0.6 - 2026-11-13

- Persist post-load replay controls until puzzle interaction, set Capy Forest as default puzzle, add interactive first-run tutorial, and move About tab first #489

### 3.0.5 - 2026-11-13

- Serve `/capy/alpha/` preview index manifest with `404.html` redirect from legacy `/capy/PR/NNN` and `/capy/pull/NNN` paths #491

### 3.0.4 - 2026-11-13

- Standardize GitHub Pages PR preview URLs to lowercase /capy/alpha/<num>/ with legacy /PR/ and /pull/ fallbacks and prune stale top-level pull/ and PR/ preview directories #492

### 3.0.3 - 2026-11-13

- Harden CI/CD workflow retries, Playwright E2E caching on beta PRs, main-to-beta sync workflow and dependency automation, and changelog/guide sanity checks #494

### 3.0.2 - 2026-11-13

- Establish PROJECT.md governance charter, split 3.0.1 vs 3.0.2 changelog channels, and reconcile Epics and backlog links #493
- Add 1-click GitHub PR approval workflow via bot-opened PRs, native review workflow tests, and prebaked sample viewport reset #490
- Add Android Play Store release to v3.0.1 scope and remove shipped Sprint 1 bugfixes from active queue #487

### 3.0.1 - 2026-11-12 (Production)

- Promote v3.0.1 mobile topbar and progress cap fixes to Production #488
- Fix mobile topbar badge overlap, cap incomplete puzzle progress at 99%, and log capypaint.com DNS cutover #486
- Prepare v3.0.0 beta release with Cloudflare Worker, Co-op relay hardening, mobile replay controls, and CI sanity gate #485

### 2.7 - 2026-11-12

- Fix Co-op save and rewind sync, Android large cloud saves, CRDT reset epochs, and mobile replay controls #484

### 2.6 - 2026-11-12

- Add capypaint.com Cloudflare Worker, Co-op relay security hardening, public export, and dual-approval CI gate #482

### 2.5 - 2026-11-11

- Document 3-artefact roadmap triad, GitHub Epic Issue CLI playbooks, and sprint lifecycle #483
- Add 3-tier Alpha/Beta/Production release pipeline, channel switcher, and GitHub Agile tracking #481
- Add sub-tile parent breadcrumbs, printable SVG sheets, and Co-op undo sync #475
- Split strategic ROADMAP.md from Sprint 1 TODO.md and add CIsprint playbooks #473
- Add daily featured puzzle, reduced motion, keyboard shortcuts, and lifetime stats #474
- Add zoom sensitivity, magnetic zoom stops, and procedural Web Audio tap effects #472
- Fix cache-eviction E2E test, replay speed grid, and atomic Android backups #471
- Standardize TODO.md under Lean Agile epics, stories, and collapsible task specs #470
- Add DEV.md, streamline project docs, and overhaul repository documentation and privacy policy #467
- Compact changelog headings for mobile, remove preamble, and group same-day patch releases #469
- Standardize historical PR metadata, move changelog rules to project docs, and add full PR history #468
- Resolve all remaining audit bugfixes from TODO #466
- Fix resize clamping, IndexedDB palette recovery, and Pixel API 33+ haptics #465
- Add YouTube-style playback scrubber and preserve viewport on replay #464
- Consolidate test suite, enhance save-load replay, and add AAA TODO roadmap #463

### 2.4 - 2026-11-10

- Add modular cloud provider drivers and Google Drive cross-device sync #461

### 2.3 - 2026-11-10

- Fix runtime sample resolution, canvas undo repaint, bundle splitting, and prioritize TODO.md #462

### 2.2 - 2026-11-10

- Add shareable progress links, simultaneous Co-op, CRDT Cloud Sync, and Play Store compliance #460

### 2.1 - 2026-11-10

- Preload sample save archive for instant first-launch gameplay #459

### 2.0 - 2026-11-10

- Add Compact Binary Storage v2 (.capy v2) and fix engine edge cases #458

### 1.4 - 2026-11-09

- Add min/max label size options, guarantee region fit, and redo circle-free hint color #457
- Set Fast Mode puzzle generation progress as default #456
- Show real generation metrics and live palette swatches during segmentation #455
- Add loading progress detail toggle and fast mode #454

### 1.3 - 2026-11-09

- Update project docs: Refine contributor and contributor operational rules #453
- Add PWA offline support and manifest #452
- Add working thoughts display and Web engine conventions to project docs #451
- Add ci and deps GitHub pull request labels to project docs #450
- Add thumbnails grid view, save pinning, and toolbar to Saves gallery #449

### 1.2 - 2026-11-09

- Fix Undo/Redo state synchronization and add post-replay auto-resume #448
- Add undo timeline scrubber and multi-step redo #447
- Add animated puzzle replay and region undo #446

### 1.1 - 2026-11-09

- Add screenshot showcase gallery and capture script #445
- Improve zoom pan gestures and color pickers #444
- Add PR merge approval rule and preview lifecycle docs #443
- Calibrate pan zoom gestures and sync preview assets #442

### 1.0 - 2026-11-08

- Add web architecture documentation #441
- Optimize CI builds and Pages deployment pipeline #440
- Add Free Colour mode, custom palette swatches, and Mushroom Forest sample #439
- Parallelize Web and Android CI workflows and streamline target execution #438
- Update Web dependencies, enable parallel Gradle sync, and add maintenance guides #437
- Add Android WebView debugging, bundle validation, and developer tooling #436
- Realign root architecture documentation and prune completed roadmap items #435
- Add automated closed pull request preview pruning for GitHub Pages #434
- Fix active color sync and auto-pan jumps and add victory celebration export #433
- Unify Web and Android single-codebase architecture with WebViewAssetLoader #432
- Consolidate Web, Legacy Web1, and Android apps into unified monorepo #431

### 0.9.3 - 2026-09-24

- Fix runtime bootstrap scope, default artwork loading, and UI load tests #430
- Rename menu and relocate advanced settings toggle #429
- Fix save manager SVG export handler #428
- Reorder settings tabs around Saves and Create #427
- Add SVG snapshot export to save manager #425
- Fix autosave refresh and smoke coverage #424
- Rework settings header layout #423
- Simplify controls layout in settings menu #421
- Move hint intensity controls to basics tab #420
- Drop raster save artifacts and rebuild maps from vector scenes #419

### 0.9.2 - 2025-12-05

- Wrap mobile settings tabs and update settings-menu.json schema #418
- Reduce settings sheet minimum dimensions and safe-area gaps on mobile #417
- Add configurable region cleanup controls #416
- Lower generator defaults for simpler puzzles #415
- Enforce upload resizing to stay within source image limit #414
- Clarify branch baseline guidance #413
- Render labels with SVG #412
- Remove binary artifact and document policy #411
- Polish vector sample rendering and docs #410
- Add vector scene loader and refresh sample puzzle #409

### 0.9.1 - 2025-12-04

- Handle save quota failures by trimming previews #408
- Fix deploy workflow concurrency scope and env URL #407
- Prefer human-readable region maps #406
- Enhance smoke test logging report #405
- Add render preview support to svg renderer #404
- Handle renderer resize safely #403
- Auto-generate settings sheet from JSON definition #402
- Prune unused runtime modules #401
- Consolidate runtime into capy.js #400
- Summarize processed branches in cleanup workflow #399

### 0.9.0 - 2025-11-28

- Expose runtime APIs as module exports #398
- Rewrite Pages deployment workflow #397
- Temporarily disable service worker and offline cache #396
- Simplify runtime to SVG renderer #395
- Expose runtime API via global object #394
- Preserve gh-pages preview directories during main deploy #393
- Export renderer controller inline #392
- Harden renderer controller fallback #391
- Avoid duplicate createRendererController export #390
- Refresh start hint onboarding UI #389

### 0.8.3 - 2025-11-28

- Restore renderer pipeline and fixtures #388
- Improve renderer wiring and tests #387
- Delete merged branches without cutoff #386
- Refine Playwright skip handling #385
- Enhance branch cleanup diagnostics #384
- Add debug listing to deploy workflow #383
- Refine responsive settings navigation and input control styles #382
- Handle gh-pages root cleanup #381
- Fix deployment artifact path for branch previews #380
- Remove outdated menu screenshot artifact #379

### 0.8.2 - 2025-11-27

- Add responsive tab stacking and themed input controls to settings sheet #378
- Register renderer mode change handler #377
- Add iterative development feedback loop guide #376
- Clarify renderer controller exports #375
- Simplify branch preview comment output #374
- Simplify runtime exports #373
- Fix service worker cache script loading on GitHub Pages #372
- Add console error check to UI smoke test #371
- Ensure deploy previews checkout into PR-specific pull directories #370
- Consolidate runtime exports #369

### 0.8.1 - 2025-11-26

- Fix duplicate renderer controller export #368
- Fix Pages artifact path for main deployments #367
- Fix runtime controller export #366
- Remove Pico CSS #365
- Restore custom styles and remove Pico import #364
- Add gh-pages artifact diagnostics to deploy workflows #363
- Add preboot metric fallbacks for blocked storage #362
- Fix branch deployment setup and linkify preview comments #361
- Improve deploy preview logging #360
- Gate Pages deploys to open PRs and refresh docs #359

### 0.8.0 - 2025-11-26

- Add renderer follow-up tasks #358
- Exclude project files from Pages deploy #357
- Improve SVG renderer sizing and tests #356
- Rename changelog file and update guidance #355
- Use PR-numbered preview URLs and cleanup on close #354
- Simplify branch preview URLs #353
- Refine settings tabs and layout #352
- Fix deploy workflow concurrency group expression #351
- Fix branch preview deployment path #350
- Adjust deploy target directory for main Pages deployment #349

### 0.7.3 - 2025-11-24

- Improve responsive settings layout #348
- Fix duplicate createRendererController export #347
- Remove legacy renderer module files #346
- Simplify bootstrap to SVG renderer #345
- Improve deployment log visibility #344
- Remove unsupported screenshot artifact #343
- Add session kick-off workflow reminder #342
- Move contributor guide to root, mirror Pages HTML, and relocate planning docs #340
- Trim and document remaining CSS #339
- Add service worker status and debug logging #338

### 0.7.2 - 2025-11-23

- Move contributor guide to root and mirror Pages HTML #337
- Remove deployment gating for branch deploys #336
- Add gh-pages preview cleanup to branch maintenance workflow #335
- Handle workflow dispatch triggers in post-deploy tests #334
- Improve settings sheet mobile layout #333
- Retarget branch cleanup to feature prefix #332
- Fix deploy workflow eligibility for PR branches #331
- Remove README link from help panel #329
- Add rerun Pages deploy button to PR comments #328
- Improve branch cleanup logging and cutoff #327

### 0.7.1 - 2025-11-21

- Add manual dispatch for branch deploys and rerun button #326
- Fix settings tab layout wrappers #325
- Refactor render.js to lean SVG renderer #324
- Add merge conflict handling checklist #323
- Synchronize modular renderer refactor with updated deployment workflows #322
- Clarify git remote and rebase expectations #321
- Handle preview screenshot failures gracefully #320
- Fix deploy workflow environment expression #318
- Enhance post-deploy Playwright coverage #317
- Adjust deploy workflow environment per branch #316

### 0.7.0 - 2025-11-21

- Stabilize settings toggle and mute test network noise #315
- Simplify settings bootstrap with JSON export #314
- Update deployment documentation #313
- Add feedback form with analytics reporting #312
- Improve deploy reporting and always deploy #311
- Add global error toast for runtime failures #310
- Allow deploy workflow on all branches #309
- Adopt templating helper for save manager UI #308
- Simplify post-deploy preview comment #307
- Auto prune stale Pages previews #305

### 0.6.3 - 2025-11-18

- Remove legacy autosave migration #303
- Add settings sheet toggle test #302
- Add drag deadzone for settings launcher #301
- Move cleanup script into project scripts #298
- Document deploy workflow env guardrails #296
- Adopt rich save preview cards and flattened sticky settings layout #295
- Remove job-level environment context reference from deploy sync step #294
- Update README with offline and local dev notes #292
- Compute deploy workflow concurrency group directly without env context #291
- Add terminal output guidance to onboarding #290

### 0.6.2 - 2025-11-16

- Refactor UI wiring into components #288
- Make branch cleanup asynchronous #287
- Optimize GitHub Pages deployment speed #286
- Refine developer onboarding guidance #284
- Add organic superpixel generator #283
- Add project roadmap and TODO tracking #282
- Add offline caching and local file access #280
- Add simplicity guidance to workflow instructions #279
- Consolidate runtime bootstrap into single module #278
- Extract runtime styles into stylesheet #277

### 0.6.1 - 2025-11-16

- Fix branch cleanup ref encoding #276
- Combine renderer performance updates and testing stack #275
- Handle WebGL label cache updates for UI scale changes #274
- Update TECH.md for modular runtime documentation #273
- Update Playwright setup script workflow #272
- Organize runtime assets under dedicated directory #270
- Add unit tests for render controller fallbacks #269
- Add documentation for helper scripts #264
- Run branch cleanup after deployments #262
- Refresh TECH.md test harness and branch deployment documentation #261

### 0.6.0 - 2025-11-15

- Restructure repository around project workspace #260
- Reuse counters for tiny region merging #259
- Center active palette colour #258
- Unify settings, generator, saves, and help into one menu #257
- Add nearby difficulty that auto-selects adjacent colours #256
- Refactor neighbor iteration in segmentation routines #255
- Optimize smoothing histogram reuse #254
- Allow dots in post-deploy slug derivation #252
- Fix post-deploy artifact naming sanitization #251
- Ensure Playwright browsers install with docs #250

### 0.5.3 - 2025-11-15

- Simplify branch overview page #249
- Restore stable renderer pipeline with performance logging #248
- Persist palette sort preference #245
- Improve zoom smoothness with compositor-driven scaling #244
- Flush autosave on page lifecycle events #243
- Fix WebGL label rendering #242
- Add branch slug preparation job to post-deploy tests workflow #241
- Adjust zoom defaults and expose configurable max zoom #240
- Preserve palette numbering when colours complete #239
- Fix UI scale flash during boot #238

### 0.5.2 - 2025-10-26

- Rename palette sort label and renumber swatches #237
- Switch CI workflow to Ubuntu runners #236
- Limit Playwright smoke test to Chromium page load #235
- Simplify Pages deployment workflow #234
- Enhance palette sorting with spectrum and warmth modes #233
- Prefer autosave when restoring sessions #232
- Sanitize post-deploy concurrency group branch names #231
- Improve region label placement and sizing #230
- Improve region label placement with polylabel #229
- Fix settings persistence when no puzzle is loaded #228

### 0.5.1 - 2025-10-25

- Render region numbers continuously across all zoom levels #227
- Remove user settings from exported save files #226
- Fix post-deploy workflow concurrency expression #225
- Configure Playwright UI review artifacts #224
- Streamline Playwright smoke test for quick load check #223
- Improve remote image URL workflow #222
- Add support for loading puzzles from external image URLs #221
- Adjust region label layout to respect zoom ratio #220
- Support zoom-aware region label layout #219
- Persist user settings in browser storage #217

### 0.5.0 - 2025-10-24

- Fix right-click select colour when pan drag is configured #216
- Default to medium detail with larger regions #215
- Revamp Manage Saves autosave slot layout #214
- Render puzzles over stored base image #212
- Add compact puzzle export option #211
- Add tabbed settings layout and refine UI scale defaults #210
- Fix WebGL fill updates and refine zoom controls #209
- Add renderer selector UI and SVG backend #208
- Ensure branch deployments include JSON assets #207
- Include all root JS assets in branch deploys #206

### 0.4.3 - 2025-10-21

- Expand interface scale limits #205
- Include JS assets in branch deployments #204
- Add textured passes to WebGL renderer #203
- Ensure allow_without_pr input is evaluated correctly #202
- Fix deploy workflow expressions for manual inputs #201
- Fix branch deploy workflow env quoting #200
- Ensure post-deploy tests install Playwright browsers #199
- Restore Playwright UI smoke coverage #198
- Add WebGL renderer implementation #197
- Stabilize UI smoke tests with automation helpers #196

### 0.4.2 - 2025-10-20

- Document renderer controller and active Playwright smoke run #195
- Add hint type toggles to settings sheet #194
- Add Playwright tests for painting and save completion #193
- Allow manual deploys to target any branch #192
- Synchronize work branch with updated deployment workflows and scripts #191
- Add post-deploy branch smoke tests workflow #188
- Use fetch to build deployment metadata #187
- Add multiple puzzle generation algorithms and documentation updates #186
- Point deployment environment URL to branch preview #185
- Allow pan and zoom gestures from viewport margins #184

### 0.4.1 - 2025-10-18

- Use GitHub Markdown API for README builds #183
- Modularize puzzle renderer via controller abstraction #181
- Rewrite README for player-focused guidance #180
- Hide puzzle outlines for filled regions #179
- Harden branch deployment workflow data handling #178
- Fix deploy workflow by moving inline scripts to dedicated files #177
- Fix deploy workflow heredoc terminators #176
- Use actions/deploy-pages v4 #175
- Fix deploy workflow README conversion block indentation #174
- Fix deploy workflow manifest JSON generation #173

### 0.4.0 - 2025-10-17

- Prune inactive branch deployments during Pages sync #172
- Update GitHub Actions deploy-pages workflow action from v4 to v5 #171
- Revamp branch deployment index layout with compact timeline rows #170
- Fix README core asset reference #169
- Generate README HTML during branch deployments #168
- Limit branch previews to runtime assets #167
- Embed hosted README inside help panel #166
- Include weekday in branch deployment timestamps #164
- Add npm scaffolding and placeholder test runner #163
- Add prompt image prompt helper to generator tab #162

### 0.3.3 - 2025-10-17

- Improve save management autosave experience #161
- Auto-start generation and relocate saves export #160
- Improve mobile gesture responsiveness #159
- Add reset progress button to save manager #158
- Simplify branch deploy index cards #157
- Streamline branch deploy index metadata #156
- Align main and preview commit metadata in branch deployment listings #155
- Localize branch deployment commit timestamps to 12-hour browser time #154
- Remove onboarding start hint and add quick start actions to Saves sheet #153
- Improve branch deployment summary layout #152

### 0.3.2 - 2025-10-16

- Document branch update workflow #151
- Fix deploy workflow heredoc indentation #150
- Render branch deployment dashboard metadata via jq pipeline #149
- Replace jq branch page generation with Node #148
- Restore branch index metadata generation and open-PR deploy gating #147
- Prevent branch deployments without open PRs #144
- Include PR links in branch deployment dashboard #142
- Require import confirmation and show progress inside generator sheet #140
- Remove idle Ready to paint status line #139
- Simplify branch deployments #137

### 0.3.1 - 2025-10-15

- Restrict status bar to generation progress #136
- Enable concurrency cancellation for GitHub Pages deployments to prevent 400 errors #135
- Fix GitHub Pages deployment workflow failure caused by rsync removing .git directory #130
- Fix gh-pages deployment failure by auto-recovering from invalid git repository state #129
- Prevent branch deployment cleanup job failures on missing directories #128
- Update git remote guidance #127
- Streamline command rail buttons #126
- Improve tooltip contrast for light palette colors #123
- Enhance hint highlights and add easy difficulty #122
- Review and update branch-deployments.md documentation for accuracy #121

### 0.3.0 - 2025-10-14

- Add clickable commit and PR links to branch deployment history #119
- Enhance branch deployment with commit and PR links in Recent History #118
- Implement shared save metadata templates #117
- Fix gh-pages cache validation to prevent "fatal: not in a git directory" errors #116
- Enhance GitHub Pages branch deployment workflow with commit history and timezone conversion #115
- Restore project links at the top of README.md #114
- Unify start screen and save manager #113
- Ensure preview render matches puzzle scale #112
- Add configurable hint fade, intensity, and right-click color selection #111
- Restore capy.json and add fallback puzzle metadata #110

### 0.2.3 - 2025-10-13

- Simplify preview mode to color canvas in place #109
- Ensure palette swatches respond to right-click #105
- Add region label support and palette-colored hint flashes #104
- Add configurable region flash durations and hover hint previews #103
- Allow right-click palette selection #102
- Improve tap hit-testing performance by caching canvas bounds #101
- Add toggle to control status bar visibility #100
- Speed up wrong-color hint flashes and highlight matching regions on tap #99
- Reconcile touch tap responsiveness handlers in index.html #98
- Optimize deployment workflow for 40-60% faster builds #97

### 0.2.2 - 2025-10-13

- Trigger region fills on touch pointer events to remove tap delay #96
- Centralize canvas fill validation for touch and click events #95
- Render puzzle geometry at zoom scale #94
- Add async generation progress feedback and modularize generator #93
- Fix touch pan and pinch gesture behavior #91
- Optimize outline rendering and allow unlimited zoom #90
- Fix palette dock overflow on small viewports #89
- Fix command rail layout wrapping #88
- Handle command rail wrapping metrics #87
- Constrain floating command rail within right safe-area inset #86

### 0.2.1 - 2025-10-11

- Fix command rail overflow on narrow viewports #85
- Simplify play surface layout #84
- Fix branch index to save to branch.html instead of index.html #82
- Prioritize main branch deployment and list PR metadata on branch index #81
- Hide completed colours and shrink UI scale #80
- Optimize deploy-branch workflow execution performance #79
- Enable double-click sampling of puzzle colours #78
- Summarize local save storage in help and drop cloud sync #77
- Add region number visibility toggle #76
- Add contributor repository instructions #75

### 0.2.0 - 2025-10-09

- Apply edge-to-edge flat palette swatch layout to index.html #72
- Show original artwork behind regions and streamline colour selection #71
- Adopt edge-to-edge palette swatch styling and safe-area padding #69
- Refine luminance-based swatch label contrast presets #68
- Fix deploy-branch workflow to push newly initialized gh-pages branch #67
- Fix git authentication in deploy-branch.yml workflow #66
- Configure git credentials in deploy-branch workflow #65
- Update deploy-branch workflow to use index.html instead of branchindex.html #63
- Flatten palette dock into edge-to-edge swatches with adaptive contrast #62
- Streamline palette dock to swatches only #60

### 0.1.3 - 2025-10-08

- Fix authentication for deploy-branch job using GITHUB_TOKEN #59
- Collapse command rail into responsive icon buttons and harden zoom guard #58
- Document resolved zoom guard handler structure in merge conflict report #56
- Simplify Playwright smoke tests for faster runs #55
- Fix deploy-branch workflow to handle missing gh-pages branch #54
- Enhance palette focus and responsive command rail #53
- Add horizontal wheel scrolling and status copy to palette dock #52
- Strip stray UTF-8 BOM from package.json and add ripgrep ignore rules #51
- Improve viewport sizing and zoom handling #50
- Refresh contributor onboarding guidance #49

### 0.1.2 - 2025-10-07

- Add custom cursor tooltip for puzzle regions #48
- Add automatic GitHub Pages deployment for all branches #44
- Trim unused assets and refresh documentation #42
- Improve region label readability and palette hints #41
- Add sample detail presets, UI scale controls, and mobile zoom guard #39
- Reconcile autosave and cloud-sync gameplay session documentation #38
- Improve DOM rendering for save list entries #37
- Document upstream git remote #34
- Derive export titles from source metadata #33
- Add sample detail presets and region legend #30

### 0.1.1 - 2025-10-06

- Add autosave restore flow and cloud backup sync #29
- Guard pan move updates without a loaded puzzle #28
- Allow touch pans without blocking taps #27
- Enhance capybara sample illustration #26
- Add generator test hooks and end-to-end Playwright review suite #23
- Rebuild fullscreen drop interface for puzzle generator #20
- Flash palette hint when tapping wrong colors #19
- Add terraced market starter art #18
- Remove redundant header buttons and stabilize drag panning #17
- Document starter scene regression checks in PR review notes #16

### 0.1.0 - 2025-10-04

- Update smoke test alias to target UI review harness #15
- Restore Babel runtime and unblock starter art loading #14
- Preserve stored starter titles when merging updates #11
- Bundle Lagoon starter scenes and add local art library #10
- Streamline canvas toolbar interactions #9
- Refine lagoon segmentation and unblock progress #8
- Enable SVG artwork imports and refresh help content #6
- Refine capybara art layout #5
- Surface README overview through an in-app options panel #3
- Build simple color-by-number web app #1
