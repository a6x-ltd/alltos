// app/legal/privacy/page.tsx
// TEMPLATE CONTENT — replace bracketed placeholders and have this reviewed by
// a solicitor before publishing. Not legal advice.

const SECTIONS = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'information-we-collect', label: 'Information we collect' },
  { id: 'how-we-use-it', label: 'How we use your information' },
  { id: 'legal-basis', label: 'Legal basis for processing' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'sharing', label: 'Sharing your information' },
  { id: 'international-transfers', label: 'International transfers' },
  { id: 'retention', label: 'Data retention' },
  { id: 'your-rights', label: 'Your rights' },
  { id: 'children', label: "Children's privacy" },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'Contact us' },
];

const h2 = 'text-lg font-semibold mt-10 mb-3 scroll-mt-28';
const p = 'text-sm text-black/70 leading-relaxed';
const ul = 'text-sm text-black/70 leading-relaxed list-disc pl-5 space-y-1.5';

export default function PrivacyPolicyPage() {
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
          This policy explains how Allied Tosola Pharmaceutical Industries Ltd (&quot;we&quot;, &quot;us&quot;)
          collects, uses, and protects your personal data when you visit our
          website or place an order, in line with UK GDPR and the Data
          Protection Act 2018.
        </p>

        <h2 id="who-we-are" className={h2}>1. Who we are</h2>
        <p className={p}>
          Allied Tosola Pharmaceutical Industries Ltd is a company registered in England and Wales
          (company number [Company registration number]), with a registered
          office at [Registered address]. We are the data controller for the
          personal information described in this policy.
        </p>

        <h2 id="information-we-collect" className={h2}>2. Information we collect</h2>
        <ul className={ul}>
          <li>Contact details — name, email address, phone number, delivery and billing addresses.</li>
          <li>Order information — items purchased, order value, order history.</li>
          <li>Account information — login credentials, saved wishlist items, preferences.</li>
          <li>Payment information — processed by our payment provider; we do not store full card details.</li>
          <li>Technical data — IP address, browser type, device information, and cookies (see our Cookie Policy).</li>
        </ul>

        <h2 id="how-we-use-it" className={h2}>3. How we use your information</h2>
        <ul className={ul}>
          <li>To process and deliver your orders, and manage returns or refunds.</li>
          <li>To create and manage your account.</li>
          <li>To send order confirmations, shipping updates, and customer service communications.</li>
          <li>To send marketing communications where you have opted in, which you can withdraw at any time.</li>
          <li>To improve our website, products, and services through analytics.</li>
          <li>To detect and prevent fraud, and comply with legal obligations.</li>
        </ul>

        <h2 id="legal-basis" className={h2}>4. Legal basis for processing</h2>
        <p className={p}>
          We rely on different legal bases depending on the purpose: performance
          of a contract (processing your order), legitimate interests
          (improving our services and preventing fraud), consent (marketing
          communications and non-essential cookies), and legal obligation
          (tax and accounting records).
        </p>

        <h2 id="cookies" className={h2}>5. Cookies</h2>
        <p className={p}>
          We use cookies and similar technologies to run our website, remember
          your preferences, and understand how the site is used. Full details,
          including how to manage your preferences, are in our{' '}
          <a href="/legal/cookies" className="underline hover:no-underline">Cookie Policy</a>.
        </p>

        <h2 id="sharing" className={h2}>6. Sharing your information</h2>
        <p className={p}>
          We share personal data with trusted third parties who help us run
          our business — including payment processors, delivery couriers,
          email and marketing platforms, and IT/hosting providers. We require
          these providers to protect your data and only use it for the
          services they provide us.
        </p>

        <h2 id="international-transfers" className={h2}>7. International transfers</h2>
        <p className={p}>
          Where any of our service providers are located outside the UK, we
          ensure appropriate safeguards are in place, such as Standard
          Contractual Clauses or a UK adequacy decision, before transferring
          your data.
        </p>

        <h2 id="retention" className={h2}>8. Data retention</h2>
        <p className={p}>
          We retain personal data for as long as necessary to fulfil the
          purposes it was collected for, including legal, accounting, or
          reporting requirements. Order records are typically kept for
          [retention period, e.g. 6 years] to meet tax obligations.
        </p>

        <h2 id="your-rights" className={h2}>9. Your rights</h2>
        <p className={p}>Under UK GDPR, you have the right to:</p>
        <ul className={ul}>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request erasure of your data in certain circumstances.</li>
          <li>Object to or restrict certain processing.</li>
          <li>Request a portable copy of your data.</li>
          <li>Withdraw consent at any time where processing is based on consent.</li>
        </ul>
        <p className={`${p} mt-3`}>
          To exercise any of these rights, contact us using the details below.
          You also have the right to lodge a complaint with the Information
          Commissioner&apos;s Office (ico.org.uk).
        </p>

        <h2 id="children" className={h2}>10. Children&apos;s privacy</h2>
        <p className={p}>
          Our products and services are intended for adults. We do not
          knowingly collect personal data from children under 16.
        </p>

        <h2 id="changes" className={h2}>11. Changes to this policy</h2>
        <p className={p}>
          We may update this policy from time to time. Material changes will
          be reflected by an updated &quot;last updated&quot; date at the top
          of this page.
        </p>

        <h2 id="contact" className={h2}>12. Contact us</h2>
        <p className={p}>
          For questions about this policy or your personal data, contact us
          at{' '}
          <a href="mailto:privacy@yourbrand.co.uk" className="underline hover:no-underline">
            privacy@yourbrand.co.uk
          </a>{' '}
          or write to us at [Registered address].
        </p>
      </div>
    </div>
  );
}