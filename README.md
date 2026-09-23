# AllLinks

Minimalist link hub and portfolio portal connecting the **All** ecosystem (**AllGames**, **AllTools**), open-source repositories, and developer profiles.

Built with `@all/ui` design system and deployed to GitHub Pages.

## Features

- **Shared UI & Design System**: Powered by `@all/ui` semantic tokens, typography, and primitives.
- **Visual Themes**: Full support for **Light**, **Dark**, **E-Ink Light**, and **E-Ink Dark** themes.
- **Respectful Motion**: Smooth spring/stagger animations that automatically drop to 0ms instant transitions when in E-Ink mode or when `prefers-reduced-motion` is enabled.
- **Bilingual (i18n)**: Seamless English and Polish support with automatic browser detection and persistent preferences.
- **Clean Architecture**: Single lightweight Vite + React + TypeScript setup with zero runtime bloat.
- **Automated CI/CD**: Automatic GitHub Actions workflow building and publishing to GitHub Pages (`/AllLinks/`).

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Design System**: `@all/ui` (tokens, theme engine, motion engine, components)
- **Animation**: Framer Motion
- **Testing**: Vitest + React Testing Library + jsdom
- **Hosting**: GitHub Pages

## Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run unit tests
npm test

# Build production bundle
npm run build
```
