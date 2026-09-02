// app/legal/accessibility/page.tsx
// TEMPLATE CONTENT — replace bracketed placeholders and verify actual
// conformance status before publishing. Not legal advice.

const SECTIONS = [
  { id: 'commitment', label: 'Our commitment' },
  { id: 'conformance', label: 'Conformance status' },
  { id: 'measures', label: 'Measures we take' },
  { id: 'limitations', label: 'Known limitations' },
  { id: 'feedback', label: 'Feedback & contact' },
  { id: 'technical', label: 'Technical specifications' },
  { id: 'date', label: 'Date of this statement' },
];

const h2 = 'text-lg font-semibold mt-10 mb-3 scroll-mt-28';
const p = 'text-sm text-black/70 leading-relaxed';
const ul = 'text-sm text-black/70 leading-relaxed list-disc pl-5 space-y-1.5';

export default function AccessibilityStatementPage() {
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
          Allied Tosola Pharmaceutical Industries Ltd is committed to making our website usable by
          everyone, including people with disabilities.
        </p>

        <h2 id="commitment" className={h2}>1. Our commitment</h2>
        <p className={p}>
          We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1
          at Level AA, and to continually improve accessibility as an
          ongoing effort rather than a one-off project.
        </p>

        <h2 id="conformance" className={h2}>2. Conformance status</h2>
        <p className={p}>
          This website is <strong>partially conformant</strong> with WCAG
          2.1 AA. Partially conformant means some parts of the content do not
          fully conform to the accessibility standard yet. [Update this
          status once a formal accessibility audit has been carried out.]
        </p>

        <h2 id="measures" className={h2}>3. Measures we take</h2>
        <ul className={ul}>
          <li>Semantic HTML and clear heading structure throughout the site.</li>
          <li>Keyboard-navigable interactive elements, including forms and menus.</li>
          <li>Sufficient colour contrast for text and interface elements.</li>
          <li>Descriptive alt text for meaningful images.</li>
          <li>Respecting reduced-motion preferences for animations.</li>
        </ul>

        <h2 id="limitations" className={h2}>4. Known limitations</h2>
        <p className={p}>
          Despite our efforts, some areas may not yet be fully accessible —
          for example, some third-party embedded content (such as payment
          widgets) may not meet the same standard, as it falls outside our
          direct control. We are working with providers to improve this.
        </p>

        <h2 id="feedback" className={h2}>5. Feedback &amp; contact</h2>
        <p className={p}>
          If you encounter any accessibility barriers on our website, please
          let us know at{' '}
          <a href="mailto:accessibility@yourbrand.co.uk" className="underline hover:no-underline">
            accessibility@yourbrand.co.uk
          </a>. Please include the page you were on and a description of the
          issue — we aim to respond within [X] business days.
        </p>

        <h2 id="technical" className={h2}>6. Technical specifications</h2>
        <p className={p}>
          Accessibility of this website relies on HTML, CSS, and JavaScript
          working with the accessibility features built into modern browsers
          and assistive technologies. It is designed to work best with
          up-to-date versions of these tools.
        </p>

        <h2 id="date" className={h2}>7. Date of this statement</h2>
        <p className={p}>
          This statement was created on [creation date] and last reviewed on
          28 August 2026.
        </p>
      </div>
    </div>
  );
}