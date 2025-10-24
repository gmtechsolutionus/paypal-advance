import Head from 'next/head';
import { useMemo } from 'react';
import { InvitationGate } from '../components/InvitationGate';

type Insight = {
  title: string;
  description: string;
};

const insights: Insight[] = [
  {
    title: 'Track balances at a glance',
    description:
      'Visualise individual and group balances with contextual colour cues so that outstanding debt is never a surprise.'
  },
  {
    title: 'Settlement automation',
    description:
      'Simulate the best settlement path and share it instantly with your circle to keep everyone aligned.'
  },
  {
    title: 'Invite-only collaboration',
    description:
      'Control access with invitation keys and role-based permissions layered on top of the Balance Payment core.'
  }
];

const callToActions = [
  {
    label: 'Review the Balance Payment backend repo',
    href: 'https://github.com/derickinggg/balance_payment-app-V2',
    description: 'Inspect the API powering this experience.'
  },
  {
    label: 'Configure deployment variables',
    href: 'https://vercel.com/docs/concepts/projects/environment-variables',
    description: 'Set NEXT_PUBLIC_INVITATION_KEY before deploying to Vercel.'
  }
];

const INVITATION_KEY =
  process.env.NEXT_PUBLIC_INVITATION_KEY || 'change-me-before-deploy';

export default function Home() {
  const bannerMessage = useMemo(() => {
    if (INVITATION_KEY === 'change-me-before-deploy') {
      return 'Set NEXT_PUBLIC_INVITATION_KEY in your environment before deploying.';
    }
    return undefined;
  }, []);

  return (
    <>
      <Head>
        <title>Balance Payment Access Portal</title>
      </Head>
      <InvitationGate invitationKey={INVITATION_KEY}>
        {({ onSignOut }) => (
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <header className="border-b border-slate-800 bg-slate-950/40">
              <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
                    Balance Payment
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold text-white">
                    Operational dashboard
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-slate-300">
                    This private dashboard surfaces quick insights from the Balance
                    Payment platform. Only invited collaborators can access the
                    toolkit using a valid invitation key.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.localStorage.removeItem('balance-payment-invite');
                    }
                    onSignOut();
                  }}
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
                >
                  Sign out
                </button>
              </div>
              {bannerMessage ? (
                <div className="border-t border-blue-500/40 bg-blue-500/10">
                  <div className="mx-auto max-w-5xl px-6 py-3 text-sm text-blue-200">
                    {bannerMessage}
                  </div>
                </div>
              ) : null}
            </header>
            <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12">
              <section className="grid gap-6 sm:grid-cols-2">
                {insights.map((insight) => (
                  <article
                    key={insight.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40"
                  >
                    <h2 className="text-xl font-semibold text-white">
                      {insight.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-300">
                      {insight.description}
                    </p>
                  </article>
                ))}
              </section>
              <section className="rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-8 shadow-lg shadow-emerald-500/20">
                <h2 className="text-xl font-semibold text-emerald-100">
                  Integrate with the Balance Payment API
                </h2>
                <p className="mt-3 max-w-3xl text-sm text-emerald-50/90">
                  Connect this access portal to the existing Balance Payment backend
                  services. Consume API routes to fetch live data, surface debt
                  breakdowns, and publish settlement actions from a secure, invite-only
                  interface.
                </p>
              </section>
              <section className="grid gap-4 md:grid-cols-2">
                {callToActions.map((cta) => (
                  <a
                    key={cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-blue-500/60 hover:bg-slate-900/80"
                  >
                    <h3 className="text-base font-semibold text-white group-hover:text-blue-200">
                      {cta.label}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">{cta.description}</p>
                  </a>
                ))}
              </section>
            </main>
            <footer className="border-t border-slate-800 bg-slate-950/60">
              <div className="mx-auto max-w-5xl px-6 py-6 text-xs text-slate-500">
                Balance Payment internal tools · Secure access required
              </div>
            </footer>
          </div>
        )}
      </InvitationGate>
    </>
  );
}
