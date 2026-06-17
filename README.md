# EDGAR Research Tool

A clean, fast dashboard that gives retail investors direct, filtered access to the SEC's EDGAR filing system — the same public database used by Wall Street professionals.

> Vibe coded using **Visual Studio Code**, **GitHub Copilot**, and **Claude Sonnet 4.6**.

<img src="EDGAR Project Promo.png" width="1000"/>

<sub><i>Project Screenshot (17/06/2026)</i></sub>

---

## What It Does

The SEC requires every public company to file disclosures — earnings, insider trades, acquisitions, proxy votes, and more — through EDGAR. The problem is the raw site is hard to navigate. This tool solves that by organising the most investment-relevant filing types into a browsable dashboard, with each card linking directly to the live, filtered EDGAR feed for that form type.

Click any card and you land on the latest filings of that type — no account required, no paywall, just raw primary-source data.

---

## Filing Categories

| Category | What's Included |
|---|---|
| ⚡ High-Signal / Time-Sensitive | 8-K, Form 3, Form 4, Form 5 |
| 🏦 Activist & Institutional | SC 13D, SC 13G, and their amendments |
| 📊 Company Financials | 10-K, 10-Q, and amended versions |
| 💸 Capital Markets & Dilution | S-1, S-3, 424B3, 424B4, Form 144, Form D |
| 🤝 M&A & Proxy | DEF 14A, DEFA14A, DEFM14A, SC TO-T |
| 🌍 Foreign Issuers | 20-F, 6-K |

Each card shows:
- The form name and a plain-English description
- An investor tip explaining why the filing matters
- A colour-coded signal badge: **Bullish**, **Bearish**, **Watch Closely**, or **Due Diligence**

---

## Running Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

---

## Tech Stack

- **React + TypeScript** — component logic and type safety
- **Vite** — instant dev server and fast builds
- **Plain CSS** — dark theme with CSS custom properties, no framework

No backend. No API keys. No login. Everything runs in the browser.
