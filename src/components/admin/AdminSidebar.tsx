"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ClipboardList, ArrowLeft, Lock } from "lucide-react";

interface AdminSidebarProps {
  onLockAdmin?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLockAdmin }) => {
  return (
    <aside className="w-72 bg-[#0f172a] text-white min-h-screen flex flex-col justify-between border-r-4 border-emerald-500/30 p-5 shrink-0">
      <div>
        {/* Header Branding with Jamia Hamdard Crest Logo */}
        <div className="flex items-center gap-3.5 pb-6 mb-6 border-b-2 border-white/20">
          <div className="relative w-12 h-12 bg-white p-1 overflow-hidden border-2 border-emerald-400 shadow-[3px_3px_0px_0px_#10b981] shrink-0">
            <Image
              src="/images/jamia-hamdard-logo.jpg"
              alt="Jamia Hamdard Logo"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <div>
            <h2
              className="text-base font-black text-white uppercase tracking-tight leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SEST ADMIN
            </h2>
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest mt-1 block">
              Jamia Hamdard
            </span>
          </div>
        </div>

        {/* SINGLE CLICKABLE NAVIGATION ITEM */}
        <nav className="space-y-2">
          <div
            className="flex items-center gap-3 px-4 py-3.5 bg-emerald-500 border-2 border-white text-[#0f172a] font-mono text-xs font-black uppercase shadow-[4px_4px_0px_0px_#ffffff]"
          >
            <ClipboardList className="w-4 h-4 shrink-0" />
            <span>All Registrations</span>
          </div>
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="pt-6 border-t-2 border-white/20 space-y-3">
        {onLockAdmin && (
          <button
            onClick={onLockAdmin}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-red-950/80 border border-red-500 text-red-300 font-mono text-xs font-bold uppercase hover:bg-red-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              Lock Admin Panel
            </span>
          </button>
        )}

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold text-white/70 hover:text-emerald-400 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Exit To Main Site</span>
        </Link>
      </div>
    </aside>
  );
};
