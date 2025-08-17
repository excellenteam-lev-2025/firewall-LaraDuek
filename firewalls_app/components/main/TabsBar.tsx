'use client';
import * as React from 'react';

type TabKey = 'rules';

export default function TabsBar({
  active = 'rules',
  onChange,
}: {
  active?: TabKey;
  onChange?: (k: TabKey) => void;
}) {
  const btnStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    background: isActive ? '#f3f4f6' : '#ffffff',
    fontWeight: isActive ? 600 : 500,
    cursor: 'pointer',
  });

  return (
    <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
      <button
        type="button"
        onClick={() => onChange?.('rules')}
        style={btnStyle(active === 'rules')}
        aria-current={active === 'rules' ? 'page' : undefined}
      >
        Firewall Rules
      </button>
    </div>
  );
}
