# Worthy

**Think before you spend.**

## About

Impulse purchases feel small in the moment but add up fast. Worthy makes the hidden cost visible before you commit: every item is translated into hours of your working life, a share of your monthly income, and the investment return you would forgo over time.

When you add a purchase, the app shows live opportunity-cost statistics as you type—no server round-trip required. Submitting starts a **reflection pause** (decision timer): the purchase stays **Pending** until the timer ends, then you mark it **Bought** or **Rejected**. Rejected purchases feed into **History** overview stats (total saved, work hours reclaimed, missed investment return).

## Features

- Real-time purchase analysis while filling the form (client-side calculation)
- Reflection timer before final buy/reject decisions
- Purchase history with overview statistics
- Optional purchase image upload
- User authentication (register / login)

## Tech Stack

| Layer | Technologies |
|-------|----------------|
| UI | React 19, TypeScript, Vite, SCSS Modules |
| State | Zustand |
| HTTP | axios |
| Tests | Vitest, React Testing Library, MSW |

The API lives in a separate backend repository (**budget-api** — Express + MongoDB), deployed on Render. This frontend connects via `VITE_BASE_URL`.

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone <repository-url>
cd budget
npm install
```

### Environment

Copy the example file and set your API base URL:

```bash
cp .env.example .env
```

In `.env`:

```env
VITE_BASE_URL=https://your-api-host.example.com/api
```

Restart the dev server after changing `.env` — Vite reads environment variables only at startup.

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## Testing

56 tests across unit, hook, component, and integration layers. No running backend required — HTTP is mocked with MSW.

| Script | Description |
|--------|-------------|
| `npm run test` | Compact CI-style run (one line per file) |
| `npm run test:verbose` | Full list of every test case |
| `npm run test:watch` | Watch mode in the terminal |
| `npm run test:ui` | Interactive browser dashboard |
| `npm run test:html` | Static HTML report in `html/` |
| `npm run test:coverage` | Terminal table + `coverage/index.html` |

**Approach:** pyramid — pure functions in `src/utils/purchase/` → hooks → presentational components → page flows with MSW. Timers and dates use Vitest fake timers for deterministic output.

## Project Structure

```
src/
├── components/     UI building blocks (forms, cards, analysis panel)
├── containers/     Page-level wiring (routes, providers, data hooks)
├── hooks/          React hooks (purchase form, countdown, auth)
├── utils/purchase/ Pure business logic — stats, formatting (no React)
├── lib/api/        axios clients and API modules
├── store/          Zustand stores (user session)
├── test/           Vitest setup, MSW server, shared fixtures
├── config/         Environment config (VITE_BASE_URL)
└── ui-kit/         Reusable inputs, buttons, modals
```

## How the Analysis Works

Given price, quantity, monthly salary, weekly work hours, expected annual return (%), and investment horizon (years):

1. **Work hours to pay** — total cost divided by your implied hourly rate (`(salary × 12) / (workHours × 52)`).
2. **% of income** — total cost as a percentage of one month's salary.
3. **Missed investment income** — compound growth on the total cost: `price × ((1 + rate/100)^years − 1)`.

The same formulas run on the client for live preview (`calculatePurchaseStats`) and on the server when a purchase is saved. The client port must stay identical to the backend implementation or preview and History values will diverge.

**Control example:** $1,200 item, $4,000/month salary, 40 h/week, 5% return, 1 year → **52 h**, **30%**, **+$60**.
