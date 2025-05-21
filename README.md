🧮 Tax-Loss Harvesting - React (frontend-only)
This repository contains a 100 % front-end implementation of a crypto tax-loss-harvesting tool.
Everything (holdings, prices, gains/losses) is hard-coded in state, so you can clone, install and run without any back-end or API keys.

Desktop layout

1 . Features
Capital-gains dashboard
• Pre-harvesting vs. after-harvesting cards
• Totals update instantly when you tick/untick rows

Scrollable, Figma-accurate holdings table
• Sticky header inside a rounded card
• Green for gains, red for losses
• Works with an unlimited number of holdings (no hidden paging)

Responsive
• Desktop → tablet → phone break-points
• Table turns into a horizontal-scroll list on very small screens

UX niceties
• 1 s fake loader
• “Important notes & disclaimers” drop-down placeholder
• Clean, modern typography & colours (Figma spec)

2 . Tech-stack
Layer	Choice
Framework	React 18 (Create-Vite template)
Styling	Plain CSS modules (no external UI kit)
Icons / Logos	CryptoLogos CDN
State	React Hooks (useState, useMemo) only

3 . Project structure
TEXT

tax-loss-harvesting/
├─ public/
│  └─ index.html
├─ src/
│  ├─ assets/           → (if you decide to copy logos locally)
│  ├─ components/
│  │  └─ HoldingsTable.jsx
│  ├─ App.jsx
│  ├─ App.css
│  └─ main.jsx
└─ README.md            ← you are here

4 . Getting started
BASH

git clone https://github.com/your-handle/tax-loss-harvesting.git
cd tax-loss-harvesting
npm i           # or pnpm i / yarn
npm run dev     # Vite dev-server at http://localhost:5173
For a production bundle:

BASH

npm run build   # outputs to /dist

5 . Available scripts
Script	What it does
dev	Starts Vite with hot-reload
build	Generates an optimised production bundle
preview	Serves the bundle locally for a final check


6 . Data flow (quick tour)

App.jsx
├─ useState()   → holdings[]           // seeded array
├─ useState()   → selectedIds[]        // check-boxes
├─ useMemo()    → profit / loss maths  // derived numbers
└─ render()
     ├─ SummaryCards
     └─ HoldingsTable
         └─ onToggle(id)  ↳ sets selectedIds
Only loss rows that are checked are subtracted from the capital-gains figures—this mimics the real-world tax strategy.

7 . Responsive behaviour
Width	Behaviour
≥ 1200 px	Two summary cards side-by-side, table 480 px tall
992-1199 px	Slightly reduced paddings, table 420 px tall
768-991 px	Cards stack vertically, table 380 px tall
576-767 px	Table becomes horizontally scrollable (min-width: 650 px)
≤ 480 px	Tighter fonts / paddings, header collapses
Mobile layout

8 . Screenshots to include
Place your screen-grabs inside a screenshots/ folder and keep the following names so the markdown above resolves automatically:

File	What to capture
desktop.png	Full-HD screenshot (≥1280 px wide) showing header, both summary cards and at least 6 table rows.
mobile.png	Narrow-screen (≤480 px) showing stacked cards and the horizontally scrollable table.
Feel free to add more (e.g. tablet.png, dark-mode.png) by inserting additional <img> tags where appropriate.

9 . Future ideas
Persist user selection to localStorage
Import real prices via Coinbase / Coingecko API
Dark-mode toggle
CSV export of “after harvesting” sale orders
