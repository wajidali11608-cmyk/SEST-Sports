import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, MapPin, GraduationCap, Users, HelpCircle } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] text-white border-t-4 border-emerald-500 pt-14 pb-10 font-mono">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">

        {/* Top Organizers & Helpdesk Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b-2 border-white/15">

          {/* Col 1: Brand & Venue (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 bg-white p-1 overflow-hidden border-2 border-emerald-400 shadow-[3px_3px_0px_0px_#10b981] shrink-0">
                <Image
                  src="/images/jamia-hamdard-logo.jpg"
                  alt="Jamia Hamdard Official Crest"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3
                  className="text-xl font-black tracking-tight leading-none uppercase text-white font-sans"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  JAMIA HAMDARD
                </h3>
                <p className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest mt-1">
                  SEST Sports Week 2026
                </p>
              </div>
            </div>
            <p className="text-xs text-emerald-100/70 font-light leading-relaxed font-sans">
              School of Engineering Sciences & Technology (SEST), Jamia Hamdard, New Delhi.
            </p>
          </div>

          {/* Col 2: Teacher Coordinators (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400 mb-3.5 flex items-center gap-2 border-b-2 border-emerald-400/30 pb-2.5">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Teacher Coordinators</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2.5 p-2.5 bg-[#064e3b]/60 border border-emerald-400/40 rounded-none">
                <span className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" />
                <span className="font-black text-sm text-white tracking-wide">Dr. Bhavya Alankar</span>
              </li>
              <li className="flex items-center gap-2.5 p-2.5 bg-[#064e3b]/60 border border-emerald-400/40 rounded-none">
                <span className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" />
                <span className="font-black text-sm text-white tracking-wide">Dr. Safdar Tanveer</span>
              </li>
              <li className="flex items-center gap-2.5 p-2.5 bg-[#064e3b]/60 border border-emerald-400/40 rounded-none">
                <span className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" />
                <span className="font-black text-sm text-white tracking-wide">Mr. Tabish Mufti</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Coordinators (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400 mb-3.5 flex items-center gap-2 border-b-2 border-emerald-400/30 pb-2.5">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Student Coordinators</span>
            </h4>
            <div className="space-y-2.5 text-xs font-mono">
              <a
                href="tel:9910850768"
                className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-[#064e3b]/60 border border-emerald-400/40 hover:bg-[#064e3b] transition-all gap-1 group"
              >
                <span className="font-black text-sm text-white group-hover:text-emerald-300 transition-colors">
                  Md Armaan Saifi
                </span>
                <span className="font-black text-xs text-emerald-400 bg-emerald-950/80 px-2 py-0.5 border border-emerald-400/30 w-fit">
                  +91 99108 50768
                </span>
              </a>

              <a
                href="tel:8178896352"
                className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-[#064e3b]/60 border border-emerald-400/40 hover:bg-[#064e3b] transition-all gap-1 group"
              >
                <span className="font-black text-sm text-white group-hover:text-emerald-300 transition-colors">
                  Umme Hani
                </span>
                <span className="font-black text-xs text-emerald-400 bg-emerald-950/80 px-2 py-0.5 border border-emerald-400/30 w-fit">
                  +91 81788 96352
                </span>
              </a>
            </div>
          </div>

          {/* Col 4: Form Helpdesk & Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400 mb-3.5 flex items-center gap-2 border-b-2 border-emerald-400/30 pb-2.5">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Form Filling Assistance</span>
              </h4>
              <div className="p-3.5 bg-emerald-950 border-2 border-emerald-400 shadow-sm">
                <span className="text-[10px] text-emerald-300 font-bold uppercase block mb-1">
                  Facing issues filling form?
                </span>
                <a href="tel:7006863828" className="font-black text-emerald-300 text-base hover:text-white flex items-center gap-2 transition-colors">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+91 70068 63828</span>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <ul className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase text-gray-300">
                <li><Link href="/" className="hover:text-emerald-400">Home</Link></li>
                <li>•</li>
                <li><Link href="/register" className="hover:text-emerald-400">Register</Link></li>
                <li>•</li>
                <li>
                  <Link href="/admin" className="hover:text-emerald-400 flex items-center gap-0.5 text-emerald-400">
                    Admin Portal <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold uppercase tracking-widest text-emerald-200/60">
          <p>© 2026 SEST Jamia Hamdard. All Rights Reserved.</p>
          <p className="text-emerald-400 mt-2 sm:mt-0">5 to 7 October 2026</p>
        </div>
      </div>
    </footer>
  );
};
