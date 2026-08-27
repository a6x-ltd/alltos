// app/contact/page.tsx — Nike.com-inspired theme
'use client';

import { useState } from 'react';
import { Anton, Inter } from 'next/font/google';
import { Mail, Phone, Clock, MapPin, Send } from 'lucide-react';
import Button from '@/components/ui/Button';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const inputClass =
  'w-full px-4 py-3 rounded-none border-0 border-b-2 border-black/15 bg-transparent focus:outline-none focus:border-black transition';

const CONTACT_DETAILS = [
  { icon: Mail, label: 'Email', value: 'hello@alltos.uk' },
  { icon: Phone, label: 'Phone', value: '+44 20 1234 5678' },
  { icon: Clock, label: 'Support hours', value: 'Mon–Fri, 9am–6pm GMT' },
  { icon: MapPin, label: 'Studio', value: 'London, United Kingdom' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Message submitted:', form);
    setSubmitted(true);
  };

  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Get in touch
        </span>
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-2 mb-10">
          We&apos;d love to hear from you
        </h1>

        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="border border-black/10 rounded-2xl p-8">
                <p className="font-[family-name:var(--font-display)] uppercase text-2xl mb-2">
                  Message sent
                </p>
                <p className="text-sm text-black/60">
                  Thanks for reaching out — we typically reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder='Your Full Name'
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder='eg. your-email@mail.com'
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder='Type your message'
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="font-medium cursor-pointer transition shadow-sm hover:shadow-md bg-[#1f3b2c]gap-2 bg-[#ead6c8] text-black px-8 py-3.5  text-sm font-semibold hover:bg-white/90 transition aero inline-flex items-center gap-2
                  "
                  size="lg"
                >
                  <Send className="w-4 h-4" />
                  Send message
                </Button>
              </form>
            )}
          </div>

          {/* Contact details */}
          <div className="bg-[#F5F5F5] rounded-2xl p-6 h-fit space-y-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
              Contact details
            </h3>
            {CONTACT_DETAILS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" strokeWidth={2.25} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
                    {label}
                  </p>
                  <p className="text-sm font-medium mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}