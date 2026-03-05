# Tic-Tac-Toe (React + Tailwind CSS)

A modern Tic-Tac-Toe game built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- Play as X against a computer opponent (O)
- Winner and draw detection
- One-click restart
- Clean, modern UI with Tailwind CSS

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Note

This project uses Vite 7, which recommends Node.js `20.19+` or `22.12+`.

The app requires `index.html` to contain `<div id="root"></div>` as the React mount point. If this element is missing, the app will throw a descriptive error rather than a cryptic null reference exception.

## CI/CD (GitHub Actions)

This repository now includes two GitHub Actions workflows:

- `ci.yml`
	- Runs on push to `master` and on every pull request
	- Installs dependencies, runs lint, and runs build
- `deploy-pages.yml`
	- Runs on push to `master` (and manually via workflow dispatch)
	- Builds the app and deploys `dist/` to GitHub Pages

### One-time GitHub setup

1. Open repository `Settings` -> `Pages`
2. Under `Build and deployment`, set `Source` to `GitHub Actions`
