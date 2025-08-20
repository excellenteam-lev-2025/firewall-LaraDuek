import * as React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-3  text-xs text-slate-900 dark:text-slate-100">
      <div className="grid grid-cols-2 gap-6">
        <section>
          <div className="font-semibold mb-1">Credits</div>
          <p>© {new Date().getFullYear()} firewalls_app</p>
          <p className="text-slate-500 dark:text-slate-400">All rights reserved</p>
        </section>

        <nav aria-label="site map">
          <div className="font-semibold mb-1">Site Map</div>
          <ul className="grid grid-cols-2 gap-1 list-none p-0 m-0">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/overview" className="hover:underline">Overview</Link></li>
            <li><Link href="/kernel_modules" className="hover:underline">Kernel</Link></li>
            <li><Link href="/firewall_rules" className="hover:underline">Firewall</Link></li>
            <li><Link href="/api_interface" className="hover:underline">API</Link></li>
            <li><Link href="/logs_testing" className="hover:underline">Logs</Link></li>
            <li><Link href="/settings" className="hover:underline">Settings</Link></li>
            <li><Link href="/profile" className="hover:underline">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
