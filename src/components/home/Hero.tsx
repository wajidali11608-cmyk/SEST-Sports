"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Trophy, ShieldCheck } from "lucide-react";
import { SPORTS } from "@/data/mockData";
import { useRegistration } from "@/context/RegistrationContext";

export const Hero: React.FC = () => {
  const { setSelectedSportId } = useRegistration();

  const handleSelectSport = (sportId: string) => {
    setSelectedSportId(sportId);
  };

  return (
    <section className="relative min-h-[88vh] bg-gradient-to-br from-[#0f172a] via-[#064e3b] to-[#042f2e] text-white flex flex-col overflow-hidden">
      {/* Background Image with Bright Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/images/sest-stadium-hero.jpg"
          alt="SEST Stadium"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-black/50" />
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 flex-grow flex flex-col justify-center max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-10 w-full">
        <div className="max-w-4xl">
          {/* Title */}
          <h1 className="hero-title animate-fade-in-up-delay-1 mb-6">
            <span className="block text-[clamp(48px,8vw,110px)] text-white leading-[0.85] font-black tracking-tighter">
              SPORTS
            </span>
            <span className="block text-[clamp(48px,8vw,110px)] text-emerald-400 leading-[0.85] font-black tracking-tighter">
              WEEK
            </span>
          </h1>

          {/* Sub-tagline */}
          <div className="animate-fade-in-up-delay-2 mb-6">
            <p className="text-[14px] sm:text-lg font-black text-emerald-300 tracking-[0.2em] uppercase font-mono">
              RISE ABOVE <span className="text-white mx-2">•</span> REIGN SUPREME
            </p>
          </div>

          {/* Redefined Description */}
          <p className="animate-fade-in-up-delay-3 text-[15px] sm:text-xl text-emerald-100/90 max-w-2xl leading-relaxed mb-8 font-light">
            The ultimate athletic showcase of SEST, Jamia Hamdard. Assemble your squad, challenge rival teams across 5 major disciplines, and fight for eternal campus glory.
          </p>

          {/* Action CTAs & Badges */}
          <div className="animate-fade-in-up-delay-4 flex flex-wrap items-center gap-4 text-[13px] font-mono font-bold">
            <Link
              href="/register"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#0f172a] font-black text-sm uppercase tracking-widest border-2 border-white shadow-[5px_5px_0px_0px_#ffffff] transition-all flex items-center gap-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span>Register Team Now</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>

            <a
              href="#sports"
              className="px-6 py-4 bg-[#0f172a]/80 hover:bg-[#0f172a] text-white border-2 border-emerald-400 text-xs uppercase tracking-wider font-bold transition-all"
            >
              Explore Sports
            </a>
          </div>
        </div>
      </div>

      {/* Sport Cards Row */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pb-16 w-full">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="label-brutalist text-emerald-200 font-mono text-xs uppercase tracking-widest">
              Select Your Discipline
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {SPORTS.map((sport, index) => (
            <Link
              key={sport.id}
              href={`/register?sport=${sport.id}`}
              onClick={() => handleSelectSport(sport.id)}
              className="group relative h-[260px] sm:h-[300px] overflow-hidden cursor-pointer flex flex-col justify-end border-3 border-white bg-white hover:border-emerald-400 transition-all shadow-lg hover:shadow-[6px_6px_0px_0px_#10b981] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <Image
                src={sport.image}
                alt={sport.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/95 transition-all duration-500" />

              <div className="absolute top-3 right-3 z-10">
                <span className="text-white/30 text-[34px] font-black leading-none font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative z-10 p-4 text-left">
                <h3
                  className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-1 group-hover:text-emerald-400 transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {sport.name}
                </h3>
                <p className="text-[11px] text-gray-300 font-mono mb-3">
                  {sport.playersText}
                </p>

                <div className="flex items-center justify-between pt-2.5 border-t border-white/20">
                  <span className="text-[11px] font-mono font-black text-emerald-400 uppercase tracking-widest">
                    Register
                  </span>
                  <div className="w-7 h-7 bg-emerald-500 text-[#0f172a] font-black flex items-center justify-center group-hover:bg-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
