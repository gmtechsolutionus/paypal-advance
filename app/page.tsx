"use client";

import { FormEvent, useMemo, useState } from "react";

const MIN_PERCENTAGE = 10;
const MAX_PERCENTAGE = 35;
const DEFAULT_PERCENTAGE = 20;
const MULTIPLIER = 3;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(Math.round(value));
}

export default function HomePage() {
  const [sales, setSales] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(DEFAULT_PERCENTAGE);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { advance, holdback, hasEstimate } = useMemo(() => {
    const numericSales = Number.parseFloat(sales.replace(/,/g, ""));
    if (!Number.isFinite(numericSales) || numericSales <= 0) {
      return { advance: 0, holdback: 0, hasEstimate: false } as const;
    }

    const pct = percentage / 100;
    return {
      advance: numericSales * pct * MULTIPLIER,
      holdback: numericSales * pct,
      hasEstimate: true,
    } as const;
  }, [percentage, sales]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <header className="hero">
        <div className="hero__content">
          <span className="badge">Cash Flow Solutions</span>
          <h1>Unlock tomorrow’s revenue today with PayPal Advance</h1>
          <p>
            Flexible, transparent financing designed for growing businesses.
            Secure fast access to working capital without interrupting your
            payment flow.
          </p>
          <a href="#apply" className="cta">
            Check your eligibility
          </a>
        </div>
        <div className="hero__card">
          <h2>Advance Snapshot</h2>
          <ul>
            <li>
              <strong>Funding range:</strong> $5k — $250k
            </li>
            <li>
              <strong>Decision time:</strong> Under 5 minutes
            </li>
            <li>
              <strong>Payback:</strong> Automated with each sale
            </li>
            <li>
              <strong>Fees:</strong> Fixed, clear, and upfront
            </li>
          </ul>
        </div>
      </header>

      <main>
        <section className="features" id="features">
          <h2 className="section-title">Why businesses choose PayPal Advance</h2>
          <div className="grid">
            <article>
              <h3>Fast access to capital</h3>
              <p>
                Submit a short application connected to your PayPal sales data
                and unlock funding options tailored to your performance.
              </p>
            </article>
            <article>
              <h3>Seamless repayment</h3>
              <p>
                Payments adjust dynamically with your revenue so you only pay
                more when you sell more.
              </p>
            </article>
            <article>
              <h3>No hidden surprises</h3>
              <p>
                Review transparent terms before accepting the advance—no
                compound interest, late fees, or prepayment penalties.
              </p>
            </article>
          </div>
        </section>

        <section className="calculator" id="calculator">
          <h2 className="section-title">Estimate your advance</h2>
          <p className="calculator__note">
            Use your average monthly sales to get a quick estimate of potential
            funding.
          </p>
          <form id="estimate-form" onSubmit={handleSubmit}>
            <label htmlFor="sales">Average monthly PayPal sales ($)</label>
            <input
              type="number"
              id="sales"
              min={0}
              step={100}
              placeholder="e.g. 12000"
              value={sales}
              onChange={(event) => setSales(event.target.value)}
              required
              inputMode="decimal"
            />

            <label htmlFor="percentage">Advance percentage</label>
            <input
              type="range"
              id="percentage"
              min={MIN_PERCENTAGE}
              max={MAX_PERCENTAGE}
              value={percentage}
              onChange={(event) => setPercentage(Number(event.target.value))}
            />
            <div className="range-value">
              <span aria-live="polite">{percentage}</span>%
            </div>

            <button type="submit" className="cta">
              Calculate potential advance
            </button>
          </form>
          <div className="estimate" aria-live="polite">
            {hasEstimate ? (
              <>
                <p>
                  Your estimated advance could be <strong>{formatCurrency(advance)}</strong>.
                </p>
                <p>
                  Repay with approximately <strong>{formatCurrency(holdback)}</strong> held from monthly sales.
                </p>
              </>
            ) : submitted ? (
              <p>Enter your monthly sales to view an estimate.</p>
            ) : null}
          </div>
        </section>

        <section className="faq" id="faq">
          <h2 className="section-title">Frequently asked questions</h2>
          <details>
            <summary>How quickly can I access funds?</summary>
            <p>
              Approved funds typically arrive in your PayPal account within one
              business day of accepting the advance offer.
            </p>
          </details>
          <details>
            <summary>How are repayments collected?</summary>
            <p>
              We deduct a small percentage of your PayPal sales automatically
              until the advance and fee are fully repaid.
            </p>
          </details>
          <details>
            <summary>Can I repay early?</summary>
            <p>
              Yes. There are no prepayment penalties—you can repay the remaining
              balance at any time.
            </p>
          </details>
        </section>
      </main>

      <footer id="apply">
        <div>
          <h2 className="section-title">Ready to accelerate your growth?</h2>
          <p>
            Connect your PayPal Business account to view tailored offers.
            Checking eligibility won’t impact your credit score.
          </p>
        </div>
        <a className="cta secondary" href="mailto:sales@paypal-advance.com">
          Talk to a specialist
        </a>
      </footer>
    </>
  );
}
