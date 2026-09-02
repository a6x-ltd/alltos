// app/gift-cards/page.tsx
'use client';

import { useState } from 'react';
import { Anton, Inter } from 'next/font/google';
import { Gift, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/utils/currency';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const AMOUNTS = [25, 50, 75, 100];

const inputClass =
  'w-full px-4 py-3 rounded-none border-0 border-b-2 border-black/15 bg-transparent focus:outline-none focus:border-black transition';

export default function GiftCardsPage() {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [balanceCode, setBalanceCode] = useState('');

  const selectedAmount = customAmount ? Number(customAmount) || 0 : amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Gift card added:', {
      amount: selectedAmount,
      recipientName,
      recipientEmail,
      senderName,
      message,
    });
  };

  const handleBalanceCheck = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Checking balance for code:', balanceCode);
  };

  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Give the gift of vitality
        </span>
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-2 mb-10">
          Gift cards
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-10 md:gap-14">
          <div className="md:col-span-2 space-y-8">
            {/* Amount */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-4">
                Choose an amount
              </h2>
              <div className="flex flex-wrap gap-3">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setAmount(a);
                      setCustomAmount('');
                    }}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition ${
                      !customAmount && amount === a
                        ? 'bg-black text-white'
                        : 'border border-black/15 hover:border-black'
                    }`}
                  >
                    {formatCurrency(a)}
                  </button>
                ))}
                <input
                  type="number"
                  min={5}
                  placeholder="Custom"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className={`w-28 px-4 py-3 rounded-full border text-sm focus:outline-none transition ${
                    customAmount ? 'border-black' : 'border-black/15 focus:border-black'
                  }`}
                />
              </div>
            </div>

            {/* Recipient details */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-4">
                Recipient details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Recipient name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Recipient email
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Message (optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    maxLength={200}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full !bg-black !text-white !rounded-full hover:!bg-black/85"
              size="lg"
            >
              Add to bag — {formatCurrency(selectedAmount)}
            </Button>
          </div>

          {/* Preview */}
          <div className="h-fit sticky top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-4">
              Preview
            </p>
            <div className="relative aspect-[16/10] rounded-2xl bg-black text-white p-6 flex flex-col justify-between overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"
              />
              <div className="flex items-center justify-between relative">
                <span className="font-[family-name:var(--font-display)] uppercase text-sm tracking-wide">
                  Your Brand
                </span>
                <Gift className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div className="relative">
                <p className="font-[family-name:var(--font-display)] text-4xl">
                  {formatCurrency(selectedAmount)}
                </p>
                <p className="text-xs text-white/60 mt-1">
                  {recipientName ? `For ${recipientName}` : 'Digital gift card'}
                </p>
              </div>
            </div>
            {message && (
              <p className="text-sm text-black/60 mt-4 italic leading-relaxed">&quot;{message}&quot;</p>
            )}
          </div>
        </form>

        {/* Balance checker */}
        <div className="mt-20 pt-10 border-t border-black/10 max-w-md">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-4">
            Check a gift card balance
          </h2>
          <form onSubmit={handleBalanceCheck} className="flex gap-2">
            <input
              type="text"
              value={balanceCode}
              onChange={(e) => setBalanceCode(e.target.value)}
              placeholder="Gift card code"
              className="min-w-0 flex-1 px-4 py-3 rounded-full border border-black/15 text-sm focus:outline-none focus:border-black transition"
            />
            <button
              type="submit"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-black text-sm font-semibold hover:bg-black hover:text-white transition"
            >
              <Search className="w-4 h-4" />
              Check
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}