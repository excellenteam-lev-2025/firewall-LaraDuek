import FirewallRulesView from "@/components/main/FirewallRulesView";

export default async function FirewallRulesPage() {
  return ( 
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-slate-900">
        Firewall Rules
      </h1>
      <FirewallRulesView />
    </main>
  );
}
