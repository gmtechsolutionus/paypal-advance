# Deployment Notes

Vercel was warning about deprecated build dependencies when running `npm install`.
Run `python main.py` to update `package.json` so that the install step forces
modern replacements for deprecated packages (such as `glob`, `rimraf` and
`inflight`) and upgrades ESLint to the new 9.x releases that no longer rely on
`@humanwhocodes/*` packages. After committing the generated `package-lock.json`
from `npm install`, Vercel will pull in the patched dependency graph and stop
flagging the deprecated packages during install.
