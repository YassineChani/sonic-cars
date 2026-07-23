"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  MapPin,
  HelpCircle,
  MessageSquareQuote,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNav = [
  { href: "/admin/dashboard", label: "Tableau de Bord", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Réservations", icon: CalendarCheck },
  { href: "/admin/cars", label: "Gestion Flotte", icon: Car },
  { href: "/admin/locations", label: "Agences & Villes", icon: MapPin },
  { href: "/admin/faqs", label: "Gestion FAQ", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Avis Clients", icon: MessageSquareQuote },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <span className="text-xl font-black tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
              <span className="text-white">SONIC</span>
              <span className="text-red-500"> ADMIN</span>
            </span>
          </Link>
          {/* Close button on mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white/50 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        {/* View site link */}
        <Link
          href="/"
          target="_blank"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
        >
          <ExternalLink size={16} />
          <span>Voir le Site</span>
        </Link>
        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-zinc-950 border-b border-white/10 flex items-center justify-between px-4">
        <Link href="/admin/dashboard" className="text-lg font-black tracking-wider" style={{ fontFamily: "var(--font-outfit)" }}>
          <span className="text-white">SONIC</span>
          <span className="text-red-500"> ADMIN</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-white/70 hover:text-white p-2"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-zinc-950 border-r border-white/10 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-zinc-950 border-r border-white/10 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}
