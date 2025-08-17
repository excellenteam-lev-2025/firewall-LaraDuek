import * as React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #e5e7eb',
        padding: '16px',
        marginTop: 'auto',
        fontSize: 12,
        color: '#6b7280',
        background: '#fff',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 12,
        }}
      >
        <section>
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
            Credits
          </div>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} firewalls_app — All rights reserved
          </p>
        </section>

        <nav aria-label="site map">
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
            Site Map
          </div>
          <ul
            style={{
              listStyle: 'disc',
              paddingLeft: 18,
              margin: 0,
              display: 'grid',
              gap: 4,
            }}
          >
            <li><Link href="/" style={{ color: '#0f172a', textDecoration: 'none' }}>Home</Link></li>
            <li><Link href="/overview" style={{ color: '#0f172a', textDecoration: 'none' }}>Overview</Link></li>
            <li><Link href="/kernel_modules" style={{ color: '#0f172a', textDecoration: 'none' }}>Kernel Modules</Link></li>
            <li><Link href="/firewall_rules" style={{ color: '#0f172a', textDecoration: 'none' }}>Firewall Rules</Link></li>
            <li><Link href="/api_interface" style={{ color: '#0f172a', textDecoration: 'none' }}>API Interface</Link></li>
            <li><Link href="/logs_testing" style={{ color: '#0f172a', textDecoration: 'none' }}>Logs &amp; Testing</Link></li>
            <li><Link href="/settings" style={{ color: '#0f172a', textDecoration: 'none' }}>Settings</Link></li>
            <li><Link href="/profile" style={{ color: '#0f172a', textDecoration: 'none' }}>Profile</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
