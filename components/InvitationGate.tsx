import { useEffect, useMemo, useState, type ReactNode } from 'react';

type InvitationGateProps = {
  children: (options: { onSignOut: () => void }) => ReactNode;
  invitationKey: string;
  storageKey?: string;
};

function secureCompare(expected: string, actual: string) {
  if (expected.length !== actual.length) {
    return false;
  }

  return expected
    .split('')
    .reduce((acc, char, index) => acc && char === actual[index], true);
}

export function InvitationGate({
  children,
  invitationKey,
  storageKey = 'balance-payment-invite'
}: InvitationGateProps) {
  const [enteredKey, setEnteredKey] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cached = window.localStorage.getItem(storageKey);
    if (cached && secureCompare(invitationKey, cached)) {
      setIsUnlocked(true);
    }
  }, [invitationKey, storageKey]);

  useEffect(() => {
    if (!isUnlocked || typeof window === 'undefined') return;
    window.localStorage.setItem(storageKey, invitationKey);
  }, [invitationKey, isUnlocked, storageKey]);

  const errorMessage = useMemo(() => {
    if (!attempted || isUnlocked) return '';
    return 'Invalid invitation key. Please check with the administrator.';
  }, [attempted, isUnlocked]);

  if (isUnlocked) {
    return <>{children({ onSignOut: () => setIsUnlocked(false) })}</>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-slate-900/60 p-8 shadow-xl ring-1 ring-slate-800">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Enter invitation key
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Access to the Balance Payment dashboard is restricted. Submit the
            invitation key you received to continue.
          </p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const isValid = secureCompare(invitationKey, enteredKey.trim());
            setAttempted(true);
            setIsUnlocked(isValid);
            if (!isValid) {
              setEnteredKey('');
            }
          }}
        >
          <div>
            <label
              className="block text-sm font-medium text-slate-200"
              htmlFor="invitation-key"
            >
              Invitation key
            </label>
            <input
              id="invitation-key"
              name="invitation-key"
              value={enteredKey}
              onChange={(event) => setEnteredKey(event.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              autoComplete="off"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          >
            Unlock dashboard
          </button>
          {errorMessage ? (
            <p className="text-sm text-rose-300" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
