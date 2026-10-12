# AllLinks agent instructions

AllLinks is a bilingual React 18 + TypeScript + Vite link hub, deployed at `/AllLinks/`.

- Shared tokens, header, menu, footer, theme and motion infrastructure come from the `AllUI/` Git submodule (`@all/ui`, `file:./AllUI`). Initialize submodules before installing dependencies. Coordinate shared UI revisions with AllGames and AllTools.
- Keep link data and portfolio composition local. Do not duplicate shared theme tokens or add external font/CDN dependencies.
- Support English and Polish, `dark`, `light`, `e-ink-light`, and `e-ink-dark`. E-Ink and reduced motion must disable nonessential motion through `useMotion` as well as CSS.
- This is a scrollable directory. Preserve intentional vertical page scrolling, avoid horizontal overflow, and verify mobile portrait/landscape and desktop layouts.
- Keep external links explicit, with `target="_blank"` and `rel="noopener noreferrer"`. Preserve keyboard access, focus indicators, and descriptive labels.
- Use Node 22, as in CI. Before completion run `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e` when browser behavior changes.
- Browser tests use Playwright Chromium; install it with `npx playwright install chromium`. To use installed Edge locally, set `PLAYWRIGHT_CHANNEL=msedge`.
- Do not regenerate visual snapshots without inspecting and explaining differences. Product-specific content may differ; shared UI contracts should remain consistent.
- Preserve unrelated local changes. Do not create branches, commit, publish, or deploy unless requested.

See `README.md` for commands and `../.agents/rules/` for workspace principles when working in AllProject. Historical migration prompts do not override current source contracts.
