'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import {  NavigationMenu,  NavigationMenuItem,  NavigationMenuList,  navigationMenuTriggerStyle,} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils"; 

const TABS = [
  { href: "/kernel_modules", label: "Kernel Modules" },
  { href: "/firewall_rules", label: "Firewall Rules" },
  { href: "/api_interface", label: "API Interface" },
  { href: "/logs_testing", label: "Logs & Testing" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b flex items-center gap-4 px-4 py-3">
      <Link
        href="/"
        aria-label="Go to Home"
        className="inline-flex items-center justify-center p-2 rounded-md text-slate-900 hover:bg-slate-100"
      >
        <Home size={20} strokeWidth={2} />
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          {TABS.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <NavigationMenuItem key={tab.href}>
                <Link
                  href={tab.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    active && "bg-slate-100 font-semibold"
                  )}
                >
                  {tab.label}
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-auto flex gap-2">
        <Link
          href="/settings"
          className={cn(
            "px-3 py-2 rounded-md hover:bg-slate-100",
            pathname.startsWith("/settings") && "bg-slate-100 font-semibold"
          )}
        >
          Settings
        </Link>
        <Link
          href="/profile"
          className={cn(
            "px-3 py-2 rounded-md hover:bg-slate-100",
            pathname.startsWith("/profile") && "bg-slate-100 font-semibold"
          )}
        >
          Profile
        </Link>
      </div>
    </header>
  );
}
