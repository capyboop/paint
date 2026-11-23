/**
 * [Unit 02] SemVer parity, <2s sanity.mjs gate, CHANGELOG contract, release channels & Epic naming.
 * [Unit 14] .github/scripts/compile-changelog.mjs release note extraction & release.yml wiring.
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  runSanityChecks,
  validateChangelogChannelOrder,
  validateEpicNaming,
  
  validateRootGuideIndex,
} from '../../sanity.mjs';

export async function runSanityChangelogTests({ vite, projectRoot, webPkgJson, logUnitStart, logUnitPass }) {
    logUnitStart('Testing SemVer parity, <2s sanity.mjs gate, CHANGELOG contract & release channels...');
    const sanityRes = runSanityChecks({ repoRoot: path.resolve(projectRoot, '..') });
    assert.equal(sanityRes.elapsedMs < 2000, true, `sanity.mjs must run in < 2s (${sanityRes.elapsedMs}ms)`);
    const versionMod = await vite.ssrLoadModule('/src/version.ts');
    const semverParts = versionMod.parseSemVer(versionMod.APP_VERSION);
    assert.equal(
      versionMod.APP_VERSION_CODE,
      semverParts.major * 10000 + semverParts.minor * 100 + semverParts.patch,
      'APP_VERSION_CODE must equal MAJOR * 10000 + MINOR * 100 + PATCH'
    );
    const changelogPath = path.resolve(projectRoot, '..', 'CHANGELOG.md');
    assert.equal(fs.existsSync(changelogPath), true, 'CHANGELOG.md must exist at repository root');
    const changelogText = fs.readFileSync(changelogPath, 'utf8');
    assert.equal(
      changelogText.startsWith('### '),
      true,
      'CHANGELOG.md must start directly on line 1 with a compact ### version heading (no preamble)'
    );
    assert.equal(
      /^#{1,2}\s+/m.test(changelogText),
      false,
      'CHANGELOG.md must not contain oversized # or ## headings'
    );
    const majorMinor = `${semverParts.major}.${semverParts.minor}`;
    const currentVersionHeadingRe = new RegExp(
      `^### (?:${versionMod.APP_VERSION.replace(/\./g, '\\.')}|${majorMinor.replace(/\./g, '\\.')}) - \\d{4}-\\d{2}-\\d{2} \\((?:Alpha|Beta|Production|Production, Beta)\\)$`,
      'm'
    );
    assert.equal(
      currentVersionHeadingRe.test(changelogText),
      true,
      `CHANGELOG.md must contain a compact ### release heading with active channel marker for ${versionMod.APP_VERSION} or ${majorMinor}`
    );
    const changelogHeadings = changelogText.split('\n').filter((line) => line.startsWith('#'));
    let productionHeadingCount = 0;
    let betaHeadingCount = 0;
    let alphaHeadingCount = 0;
    for (const heading of changelogHeadings) {
      assert.equal(
        /^### \d+\.\d+(?:\.\d+)? - \d{4}-\d{2}-\d{2}(?: \((?:Alpha|Beta|Production|Production, Beta)\))?$/.test(
          heading
        ),
        true,
        `Each CHANGELOG.md heading must be concise "### X.Y[.Z] - YYYY-MM-DD [(Alpha|Beta|Production|Production, Beta)]": ${heading}`
      );
      if (/\((?:Production|Production, Beta)\)$/.test(heading)) productionHeadingCount += 1;
      if (/\((?:Beta|Production, Beta)\)$/.test(heading)) betaHeadingCount += 1;
      if (/\(Alpha\)$/.test(heading)) alphaHeadingCount += 1;
    }
    assert.equal(
      productionHeadingCount,
      1,
      `CHANGELOG.md must mark exactly 1 active Production release heading, got ${productionHeadingCount}`
    );
    assert.equal(
      betaHeadingCount <= 1,
      true,
      `CHANGELOG.md must mark at most 1 active Beta release heading, got ${betaHeadingCount}`
    );
    assert.equal(
      alphaHeadingCount <= 1,
      true,
      `CHANGELOG.md must mark at most 1 active Alpha release heading, got ${alphaHeadingCount}`
    );
    assert.equal(
      changelogText.includes('### 0.1.0 - '),
      true,
      'CHANGELOG.md must include retrospective 0.1.0--0.9.x release history'
    );

    // Release channel path/origin/query resolution checks
    const stableCh = versionMod.resolveReleaseChannel('/capy/', 'https://capyboop.github.io', '');
    assert.equal(stableCh.channel, 'stable');
    assert.equal(stableCh.badgeLabel, null);
    assert.equal(stableCh.prNumber, null);
    assert.equal(stableCh.stableWebUrl, 'https://capyboop.github.io/capy/');
    assert.equal(stableCh.betaWebUrl, 'https://capyboop.github.io/capy/beta/');
    assert.equal(stableCh.betaApkUrl, 'https://capyboop.github.io/capy/beta/capy.apk');
    assert.equal(stableCh.showChannelSwitcher, true);

    const betaCh = versionMod.resolveReleaseChannel('/capy/beta/', 'https://capyboop.github.io', '');
    assert.equal(betaCh.channel, 'beta');
    assert.equal(betaCh.badgeLabel, 'BETA');
    assert.equal(betaCh.prNumber, null);
    assert.equal(betaCh.showChannelSwitcher, true);

    const alphaCh = versionMod.resolveReleaseChannel(
      '/capy/alpha/481/',
      'https://capyboop.github.io',
      ''
    );
    assert.equal(alphaCh.channel, 'alpha');
    assert.equal(alphaCh.badgeLabel, 'ALPHA #481');
    assert.equal(alphaCh.prNumber, 481);
    assert.equal(alphaCh.showChannelSwitcher, true);

    const alphaBranchCh = versionMod.resolveReleaseChannel(
      '/capy/alpha/feature-x/',
      'https://capyboop.github.io',
      ''
    );
    assert.equal(alphaBranchCh.channel, 'alpha');
    assert.equal(alphaBranchCh.badgeLabel, 'ALPHA');
    assert.equal(alphaBranchCh.prNumber, null);
    assert.equal(alphaBranchCh.showChannelSwitcher, true);

    const legacyPrCh = versionMod.resolveReleaseChannel(
      '/capy/PR/481/',
      'https://capyboop.github.io',
      ''
    );
    assert.equal(legacyPrCh.channel, 'alpha');
    assert.equal(legacyPrCh.badgeLabel, 'ALPHA #481');
    assert.equal(legacyPrCh.prNumber, 481);

    const legacyPullCh = versionMod.resolveReleaseChannel(
      '/capy/pull/481/',
      'https://capyboop.github.io',
      ''
    );
    assert.equal(legacyPullCh.channel, 'alpha');
    assert.equal(legacyPullCh.badgeLabel, 'ALPHA #481');
    assert.equal(legacyPullCh.prNumber, 481);

    const devCh = versionMod.resolveReleaseChannel('/', 'http://localhost:3000', '');
    assert.equal(devCh.channel, 'dev');
    assert.equal(devCh.badgeLabel, null);
    assert.equal(devCh.showChannelSwitcher, true);

    const customDomCh = versionMod.resolveReleaseChannel('/', 'https://capypaint.com', '');
    assert.equal(customDomCh.channel, 'stable');
    assert.equal(customDomCh.badgeLabel, null);
    assert.equal(customDomCh.stableWebUrl, 'https://capypaint.com/');
    assert.equal(customDomCh.showChannelSwitcher, false);

    const wwwDomCh = versionMod.resolveReleaseChannel('/', 'https://www.capypaint.com', '');
    assert.equal(wwwDomCh.channel, 'stable');
    assert.equal(wwwDomCh.showChannelSwitcher, false);

    const androidDomCh = versionMod.resolveReleaseChannel(
      '/assets/www/index.html',
      'https://appassets.androidplatform.net',
      ''
    );
    assert.equal(androidDomCh.channel, 'stable');
    assert.equal(androidDomCh.showChannelSwitcher, false);

    const customDomForcedBeta = versionMod.resolveReleaseChannel(
      '/',
      'https://capypaint.com',
      '?capy_channel=beta'
    );
    assert.equal(customDomForcedBeta.channel, 'beta');
    assert.equal(customDomForcedBeta.showChannelSwitcher, true);

    const queryBetaCh = versionMod.resolveReleaseChannel(
      '/',
      'http://localhost:3000',
      '?capy_channel=beta'
    );
    assert.equal(queryBetaCh.channel, 'beta');
    assert.equal(queryBetaCh.badgeLabel, 'BETA');

    const queryAlphaCh = versionMod.resolveReleaseChannel(
      '/',
      'http://localhost:3000',
      '?capy_channel=alpha&pr=481'
    );
    assert.equal(queryAlphaCh.channel, 'alpha');
    assert.equal(queryAlphaCh.badgeLabel, 'ALPHA #481');
    assert.equal(queryAlphaCh.prNumber, 481);

    const typesMod = await vite.ssrLoadModule('/src/types/index.ts');
    assert.equal(typesMod.computeProgressPercentage(0, 0), 0);
    assert.equal(typesMod.computeProgressPercentage(0, 100), 0);
    assert.equal(typesMod.computeProgressPercentage(50, 100), 50);
    assert.equal(typesMod.computeProgressPercentage(996, 1000), 99);
    assert.equal(typesMod.computeProgressPercentage(999, 1000), 99);
    assert.equal(typesMod.computeProgressPercentage(1000, 1000), 100);
    assert.equal(typesMod.computeProgressPercentage(-5, 100), 0);
    assert.equal(typesMod.computeProgressPercentage(105, 100), 100);
    assert.equal(typesMod.computeProgressPercentage(10, -5), 0);
    assert.equal(typesMod.computeProgressPercentage(10, Number.NaN), 0);
    assert.equal(typesMod.computeProgressPercentage(Number.NaN, 100), 0);

    assert.equal(
      /^[ \t]+-\s+/m.test(changelogText),
      false,
      'CHANGELOG.md must not contain nested sub-bullets'
    );
    const changelogBullets = changelogText.split('\n').filter((line) => line.startsWith('- '));
    assert.equal(
      changelogBullets.length >= 398,
      true,
      `Expected >= 398 single-line PR bullets in CHANGELOG.md, got ${changelogBullets.length}`
    );
    let changelogBulletRe = /^- (?:\[#\d+\]\(\.\.\/\.\.\/pull\/\d+\)|#\d+)\s+\S/;
    
    for (const bullet of changelogBullets) {
      assert.equal(
        changelogBulletRe.test(bullet),
        true,
        `Each CHANGELOG.md bullet must start with a valid PR reference: ${bullet}`
      );
    }

    // 5b. Chronological changelog, Epic naming, dynamic guide indexing, and CI cleanup script unit checks
    const validBetaChangelog = [
      '### 3.0.3 - 2026-11-13 (Beta)',
      '',
      '- Beta item #493',
      '',
      '### 3.0.2 - 2026-11-13',
      '',
      '- Prior beta item #490',
      '',
      '### 3.0.1 - 2026-11-12 (Production)',
      '',
      '- Prod item #488',
      '',
      '### 2.7 - 2026-11-12',
      '',
      '- Older item #484',
      '',
      '### 0.1.0 - 2026-10-01',
      '',
      '- Initial #1',
    ].join('\n');
    const betaOrderRes = validateChangelogChannelOrder(validBetaChangelog, '3.0.3', {
      enforceChannelOrder: true,
    });
    assert.equal(betaOrderRes.alphaIdx, -1);
    assert.equal(betaOrderRes.betaIdx, 0);
    assert.equal(betaOrderRes.prodIdx, 2);

    const validAlphaBetaProd = [
      '### 3.1.0 - 2026-11-14 (Alpha)',
      '- Alpha #500',
      '### 3.0.3 - 2026-11-13 (Beta)',
      '- Beta #493',
      '### 3.0.1 - 2026-11-12 (Production)',
      '- Prod #488',
      '### 0.1.0 - 2026-10-01',
      '- Init #1',
    ].join('\n');
    const abpRes = validateChangelogChannelOrder(validAlphaBetaProd, '3.1.0', {
      enforceChannelOrder: true,
    });
    assert.equal(abpRes.alphaIdx, 0);
    assert.equal(abpRes.betaIdx, 1);
    assert.equal(abpRes.prodIdx, 2);

    const validCombinedProdBeta = [
      '### 3.0.1 - 2026-11-12 (Production, Beta)',
      '- Combined #488',
      '### 2.7 - 2026-11-11',
      '- Old #484',
    ].join('\n');
    const combinedRes = validateChangelogChannelOrder(validCombinedProdBeta, '3.0.1', {
      enforceChannelOrder: true,
    });
    assert.equal(combinedRes.betaIdx, 0);
    assert.equal(combinedRes.prodIdx, 0);

    const validProdOnly = [
      '### 3.0.1 - 2026-11-12 (Production)',
      '- Prod #488',
      '### 2.7 - 2026-11-11',
      '- Old #484',
    ].join('\n');
    assert.equal(
      validateChangelogChannelOrder(validProdOnly, '3.0.1', { enforceChannelOrder: true }).prodIdx,
      0
    );

    // Minor rollup heading (3.0) matches patch version 3.0.4
    const validMinorRollup = [
      '### 3.0 - 2026-11-13 (Beta)',
      '- Rollup #493',
      '### 2.5 - 2026-11-11 (Production)',
      '- Prod #483',
    ].join('\n');
    assert.equal(
      validateChangelogChannelOrder(validMinorRollup, '3.0.4', { enforceChannelOrder: true }).betaIdx,
      0
    );

    const crlfChangelogRes = validateChangelogChannelOrder(
      validBetaChangelog.replace(/\n/g, '\r\n'),
      '3.0.3',
      { enforceChannelOrder: true }
    );
    assert.equal(crlfChangelogRes.betaIdx, 0);
    assert.equal(crlfChangelogRes.prodIdx, 2);

    assert.throws(
      () =>
        validateChangelogChannelOrder(
          [
            '### 3.0 - 2026-11-13 (Beta)',
            '### 2.7 - 2026-11-12 (Alpha)',
            '### 2.5 - 2026-11-11 (Production)',
          ].join('\n'),
          '3.0.4',
          { enforceChannelOrder: true }
        ),
      /Alpha heading must appear first/
    );
    assert.throws(
      () =>
        validateChangelogChannelOrder(
          ['### 3.0 - 2026-11-13 (Production)', '### 2.7 - 2026-11-12 (Beta)'].join('\n'),
          '3.0.0',
          { enforceChannelOrder: true }
        ),
      /Beta heading must appear at or before Production/
    );
    assert.throws(
      () =>
        validateChangelogChannelOrder(
          [
            '### 3.0 - 2026-11-13 (Beta)',
            '### 2.8 - 2026-11-12 (Production)',
            '### 2.5 - 2026-11-11 (Beta)',
          ].join('\n'),
          '3.0.0',
          { enforceChannelOrder: true }
        ),
      /Expected <= 1 Beta heading|after Production/
    );
    assert.throws(
      () =>
        validateChangelogChannelOrder(
          [
            '### 3.0 - 2026-11-13 (Beta)',
            '### 2.8 - 2026-11-12 (Production)',
            '### 2.5 - 2026-11-11 (Alpha)',
          ].join('\n'),
          '3.0.0',
          { enforceChannelOrder: true }
        ),
      /Alpha heading must appear first|after Production/
    );
    assert.throws(
      () =>
        validateChangelogChannelOrder(
          ['### 3.0.1 - 2026-11-13 (Beta)', '### 3.0.2 - 2026-11-12 (Production)'].join('\n'),
          '3.0.1',
          { enforceChannelOrder: true }
        ),
      /strictly descending by version/
    );
    assert.throws(
      () =>
        validateChangelogChannelOrder(
          ['### 3.0 - 2026-11-13 (Beta)', '### 3.0.0 - 2026-11-12 (Production)'].join('\n'),
          '3.0.0',
          { enforceChannelOrder: true }
        ),
      /strictly descending by version/
    );
    assert.throws(
      () =>
        validateChangelogChannelOrder(
          ['### 3.0.2 - 2026-11-12 (Beta)', '### 3.0.1 - 2026-11-13 (Production)'].join('\n'),
          '3.0.2',
          { enforceChannelOrder: true }
        ),
      /non-increasing by date/
    );
    assert.throws(
      () =>
        validateChangelogChannelOrder(
          ['### 3.0.2 - 2026-11-13 (Beta)', '### 3.0.1 - 2026-11-12 (Production)'].join('\n'),
          '3.0.4',
          { enforceChannelOrder: true }
        ),
      /missing active channel heading for 3\.0\.4/
    );

    const validEpicUrl = 'https://github.com/' + 'capyboop/paint/issues/477';
    const validPrRef = '[' + '#482](' + 'https://github.com/' + 'capyboop/paint/pull/482)';
    validateEpicNaming(`See [EPIC-2](${validEpicUrl}), plain EPIC-2, and ${validPrRef}`, 'DEV.md');
    for (const badNum of ['476', '477', '480']) {
      assert.throws(
        () => validateEpicNaming(`Legacy #'${badNum}`.replace("'", ''), 'TODO.md'),
        /EPIC-N/
      );
    }
    const badIssueLink = '[' + '#481](' + 'https://github.com/' + 'capyboop/paint/issues/481)';
    assert.throws(() => validateEpicNaming(`Link ${badIssueLink}`, 'ROADMAP.md'), /EPIC-N/);
    const badRelIssueLink = '[' + '#500](' + '../../' + 'issues/500)';
    assert.throws(
      () => validateEpicNaming(badRelIssueLink, 'test.md'),
      /\[EPIC-N\]\(\.\.\/\.\.\/issues\/<num>\)/
    );
    const badCombinedEpic = '[EPIC-2 (' + '#477)](' + validEpicUrl + ')';
    assert.throws(() => validateEpicNaming(`Combined ${badCombinedEpic}`, 'GUIDE.md'), /EPIC-N/);
    const badUnlinkedCombinedEpic = '[EPIC-6 (#' + '481)]';
    assert.throws(() => validateEpicNaming(`Unlinked ${badUnlinkedCombinedEpic}`, 'ROADMAP.md'), /EPIC-N/);

    const tmpGuideDir = fs.mkdtempSync(path.join(os.tmpdir(), 'capy-guide-index-'));
    try {
      const rootMdNames = [
        'README.md',
        'PROJECT.md',
        'DEV.md',
        'ROADMAP.md',
        'TODO.md',
        'WEB.md',
        'PUZZLE.md',
        'APP.md',
        'CLOUD.md',
        'TESTING.md',
        'CHANGELOG.md',
        'LICENSE.md',
      ];
      for (const name of rootMdNames) {
        fs.writeFileSync(path.join(tmpGuideDir, name), `# ${name}\n`, 'utf8');
      }
      const allLinks = rootMdNames.map((n) => `[${n}](./${n})`).join(' ');
      fs.writeFileSync(path.join(tmpGuideDir, 'README.md'), `# README\n${allLinks}\n`, 'utf8');
      fs.writeFileSync(path.join(tmpGuideDir, 'DEV.md'), `# DEV\n${allLinks}\n`, 'utf8');
      fs.writeFileSync(path.join(tmpGuideDir, 'PROJECT.md'), `# PROJECT\n${allLinks}\n`, 'utf8');
      const guideRes = validateRootGuideIndex(tmpGuideDir, { requireProjectMd: true });
      assert.equal(guideRes.hasProjectMd, true);
      assert.equal(guideRes.rootMdFiles.length, rootMdNames.length);

      fs.writeFileSync(
        path.join(tmpGuideDir, 'README.md'),
        `# README\n${allLinks.replace('./PROJECT.md', './OTHER.md')}\n`,
        'utf8'
      );
      assert.throws(
        () => validateRootGuideIndex(tmpGuideDir, { requireProjectMd: true }),
        /README\.md must link \.\/PROJECT\.md/
      );
      fs.writeFileSync(path.join(tmpGuideDir, 'README.md'), `# README\n${allLinks}\n`, 'utf8');

      fs.writeFileSync(
        path.join(tmpGuideDir, 'PROJECT.md'),
        `# PROJECT\n${allLinks.replace('./TESTING.md', './OTHER.md')}\n`,
        'utf8'
      );
      assert.throws(
        () => validateRootGuideIndex(tmpGuideDir, { requireProjectMd: true }),
        /PROJECT\.md must link \.\/TESTING\.md/
      );
      fs.writeFileSync(path.join(tmpGuideDir, 'PROJECT.md'), `# PROJECT\n${allLinks}\n`, 'utf8');

      fs.unlinkSync(path.join(tmpGuideDir, 'PROJECT.md'));
      assert.throws(
        () => validateRootGuideIndex(tmpGuideDir, { requireProjectMd: true }),
        /PROJECT\.md must exist/
      );
    } finally {
      fs.rmSync(tmpGuideDir, { recursive: true, force: true });
    }

    
    logUnitPass('SemVer parity, <2s sanity.mjs gate, CHANGELOG contract, and Epic naming checks verified.');
}

export async function runReleaseChangelogTests({ projectRoot, webPkgJson, logUnitStart, logUnitPass }) {
    logUnitStart('Testing .github/scripts/compile-changelog.mjs release note extraction & release.yml wiring...');
    const { extractReleaseNotes, formatReleaseNotesMarkdown } = await import(
      '../../../../.github/scripts/compile-changelog.mjs'
    );
    const sampleChangelog = `### 3.0.7 - 2026-11-13 (Beta)

- #495 Fix Play Games fallback and DPR canvas scaling

### 3.0.6 - 2026-11-13

- #489 Prior release note

### 2.9 - 2026-11-10

- #470 Minor rollup note`;
    assert.equal(
      extractReleaseNotes(sampleChangelog, 'v3.0.7'),
      '- #495 Fix Play Games fallback and DPR canvas scaling'
    );
    assert.equal(
      extractReleaseNotes(sampleChangelog.replace(/\n/g, '\r\n'), 'v3.0.7-beta.1'),
      '- #495 Fix Play Games fallback and DPR canvas scaling'
    );
    assert.equal(
      extractReleaseNotes(sampleChangelog, 'v2.9.4'),
      '- #470 Minor rollup note'
    );
    assert.equal(extractReleaseNotes(sampleChangelog, 'v9.9.9'), '- Release v9.9.9');
    assert.throws(() => extractReleaseNotes(sampleChangelog, 'invalid-tag'));
    assert.equal(
      formatReleaseNotesMarkdown(sampleChangelog, 'v3.0.6'),
      '### What\'s New in `v3.0.6`\n\n- #489 Prior release note\n'
    );
    const tmpReleaseNotesOut = path.join(os.tmpdir(), 'capy-release-notes-test.md');
    try {
      execFileSync(process.execPath, [
        path.resolve(projectRoot, '../.github/scripts/compile-changelog.mjs'),
        '--tag',
        `v${webPkgJson.version}`,
        '--changelog',
        path.resolve(projectRoot, '../CHANGELOG.md'),
        '--out',
        tmpReleaseNotesOut,
      ]);
      const cliNotes = fs.readFileSync(tmpReleaseNotesOut, 'utf8');
      assert.equal(cliNotes.startsWith(`### What's New in \`v${webPkgJson.version}\`\n\n`), true);
    } finally {
      fs.rmSync(tmpReleaseNotesOut, { force: true });
    }
    const releaseWorkflowYaml = fs.readFileSync(
      path.resolve(projectRoot, '../.github/workflows/release.yml'),
      'utf8'
    );
    assert.equal(releaseWorkflowYaml.includes('compile-changelog.mjs'), true);
    assert.equal(releaseWorkflowYaml.includes('python3'), false);
    assert.equal(releaseWorkflowYaml.includes('CAPY_KEYSTORE_BASE64'), true);
    assert.equal(releaseWorkflowYaml.includes('GITHUB_STEP_SUMMARY'), true);
    assert.equal(releaseWorkflowYaml.includes("steps.signing.outputs.enabled == 'true'"), true);
    assert.equal(releaseWorkflowYaml.includes('workflow_dispatch'), true);

    // Verify .github/scripts/compile-changelog.mjs stops cleanly at ## headings
    const changelogWithSubheading = `### 3.0.7 - 2026-11-13 (Beta)

- #495 Top bullet

## Archive Section

- Should never bleed into v3.0.7 release notes`;
    assert.equal(
      extractReleaseNotes(changelogWithSubheading, 'v3.0.7'),
      '- #495 Top bullet'
    );
    logUnitPass('.github/scripts/compile-changelog.mjs & release.yml extraction verified.');
}
