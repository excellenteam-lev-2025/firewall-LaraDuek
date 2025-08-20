'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User } from "lucide-react";
import {  NavigationMenu,  NavigationMenuItem,  NavigationMenuList,  navigationMenuTriggerStyle,} from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,  } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button";
import { MockUser } from "@/config/mocks";

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
        className="inline-flex items-center justify-center p-4 rounded-md text-slate-900 hover:bg-slate-100  glass rounded-xl shadow-lg"
      >
        <Home size={25} strokeWidth={2} />
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
                    active && "bg-slate-100 font-semibold glass rounded-xl p-6 shadow-lg"
                  )}
                >
                  {tab.label}
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-auto flex items-center  glass rounded-xl shadow-lg">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="rounded-xl">
            <Button variant="ghost" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{MockUser.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end"  className="glass rounded-xl shadow-lg">
            <DropdownMenuItem asChild className="rounded-xl">
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl">
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
