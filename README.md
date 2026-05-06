# Securify Frontend

This repository contains the frontend for the Securify web application. The app provides a user interface for exploring common web security scenarios, including:

- Authentication bypass testing
- Data leakage / sensitive information checks
- Cross-site scripting (XSS) playgrounds

The frontend is built with React, TypeScript, Vite, Tailwind CSS, and shadcn-ui components.

## Getting started

### Install dependencies

From the `Securify-FE` folder, install dependencies with your preferred package manager:

```sh
npm install
```

or, if you are using Bun:

```sh
bun install
```

### Run the development server

Start the app locally with:

```sh
npm run dev
```

or with Bun:

```sh
bun run dev
```

The app will be available at `http://localhost:5173` by default.

## Available scripts

- `npm run dev` - start the Vite development server
- `npm run build` - build the production app
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks
- `npm run test` - run Vitest tests

## Project structure

- `src/` - application source code
- `src/pages/` - main page views such as `AuthBypass`, `DataLeakage`, and `XssPlayground`
- `src/components/` - reusable UI components and layout
- `src/hooks/` - custom hooks
- `src/lib/` - utility modules and store configuration

## Notes

This frontend is focused on security testing workflows and demonstration UI. If you need to connect it to a backend, the backend code lives in the sibling `Securify-BE` folder.
