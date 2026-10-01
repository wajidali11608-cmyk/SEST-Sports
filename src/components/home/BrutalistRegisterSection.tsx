"use client";

import React from "react";
import Link from "next/link";
import {
  Lock,
  Clock,
  Trophy,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { SPORTS } from "@/data/mockData";

export const BrutalistRegisterSection: React.FC = () => {
  return (
    <section id="register" className="scroll-mt-16 sm:scroll-mt-20 py-8 sm:py-20 bg-gradient-to-b from-[#f8fafc] via-[#fef2f2] to-[#f8fafc] text-[#0f172a] border-t-4 border-red-600">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-8 lg:px-12">
        
        {/* Top Floating Alert Banner */}
        <div className="bg-red-600 text-white p-3 sm:p-4 mb-6 border-3 sm:border-4 border-[#0f172a] shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-between font-mono">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-white" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
              OFFICIAL NOTICE: REGISTRATION DEADLINE HAS PASSED
            </span>
          </div>
          <span className="hidden md:inline-block text-[11px] font-bold uppercase bg-black/30 px-2.5 py-1 border border-white/30">
            SEST SPORTS WEEK 2026
          </span>
        </div>

        {/* Main Closed Card Container */}
        <div className="bg-white border-3 sm:border-4 border-[#0f172a] shadow-[6px_6px_0px_0px_#dc2626] sm:shadow-[12px_12px_0px_0px_#dc2626] overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-[#0f172a] text-white p-6 sm:p-10 border-b-4 border-[#0f172a] relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 text-xs font-mono font-black uppercase border border-red-400 mb-4 shadow">
                <Clock className="w-3.5 h-3.5" />
                <span>FORM SUBMISSIONS CLOSED</span>
              </div>
              <h2
                className="text-3xl sm:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Registrations <span className="text-red-500">Closed</span>
              </h2>
              <p className="text-xs sm:text-base font-mono text-gray-300 font-medium leading-relaxed">
                The official registration window for Jamia Hamdard SEST Sports Week 2026 is now officially closed.
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-10 space-y-6 sm:space-y-8">
            
            {/* Status Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              
              <div className="p-4 sm:p-6 bg-red-50 border-2 sm:border-3 border-red-600 shadow-[4px_4px_0px_0px_#dc2626]">
                <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center font-black mb-3 border border-[#0f172a]">
                  <Lock className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase text-[#0f172a] mb-1 font-mono">
                  Deadline Passed
                </h3>
                <p className="text-xs font-mono text-gray-700 leading-normal">
                  No new team or player registrations are being accepted at this time.
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-emerald-50 border-2 sm:border-3 border-emerald-600 shadow-[4px_4px_0px_0px_#059669]">
                <div className="w-10 h-10 bg-emerald-600 text-white flex items-center justify-center font-black mb-3 border border-[#0f172a]">
                  <Trophy className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase text-[#0f172a] mb-1 font-mono">
                  Schedules & Brackets
                </h3>
                <p className="text-xs font-mono text-gray-700 leading-normal">
                  Tournament draws and match fixtures will be published shortly across all 5 sports.
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-blue-50 border-2 sm:border-3 border-blue-600 shadow-[4px_4px_0px_0px_#2563eb]">
                <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-black mb-3 border border-[#0f172a]">
                  <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase text-[#0f172a] mb-1 font-mono">
                  Registered Squads
                </h3>
                <p className="text-xs font-mono text-gray-700 leading-normal">
                  Captains & managers can verify team submissions via the Admin panel.
                </p>
              </div>

            </div>

            {/* List of Disciplines (Closed Badges) */}
            <div className="bg-[#0f172a] text-white p-4 sm:p-6 border-3 border-[#0f172a]">
              <div className="flex items-center justify-between mb-4 border-b border-white/20 pb-3">
                <h4 className="text-xs sm:text-sm font-black font-mono uppercase tracking-wider text-emerald-400">
                  Participating Disciplines (Registration Status)
                </h4>
                <span className="text-[10px] font-mono uppercase text-red-400 font-bold bg-red-950 px-2 py-0.5 border border-red-500/40">
                  5/5 CLOSED
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {SPORTS.map((sport) => (
                  <div
                    key={sport.id}
                    className="bg-[#1e293b] p-3 border border-white/20 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-emerald-400 uppercase block mb-0.5">
                        {sport.type}
                      </span>
                      <h5 className="text-xs sm:text-sm font-black uppercase text-white truncate font-mono">
                        {sport.name}
                      </h5>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-red-400 uppercase">
                        Closed
                      </span>
                      <Lock className="w-3 h-3 text-red-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Committee Note & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-3 border-[#0f172a]">
              <div className="text-left">
                <p className="text-xs font-mono text-gray-600 font-bold">
                  Questions regarding your submission?
                </p>
                <p className="text-[11px] font-mono text-gray-500">
                  Contact the SEST Sports Committee or visit the Sports Complex Desk.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/"
                  className="flex-1 sm:flex-initial px-6 py-3 bg-[#0f172a] hover:bg-emerald-600 text-white font-mono text-xs uppercase font-black tracking-wider transition-all border-2 border-[#0f172a] shadow-[4px_4px_0px_0px_#059669] flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Home</span>
                </Link>

                <Link
                  href="/admin"
                  className="flex-1 sm:flex-initial px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-[#0f172a] font-mono text-xs uppercase font-black tracking-wider transition-all border-2 border-[#0f172a] shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2"
                >
                  <span>Admin Panel</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
