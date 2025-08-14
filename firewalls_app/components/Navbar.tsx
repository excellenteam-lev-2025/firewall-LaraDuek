'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

type Tab = { href: string; label: string };

const TABS: Tab[] = [
  { href: '/overview',       label: 'Overview' },
  { href: '/kernel_modules', label: 'Kernel Modules' },
  { href: '/firewall_rules', label: 'Firewall Rules' },
  { href: '/api_interface',  label: 'API Interface' },
  { href: '/logs_testing',   label: 'Logs & Testing' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      style={{
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Link href="/" style={{ fontWeight: 700 }}>
        firewalls_app
      </Link>

      <nav style={{ display: 'flex', gap: 12 }}>
        {TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                padding: '8px 10px',
                borderRadius: 8,
                textDecoration: 'none',
                background: active ? '#f3f4f6' : 'transparent',
                fontWeight: active ? 600 : 500,
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
