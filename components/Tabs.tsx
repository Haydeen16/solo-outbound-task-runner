'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { id: 'today', label: 'Today', href: '/' },
  { id: 'people', label: 'People', href: '/people' },
  { id: 'accounts', label: 'Accounts', href: '/accounts' },
  { id: 'cadences', label: 'Cadences', href: '/cadences' },
  { id: 'reporting', label: 'Reporting', href: '/reporting' },
];

export default function Tabs() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-4 border-b border-gray-200 mb-4">
      {tabs.map(tab => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`py-2 px-3 ${active ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
