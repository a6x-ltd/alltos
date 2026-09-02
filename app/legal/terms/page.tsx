
// app/legal/terms/page.tsx
// TEMPLATE CONTENT — replace bracketed placeholders and have this reviewed by
// a solicitor before publishing. Not legal advice.

const SECTIONS = [
  { id: 'about', label: 'About these terms' },
  { id: 'using-site', label: 'Using our website' },
  { id: 'health-disclaimer', label: 'Products & health disclaimer' },
  { id: 'orders', label: 'Orders & acceptance' },
  { id: 'pricing', label: 'Pricing & payment' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'returns', label: 'Cancellations & returns' },
  { id: 'ip', label: 'Intellectual property' },
  { id: 'liability', label: 'Limitation of liability' },
  { id: 'law', label: 'Governing law' },
  { id: 'changes', label: 'Changes to these terms' },
  { id: 'contact', label: 'Contact us' },
];

const h2 = 'text-lg font-semibold mt-10 mb-3 scroll-mt-28';
const p = 'text-sm text-black/70 leading-relaxed';
const ul = 'text-sm text-black/70 leading-relaxed list-disc pl-5 space-y-1.5';

export default function TermsOfServicePage() {
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
          These terms govern your use of the Allied Tosola Pharmaceutical Industries Ltd website and any
          orders you place with us. By using our website or placing an order,
          you agree to these terms.
        </p>

        <h2 id="about" className={h2}>1. About these terms</h2>
        <p className={p}>
          These terms apply to all orders placed via our website. We may
          update them from time to time — the version in force at the time
          you place an order is the one that applies to that order.
        </p>

        <h2 id="using-site" className={h2}>2. Using our website</h2>
        <p className={p}>
          You must be at least 18 years old to place an order. You agree to
          provide accurate information when creating an account or placing an
          order, and to keep your account credentials secure.
        </p>

        <h2 id="health-disclaimer" className={h2}>3. Products &amp; health disclaimer</h2>
        <p className={p}>
          Our supplements are not intended to diagnose, treat, cure, or
          prevent any disease. They are not a substitute for a varied,
          balanced diet and a healthy lifestyle. If you are pregnant,
          breastfeeding, taking medication, or have a medical condition,
          consult a doctor or pharmacist before use. Keep out of reach of
          children.
        </p>

        <h2 id="orders" className={h2}>4. Orders &amp; acceptance</h2>
        <p className={p}>
          Placing an order constitutes an offer to purchase. A contract is
          only formed once we send you an order confirmation email; we
          reserve the right to decline or cancel an order, for example due to
          stock unavailability or a pricing error.
        </p>

        <h2 id="pricing" className={h2}>5. Pricing &amp; payment</h2>
        <p className={p}>
          All prices are shown in GBP and include UK VAT at the applicable
          rate. We take reasonable care to ensure prices are correct but
          reserve the right to correct any errors. Payment is taken at the
          point of order via our third-party payment providers.
        </p>

        <h2 id="delivery" className={h2}>6. Delivery</h2>
        <p className={p}>
          Delivery times shown at checkout are estimates, not guarantees. Risk
          in the goods passes to you on delivery. If a delivery is
          significantly delayed, contact our customer service team.
        </p>

        <h2 id="returns" className={h2}>7. Cancellations &amp; returns</h2>
        <p className={p}>
          Under the Consumer Contracts Regulations, you have the right to
          cancel most orders within 14 days of receipt for a full refund,
          provided goods are unused, unopened, and in resaleable condition —
          this does not apply to opened supplements or perishable goods,
          for health and safety reasons. Faulty or damaged items can be
          returned in line with your statutory rights under the Consumer
          Rights Act 2015.
        </p>

        <h2 id="ip" className={h2}>8. Intellectual property</h2>
        <p className={p}>
          All content on this website — including text, graphics, logos, and
          product photography — is owned by or licensed to Allied Tosola Pharmaceutical Industries Ltd  and
          may not be reproduced without our permission.
        </p>

        <h2 id="liability" className={h2}>9. Limitation of liability</h2>
        <p className={p}>
          Nothing in these terms limits our liability for death or personal
          injury caused by negligence, or for fraud. Subject to that, our
          liability to you for losses arising from your use of the website or
          products is limited to the amount you paid for the relevant order.
        </p>

        <h2 id="law" className={h2}>10. Governing law</h2>
        <p className={p}>
          These terms are governed by the laws of England and Wales, and any
          disputes will be subject to the exclusive jurisdiction of the
          courts of England and Wales.
        </p>

        <h2 id="changes" className={h2}>11. Changes to these terms</h2>
        <p className={p}>
          We may revise these terms from time to time. Changes will be posted
          on this page with an updated date.
        </p>

        <h2 id="contact" className={h2}>12. Contact us</h2>
        <p className={p}>
          Questions about these terms can be sent to{' '}
          <a href="mailto:hello@yourbrand.co.uk" className="underline hover:no-underline">
            hello@yourbrand.co.uk
          </a>.
        </p>
      </div>
    </div>
  );
}