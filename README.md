## MoneyBoy — Social (Static Frontend)

Simple, responsive static frontend for the "MoneyBoy" social feed. This repository contains HTML, CSS and lightweight JavaScript used to render mock social feed pages, profile pages and common UI components.

This project is a static prototype — no backend is included. It's intended for UI prototyping, design handoff, or as a starting point for integrating into a real application.

## Table of contents

- Project overview
- Quick start (view locally)
- Project structure
- Styling & scripts
- Contributing
- License & attribution
- Contact

## Quick start — view locally

You can open the pages directly in your browser or run a tiny static server.

Recommended: use VS Code + Live Server extension for instant reloads.

PowerShell examples:

```powershell
# Serve with Python 3 (built-in)
python -m http.server 8000
# then open http://localhost:8000 in your browser

# Or using Node (if you have http-server installed)
# npm install -g http-server
# http-server -c-1 . 8080
```

Or simply double-click `index.html` to open the main page in your default browser (some browser features behave differently when opened via file:// vs http://).

## Project overview

This repository contains a set of static pages and assets used to showcase a social feed UI. Pages include versions for creators and users, feed and profile views, likes, followers, wishlist, and a small store mock.

Key goals:

- Provide responsive, mobile-first HTML/CSS for social feed patterns
- Demonstrate component patterns (cards, buttons, nav, profile headers)
- Include minimal JS for interactivity (menu toggles, tabs, like buttons)

## Project structure (important files)

Top-level files

- `index.html` — main entry (feed)
- `discover-page-CREATOR.html`, `discover-page-USER.html`
- `feed-page-CREATOR.html`, `feed-page-USER.html`
- `profile-page-CREATOR.html`, `profile-page-USER.html`
- `likes-page-CREATOR.html`, `likes-page-USER.html`
- `followers-following-page-CREATOR.html`, `followers-following-page-USER.html`
- `wishlist-page-CREATOR.html`, `wishlist-page-USER.html`
- `store-page-CREATOR.html`, `purchased-media-CREATOR.html`

Assets

- `assets/css/` — all styles organized by purpose

  - `main.css`, `main-responsive.css` — high-level entry styles
  - `base/` — `base.css`, `responsive.css`
  - `components/` — `components.css`, `responsive.css`
  - `elements/` — small element-level styles
  - `layouts/` — page layout rules
  - `pages/` — page-specific styles (e.g., `discover-page/layout.css`)
  - `small-components/`, `utilities/` — helpers and utilities

- `assets/js/` — JavaScript

  - `cdns.js` — third-party CDN includes
  - `main.js` — app init and mounting small behaviors
  - `components/` — modular UI scripts (menu-toggle, post-interactivities, swipers, etc.)

- `assets/media/` — images, logos, profile avatars, post images

Other

- `provided-resources/` — design references (e.g., `figma-link.txt`)

## Styling & scripts

CSS is organized into base, components, layouts and page-level folders. The files follow a predictable mapping:

- Global tokens and resets: `assets/css/base/base.css`
- Reusable components: `assets/css/components/components.css`
- Page layout: `assets/css/layouts/layouts.css`

JS is intentionally minimal and modular. Primary behaviors live under `assets/js/components/` and are imported/initialized from `assets/js/main.js`.

When editing styles, prefer adding variables and tokens to `:root` in `base.css` for consistent theming.

## Browser support

This project targets modern evergreen browsers. If you need to support older browsers, add appropriate polyfills and test with your target matrix.

## Contributing

If you'd like to contribute improvements:

1. Fork the repository and create a feature branch.
2. Make changes and test locally (use Live Server or a simple static server).
3. Keep CSS changes scoped (base → tokens, components → UI pieces, pages → page layout).
4. Open a pull request describing your changes.

Guidelines

- Keep class names clear and prefixed where appropriate to avoid collisions.
- For new components, add a short comment and list any CSS custom properties they use.

## Tests & checks

This is a static frontend prototype — there are no automated tests included. If you'd like, I can scaffold a minimal frontend toolchain (npm, linters, and a `package.json`) and add a small set of UI tests.

## License

No license is specified in this repository. If you plan to share or publish this project, add a `LICENSE` file at the repository root. A permissive option is the MIT license.

## Attribution & resources

- Design references may be in `provided-resources/` (e.g., `figma-link.txt`).
- External libraries (swipers, icons) are referenced in `assets/js/cdns.js` — review and pin versions if you add a package manager.

## Troubleshooting

- If styles look broken: ensure the correct CSS files are included in the HTML head and that responsive CSS files are loaded.
- If JS features don't run on `file://`: run a local server (see Quick start) to avoid cross-origin/resource loading issues.
