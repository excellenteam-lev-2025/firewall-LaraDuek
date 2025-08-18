'use client';
import * as React from 'react';
import TabsBar from './TabsBar';
import FirewallRulesView from './FirewallRulesView';

export default function MainView() {
  const [tab, setTab] = React.useState<'rules'>('rules');

  return (
    <section>
      <TabsBar active={tab} onChange={setTab} />

      {tab === 'rules' &&  <FirewallRulesView /> }
    </section>
  );
}
