'use client';
import RulesAddition from '../rules/RulesAddition';
//import ExistingRules from './ExistingRules';

export default function FirewallRulesView() {
  return (
    <div className="grid gap-6">
      <div className="rounded-md border bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Add Rule
        </h2>
        <RulesAddition />
      </div>

      <div className="rounded-md border bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Existing Rules
        </h2>
        {/* <ExistingRules /> */}
      </div>
    </div>
  );
}
