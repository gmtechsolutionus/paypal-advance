# Deployment Notes

This project is a Next.js application deployed on Vercel. The build pipeline is
standard—Vercel runs `npm install` followed by `npm run build`, which produces
an optimized production bundle.

## Local verification

Run the development server locally to validate copy updates or layout tweaks:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to preview the experience. When you are ready to
ship, execute `npm run build` locally to ensure the project compiles without
errors.

## Updating npm tooling (optional)

If Vercel warns about deprecated npm packages, run `python main.py`. The helper
script refreshes `package.json` with modern ESLint tooling and dependency
overrides. Commit the regenerated `package-lock.json` from `npm install` so
Vercel reuses the updated graph.
