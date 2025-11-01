# MoneyBoy — Social Feed (Frontend)

Simple, responsive static frontend for the "MoneyBoy" social feed. This repository contains the markup, styles and minimal JS used to render the feed page, sidebar, header and common UI components.

## Project structure (important files)

- `index.html` — Entry HTML for the feed page.
- `assets/js/main.js` — Application bootstrap / small client scripts.
- `assets/css/`
  - `base.css` — Design tokens, CSS reset and global defaults.
  - `components.css` — Reusable UI components (header, cards, sidebar).
  - `layout.css` — Page-level layout (main columns, wrappers, sticky behavior).
- `assets/media/` — Images and favicon used by the UI.

## Local development

Recommended: open the project in VS Code and use Live Server or a simple static server.

- With Live Server (VS Code extension): right click `index.html` → "Open with Live Server".
- With Node (http-server):
  1. npm install -g http-server
  2. cd PROJECT-PATH\moneyBoy
  3. http-server -c-1
- With Python:
  1. cd PROJECT-PATH\moneyBoy
  2. python -m http.server 3000
  3. Open http://localhost:3000

## Design notes

- Styles use three-layer organization:
  - `base.css` for tokens (colors, spacing, radii), resets and typography.
  - `components.css` for reusable components and states.
  - `layout.css` for page-level grids and responsive layout rules.
- Fonts are loaded via Google Fonts in `base.css`. Keep token changes inside `:root`.
- CSS uses nesting in source for readability — ensure your build/transpiler (PostCSS/Sass) compiles nested rules if needed.

## Accessibility & responsiveness

- Header and sidebars use semantic landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`). Maintain those for screen reader support.
- Keep interactive areas >= 40x40px for touch.
- Add explicit focus styles for keyboard users when adding interactive JS.

## Contribution & workflow

- Keep changes scoped: global tokens → `base.css`, component styling → `components.css`, layout changes → `layout.css`.
- When adding new components, document variables used and add small comments for maintainability.
- Create a feature branch, add tests or manual verification steps, open a PR with short description.

## License

Add your preferred license (e.g., MIT) at the project root as `LICENSE`.

If you want, I can create or update the license, add a contribution guide, or scaffold a minimal build step (npm scripts).
