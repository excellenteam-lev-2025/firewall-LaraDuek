'use client';

import * as React from 'react';
import FirewallRulesView from './FirewallRulesView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export default function MainView() {
  const [tab, setTab] = React.useState<'rules'>('rules');

  return (
    <section>
      <Tabs defaultValue="rules" className="w-full">
        <TabsList>
          <TabsTrigger value="rules">Firewall Rules</TabsTrigger>
        </TabsList>
        <TabsContent value="rules">
          <FirewallRulesView />
        </TabsContent>
      </Tabs>
    </section>
  );
}
