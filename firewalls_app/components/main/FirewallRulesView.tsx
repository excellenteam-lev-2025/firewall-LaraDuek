'use client';
import RulesAddition from '../rules/RulesAddition';
import ExistingRules from '../rules/ExistingRules';

export default function FirewallRulesView() {
  return (
    <div className="grid gap-6">
      <div className="rounded-md border bg-white p-4 shadow-sm">
        <RulesAddition />
      </div>

      <div className="rounded-md border bg-white p-4 shadow-sm">
        <ExistingRules />
      </div>
    </div>
  );
}
