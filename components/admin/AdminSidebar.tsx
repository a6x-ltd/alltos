// components/admin/AdminSidebar.tsx
'use client';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'orders', label: '📦 Orders' },
    { id: 'products', label: '🧴 Products' },
    { id: 'customers', label: '👥 Customers' },
    { id: 'settings', label: '⚙️ Settings' },
  ];

  return (
    <div className="bg-[#f1f0ed] p-6 border-r border-[#e3e1dc]">
      <h4 className="font-semibold text-[#1f3b2c] text-sm uppercase tracking-wide">Admin</h4>
      <ul className="mt-6 space-y-2 text-sm">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-2.5 rounded-lg transition cursor-pointer ${
              activeTab === tab.id
                ? 'font-medium text-[#1f3b2c] bg-white/70'
                : 'text-[#5f5d57] hover:text-[#1f3b2c] hover:bg-white/40'
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
}