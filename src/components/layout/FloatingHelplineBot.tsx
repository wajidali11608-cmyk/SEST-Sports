"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, X, Headphones, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export const FloatingHelplineBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 font-mono">
      {/* FLOATING HELPLINE BOT POPUP WINDOW */}
      {isOpen && (
        <div className="mb-3 w-[92vw] max-w-[360px] bg-white text-[#0f172a] border-4 border-[#0f172a] shadow-[12px_12px_0px_0px_#059669] overflow-hidden animate-fade-in-up">
          {/* BOT HEADER */}
          <div className="bg-[#0f172a] text-white p-4 flex items-center justify-between border-b-4 border-[#0f172a] relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative w-11 h-11 bg-white p-1 border-2 border-emerald-400 shrink-0 shadow-md">
                <Image
                  src="/images/jamia-hamdard-logo.jpg"
                  alt="Jamia Hamdard Logo"
                  fill
                  className="object-contain p-0.5"
                />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0f172a] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black uppercase tracking-wider text-white font-sans">
                    SEST HELPLINE BOT
                  </span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                </div>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">
                  Live Registration Support
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 bg-red-600 hover:bg-red-700 text-white font-black border-2 border-white transition-colors relative z-10"
              title="Close Bot"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* BOT BODY */}
          <div className="p-4 space-y-3.5 bg-[#f8fafc]">
            {/* PRIORITY 1: FORM FILLING HELPLINE */}
            <div className="bg-emerald-500 text-[#0f172a] p-4 border-3 border-[#0f172a] shadow-[4px_4px_0px_0px_#0f172a]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0f172a] font-sans flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" /> Form Filling Support
                </span>
                <span className="bg-[#0f172a] text-emerald-400 text-[9px] uppercase font-black px-2 py-0.5 border border-white">
                  24/7 HELPLINE
                </span>
              </div>
              <p className="text-[11px] font-bold text-[#0f172a] mb-3 font-sans leading-snug">
                Facing issues filling form details or uploading payment screenshot? Call us directly:
              </p>
              <a
                href="tel:7006863828"
                className="w-full py-3 bg-[#0f172a] hover:bg-emerald-950 text-white font-black text-xs uppercase tracking-wider border-2 border-[#0f172a] flex items-center justify-center gap-2 transition-all shadow-[2px_2px_0px_0px_#ffffff]"
              >
                <Phone className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>+91 70068 63828</span>
              </a>
            </div>

            {/* PRIORITY 2: STUDENT COORDINATORS */}
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase text-[#0f172a] block tracking-wider font-sans border-b-2 border-[#0f172a] pb-1">
                👥 Student Lead Coordinators
              </span>
              <div className="grid grid-cols-1 gap-2">
                {/* Md Armaan Saifi */}
                <a
                  href="tel:9910850768"
                  className="p-3 bg-white hover:bg-emerald-50 border-2 border-[#0f172a] transition-all flex items-center justify-between shadow-[3px_3px_0px_0px_#0f172a] group"
                >
                  <div>
                    <span className="text-xs font-black text-[#0f172a] block font-sans">Md Armaan Saifi</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Student Lead</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#0f172a] text-emerald-400 px-2.5 py-1 text-xs font-black group-hover:bg-emerald-600 group-hover:text-white transition-colors border border-[#0f172a]">
                    <Phone className="w-3 h-3" />
                    <span>99108 50768</span>
                  </div>
                </a>

                {/* Umme Hani */}
                <a
                  href="tel:8178896352"
                  className="p-3 bg-white hover:bg-emerald-50 border-2 border-[#0f172a] transition-all flex items-center justify-between shadow-[3px_3px_0px_0px_#0f172a] group"
                >
                  <div>
                    <span className="text-xs font-black text-[#0f172a] block font-sans">Umme Hani</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Student Lead</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#0f172a] text-emerald-400 px-2.5 py-1 text-xs font-black group-hover:bg-emerald-600 group-hover:text-white transition-colors border border-[#0f172a]">
                    <Phone className="w-3 h-3" />
                    <span>81788 96352</span>
                  </div>
                </a>
              </div>
            </div>

            {/* DATES & REGISTER CTA */}
            <div className="pt-2 flex items-center justify-between border-t-2 border-[#0f172a] gap-2">
              <span className="text-[10px] font-black uppercase text-gray-600">
                5 to 7 Oct 2026
              </span>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-[#0f172a] text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors border border-[#0f172a]"
              >
                <span>Register Now</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CONTINUOUS FLOATING TRIGGER BOT BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 p-3 bg-[#0f172a] hover:bg-emerald-600 text-white border-3 sm:border-4 border-emerald-400 shadow-[6px_6px_0px_0px_#10b981] hover:shadow-[8px_8px_0px_0px_#ffffff] transition-all cursor-pointer"
        aria-label="Open Helpline Bot"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#0f172a]" />
        </span>

        <div className="w-9 h-9 bg-emerald-500 text-[#0f172a] group-hover:bg-white group-hover:text-[#0f172a] flex items-center justify-center font-black border-2 border-white transition-colors shrink-0">
          <Headphones className="w-5 h-5 stroke-[2.5]" />
        </div>

        <div className="hidden sm:block text-left pr-1 font-mono">
          <span className="block text-[11px] font-black uppercase tracking-wider text-emerald-400 group-hover:text-white transition-colors leading-none font-sans">
            HELPLINE BOT
          </span>
          <span className="block text-[9px] font-bold uppercase tracking-widest text-gray-300 mt-0.5">
            Need Assistance?
          </span>
        </div>
      </button>
    </div>
  );
};
