# Vercel Deployment Troubleshooting

When deploying with Vercel you may see warnings such as:

```
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory...
```

These are emitted by transitive dependencies pulled in by outdated tooling (most
commonly older ESLint builds). Vercel treats warnings as non-blocking, but the
underlying packages should be upgraded so that your production build uses
supported dependencies.

## 1. Pin an up-to-date toolchain

Add or update the following entries in your project's `package.json`:

```json
{
  "engines": {
    "node": "^18.18.0 || ^20.10.0"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "@eslint/config-array": "^0.15.1",
    "@eslint/object-schema": "^2.1.4"
  },
  "overrides": {
    "glob": "^10.3.10",
    "rimraf": "^5.0.5"
  }
}
```

- The newer ESLint release drops the deprecated `@humanwhocodes/*` packages in
  favour of the actively maintained `@eslint/*` equivalents.
- `glob` and `rimraf` are overridden to their supported major versions so that
  the install step no longer downloads version 7/3 respectively.

After saving the file, run `npm install` locally and commit the resulting lockfile
changes.

## 2. Clean the Vercel cache

Vercel reuses previously downloaded dependencies. After upgrading, trigger a
fresh build so the new versions are installed:

1. In the Vercel dashboard open your project.
2. Choose **Deployments → Settings → Clear build cache**.
3. Redeploy or push a new commit.

## 3. Verify locally

Run your build and lint checks before pushing:

```bash
npm run lint
npm run build
```

These commands should complete without the earlier warnings. If any direct
dependencies still reference deprecated packages, update them to the latest
supported versions or file an issue with the upstream maintainer.

## 4. Optional: guard against regressions

Consider adding the [`npm-package-versions`](https://www.npmjs.com/package/npm-package-versions)
package or a simple CI script that searches your lockfile for deprecated
packages so that new regressions are caught during pull requests.
