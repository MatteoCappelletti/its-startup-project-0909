# Startup Project

A demo multi-page site built with **Vite + TypeScript** to teach students how to make things in JavaScript and TypeScript to display real data in the browser.

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Static intro page with links to the other sections |
| Characters | `characters.html` + `src/characters.ts` | Fetches and displays all Futurama characters as cards |
| Character detail | `character-detail.html` + `src/character-detail.ts` | Detail page for a single character, reached by clicking a card |
| Episodes | `episodes.html` + `src/episodes.ts` | Fetches and displays all Futurama episodes |

## API

Data is provided by the free public API

## Key concepts demonstrated

- **TypeScript interfaces** — every API response is fully typed
- **`fetch` with `async/await`** — clean asynchronous HTTP calls with `response.ok` check and `try/catch` error handling
- **DOM manipulation** — `getElementById`, `createElement`, `appendChild`, `forEach` to build UI programmatically
- **Querystring parameters** — `URLSearchParams` to pass and read the character `id` between pages
- **CSS custom properties** — all design tokens defined once in `:root`
- **Flexbox** — responsive card grid and layouts without any framework

## Getting started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` (or the next available port).

```bash
npm run build   # production build
npm run preview # preview the production build locally
```
