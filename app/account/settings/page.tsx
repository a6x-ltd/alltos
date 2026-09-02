// app/account/settings/page.tsx
'use client';

import { useState } from 'react';
import { LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';

const inputClass =
  'w-full px-4 py-3 rounded-none border-0 border-b-2 border-black/15 bg-transparent focus:outline-none focus:border-black transition';

export default function AccountSettingsPage() {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    marketingEmails: false,
  });

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-md space-y-10">
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-5">
          Profile
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
              Full name
            </label>
            <input type="text" defaultValue="Sam Whitfield" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
              Email address
            </label>
            <input type="email" defaultValue="sam.w@example.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
              New password
            </label>
            <input type="password" placeholder="••••••••" className={inputClass} />
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-black/10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-5">
          Notifications
        </h2>
        <div className="space-y-4">
          {(
            [
              { key: 'orderUpdates', label: 'Order & delivery updates' },
              { key: 'marketingEmails', label: 'Marketing emails' },
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

      <div className="flex items-center gap-4 pt-8 border-t border-black/10">
        <Button className="!bg-black !text-white !rounded-full hover:!bg-black/85" size="lg">
          Save changes
        </Button>
        <button className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:opacity-70 transition">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}