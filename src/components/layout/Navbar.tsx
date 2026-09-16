"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavbarProps {
  transparent?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Sports", href: "/#sports" },
    { name: "About", href: "/#about" },
    { name: "Register Team", href: "/register" },
  ];

  const isDarkNav = transparent || pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDarkNav
          ? "bg-[#03120c]/95 backdrop-blur-md border-b-2 border-emerald-500/20"
          : "bg-white/95 backdrop-blur-xl border-b-2 border-gray-900"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[76px] sm:h-[84px]">
          {/* LEFT: Grand Jamia Hamdard Crest + SEST Wordmark */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            <div className="relative w-11 h-11 sm:w-14 sm:h-14 bg-white p-1 overflow-hidden border-2 border-emerald-400 shadow-[3px_3px_0px_0px_#10b981] shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/images/jamia-hamdard-logo.jpg"
                alt="Jamia Hamdard Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>

            <div className="w-[2px] h-7 sm:h-9 bg-white/20 inline-block" />

            <div className="flex flex-col">
              <div
                className="font-black text-[16px] sm:text-[20px] tracking-tight leading-none text-white flex items-center gap-1.5 uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span>SEST</span>
                <span className="text-emerald-400 text-[10px] sm:text-[11px] font-mono border border-emerald-400/50 px-1 py-0.5">
                  JAMIA HAMDARD
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.2em] leading-tight text-emerald-400/90 mt-1 font-mono">
                Sports Week 2026
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-[13px] font-black uppercase tracking-wider text-white/80 hover:text-emerald-400 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT: Admin + Register CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[11px] font-black uppercase tracking-[0.18em] text-white/60 hover:text-emerald-400 font-mono transition-all flex items-center gap-1"
            >
              Admin
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 text-[12px] font-black uppercase tracking-[0.15em] bg-emerald-500 hover:bg-emerald-400 text-[#03120c] transition-all shadow-[4px_4px_0px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white bg-emerald-600 border border-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#03120c] border-b-4 border-emerald-500 p-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-mono">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-base font-black uppercase hover:text-emerald-400 py-1"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 text-sm font-bold uppercase hover:text-emerald-400 py-1 flex items-center gap-1"
            >
              Admin Panel Access <ArrowUpRight className="w-4 h-4" />
            </Link>
          </nav>

          <Link
            href="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center py-3.5 bg-emerald-500 text-[#03120c] font-black text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_#ffffff]"
          >
            Register Team Now
          </Link>
        </div>
      )}
    </header>
  );
};
