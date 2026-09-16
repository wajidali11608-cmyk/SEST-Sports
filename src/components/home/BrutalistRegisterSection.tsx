"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Check,
  Plus,
  Trash2,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  CheckCheck,
  Zap,
  CreditCard,
  FileCheck,
  Trophy,
} from "lucide-react";
import { SPORTS, Player } from "@/data/mockData";
import { useRegistration } from "@/context/RegistrationContext";

export const BrutalistRegisterSection: React.FC = () => {
  const {
    selectedSportId,
    setSelectedSportId,
    selectedSport,
    submitRegistration,
  } = useRegistration();

  const [activeStep, setActiveStep] = useState<number>(1); // 1: Sport, 2: Squad, 3: Payment, 4: Success

  // Form State
  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainEnrollment, setCaptainEnrollment] = useState("");
  const [captainMobile, setCaptainMobile] = useState("");

  // Roster State
  const [players, setPlayers] = useState<Player[]>([]);
  const [pName, setPName] = useState("");
  const [pEnroll, setPEnroll] = useState("");
  const [pMobile, setPMobile] = useState("");

  // Payment State — SCREENSHOT ONLY
  const [fileUploaded, setFileUploaded] = useState<{ name: string; size: string; url?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRegId, setSubmittedRegId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Badminton Specific State
  const [badmintonGender, setBadmintonGender] = useState<"Male" | "Female">("Male");
  const [badmintonCategory, setBadmintonCategory] = useState<"Singles" | "Doubles">("Singles");

  // Badminton Players State
  const [bPlayer1Name, setBPlayer1Name] = useState("");
  const [bPlayer1Enroll, setBPlayer1Enroll] = useState("");
  const [bPlayer1Mobile, setBPlayer1Mobile] = useState("");

  const [bPlayer2Name, setBPlayer2Name] = useState("");
  const [bPlayer2Enroll, setBPlayer2Enroll] = useState("");
  const [bPlayer2Mobile, setBPlayer2Mobile] = useState("");

  // Dynamic Fee Calculation — Captain is automatically Player #1 for team sports
  const hasCaptainInfo = Boolean(captainName && captainEnrollment && captainMobile);
  const totalSquadCount =
    selectedSportId === "badminton"
      ? (badmintonCategory === "Singles" ? 1 : 2)
      : ((hasCaptainInfo ? 1 : 0) + players.length);

  const playerCountForFee = Math.max(totalSquadCount, selectedSport.minPlayers);
  let calculatedFee = 0;
  if (selectedSportId === "badminton") {
    calculatedFee = badmintonCategory === "Singles" ? 200 : 300;
  } else {
    calculatedFee = playerCountForFee * 150;
  }

  const feeDisplayText =
    selectedSportId === "badminton"
      ? `₹${calculatedFee} (${badmintonGender} ${badmintonCategory})`
      : `₹150 × ${playerCountForFee} = ₹${calculatedFee}`;

  // Add Player function
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pEnroll || !pMobile) {
      alert("Please enter Player Name, Enrollment No., and Mobile No.");
      return;
    }
    setPlayers((prev) => [
      ...prev,
      { id: Date.now().toString(), name: pName, enrollmentNo: pEnroll, mobileNo: pMobile },
    ]);
    setPName("");
    setPEnroll("");
    setPMobile("");
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  // Final submit function
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUploaded) {
      alert("Please upload your UPI payment screenshot to complete registration.");
      return;
    }
    setIsSubmitting(true);

    try {
      let finalPlayersList: Player[] = [];
      let finalTeamName = "";
      let finalCaptainName = "";
      let finalCaptainEnrollment = "";
      let finalCaptainMobile = "";

      if (selectedSportId === "badminton") {
        finalCaptainName = bPlayer1Name;
        finalCaptainEnrollment = bPlayer1Enroll;
        finalCaptainMobile = bPlayer1Mobile;
        finalTeamName =
          badmintonCategory === "Singles"
            ? `${bPlayer1Name} (${badmintonGender} Singles)`
            : `${bPlayer1Name} & ${bPlayer2Name} (${badmintonGender} Doubles)`;

        finalPlayersList = [
          { id: "1", name: bPlayer1Name, enrollmentNo: bPlayer1Enroll, mobileNo: bPlayer1Mobile },
        ];
        if (badmintonCategory === "Doubles") {
          finalPlayersList.push({
            id: "2",
            name: bPlayer2Name,
            enrollmentNo: bPlayer2Enroll,
            mobileNo: bPlayer2Mobile,
          });
        }
      } else {
        finalCaptainName = captainName;
        finalCaptainEnrollment = captainEnrollment;
        finalCaptainMobile = captainMobile;
        finalTeamName = teamName || `${selectedSport.name} Team`;

        // Captain is Player #1 + added teammates
        finalPlayersList = [
          { id: "captain-1", name: captainName, enrollmentNo: captainEnrollment, mobileNo: captainMobile },
          ...players,
        ];
      }

      const finalFee = calculatedFee;

      const finalSportName =
        selectedSportId === "badminton"
          ? `Badminton (${badmintonGender} ${badmintonCategory})`
          : selectedSport.name;

      // Connect team creation to admin panel with live data payload
      const regId = submitRegistration({
        sportId: selectedSportId,
        sportName: finalSportName,
        teamName: finalTeamName,
        captainName: finalCaptainName,
        captainEnrollment: finalCaptainEnrollment,
        captainMobile: finalCaptainMobile,
        players: finalPlayersList,
        amount: finalFee,
        screenshotName: fileUploaded.name,
        screenshotUrl: fileUploaded.url,
      });

      setSubmittedRegId(regId);

      setTimeout(() => {
        setIsSubmitting(false);
        setActiveStep(4);
      }, 500);
    } catch (err) {
      setIsSubmitting(false);
      alert("Registration submission failed. Please try again.");
    }
  };

  return (
    <section id="register" className="py-12 sm:py-20 bg-gradient-to-b from-[#f8fafc] via-[#f0fdf4] to-[#f8fafc] text-[#0f172a] border-t-4 border-emerald-600">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2
              className="text-3xl sm:text-5xl font-black tracking-tight leading-[0.95] uppercase text-[#0f172a]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Team Registration Portal
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-gray-600 max-w-sm font-medium">
            Fill out your team details, player roster, and upload payment screenshot proof to secure your entry.
          </p>
        </div>

        {/* Responsive Brutalist Container */}
        <div className="bg-white border-4 border-[#0f172a] shadow-[8px_8px_0px_0px_#059669] sm:shadow-[12px_12px_0px_0px_#059669] overflow-hidden">
          {/* STEPPER HEADER TABS — Responsive Stack on Mobile */}
          {activeStep !== 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 border-b-4 border-[#0f172a] bg-[#0f172a] text-white">
              {[
                { step: 1, title: "01. SPORT SELECT", subtitle: selectedSport.name },
                { step: 2, title: "02. SQUAD ROSTER", subtitle: `${players.length} Players` },
                { step: 3, title: "03. PAYMENT PROOF", subtitle: fileUploaded ? "Screenshot Attached" : "Upload Proof" },
              ].map((s) => {
                const isActive = activeStep === s.step;
                const isPassed = activeStep > s.step;
                return (
                  <button
                    key={s.step}
                    onClick={() => isPassed && setActiveStep(s.step)}
                    className={`p-3.5 sm:p-5 text-left border-b-2 sm:border-b-0 sm:border-r-2 last:border-r-0 border-white/20 transition-all ${
                      isActive
                        ? "bg-emerald-500 text-[#0f172a] font-black"
                        : isPassed
                        ? "bg-[#064e3b] text-emerald-300 font-bold hover:bg-[#047857]"
                        : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <div className="text-[12px] sm:text-[14px] tracking-wider uppercase font-black font-mono">
                      {s.title}
                    </div>
                    <div className="text-[11px] opacity-80 uppercase tracking-widest font-mono mt-0.5 truncate">
                      {s.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 1: SELECT SPORT */}
          {activeStep === 1 && (
            <div className="p-4 sm:p-10">
              {/* Form Helpdesk & Coordinators Callout */}
              <div className="mb-6 p-4 bg-emerald-50 border-3 border-[#0f172a] font-mono text-xs text-[#0f172a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[4px_4px_0px_0px_#059669]">
                <div>
                  <span className="font-black uppercase text-emerald-800 block text-[11px] mb-0.5">
                    📞 Need Assistance Filling This Form?
                  </span>
                  <p className="font-bold text-gray-800">
                    Form Helpdesk: <a href="tel:7006863828" className="font-black text-emerald-900 underline">+91 70068 63828</a> • Student Leads: <span className="font-black text-[#0f172a]">Md Armaan Saifi (+91 99108 50768)</span> / <span className="font-black text-[#0f172a]">Umme Hani (+91 81788 96352)</span>
                  </p>
                </div>
                <div className="bg-[#0f172a] text-white px-3 py-1.5 font-bold uppercase text-[10px] shrink-0 border border-emerald-400">
                  Venue: Sports Complex
                </div>
              </div>

              <div className="pb-4 mb-6 border-b-3 border-[#0f172a]">
                <span className="text-[11px] font-black font-mono uppercase text-emerald-800 bg-emerald-100 px-3 py-1 border border-emerald-400">
                  Step 1 of 3
                </span>
                <h3
                  className="text-xl sm:text-3xl font-black uppercase tracking-tight mt-2 text-[#0f172a]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Select Sport Discipline
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {SPORTS.map((sport) => {
                  const isSelected = selectedSportId === sport.id;
                  return (
                    <div
                      key={sport.id}
                      onClick={() => setSelectedSportId(sport.id)}
                      className={`cursor-pointer border-3 sm:border-4 transition-all relative group overflow-hidden ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50 shadow-[6px_6px_0px_0px_#059669] translate-x-[-2px] translate-y-[-2px]"
                          : "border-gray-900 hover:border-[#0f172a] hover:shadow-[4px_4px_0px_0px_#0f172a] bg-white"
                      }`}
                    >
                      <div className="relative h-40 sm:h-48 w-full overflow-hidden border-b-3 sm:border-b-4 border-[#0f172a]">
                        <Image
                          src={sport.image}
                          alt={sport.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {isSelected && (
                          <div className="absolute top-3 right-3 bg-emerald-500 text-[#0f172a] p-2 font-black border-2 border-[#0f172a]">
                            <Check className="w-5 h-5 stroke-[4]" />
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4
                            className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0f172a]"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {sport.name}
                          </h4>
                          <span className="text-[10px] font-black font-mono uppercase bg-[#0f172a] text-white px-2 py-0.5">
                            {sport.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-700 font-mono font-bold">
                          Required Squad: {sport.playersText}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Badminton Category & Gender Specifications */}
              {selectedSportId === "badminton" && (
                <div className="mb-8 p-5 sm:p-6 bg-[#0f172a] text-white border-4 border-emerald-500 shadow-[6px_6px_0px_0px_#059669]">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-emerald-500/40">
                    <Trophy className="w-5 h-5 text-emerald-400" />
                    <h4
                      className="text-base sm:text-lg font-black uppercase text-emerald-400 tracking-wider"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Badminton Category Specifications
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Gender Selection */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-2">
                        1. Select Gender Category *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {(["Male", "Female"] as const).map((gender) => (
                          <button
                            key={gender}
                            type="button"
                            onClick={() => setBadmintonGender(gender)}
                            className={`py-3 px-4 text-xs font-black uppercase tracking-wider border-2 font-mono transition-all flex items-center justify-center gap-2 ${
                              badmintonGender === gender
                                ? "bg-emerald-500 text-[#0f172a] border-white shadow-[3px_3px_0px_0px_#ffffff]"
                                : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                            }`}
                          >
                            <span>{gender === "Male" ? "Men / Boys" : "Women / Girls"}</span>
                            {badmintonGender === gender && <Check className="w-4 h-4 stroke-[3]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Match Format Selection */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-2">
                        2. Select Match Format *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {(["Singles", "Doubles"] as const).map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setBadmintonCategory(cat)}
                            className={`py-3 px-4 text-xs font-black uppercase tracking-wider border-2 font-mono transition-all flex items-center justify-center gap-2 ${
                              badmintonCategory === cat
                                ? "bg-emerald-500 text-[#0f172a] border-white shadow-[3px_3px_0px_0px_#ffffff]"
                                : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                            }`}
                          >
                            <span>{cat === "Singles" ? "Singles (1v1 - ₹200)" : "Doubles (2v2 - ₹300)"}</span>
                            {badmintonCategory === cat && <Check className="w-4 h-4 stroke-[3]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t-3 border-[#0f172a]">
                <button
                  onClick={() => setActiveStep(2)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0f172a] hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_#059669]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span>Continue To Squad Roster</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: TEAM & CAPTAIN DETAILS + SQUAD ROSTER */}
          {activeStep === 2 && (
            <div className="p-4 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b-3 border-[#0f172a] gap-2">
                <div>
                  <span className="text-[11px] font-black text-emerald-800 uppercase font-mono tracking-widest block">
                    Selected Discipline: {selectedSportId === "badminton" ? `Badminton (${badmintonGender} ${badmintonCategory})` : selectedSport.name}
                  </span>
                  <h3
                    className="text-xl sm:text-3xl font-black uppercase tracking-tight mt-1 text-[#0f172a]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {selectedSportId === "badminton" ? "Player Details" : "Captain & Team Roster"}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveStep(1)}
                  className="text-xs font-mono font-bold uppercase tracking-wider text-gray-600 hover:text-[#0f172a] underline self-start sm:self-auto"
                >
                  ← Change Sport
                </button>
              </div>

              {/* BADMINTON SPECIFIC PLAYER INPUTS */}
              {selectedSportId === "badminton" ? (
                <div className="space-y-6 mb-8">
                  {/* Player 1 Form Card */}
                  <div className="bg-emerald-50/70 p-5 sm:p-6 border-4 border-[#0f172a] shadow-[5px_5px_0px_0px_#059669]">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#0f172a]">
                      <h4
                        className="text-lg font-black uppercase text-[#0f172a]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {badmintonCategory === "Singles" ? "Player Details" : "Player 1 Details"}
                      </h4>
                      <span className="text-xs font-mono font-bold uppercase bg-emerald-600 text-white px-2.5 py-1">
                        Fee: ₹{badmintonCategory === "Singles" ? "200" : "150/person"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-1.5 font-mono">
                          Player Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bPlayer1Name}
                          onChange={(e) => setBPlayer1Name(e.target.value)}
                          placeholder="e.g. Mohd Zaid Khan"
                          className="w-full px-4 py-3.5 text-base sm:text-sm font-bold border-2 border-[#0f172a] focus:outline-none focus:bg-white text-[#0f172a] bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-1.5 font-mono">
                          Enrollment No. (Jamia Hamdard) *
                        </label>
                        <input
                          type="text"
                          required
                          value={bPlayer1Enroll}
                          onChange={(e) => setBPlayer1Enroll(e.target.value)}
                          placeholder="e.g. 2023-CS-104"
                          className="w-full px-4 py-3.5 text-base sm:text-sm font-mono font-bold border-2 border-[#0f172a] focus:outline-none focus:bg-white text-[#0f172a] bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-1.5 font-mono">
                          WhatsApp / Mobile No. *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bPlayer1Mobile}
                          onChange={(e) => setBPlayer1Mobile(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-4 py-3.5 text-base sm:text-sm font-bold border-2 border-[#0f172a] focus:outline-none focus:bg-white text-[#0f172a] bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Player 2 Form Card (Doubles Only) */}
                  {badmintonCategory === "Doubles" && (
                    <div className="bg-emerald-50/70 p-5 sm:p-6 border-4 border-[#0f172a] shadow-[5px_5px_0px_0px_#059669]">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#0f172a]">
                        <h4
                          className="text-lg font-black uppercase text-[#0f172a]"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Player 2 Details (Partner)
                        </h4>
                        <span className="text-xs font-mono font-bold uppercase bg-emerald-600 text-white px-2.5 py-1">
                          Fee: ₹150/person
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-1.5 font-mono">
                            Player 2 Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={bPlayer2Name}
                            onChange={(e) => setBPlayer2Name(e.target.value)}
                            placeholder="e.g. Mohd Ali"
                            className="w-full px-4 py-3.5 text-base sm:text-sm font-bold border-2 border-[#0f172a] focus:outline-none focus:bg-white text-[#0f172a] bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-1.5 font-mono">
                            Enrollment No. (Jamia Hamdard) *
                          </label>
                          <input
                            type="text"
                            required
                            value={bPlayer2Enroll}
                            onChange={(e) => setBPlayer2Enroll(e.target.value)}
                            placeholder="e.g. 2023-CS-108"
                            className="w-full px-4 py-3.5 text-base sm:text-sm font-mono font-bold border-2 border-[#0f172a] focus:outline-none focus:bg-white text-[#0f172a] bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-1.5 font-mono">
                            WhatsApp / Mobile No. *
                          </label>
                          <input
                            type="tel"
                            required
                            value={bPlayer2Mobile}
                            onChange={(e) => setBPlayer2Mobile(e.target.value)}
                            placeholder="e.g. +91 98765 43211"
                            className="w-full px-4 py-3.5 text-base sm:text-sm font-bold border-2 border-[#0f172a] focus:outline-none focus:bg-white text-[#0f172a] bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Captain Form Inputs — Mobile Optimized Large Touch Targets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 bg-emerald-50/60 p-4 sm:p-6 border-3 border-[#0f172a]">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-1.5 font-mono">
                        Team Name / Alias *
                      </label>
                      <input
                        type="text"
                        required
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. SEST Strikers"
                        className="w-full px-4 py-3.5 text-base sm:text-sm font-bold border-2 border-[#0f172a] focus:outline-none focus:bg-white text-[#0f172a] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-1.5 font-mono">
                        Captain Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={captainName}
                        onChange={(e) => setCaptainName(e.target.value)}
                        placeholder="e.g. Mohd Zaid Khan"
                        className="w-full px-4 py-3.5 text-base sm:text-sm font-bold border-2 border-[#0f172a] focus:outline-none focus:bg-white text-[#0f172a] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-1.5 font-mono">
                        Enrollment Number (Jamia Hamdard) *
                      </label>
                      <input
                        type="text"
                        required
                        value={captainEnrollment}
                        onChange={(e) => setCaptainEnrollment(e.target.value)}
                        placeholder="e.g. 2023-CS-104"
                        className="w-full px-4 py-3.5 text-base sm:text-sm font-mono font-bold border-2 border-[#0f172a] focus:outline-none focus:bg-white text-[#0f172a] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-1.5 font-mono">
                        Captain WhatsApp / Mobile No. *
                      </label>
                      <input
                        type="tel"
                        required
                        value={captainMobile}
                        onChange={(e) => setCaptainMobile(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3.5 text-base sm:text-sm font-bold border-2 border-[#0f172a] focus:outline-none focus:bg-white text-[#0f172a] bg-white"
                      />
                    </div>
                  </div>

                  {/* Roster Section */}
                  <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 bg-[#0f172a] text-white p-4 border-3 border-[#0f172a]">
                      <div>
                        <h4
                          className="text-base sm:text-lg font-black uppercase tracking-tight text-emerald-400"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Squad Roster ({totalSquadCount} / {selectedSport.maxPlayers} Players)
                        </h4>
                        <p className="text-[11px] font-mono text-gray-300">
                          Min Required: {selectedSport.minPlayers} Players
                        </p>
                      </div>

                      <div className="bg-emerald-500 text-[#0f172a] px-3.5 py-1.5 font-mono font-black text-xs uppercase flex items-center gap-2 border-2 border-white self-start sm:self-auto">
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Total Fee: {feeDisplayText}</span>
                      </div>
                    </div>

                    {/* Captain Auto-Include Banner Notice */}
                    <div className="p-3.5 bg-emerald-100/90 border-2 border-emerald-600 text-emerald-950 text-xs font-mono font-bold mb-4 flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 stroke-[2.5]" />
                      <span>
                        Captain ({captainName || "entered above"}) is automatically registered as <strong>Player #01</strong>. Add remaining teammates below.
                      </span>
                    </div>

                    {/* Inline Add Player Bar — Stacked on Mobile */}
                    <form
                      onSubmit={handleAddPlayer}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 bg-gray-100 border-3 border-[#0f172a] mb-6"
                    >
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          placeholder={`Teammate #${totalSquadCount + 1} Full Name`}
                          value={pName}
                          onChange={(e) => setPName(e.target.value)}
                          className="w-full px-3.5 py-3 text-sm font-bold text-[#0f172a] bg-white border-2 border-[#0f172a] focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          placeholder="Enrollment No."
                          value={pEnroll}
                          onChange={(e) => setPEnroll(e.target.value)}
                          className="w-full px-3.5 py-3 text-sm font-mono font-bold text-[#0f172a] bg-white border-2 border-[#0f172a] focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <input
                          type="tel"
                          placeholder="Mobile No."
                          value={pMobile}
                          onChange={(e) => setPMobile(e.target.value)}
                          className="w-full px-3.5 py-3 text-sm font-bold text-[#0f172a] bg-white border-2 border-[#0f172a] focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <button
                          type="submit"
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase flex items-center justify-center border-2 border-[#0f172a] transition-colors"
                          title="Add Player"
                        >
                          <Plus className="w-5 h-5 stroke-[3]" />
                        </button>
                      </div>
                    </form>

                    {/* Players Table */}
                    <div className="border-3 border-[#0f172a] overflow-x-auto bg-white">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                          <tr className="bg-[#0f172a] text-white border-b-2 border-[#0f172a] text-[11px] font-black uppercase font-mono">
                            <th className="p-3 border-r border-white/20">#</th>
                            <th className="p-3 border-r border-white/20">Player Name</th>
                            <th className="p-3 border-r border-white/20">Enrollment No.</th>
                            <th className="p-3 border-r border-white/20">Mobile</th>
                            <th className="p-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-[#0f172a] text-xs font-medium">
                          {/* Captain Auto Row 1 */}
                          {hasCaptainInfo && (
                            <tr className="bg-emerald-50/80 font-bold border-b-2 border-[#0f172a]">
                              <td className="p-3 font-mono font-black border-r-2 border-[#0f172a]">01</td>
                              <td className="p-3 border-r-2 border-[#0f172a]">
                                <div className="flex items-center gap-2">
                                  <span className="bg-[#0f172a] text-emerald-400 font-mono text-[9px] uppercase font-black px-2 py-0.5 border border-[#0f172a]">
                                    CAPTAIN
                                  </span>
                                  <span className="font-black text-[#0f172a]">{captainName}</span>
                                </div>
                              </td>
                              <td className="p-3 font-mono border-r-2 border-[#0f172a]">{captainEnrollment}</td>
                              <td className="p-3 font-mono border-r-2 border-[#0f172a]">{captainMobile}</td>
                              <td className="p-3 text-right font-mono text-[10px] text-emerald-800 uppercase font-black">
                                Auto-Included
                              </td>
                            </tr>
                          )}

                          {/* Added Teammates */}
                          {players.map((pl, idx) => (
                            <tr key={pl.id} className="hover:bg-emerald-50 transition-colors">
                              <td className="p-3 font-mono font-bold border-r-2 border-[#0f172a]">
                                {String((hasCaptainInfo ? 2 : 1) + idx).padStart(2, "0")}
                              </td>
                              <td className="p-3 font-bold text-[#0f172a] border-r-2 border-[#0f172a]">
                                {pl.name}
                              </td>
                              <td className="p-3 font-mono border-r-2 border-[#0f172a]">
                                {pl.enrollmentNo}
                              </td>
                              <td className="p-3 border-r-2 border-[#0f172a] font-mono">{pl.mobileNo}</td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleRemovePlayer(pl.id)}
                                  className="p-1.5 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {!hasCaptainInfo && players.length === 0 && (
                            <tr>
                              <td colSpan={5} className="p-6 text-center text-gray-500 font-mono text-xs">
                                Fill in Captain details above to populate Player #01.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2 Footer Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t-3 border-[#0f172a] gap-3">
                <button
                  onClick={() => setActiveStep(1)}
                  className="w-full sm:w-auto px-6 py-3 border-2 border-[#0f172a] text-[#0f172a] font-black text-xs uppercase tracking-wider hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => {
                    if (selectedSportId === "badminton") {
                      if (!bPlayer1Name || !bPlayer1Enroll || !bPlayer1Mobile) {
                        alert("Please fill in all Player 1 details.");
                        return;
                      }
                      if (badmintonCategory === "Doubles" && (!bPlayer2Name || !bPlayer2Enroll || !bPlayer2Mobile)) {
                        alert("Please fill in all Player 2 details.");
                        return;
                      }
                    } else {
                      if (!teamName || !captainName || !captainEnrollment || !captainMobile) {
                        alert("Please fill in all captain & team fields.");
                        return;
                      }
                    }
                    setActiveStep(3);
                  }}
                  className="w-full sm:w-auto px-10 py-4 bg-[#0f172a] hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_#059669]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span>Proceed To Payment Proof</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT SCREENSHOT PROOF ONLY */}
          {activeStep === 3 && (
            <div className="p-4 sm:p-10">
              <div className="pb-4 mb-6 border-b-3 border-[#0f172a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-black text-emerald-800 uppercase font-mono tracking-widest block">
                    Final Step : Upload Payment Screenshot
                  </span>
                  <h3
                    className="text-xl sm:text-3xl font-black uppercase tracking-tight mt-1 text-[#0f172a]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Pay Total Fee: ₹{calculatedFee}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-start">
                {/* QR Code Container */}
                <div className="md:col-span-5 bg-[#0f172a] text-white p-5 border-4 border-[#0f172a] shadow-[6px_6px_0px_0px_#059669] text-center">
                  <span className="text-[11px] font-black uppercase tracking-widest font-mono text-emerald-400 block mb-3">
                    Scan Official UPI QR Code
                  </span>

                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto bg-white p-2.5 border-4 border-emerald-400 mb-4">
                    <Image
                      src="/images/Qr.jpeg"
                      alt="UPI Payment QR Code"
                      fill
                      className="object-contain p-1.5"
                      priority
                    />
                  </div>

                  <div className="text-xs font-mono font-bold text-gray-300 space-y-1 bg-[#064e3b] p-3 border border-emerald-400/40">
                    <p>Amount to Pay: <span className="text-emerald-300 font-black text-base">₹{calculatedFee}</span></p>
                    <p className="text-[10px] text-emerald-200 font-medium">GPay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>

                {/* Screenshot Only Dropzone */}
                <div className="md:col-span-7 space-y-5">
                  <div className="p-4 bg-emerald-100/80 border-3 border-emerald-600 text-emerald-950 font-medium text-xs leading-relaxed">
                    <span className="font-extrabold block uppercase tracking-wider mb-1 font-mono text-emerald-900">
                      Payment Verification via Screenshot:
                    </span>
                    Scan the UPI QR code, complete the payment of <strong>₹{calculatedFee}</strong> ({selectedSportId === "badminton" ? "Singles ₹200 / Doubles ₹300" : "calculated at ₹150/player"}), take a screenshot of your successful transaction, and upload it below.
                  </div>

                  {/* Screenshot Upload Dropzone */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-2 font-mono">
                      Upload Payment Screenshot Proof *
                    </label>
                    <label
                      className={`flex flex-col items-center justify-center p-6 sm:p-8 border-4 border-dashed cursor-pointer transition-all ${
                        fileUploaded
                          ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-[4px_4px_0px_0px_#059669]"
                          : "border-[#0f172a] bg-gray-50 hover:bg-emerald-50 text-[#0f172a]"
                      }`}
                    >
                      {fileUploaded ? (
                        <FileCheck className="w-10 h-10 text-emerald-600 mb-2" />
                      ) : (
                        <Upload className="w-10 h-10 text-[#0f172a] mb-2" />
                      )}
                      <span className="text-xs sm:text-sm font-black text-[#0f172a] uppercase tracking-wider text-center">
                        {fileUploaded ? fileUploaded.name : "Click or Tap to Upload Screenshot"}
                      </span>
                      <span className="text-[10px] text-emerald-800 font-mono font-bold mt-1 text-center">
                        {fileUploaded ? `Size: ${fileUploaded.size} • Ready for submission` : "PNG, JPG, JPEG up to 10MB"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const dataUrl = event.target?.result as string;
                              setFileUploaded({
                                name: file.name,
                                size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                                url: dataUrl,
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t-3 border-[#0f172a] gap-3">
                <button
                  onClick={() => setActiveStep(2)}
                  className="w-full sm:w-auto px-6 py-3 border-2 border-[#0f172a] text-[#0f172a] font-black text-xs uppercase tracking-wider hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_#0f172a]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {isSubmitting ? (
                    <span>Submitting Entry...</span>
                  ) : (
                    <>
                      <span>Submit Registration</span>
                      <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REGISTRATION SUCCESS CARD */}
          {activeStep === 4 && (
            <div className="p-6 sm:p-14 text-center bg-[#0f172a] text-white">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 text-[#0f172a] flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_#ffffff]">
                <Check className="w-8 h-8 sm:w-10 sm:h-10 stroke-[4]" />
              </div>

              <h3
                className="text-2xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Registration Confirmed!
              </h3>
              <p className="text-xs font-mono text-emerald-400 max-w-md mx-auto mb-8 uppercase tracking-widest">
                SEST Sports Week 2026 • Jamia Hamdard
              </p>

              {/* Receipt Pass Box */}
              <div className="max-w-xl mx-auto bg-white text-[#0f172a] border-4 border-emerald-500 p-5 sm:p-6 text-left mb-8 shadow-[6px_6px_0px_0px_#10b981]">
                <div className="flex items-center justify-between border-b-3 border-[#0f172a] pb-3 mb-4">
                  <div>
                    <span className="text-[10px] font-black font-mono uppercase text-gray-500 block">
                      OFFICIAL REGISTRATION ID
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#0f172a]">
                      {submittedRegId || "SEST-2026-104"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (submittedRegId) {
                        navigator.clipboard.writeText(submittedRegId);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }
                    }}
                    className="px-3.5 py-1.5 bg-[#0f172a] text-emerald-400 font-mono font-bold text-xs uppercase flex items-center gap-1.5"
                  >
                    {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "COPIED" : "COPY ID"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-gray-500 block text-[10px]">SPORT</span>
                    <span className="font-extrabold uppercase">{selectedSport.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">TEAM NAME</span>
                    <span className="font-extrabold uppercase">{teamName || `${selectedSport.name} Squad`}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">CAPTAIN</span>
                    <span className="font-extrabold uppercase">{captainName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">TOTAL PAID</span>
                    <span className="font-black text-emerald-700">₹{calculatedFee}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">PLAYERS</span>
                    <span className="font-bold">{players.length} Registered</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">PROOF ATTACHED</span>
                    <span className="font-bold text-emerald-700 truncate">{fileUploaded?.name || "Uploaded"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setActiveStep(1);
                    setTeamName("");
                    setCaptainName("");
                    setCaptainEnrollment("");
                    setCaptainMobile("");
                    setPlayers([]);
                    setFileUploaded(null);
                    setSubmittedRegId(null);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-[#0f172a] font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#ffffff]"
                >
                  Register Another Team
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
