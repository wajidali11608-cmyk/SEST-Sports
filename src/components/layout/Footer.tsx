import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, GraduationCap, Trophy, Users } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080e1b] text-white border-t-3 border-emerald-400 py-5 sm:py-10 font-mono relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        {/* ULTRA-BEAUTIFUL & COMPACT MOBILE FOOTER */}
        <div className="block sm:hidden space-y-3.5">
          {/* Top Brand Banner */}
          <div className="flex items-center justify-between pb-2.5 border-b border-emerald-500/20">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 bg-white p-0.5 border border-emerald-400 shadow-[2px_2px_0px_0px_#10b981] shrink-0">
                <Image
                  src="/images/jamia-hamdard-logo.jpg"
                  alt="Jamia Hamdard Official Crest"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3
                  className="text-xs font-black uppercase text-white font-sans tracking-tight leading-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  JAMIA HAMDARD SEST
                </h3>
                <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mt-0.5">
                  Sports Week 2026
                </span>
              </div>
            </div>
            <div className="bg-emerald-950 px-2 py-1 border border-emerald-400/40 text-[9px] font-mono font-black text-emerald-300 uppercase tracking-wider">
              5-7 OCT
            </div>
          </div>

          {/* Teacher Coordinators Bar */}
          <div className="bg-[#064e3b]/40 border border-emerald-400/30 p-2.5 rounded-sm">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px] mb-1">
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span className="uppercase tracking-wider">Teacher Coordinators</span>
            </div>
            <p className="text-[10px] text-gray-200 font-mono font-medium">
              Dr. Bhavya Alankar • Dr. Safdar Tanveer • Mr. Tabish Mufti
            </p>
          </div>

          {/* Student Leads & Helpdesk Action Pills */}
          <div className="grid grid-cols-3 gap-2 text-[9px] font-mono">
            <a
              href="tel:7006863828"
              className="p-2 bg-emerald-950/90 border border-emerald-400/40 rounded flex flex-col items-center text-center group active:scale-95 transition-all"
            >
              <Phone className="w-3 h-3 text-emerald-400 mb-0.5 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white uppercase text-[8.5px]">Form Help</span>
              <span className="text-emerald-300 font-bold text-[8px] mt-0.5">70068 63828</span>
            </a>

            <a
              href="tel:9910850768"
              className="p-2 bg-emerald-950/90 border border-emerald-400/40 rounded flex flex-col items-center text-center group active:scale-95 transition-all"
            >
              <Users className="w-3 h-3 text-emerald-400 mb-0.5 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white uppercase text-[8.5px]">Md Armaan</span>
              <span className="text-emerald-300 font-bold text-[8px] mt-0.5">99108 50768</span>
            </a>

            <a
              href="tel:8178896352"
              className="p-2 bg-emerald-950/90 border border-emerald-400/40 rounded flex flex-col items-center text-center group active:scale-95 transition-all"
            >
              <Users className="w-3 h-3 text-emerald-400 mb-0.5 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white uppercase text-[8.5px]">Umme Hani</span>
              <span className="text-emerald-300 font-bold text-[8px] mt-0.5">81788 96352</span>
            </a>
          </div>

          {/* Quick Links & Copyright Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20 text-[9.5px] font-bold">
            <div className="flex items-center gap-2.5 text-gray-300 uppercase">
              <Link href="/" className="hover:text-emerald-400">Home</Link>
              <span>•</span>
              <Link href="/register" className="hover:text-emerald-400">Register</Link>
              <span>•</span>
              <Link href="/admin" className="text-emerald-400 flex items-center gap-0.5">
                Admin <ArrowUpRight className="w-2.5 h-2.5" />
              </Link>
            </div>
            <span className="text-[8.5px] text-emerald-300/60 uppercase">© 2026 SEST</span>
          </div>
        </div>

        {/* DESKTOP BEAUTIFUL & BRUTALIST FOOTER */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-12 gap-8 pb-8 border-b border-white/15">

            {/* Col 1: Brand & Venue */}
            <div className="col-span-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 bg-white p-1 border-2 border-emerald-400 shadow-[3px_3px_0px_0px_#10b981] shrink-0">
                  <Image
                    src="/images/jamia-hamdard-logo.jpg"
                    alt="Jamia Hamdard Official Crest"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <div>
                  <h3
                    className="text-lg font-black tracking-tight leading-none uppercase text-white font-sans"
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

            {/* Col 2: Teacher Coordinators */}
            <div className="col-span-3">
              <h4 className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400 mb-3 flex items-center gap-1.5 border-b border-emerald-400/30 pb-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>Teacher Coordinators</span>
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li className="p-2 bg-[#064e3b]/50 border border-emerald-400/30 text-white font-bold">Dr. Bhavya Alankar</li>
                <li className="p-2 bg-[#064e3b]/50 border border-emerald-400/30 text-white font-bold">Dr. Safdar Tanveer</li>
                <li className="p-2 bg-[#064e3b]/50 border border-emerald-400/30 text-white font-bold">Mr. Tabish Mufti</li>
              </ul>
            </div>

            {/* Col 3: Student Coordinators */}
            <div className="col-span-3">
              <h4 className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400 mb-3 flex items-center gap-1.5 border-b border-emerald-400/30 pb-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Student Leads</span>
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <a href="tel:9910850768" className="flex items-center justify-between p-2 bg-[#064e3b]/50 border border-emerald-400/30 hover:bg-[#064e3b] transition-all">
                  <span className="font-bold text-white">Md Armaan Saifi</span>
                  <span className="text-emerald-400 text-[11px] font-bold">+91 99108 50768</span>
                </a>
                <a href="tel:8178896352" className="flex items-center justify-between p-2 bg-[#064e3b]/50 border border-emerald-400/30 hover:bg-[#064e3b] transition-all">
                  <span className="font-bold text-white">Umme Hani</span>
                  <span className="text-emerald-400 text-[11px] font-bold">+91 81788 96352</span>
                </a>
              </div>
            </div>

            {/* Col 4: Form Helpdesk */}
            <div className="col-span-3 space-y-3">
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400 mb-3 flex items-center gap-1.5 border-b border-emerald-400/30 pb-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Form Helpdesk</span>
                </h4>
                <div className="p-2.5 bg-emerald-950 border border-emerald-400">
                  <span className="text-[10px] text-emerald-300 font-bold uppercase block">Facing form issues?</span>
                  <a href="tel:7006863828" className="font-black text-emerald-300 text-sm hover:text-white flex items-center gap-1.5 transition-colors mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>+91 70068 63828</span>
                  </a>
                </div>
              </div>

              <div className="pt-1">
                <ul className="flex items-center gap-3 text-[11px] font-bold uppercase text-gray-300">
                  <li><Link href="/" className="hover:text-emerald-400">Home</Link></li>
                  <li>•</li>
                  <li><Link href="/register" className="hover:text-emerald-400">Register</Link></li>
                  <li>•</li>
                  <li>
                    <Link href="/admin" className="text-emerald-400 hover:text-white flex items-center gap-0.5">
                      Admin Portal <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div className="pt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-emerald-200/60">
            <p>© 2026 SEST Jamia Hamdard. All Rights Reserved.</p>
            <p className="text-emerald-400">5 to 7 October 2026</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
