'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Home } from 'lucide-react'

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
      <Link
        href="/"
        aria-label="Go to Home"
        title="Home"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        borderRadius: 6,
        color: '#0f172a',
        textDecoration: 'none',
        }}
      >
        <Home size={20} strokeWidth={2} />
      </Link>

      

      <nav style={{ display: 'flex', gap: 12 }}>
        {TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              style={{
                padding: '8px 10px',
                borderRadius: 8,
                textDecoration: 'none',
                background: active ? '#f3f4f6' : 'transparent',
                fontWeight: active ? 600 : 500,
                color: '#0f172a',
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
        <Link
          href="/settings"
          style={{
            padding: '8px 10px',
            borderRadius: 8,
            textDecoration: 'none',
            background: pathname.startsWith('/settings') ? '#f3f4f6' : 'transparent',
            fontWeight: pathname.startsWith('/settings') ? 600 : 500,
            color: '#0f172a',
          }}
        >
          Settings
        </Link>
        <Link
          href="/profile"
          style={{
            padding: '8px 10px',
            borderRadius: 8,
            textDecoration: 'none',
            background: pathname.startsWith('/profile') ? '#f3f4f6' : 'transparent',
            fontWeight: pathname.startsWith('/profile') ? 600 : 500,
            color: '#0f172a',
          }}
        >
          Profile
        </Link>
      </div>
    </header>
  );
}
