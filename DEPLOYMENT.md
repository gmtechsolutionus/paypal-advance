# Deployment Notes

This project deploys to Vercel as a static site that lives in the `public/`
folder. The root `vercel.json` already pins the output directory to `public`, so
no extra configuration is required. No build step is required; just commit any
HTML/CSS/JS updates under `public/`.

## Local verification

You can preview the site locally with any static file server. For example:

```bash
npx serve public
```

## Updating npm tooling (optional)

If Vercel warns about deprecated npm packages, run `python main.py`. The helper
script refreshes `package.json` with modern ESLint tooling and dependency
overrides. Commit the regenerated `package-lock.json` from `npm install` so
Vercel reuses the updated graph.
