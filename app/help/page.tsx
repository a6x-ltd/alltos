// app/help/page.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Anton, Inter } from 'next/font/google';
import { Search, ChevronDown, Package, Truck, RotateCcw, User, Pill } from 'lucide-react';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

interface FAQ {
  category: string;
  question: string;
  answer: string;
}

const CATEGORIES = [
  { label: 'Orders', icon: Package },
  { label: 'Shipping', icon: Truck },
  { label: 'Returns', icon: RotateCcw },
  { label: 'Account', icon: User },
  { label: 'Products', icon: Pill },
];

// Replace with real support content / CMS-driven FAQs.
const FAQS: FAQ[] = [
  {
    category: 'Orders',
    question: 'Can I change or cancel my order after placing it?',
    answer:
      'We start preparing orders quickly, so changes can only be made within 30 minutes of checkout. Contact us as soon as possible and we\u2019ll do our best to help.',
  },
  {
    category: 'Orders',
    question: 'I received the wrong item — what do I do?',
    answer:
      'Sorry about that. Email us a photo of what you received along with your order number and we\u2019ll send the correct item or a refund, no return needed.',
  },
  {
    category: 'Shipping',
    question: 'How long does delivery take?',
    answer:
      'Standard delivery takes 3\u20135 business days. Express (1\u20132 days) and next-day options are available at checkout. See our Shipping Info page for full details.',
  },
  {
    category: 'Shipping',
    question: 'Do you ship outside the UK?',
    answer:
      'Currently we ship to the UK and Ireland only. We\u2019re working on expanding — check back for updates.',
  },
  {
    category: 'Returns',
    question: 'What is your returns policy?',
    answer:
      'Unopened items can be returned within 14 days of delivery for a full refund. Opened supplements can\u2019t be returned for health and safety reasons. Full details are on our Returns Policy page.',
  },
  {
    category: 'Returns',
    question: 'How long do refunds take?',
    answer:
      'Once we receive your return, refunds are processed within 3\u20135 business days back to your original payment method.',
  },
  {
    category: 'Account',
    question: 'How do I reset my password?',
    answer:
      'Go to the sign-in page and select "Forgot password" — we\u2019ll email you a reset link. If you don\u2019t see it, check your spam folder.',
  },
  {
    category: 'Account',
    question: 'How do I update my saved address?',
    answer:
      'Head to Account \u2192 Addresses to add, edit, or remove saved delivery addresses.',
  },
  {
    category: 'Products',
    question: 'Are your supplements third-party tested?',
    answer:
      'Yes — every batch is independently tested for purity and potency before it ships. See our About page for more on our process.',
  },
  {
    category: 'Products',
    question: 'Can I take multiple supplements together?',
    answer:
      'Most of our products can be combined, but if you\u2019re pregnant, breastfeeding, or taking medication, check with a doctor or pharmacist first.',
  },
];

export default function HelpCentrePage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory = !activeCategory || faq.category === activeCategory;
      const matchesQuery =
        !query.trim() ||
        faq.question.toLowerCase().includes(query.toLowerCase()) ||
        faq.answer.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Support
        </span>
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-2 mb-8">
          Help centre
        </h1>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for an answer"
            className="w-full pl-11 pr-4 py-3.5 rounded-full border border-black/15 text-sm focus:outline-none focus:border-black transition"
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition ${
              activeCategory === null
                ? 'bg-black text-white'
                : 'border border-black/15 text-black/60 hover:border-black hover:text-black'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(label)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition ${
                activeCategory === label
                  ? 'bg-black text-white'
                  : 'border border-black/15 text-black/60 hover:border-black hover:text-black'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-10 divide-y divide-black/10 border-t border-b border-black/10">
          {filtered.length === 0 ? (
            <p className="text-sm text-black/50 py-12 text-center">
              No answers matched your search. Try a different term, or get in touch below.
            </p>
          ) : (
            filtered.map((faq, i) => {
              const isOpen = openId === i;
              return (
                <div key={faq.question}>
                  <button
                    onClick={() => setOpenId(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-sm font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-black/40 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="text-sm text-black/60 leading-relaxed pb-5 pr-8">{faq.answer}</p>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="mt-16 border border-black/10 rounded-2xl p-8 text-center">
          <p className="font-[family-name:var(--font-display)] uppercase text-xl mb-2">
            Still need help?
          </p>
          <p className="text-sm text-black/60 mb-6">
            Our team typically replies within one business day.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-black/85 transition"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}