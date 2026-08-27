// app/admin/settings/page.tsx
'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

const inputClass =
  'w-full px-4 py-3 rounded-none border-0 border-b-2 border-black/15 bg-transparent focus:outline-none focus:border-black transition';

export default function AdminSettingsPage() {
  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    lowStockAlerts: true,
    marketingEmails: false,
  });

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-xl">
      <h1 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl mb-8">
        Settings
      </h1>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-5">
          Store information
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
              Store name
            </label>
            <input type="text" defaultValue="Your Brand" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
              Support email
            </label>
            <input type="email" defaultValue="hello@yourbrand.co.uk" className={inputClass} />
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-black/10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-5">
          Notifications
        </h2>
        <div className="space-y-4">
          {(
            [
              { key: 'orderAlerts', label: 'New order alerts' },
              { key: 'lowStockAlerts', label: 'Low stock alerts' },
              { key: 'marketingEmails', label: 'Marketing email digests' },
            ] as const
          ).map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium">{label}</span>
              <button
                type="button"
                onClick={() => toggle(key)}
                aria-pressed={notifications[key]}
                className={`w-11 h-6 rounded-full transition relative ${
                  notifications[key] ? 'bg-black' : 'bg-black/15'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    notifications[key] ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button className="!bg-black !text-white !rounded-full hover:!bg-black/85 mt-10" size="lg">
        Save changes
      </Button>
    </div>
  );
}