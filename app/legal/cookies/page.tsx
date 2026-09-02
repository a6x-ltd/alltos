// app/legal/cookies/page.tsx
// TEMPLATE CONTENT — replace bracketed placeholders and have this reviewed by
// a solicitor before publishing. Not legal advice. The toggle UI below is a
// visual preference center only — wire it up to your actual consent-management
// / analytics-loading logic before relying on it for PECR compliance.
'use client';

import { useState } from 'react';

const SECTIONS = [
  { id: 'what-are-cookies', label: 'What are cookies' },
  { id: 'types', label: 'Types of cookies we use' },
  { id: 'third-party', label: 'Third-party cookies' },
  { id: 'managing', label: 'Managing cookies' },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'Contact us' },
];

const h2 = 'text-lg font-semibold mt-10 mb-3 scroll-mt-28';
const p = 'text-sm text-black/70 leading-relaxed';

interface CookieCategory {
  key: 'necessary' | 'analytics' | 'functional' | 'marketing';
  label: string;
  description: string;
  locked?: boolean;
}

const CATEGORIES: CookieCategory[] = [
  {
    key: 'necessary',
    label: 'Strictly necessary',
    description: 'Required for the site to function — login, cart, and checkout. Cannot be switched off.',
    locked: true,
  },
  {
    key: 'analytics',
    label: 'Performance & analytics',
    description: 'Helps us understand how the site is used so we can improve it.',
  },
  {
    key: 'functional',
    label: 'Functional',
    description: 'Remembers preferences like currency and recently viewed products.',
  },
  {
    key: 'marketing',
    label: 'Targeting & marketing',
    description: 'Used to show relevant ads and measure campaign performance.',
  },
];

export default function CookiePolicyPage() {
  const [prefs, setPrefs] = useState({
    necessary: true,
    analytics: true,
    functional: true,
    marketing: false,
  });

  const toggle = (key: CookieCategory['key']) => {
    if (key === 'necessary') return;
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="grid md:grid-cols-4 gap-10 md:gap-14">
      <aside className="hidden md:block md:col-span-1">
        <div className="sticky top-24 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-black/40 mb-3">
            On this page
          </p>
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block text-sm text-black/60 hover:text-black py-1 transition"
            >
              {s.label}
            </a>
          ))}
        </div>
      </aside>

      <div className="md:col-span-3 max-w-2xl">
        <p className="text-xs text-black/50">Last updated: 28 August 2026</p>
        <p className={`${p} mt-4`}>
          This policy explains how Allied Tosola Pharmaceutical Industries Ltd uses cookies and similar
          technologies on our website, and how you can manage your
          preferences.
        </p>

        <h2 id="what-are-cookies" className={h2}>1. What are cookies</h2>
        <p className={p}>
          Cookies are small text files placed on your device when you visit a
          website. They&apos;re widely used to make sites work, remember your
          preferences, and provide analytics.
        </p>

        <h2 id="types" className={h2}>2. Types of cookies we use</h2>
        <p className={p}>
          Manage which categories are active below. This preference is stored
          for this session only in this preview — a production build should
          persist it and apply it to actual script loading.
        </p>

        <div className="mt-5 space-y-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="flex items-start justify-between gap-4 border border-black/10 rounded-2xl p-5"
            >
              <div>
                <p className="text-sm font-semibold">{cat.label}</p>
                <p className="text-xs text-black/50 mt-1 max-w-md">{cat.description}</p>
              </div>
              <button
                type="button"
                onClick={() => toggle(cat.key)}
                disabled={cat.locked}
                aria-pressed={prefs[cat.key]}
                className={`w-11 h-6 rounded-full transition relative shrink-0 ${
                  prefs[cat.key] ? 'bg-black' : 'bg-black/15'
                } ${cat.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    prefs[cat.key] ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <h2 id="third-party" className={h2}>3. Third-party cookies</h2>
        <p className={p}>
          Some cookies are set by third parties we work with — for example
          analytics providers, payment processors, and advertising partners.
          These third parties are responsible for their own cookie and
          privacy practices.
        </p>

        <h2 id="managing" className={h2}>4. Managing cookies in your browser</h2>
        <p className={p}>
          In addition to the preferences above, you can block or delete
          cookies through your browser settings. Note that blocking essential
          cookies may prevent parts of the site — like checkout — from
          working correctly.
        </p>

        <h2 id="changes" className={h2}>5. Changes to this policy</h2>
        <p className={p}>
          We may update this policy as our use of cookies changes. Check back
          periodically for the latest version.
        </p>

        <h2 id="contact" className={h2}>6. Contact us</h2>
        <p className={p}>
          Questions about our use of cookies can be sent to{' '}
          <a href="mailto:privacy@yourbrand.co.uk" className="underline hover:no-underline">
            privacy@yourbrand.co.uk
          </a>.
        </p>
      </div>
    </div>
  );
}