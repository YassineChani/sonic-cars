"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  {
    label: "Nos Voitures",
    href: "/voitures",
    children: [
      { href: "/voitures?city=oujda", label: "Flotte Oujda" },
      { href: "/voitures?city=tanger", label: "Flotte Tanger" },
      { href: "/voitures", label: "Toute la Flotte" },
    ],
  },
  { href: "/reservation", label: "Réserver" },
  { href: "/agences", label: "Nos Agences" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-black/95 backdrop-blur-md border-b border-white/8 shadow-2xl"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <span
                  className="text-2xl font-black tracking-wider"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <span className="text-white">SONIC</span>
                  <span className="text-red-500"> CARS</span>
                </span>
                <div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-transparent"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform",
                          openDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>
                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl py-1 overflow-hidden">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+212600000000"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Phone size={15} />
                <span>+212 600 000 000</span>
              </a>
              <Link href="/reservation" className="btn-primary text-sm px-5 py-2.5">
                Réserver
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-80 bg-zinc-950 border-l border-white/10 flex flex-col transition-transform duration-300",
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
            <span className="text-xl font-black tracking-wide">
              <span className="text-white">SONIC</span>
              <span className="text-red-500"> CARS</span>
            </span>
            <button onClick={() => setIsMobileOpen(false)}>
              <X size={22} className="text-white" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href || "#"}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-colors"
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-8 py-2.5 text-sm text-white/50 hover:text-white/80 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
          <div className="px-6 py-6 border-t border-white/10 flex flex-col gap-3">
            <a
              href="tel:+212600000000"
              className="flex items-center gap-2 text-sm text-white/60"
            >
              <Phone size={15} />
              +212 600 000 000
            </a>
            <Link
              href="/reservation"
              onClick={() => setIsMobileOpen(false)}
              className="btn-primary w-full text-center"
            >
              Réserver Maintenant
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
