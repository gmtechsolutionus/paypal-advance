# Handling Deprecated Dependency Warnings on Vercel

The following warnings can appear when Vercel builds this project:

```
npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory.
npm WARN deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported.
npm WARN deprecated glob@7.1.7: Glob versions prior to v9 are no longer supported.
npm WARN deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead.
npm WARN deprecated @humanwhocodes/config-array@0.11.14: Use @eslint/config-array instead.
npm WARN deprecated eslint@8.53.0: This version is no longer supported.
```

These warnings originate from transitive dependencies pulled in by the legacy ESLint 8.53 toolchain.

To resolve them:

1. **Install dependencies locally.**
   ```bash
   npm install
   ```
2. **Upgrade ESLint and related packages.**
   ```bash
   npm install --save-dev eslint@^9 @eslint/js @eslint/config-array @eslint/object-schema glob@^9 rimraf@^5
   ```
3. **Update your ESLint configuration** to use the new `@eslint/js` shareable config and flat config format where possible.
4. **Commit the updated lockfile** (`package-lock.json` or `pnpm-lock.yaml`) so that Vercel installs the patched dependency graph.
5. **Redeploy** via Vercel.

Because these deprecations are warnings, deployments continue to succeed. Upgrading ensures long-term support and eliminates noise in the build logs.
