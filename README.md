# Balance Payment Access Webapp

This project bootstraps a gated access portal for the private
[`balance_payment-app-V2`](https://github.com/derickinggg/balance_payment-app-V2)
repository. The web client is built with Next.js and Tailwind CSS and requires a
valid invitation key before revealing the dashboard content.

## Getting started

```bash
npm install
npm run dev
```

The app is exposed at [http://localhost:3000](http://localhost:3000).

### Invitation key

The UI compares the key typed by the user with the `NEXT_PUBLIC_INVITATION_KEY`
environment variable. Set it locally by creating a `.env.local` file:

```bash
NEXT_PUBLIC_INVITATION_KEY=super-secret-key
```

The key is stored in `localStorage` after a successful unlock. Use the **Sign
out** button in the header to clear the cache and prompt for the key again.

## Deploying to Vercel

1. Install the [Vercel CLI](https://vercel.com/cli) and authenticate with the
   provided token.
2. Run `vercel link` to connect the project to a new or existing Vercel
   project.
3. Configure the `NEXT_PUBLIC_INVITATION_KEY` environment variable for the
   deployment target.
4. Deploy with `vercel --prod`.

> **Note**
> The execution environment used to prepare this change cannot reach Vercel, so
> the deployment steps were not executed. Follow the instructions above from a
> network-enabled terminal.

## Next steps

The dashboard currently surfaces curated guidance. Hook it to the APIs from the
Balance Payment backend to render live metrics, balances, and settlement flows
specific to your deployment.
