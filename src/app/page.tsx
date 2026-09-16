"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ArrowRight, MapPin, Trophy, Calendar } from "lucide-react";
import { SPORTS } from "@/data/mockData";
import { useRegistration } from "@/context/RegistrationContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { setSelectedSportId } = useRegistration();
  const router = useRouter();

  const handleSelectSportAndNavigate = (sportId: string) => {
    setSelectedSportId(sportId);
    router.push(`/register`);
  };

  return (
    <div id="home" className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col font-sans">
      {/* Fixed Navbar */}
      <Navbar transparent />

      <main className="flex-grow">
        {/* HERO HEADER */}
        <Hero />

        {/* SPORTS GRID SECTION — Clean & Simple Mobile Cards */}
        <section id="sports" className="py-16 sm:py-24 bg-white text-[#0f172a]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-[11px] font-mono font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 border border-emerald-400 inline-block mb-2">
                  Inter-Department Tournament
                </span>
                <h2
                  className="text-3xl sm:text-5xl font-black tracking-tight leading-[0.95] uppercase text-[#0f172a]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Select Your <span className="text-emerald-600">Discipline</span>
                </h2>
              </div>
              <p className="text-xs sm:text-sm font-mono text-gray-600 max-w-xs font-medium">
                Tap any sport card below to open the registration form directly.
              </p>
            </div>

            {/* Full Image Gradient Sports Grid — Old Best UI/UX with Overlap Fix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {SPORTS.map((sport, i) => (
                <div
                  key={sport.id}
                  onClick={() => handleSelectSportAndNavigate(sport.id)}
                  className="group relative h-[300px] sm:h-[340px] lg:h-[360px] border-3 sm:border-4 border-[#0f172a] shadow-[6px_6px_0px_0px_#059669] hover:shadow-[10px_10px_0px_0px_#059669] hover:-translate-x-1 hover:-translate-y-1 active:scale-[0.98] cursor-pointer transition-all overflow-hidden flex flex-col justify-end bg-[#0f172a]"
                >
                  {/* Full Cover Image */}
                  <Image
                    src={sport.image}
                    alt={sport.name}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Vibrant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/75 to-transparent z-10" />

                  {/* Top Right Floating Badge */}
                  <div className="absolute top-3 right-3 z-20 bg-[#0f172a] text-emerald-400 px-2.5 py-1 text-[11px] font-mono font-black uppercase border border-emerald-400 shadow-md flex items-center gap-1.5">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>•</span>
                    <span>{sport.type}</span>
                  </div>

                  {/* Bottom Content Area (Separated flex flow with zero overlap guarantee) */}
                  <div className="relative z-20 p-4 sm:p-5 flex flex-col justify-end">
                    {/* Sport Name */}
                    <h3
                      className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors truncate"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {sport.name}
                    </h3>

                    {/* Roster / Player Info */}
                    <p className="text-xs text-emerald-300 font-mono font-bold mt-1 truncate">
                      {sport.playersText}
                    </p>

                    {/* Divider & Action Bar */}
                    <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between gap-3 shrink-0">
                      <span className="text-xs font-mono font-black text-emerald-400 uppercase tracking-widest truncate">
                        Register Discipline
                      </span>
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-emerald-500 group-hover:bg-white text-[#0f172a] font-black flex items-center justify-center border-2 border-[#0f172a] shrink-0 transition-colors shadow">
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENHANCED VIBRANT ABOUT SECTION */}
        <section id="about" className="py-10 sm:py-28 bg-[#0f172a] text-white border-t-4 border-[#0f172a] relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
            {/* MOBILE OPTIMIZED ABOUT VIEW */}
            <div className="block lg:hidden space-y-6">
              {/* Header */}
              <div>
                <span className="text-[10px] font-mono font-black uppercase text-emerald-400 bg-emerald-950 px-2.5 py-1 border border-emerald-500/30 inline-block mb-2">
                  About SEST Sports Week 2026
                </span>
                <h2
                  className="text-2xl sm:text-4xl font-black tracking-tight leading-tight uppercase text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Fostering <span className="text-emerald-400">Athletic Excellence</span> & Unity
                </h2>
              </div>

              {/* Crest Badge Card */}
              <div className="bg-[#064e3b] p-4 border-3 border-white shadow-[6px_6px_0px_0px_#10b981] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-white p-1 border border-emerald-400 shrink-0 shadow">
                    <Image
                      src="/images/jamia-hamdard-logo.jpg"
                      alt="Jamia Hamdard Crest"
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-black text-white uppercase tracking-tight leading-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      JAMIA HAMDARD SEST
                    </h3>
                    <p className="text-[10px] font-mono font-bold text-emerald-200 uppercase tracking-wider mt-0.5">
                      New Delhi • Intra Department
                    </p>
                  </div>
                </div>

                {/* Event Highlights Rows */}
                <div className="grid grid-cols-1 gap-2 font-mono text-[11px] pt-1">
                  <div className="p-2.5 bg-[#0f172a] border border-emerald-400/40 flex items-center justify-between">
                    <span className="font-bold text-gray-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" /> DATES
                    </span>
                    <span className="font-black text-emerald-400 uppercase">5 to 7 October 2026</span>
                  </div>

                  <div className="p-2.5 bg-[#0f172a] border border-emerald-400/40 flex items-center justify-between">
                    <span className="font-bold text-gray-300 flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-emerald-400" /> DISCIPLINES
                    </span>
                    <span className="font-black text-emerald-400 uppercase">5 Major Sports</span>
                  </div>

                  <div className="p-2.5 bg-[#0f172a] border border-emerald-400/40 flex items-center justify-between">
                    <span className="font-bold text-gray-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> VENUE
                    </span>
                    <span className="font-black text-emerald-400 uppercase">Sports Complex</span>
                  </div>
                </div>
              </div>

              {/* Editorial Description */}
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                The School of Engineering Sciences & Technology (SEST) Sports Week is Jamia Hamdard’s premier annual athletic festival. Bringing together students, faculty, and athletes across engineering disciplines to compete for campus glory.
              </p>

              {/* 3 Stat Badges Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 bg-[#064e3b]/50 border-2 border-emerald-400/40 text-center">
                  <span className="block text-2xl font-black text-emerald-400 font-mono">5</span>
                  <span className="text-[9px] font-mono text-gray-200 font-bold uppercase tracking-wider block mt-0.5">Sports</span>
                </div>
                <div className="p-3 bg-[#064e3b]/50 border-2 border-emerald-400/40 text-center">
                  <span className="block text-2xl font-black text-emerald-400 font-mono">3</span>
                  <span className="text-[9px] font-mono text-gray-200 font-bold uppercase tracking-wider block mt-0.5">Days</span>
                </div>
                <div className="p-3 bg-[#064e3b]/50 border-2 border-emerald-400/40 text-center">
                  <span className="block text-2xl font-black text-emerald-400 font-mono">1</span>
                  <span className="text-[9px] font-mono text-gray-200 font-bold uppercase tracking-wider block mt-0.5">Champion</span>
                </div>
              </div>
            </div>

            {/* DESKTOP ABOUT VIEW */}
            <div className="hidden lg:grid grid-cols-12 gap-14 items-center">
              {/* Left Column: Jamia Hamdard SEST Crest & Event Specs */}
              <div className="col-span-5 bg-[#064e3b] p-10 border-4 border-white shadow-[10px_10px_0px_0px_#10b981] relative">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-emerald-400/40">
                  <div className="relative w-20 h-20 bg-white p-1.5 border-2 border-emerald-400 shrink-0 shadow-md">
                    <Image
                      src="/images/jamia-hamdard-logo.jpg"
                      alt="Jamia Hamdard Crest"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3
                      className="text-3xl font-black text-white uppercase tracking-tight leading-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      SEST DEPARTMENT
                    </h3>
                    <p className="text-xs font-mono font-bold text-emerald-200 uppercase tracking-wider mt-1">
                      Jamia Hamdard, New Delhi
                    </p>
                  </div>
                </div>

                {/* Event Highlights Badges */}
                <div className="space-y-3.5 font-mono text-xs">
                  <div className="p-4 bg-[#0f172a] border border-emerald-400/50 flex items-center justify-between">
                    <span className="font-bold text-gray-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-400" /> DATES
                    </span>
                    <span className="font-black text-emerald-400 uppercase tracking-wider text-sm">5 to 7 October 2026</span>
                  </div>

                  <div className="p-4 bg-[#0f172a] border border-emerald-400/50 flex items-center justify-between">
                    <span className="font-bold text-gray-300 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-emerald-400" /> DISCIPLINES
                    </span>
                    <span className="font-black text-emerald-400 uppercase tracking-wider text-sm">5 Major Sports</span>
                  </div>

                  <div className="p-4 bg-[#0f172a] border border-emerald-400/50 flex items-center justify-between">
                    <span className="font-bold text-gray-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400" /> VENUE
                    </span>
                    <span className="font-black text-emerald-400 uppercase tracking-wider text-sm">Sports Complex</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Copy & Vision */}
              <div className="col-span-7 space-y-6">
                <div>
                  <h2
                    className="text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] uppercase text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Fostering <span className="text-emerald-400">Athletic Excellence</span> & Department Unity
                  </h2>
                </div>

                <p className="text-base text-gray-300 leading-relaxed font-light">
                  The School of Engineering Sciences & Technology (SEST) Sports Week is Jamia Hamdard’s premier annual athletic festival. Designed to promote physical fitness, competitive vigor, and departmental camaraderie, it brings together students, faculty, and athletes across engineering disciplines.
                </p>

                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Whether taking the pitch for high-stakes football matches, competing in fast-paced badminton clashes, or driving down the basketball court, SEST Sports Week provides every student an arena to shine.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="p-4 bg-[#064e3b]/40 border-2 border-emerald-400/40 text-center">
                    <span className="block text-4xl font-black text-emerald-400 font-mono">5</span>
                    <span className="text-[11px] font-mono text-gray-300 font-bold uppercase tracking-wider">Disciplines</span>
                  </div>
                  <div className="p-4 bg-[#064e3b]/40 border-2 border-emerald-400/40 text-center">
                    <span className="block text-4xl font-black text-emerald-400 font-mono">3</span>
                    <span className="text-[11px] font-mono text-gray-300 font-bold uppercase tracking-wider">Action Days</span>
                  </div>
                  <div className="p-4 bg-[#064e3b]/40 border-2 border-emerald-400/40 text-center">
                    <span className="block text-4xl font-black text-emerald-400 font-mono">1</span>
                    <span className="text-[11px] font-mono text-gray-300 font-bold uppercase tracking-wider">Overall Champion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


