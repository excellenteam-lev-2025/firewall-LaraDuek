import * as React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #e5e7eb',
        padding: '12px 16px',
        marginTop: 'auto',
        fontSize: 12,
        color: '#6b7280',
      }}
    >
      © {new Date().getFullYear()} firewalls_app — All rights reserved
    </footer>
  );
}
