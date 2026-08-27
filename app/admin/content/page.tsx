// app/admin/content/page.tsx
import { Pencil } from 'lucide-react';

// Replace with real CMS content blocks.
const CONTENT_BLOCKS = [
  { name: 'Homepage hero', updated: '2 days ago' },
  { name: 'Shop by category tiles', updated: '1 week ago' },
  { name: 'Membership banner', updated: '3 weeks ago' },
  { name: 'About page statement', updated: '1 month ago' },
];

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl">
        Content
      </h1>
      <p className="text-sm text-black/50 mt-2 max-w-md">
        Manage the editable sections shown across the storefront.
      </p>

      <div className="mt-8 divide-y divide-black/10 border-t border-b border-black/10">
        {CONTENT_BLOCKS.map((block) => (
          <div key={block.name} className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium">{block.name}</p>
              <p className="text-xs text-black/50 mt-0.5">Last updated {block.updated}</p>
            </div>
            <button className="inline-flex items-center gap-2 border border-black/15 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide hover:border-black transition">
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}