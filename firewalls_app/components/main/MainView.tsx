'use client';
import * as React from 'react';
import TabsBar from './TabsBar';
import RulesAddition from '../rules/RulesAddition';

export default function MainView() {
  const [tab, setTab] = React.useState<'rules'>('rules');

  return (
    <section>
      <TabsBar active={tab} onChange={setTab} />

      {tab === 'rules' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 16,
            marginTop: 16,
          }}
        >
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, background: '#fff', padding: 16 }}>
            <h2 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>
              Add New Rule
            </h2>
            <RulesAddition />
          </div>

          <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, background: '#fff', padding: 16 }}>
            <h2 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>
              Existing Rules
            </h2>
            <p style={{ margin: 0, color: '#6b7280' }}>
              Placeholder: here will be the list <em>(ExistingRules)</em> with enable/disable and delete.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
