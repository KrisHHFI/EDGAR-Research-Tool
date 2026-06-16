# AGENTS.md — SEC EDGAR Filing Dashboard

> **Keep this file up to date** whenever the project structure, conventions, or behaviour changes.

---

## What This App Does

A professional React dashboard that gives retail investors quick, filtered access to SEC EDGAR's live filing feed. Each filing type (8-K, Form 4, SC 13D, S-1, etc.) is presented as a clickable card that opens the pre-filtered EDGAR results page in a new tab. Cards include a plain-English description, an investor tip, and a colour-coded signal badge (Bullish / Bearish / Watch Closely / Due Diligence).

The app has no backend — it is a pure client-side React + TypeScript SPA built with Vite.

---

## File Hierarchy

```
sec-dashboard/
├── AGENTS.md               ← this file
├── index.html              ← Vite HTML entry point
├── vite.config.ts          ← Vite + Tailwind CSS v4 configuration
├── tsconfig.json           ← TypeScript root config
├── tsconfig.app.json       ← App-specific TS config
├── tsconfig.node.json      ← Node/build TS config
├── eslint.config.js        ← ESLint configuration
├── package.json
├── package-lock.json
├── public/                 ← Static assets served as-is
└── src/
    ├── main.tsx            ← React root mount
    ├── index.css           ← Tailwind v4 import + global base styles
    ├── App.tsx             ← Root component: layout, state, filtering (~45 lines)
    ├── App.css             ← Intentionally empty (styles via Tailwind)
    ├── types.ts            ← FormEntry, Category interfaces + SIGNAL_META
    ├── data.ts             ← CATEGORIES array + edgarUrl helper
    └── components/
        ├── Header.tsx      ← Sticky top bar with logo and live-feed link
        ├── Sidebar.tsx     ← Category nav + search input
        ├── FilingCard.tsx  ← Individual filing card (link to EDGAR)
        └── CategorySection.tsx ← Section heading + cards grid
```

---

## Coding Conventions

- **File length:** Aim for files under 150 lines. If a file grows beyond that, split it into focused modules (e.g. extract `data.ts` for the `CATEGORIES` constant, `types.ts` for interfaces).
- **No credentials:** Never commit API keys, tokens, secrets, or any personal credentials anywhere in the repository. The app intentionally has no auth — keep it that way.
- **No errors or lint warnings:** All files must pass TypeScript type-checking (`tsc --noEmit`) and ESLint (`eslint src/`) with zero errors before committing. Do not suppress rules without a documented reason.
- **No backend:** All data is static — SEC EDGAR URLs are constructed client-side. Do not add a server, proxy, or environment variables.
- **Styling:** All styles are applied via **Tailwind CSS v4** utility classes directly in JSX. Global base styles (font, scrollbar) live in `index.css`. Do not add `App.css` styles, CSS-in-JS, or a separate utility framework.

---

## GitHub Repository

The project is hosted at: **https://github.com/KrisHHFI/EDGAR-Research-Tool**

> **Important:** Only commit and push to GitHub when the user explicitly requests it. Do not push automatically after edits, refactors, or bug fixes — always wait for a direct instruction to do so.

---

## Running the App

```bash
cd sec-dashboard
npm install       # first time only
npm run dev       # starts dev server at http://localhost:5173
npm run build     # production build → dist/
npm run lint      # run ESLint
```

---

## Adding a New Filing Form

1. Open `src/data.ts` and find the `CATEGORIES` array.
2. Add a new `FormEntry` object to the appropriate category (or create a new category).
3. Set `type` to the exact EDGAR form-type string (e.g. `'8-K'`, `'SC 13D'`).
4. Choose a `signal`: `'bullish'` | `'bearish'` | `'neutral'` | `'info'`.
5. Write a concise `tip` explaining why the form matters to a retail investor.
6. Verify the generated URL works: `https://www.sec.gov/cgi-bin/browse-edgar?type=<YOUR_TYPE>&action=getcurrent`
