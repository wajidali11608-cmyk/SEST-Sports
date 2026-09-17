"use client";

import React, { useState, useEffect } from "react";
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

  // Auto-advance to Step 2 if sport parameter is passed via URL (e.g. homepage sport click)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sportParam = params.get("sport");
      if (sportParam && SPORTS.some((s) => s.id === sportParam)) {
        setSelectedSportId(sportParam);
        setActiveStep(2);
      }
    }
  }, [setSelectedSportId]);

  // Smooth scroll to top of register section when step changes
  useEffect(() => {
    const registerEl = document.getElementById("register");
    if (registerEl) {
      registerEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeStep]);

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
      {
        id: Date.now().toString(),
        name: pName,
        enrollmentNo: pEnroll,
        mobileNo: pMobile,
      },
    ]);
    setPName("");
    setPEnroll("");
    setPMobile("");
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  // Image File Upload Handler with Canvas Base64 Compression
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawDataUrl = event.target?.result as string;
        const img = new window.Image();
        img.src = rawDataUrl;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 500;
          const MAX_HEIGHT = 500;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.6);

          setFileUploaded({
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            url: compressedDataUrl,
          });
        };
        img.onerror = () => {
          setFileUploaded({
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            url: rawDataUrl,
          });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Final Submit Handler
  const handleFinalSubmit = () => {
    if (!fileUploaded) {
      alert("Please upload your payment screenshot before submitting.");
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
        finalTeamName = `Badminton (${badmintonGender} ${badmintonCategory}) - ${bPlayer1Name}`;

        finalPlayersList = [
          { id: "b1", name: bPlayer1Name, enrollmentNo: bPlayer1Enroll, mobileNo: bPlayer1Mobile },
        ];
        if (badmintonCategory === "Doubles") {
          finalPlayersList.push({
            id: "b2",
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
    <section id="register" className="scroll-mt-16 sm:scroll-mt-20 py-8 sm:py-20 bg-gradient-to-b from-[#f8fafc] via-[#f0fdf4] to-[#f8fafc] text-[#0f172a] border-t-4 border-emerald-600">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <h2
              className="text-2xl sm:text-5xl font-black tracking-tight leading-[0.95] uppercase text-[#0f172a]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Registration Portal
            </h2>
          </div>
          <p className="text-[11px] sm:text-sm font-mono text-gray-600 max-w-sm font-medium leading-relaxed">
            Select sport, fill details & upload payment proof.
          </p>
        </div>

        {/* Responsive Brutalist Container */}
        <div className="bg-white border-3 sm:border-4 border-[#0f172a] shadow-[5px_5px_0px_0px_#059669] sm:shadow-[12px_12px_0px_0px_#059669] overflow-hidden">
          {/* STEPPER HEADER TABS — Mobile Stepper Bar & Progress Indicator */}
          {activeStep !== 4 && (
            <div>
              {/* Mobile Progress Bar */}
              <div className="block sm:hidden bg-[#0f172a] text-white p-3.5 border-b-3 border-emerald-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center gap-1.5">
                        <div className={`w-7 h-7 flex items-center justify-center text-[11px] font-black font-mono border-2 transition-all ${
                          activeStep === step
                            ? "bg-emerald-500 text-[#0f172a] border-emerald-400 shadow-[2px_2px_0px_0px_#ffffff]"
                            : activeStep > step
                              ? "bg-emerald-800 text-emerald-200 border-emerald-600"
                              : "bg-gray-800 text-gray-500 border-gray-600"
                        }`}>
                          {activeStep > step ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step}
                        </div>
                        {step < 3 && <div className={`w-4 h-0.5 ${activeStep > step ? "bg-emerald-500" : "bg-gray-700"}`} />}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-black text-emerald-400 uppercase">
                    {activeStep === 1 ? "1. Select Sport" : activeStep === 2 ? "2. Squad Details" : "3. Payment"}
                  </span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 overflow-hidden rounded-full">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${(activeStep / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Tablet/Desktop Stepper Tabs */}
              <div className="hidden sm:grid sm:grid-cols-3 border-b-4 border-[#0f172a] bg-[#0f172a] text-white">
                {[
                  { step: 1, title: "01. SPORT SELECT", subtitle: selectedSport.name },
                  { step: 2, title: "02. SQUAD ROSTER", subtitle: `${totalSquadCount} Players` },
                  { step: 3, title: "03. PAYMENT PROOF", subtitle: fileUploaded ? "Proof Attached" : "Upload Screenshot" },
                ].map((s) => {
                  const isActive = activeStep === s.step;
                  const isPassed = activeStep > s.step;
                  return (
                    <button
                      key={s.step}
                      type="button"
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
            </div>
          )}

          {/* STEP 1: SELECT SPORT */}
          {activeStep === 1 && (
            <div className="p-3.5 sm:p-10 pb-28 sm:pb-10">
              <div className="pb-2.5 sm:pb-3 mb-4 sm:mb-5 border-b-2 sm:border-b-3 border-[#0f172a] flex items-center justify-between">
                <div>
                  <h3
                    className="text-lg sm:text-3xl font-black uppercase tracking-tight text-[#0f172a]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Choose Your Sport
                  </h3>
                  <p className="text-[11px] font-mono text-gray-500 mt-0.5 sm:hidden">Tap a card to select</p>
                </div>
                <span className="text-xs font-mono font-bold text-gray-500 hidden sm:inline-block">
                  Tap card to select sport
                </span>
              </div>

              {/* Sport Selection Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 mb-6 sm:mb-8">
                {SPORTS.map((sport) => {
                  const isSelected = selectedSportId === sport.id;
                  return (
                    <React.Fragment key={sport.id}>
                      <div
                        onClick={() => {
                          setSelectedSportId(sport.id);
                          setActiveStep(2);
                        }}
                        className={`cursor-pointer border-2 sm:border-4 transition-all relative group overflow-hidden active:scale-[0.98] ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-50 shadow-[4px_4px_0px_0px_#059669] sm:shadow-[6px_6px_0px_0px_#059669] -translate-x-0.5 -translate-y-0.5"
                            : "border-gray-900 hover:border-[#0f172a] hover:shadow-[4px_4px_0px_0px_#0f172a] bg-white"
                        }`}
                      >
                        <div className="relative h-24 sm:h-48 w-full overflow-hidden border-b-2 sm:border-b-4 border-[#0f172a]">
                          <Image
                            src={sport.image}
                            alt={sport.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-emerald-600/30 flex items-center justify-center sm:bg-transparent sm:items-start sm:justify-end sm:p-2">
                              <div className="bg-emerald-500 text-[#0f172a] p-1 sm:p-1.5 font-black border-2 border-[#0f172a] flex items-center gap-1 text-[10px] sm:text-xs font-mono">
                                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[4]" />
                                <span className="font-extrabold uppercase hidden sm:inline">Selected</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-2.5 sm:p-4">
                          <h4
                            className="text-sm sm:text-2xl font-black uppercase tracking-tight text-[#0f172a] leading-tight"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {sport.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[9px] sm:text-[10px] font-black font-mono uppercase bg-[#0f172a] text-white px-1.5 py-0.5">
                              {sport.type}
                            </span>
                            <span className="text-[9px] sm:text-xs text-gray-500 font-mono font-bold hidden sm:inline">
                              {sport.playersText}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* INLINE BADMINTON CATEGORY SELECTION */}
                      {sport.id === "badminton" && isSelected && (
                        <div className="col-span-2 sm:col-span-2 lg:col-span-3 p-3.5 sm:p-6 bg-[#0f172a] text-white border-2 sm:border-4 border-emerald-500 shadow-[4px_4px_0px_0px_#059669] sm:shadow-[6px_6px_0px_0px_#059669]">
                          <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-emerald-500/40">
                            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                            <h4 className="text-xs sm:text-lg font-black uppercase text-emerald-400 tracking-wider font-mono">
                              Badminton Category
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            {/* Gender Selection */}
                            <div>
                              <label className="block text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300 mb-2">
                                Gender *
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                {(["Male", "Female"] as const).map((gender) => (
                                  <button
                                    key={gender}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setBadmintonGender(gender);
                                    }}
                                    className={`py-3 sm:py-3.5 px-2.5 sm:px-3 text-[11px] sm:text-xs font-black uppercase tracking-wider border-2 font-mono transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] ${
                                      badmintonGender === gender
                                        ? "bg-emerald-500 text-[#0f172a] border-white shadow-[2px_2px_0px_0px_#ffffff] sm:shadow-[3px_3px_0px_0px_#ffffff]"
                                        : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                                    }`}
                                  >
                                    <span>{gender === "Male" ? "Men" : "Women"}</span>
                                    {badmintonGender === gender && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Match Format Selection */}
                            <div>
                              <label className="block text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300 mb-2">
                                Format *
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                {(["Singles", "Doubles"] as const).map((cat) => (
                                  <button
                                    key={cat}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setBadmintonCategory(cat);
                                    }}
                                    className={`py-3 sm:py-3.5 px-2.5 sm:px-3 text-[11px] sm:text-xs font-black uppercase tracking-wider border-2 font-mono transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] ${
                                      badmintonCategory === cat
                                        ? "bg-emerald-500 text-[#0f172a] border-white shadow-[2px_2px_0px_0px_#ffffff] sm:shadow-[3px_3px_0px_0px_#ffffff]"
                                        : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                                    }`}
                                  >
                                    <span>{cat === "Singles" ? "Singles ₹200" : "Doubles ₹300"}</span>
                                    {badmintonCategory === cat && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Desktop Next Button */}
              <div className="hidden sm:flex justify-end pt-4 border-t-3 border-[#0f172a]">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-8 py-4 bg-[#0f172a] hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_#059669]"
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
            <div className="p-3.5 sm:p-10 pb-28 sm:pb-10">
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b-2 sm:border-b-3 border-[#0f172a] gap-2">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-black text-emerald-800 uppercase font-mono tracking-widest block bg-emerald-100 inline-flex px-2 py-0.5 border border-emerald-400 mb-1">
                    {selectedSportId === "badminton" ? `Badminton · ${badmintonGender} · ${badmintonCategory}` : selectedSport.name}
                  </span>
                  <h3
                    className="text-lg sm:text-3xl font-black uppercase tracking-tight text-[#0f172a]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {selectedSportId === "badminton" ? "Player Details" : "Team & Captain Details"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 hover:text-[#0f172a] bg-emerald-50 border border-emerald-300 px-2.5 py-1.5 active:scale-95 transition-transform shrink-0"
                >
                  Change Sport
                </button>
              </div>

              {/* BADMINTON SPECIFIC PLAYER INPUTS */}
              {selectedSportId === "badminton" ? (
                <div className="space-y-4 sm:space-y-6 mb-8">
                  {/* BADMINTON CATEGORY & GENDER SELECTOR IN STEP 2 */}
                  <div className="bg-[#0f172a] text-white p-3.5 sm:p-5 border-2 sm:border-4 border-emerald-500 shadow-[3px_3px_0px_0px_#059669] sm:shadow-[5px_5px_0px_0px_#059669]">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-500/40">
                      <Trophy className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs sm:text-base font-black uppercase text-emerald-400 tracking-wider font-mono">
                        Select Badminton Category
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Gender Selection */}
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                          Gender *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(["Male", "Female"] as const).map((gender) => (
                            <button
                              key={gender}
                              type="button"
                              onClick={() => setBadmintonGender(gender)}
                              className={`py-2.5 sm:py-3 px-2 text-xs font-black uppercase tracking-wider border-2 font-mono transition-all flex items-center justify-center gap-1 active:scale-95 ${
                                badmintonGender === gender
                                  ? "bg-emerald-500 text-[#0f172a] border-white shadow-[2px_2px_0px_0px_#ffffff]"
                                  : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                              }`}
                            >
                              <span>{gender === "Male" ? "Men" : "Women"}</span>
                              {badmintonGender === gender && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Match Format Selection */}
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                          Format *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(["Singles", "Doubles"] as const).map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setBadmintonCategory(cat)}
                              className={`py-2.5 sm:py-3 px-2 text-xs font-black uppercase tracking-wider border-2 font-mono transition-all flex items-center justify-center gap-1 active:scale-95 ${
                                badmintonCategory === cat
                                  ? "bg-emerald-500 text-[#0f172a] border-white shadow-[2px_2px_0px_0px_#ffffff]"
                                  : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                              }`}
                            >
                              <span>{cat === "Singles" ? "Singles ₹200" : "Doubles ₹300"}</span>
                              {badmintonCategory === cat && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Player 1 Form Card */}
                  <div className="bg-emerald-50/70 p-3.5 sm:p-6 border-2 sm:border-4 border-[#0f172a] shadow-[3px_3px_0px_0px_#059669] sm:shadow-[5px_5px_0px_0px_#059669]">
                    <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-3 sm:mb-4 border-b-2 border-[#0f172a]">
                      <h4
                        className="text-sm sm:text-lg font-black uppercase text-[#0f172a]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {badmintonCategory === "Singles" ? "Your Details" : "Player 1"}
                      </h4>
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase bg-emerald-600 text-white px-2 py-0.5 sm:px-2.5 sm:py-1">
                        ₹{badmintonCategory === "Singles" ? "200" : "150/person"}
                      </span>
                    </div>

                    <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1 font-mono">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          autoCapitalize="words"
                          value={bPlayer1Name}
                          onChange={(e) => setBPlayer1Name(e.target.value)}
                          placeholder="Mohd Zaid Khan"
                          className="w-full px-3.5 py-3 sm:py-3.5 text-base font-bold border-2 border-[#0f172a] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-[#0f172a] bg-white rounded-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1 font-mono">
                          Enrollment No. *
                        </label>
                        <input
                          type="text"
                          required
                          inputMode="text"
                          autoCapitalize="characters"
                          autoCorrect="off"
                          spellCheck={false}
                          value={bPlayer1Enroll}
                          onChange={(e) => setBPlayer1Enroll(e.target.value)}
                          placeholder="2023-CS-104"
                          className="w-full px-3.5 py-3 sm:py-3.5 text-base font-mono font-bold border-2 border-[#0f172a] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-[#0f172a] bg-white rounded-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1 font-mono">
                          WhatsApp No. *
                        </label>
                        <input
                          type="tel"
                          required
                          inputMode="tel"
                          autoComplete="tel"
                          value={bPlayer1Mobile}
                          onChange={(e) => setBPlayer1Mobile(e.target.value)}
                          placeholder="9876543210"
                          className="w-full px-3.5 py-3 sm:py-3.5 text-base font-bold border-2 border-[#0f172a] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-[#0f172a] bg-white rounded-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Player 2 Form Card (Doubles Only) */}
                  {badmintonCategory === "Doubles" && (
                    <div className="bg-emerald-50/70 p-3.5 sm:p-6 border-2 sm:border-4 border-[#0f172a] shadow-[3px_3px_0px_0px_#059669] sm:shadow-[5px_5px_0px_0px_#059669]">
                      <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-3 sm:mb-4 border-b-2 border-[#0f172a]">
                        <h4
                          className="text-sm sm:text-lg font-black uppercase text-[#0f172a]"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Player 2 (Partner)
                        </h4>
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase bg-emerald-600 text-white px-2 py-0.5 sm:px-2.5 sm:py-1">
                          ₹150/person
                        </span>
                      </div>

                      <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
                        <div>
                          <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1 font-mono">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            autoCapitalize="words"
                            value={bPlayer2Name}
                            onChange={(e) => setBPlayer2Name(e.target.value)}
                            placeholder="Mohd Ali"
                            className="w-full px-3.5 py-3 sm:py-3.5 text-base font-bold border-2 border-[#0f172a] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-[#0f172a] bg-white rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1 font-mono">
                            Enrollment No. *
                          </label>
                          <input
                            type="text"
                            required
                            inputMode="text"
                            autoCapitalize="characters"
                            autoCorrect="off"
                            spellCheck={false}
                            value={bPlayer2Enroll}
                            onChange={(e) => setBPlayer2Enroll(e.target.value)}
                            placeholder="2023-CS-108"
                            className="w-full px-3.5 py-3 sm:py-3.5 text-base font-mono font-bold border-2 border-[#0f172a] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-[#0f172a] bg-white rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1 font-mono">
                            WhatsApp No. *
                          </label>
                          <input
                            type="tel"
                            required
                            inputMode="tel"
                            autoComplete="tel"
                            value={bPlayer2Mobile}
                            onChange={(e) => setBPlayer2Mobile(e.target.value)}
                            placeholder="9876543210"
                            className="w-full px-3.5 py-3 sm:py-3.5 text-base font-bold border-2 border-[#0f172a] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-[#0f172a] bg-white rounded-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* STANDARD TEAM SPORTS INPUTS */
                <>
                  {/* Team & Captain Card */}
                  <div className="bg-emerald-50/70 p-3.5 sm:p-6 border-2 sm:border-4 border-[#0f172a] mb-6 sm:mb-8 shadow-[3px_3px_0px_0px_#059669] sm:shadow-[5px_5px_0px_0px_#059669]">
                    <div className="pb-2.5 sm:pb-3 mb-3 sm:mb-4 border-b-2 border-[#0f172a]">
                      <h4
                        className="text-sm sm:text-lg font-black uppercase text-[#0f172a]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Team & Captain Info (Player #1)
                      </h4>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1 font-mono">
                          Team Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          placeholder="e.g. SEST Strikers"
                          className="w-full px-3.5 py-3 sm:py-3.5 text-base font-bold border-2 border-[#0f172a] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-[#0f172a] bg-white rounded-none transition-colors"
                        />
                      </div>

                      <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
                        <div>
                          <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1 font-mono">
                            Captain Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            autoCapitalize="words"
                            value={captainName}
                            onChange={(e) => setCaptainName(e.target.value)}
                            placeholder="Rahul Sharma"
                            className="w-full px-3.5 py-3 sm:py-3.5 text-base font-bold border-2 border-[#0f172a] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-[#0f172a] bg-white rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1 font-mono">
                            Captain Enrollment No. *
                          </label>
                          <input
                            type="text"
                            required
                            inputMode="text"
                            autoCapitalize="characters"
                            autoCorrect="off"
                            spellCheck={false}
                            value={captainEnrollment}
                            onChange={(e) => setCaptainEnrollment(e.target.value)}
                            placeholder="2023-CS-101"
                            className="w-full px-3.5 py-3 sm:py-3.5 text-base font-mono font-bold border-2 border-[#0f172a] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-[#0f172a] bg-white rounded-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1 font-mono">
                            Captain WhatsApp No. *
                          </label>
                          <input
                            type="tel"
                            required
                            inputMode="tel"
                            autoComplete="tel"
                            value={captainMobile}
                            onChange={(e) => setCaptainMobile(e.target.value)}
                            placeholder="9876543210"
                            className="w-full px-3.5 py-3 sm:py-3.5 text-base font-bold border-2 border-[#0f172a] focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-[#0f172a] bg-white rounded-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Players Entry Form */}
                  <div className="bg-white p-3.5 sm:p-6 border-2 sm:border-4 border-[#0f172a] mb-6 sm:mb-8 shadow-[3px_3px_0px_0px_#0f172a]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#0f172a] mb-4 gap-2">
                      <div>
                        <h4
                          className="text-sm sm:text-lg font-black uppercase text-[#0f172a]"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Add Teammates ({totalSquadCount} / {selectedSport.maxPlayers})
                        </h4>
                        <p className="text-[10px] sm:text-xs font-mono text-gray-500">
                          Min: {selectedSport.minPlayers} players • Max: {selectedSport.maxPlayers} players
                        </p>
                      </div>
                      <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 border border-emerald-300 w-fit">
                        {feeDisplayText}
                      </span>
                    </div>

                    <form onSubmit={handleAddPlayer} className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 mb-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-gray-500 mb-1">
                          Teammate Name
                        </label>
                        <input
                          type="text"
                          value={pName}
                          onChange={(e) => setPName(e.target.value)}
                          placeholder="Player Name"
                          className="w-full px-3 py-2.5 text-sm font-bold border-2 border-gray-400 focus:border-[#0f172a] focus:outline-none rounded-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-gray-500 mb-1">
                          Enrollment No.
                        </label>
                        <input
                          type="text"
                          value={pEnroll}
                          onChange={(e) => setPEnroll(e.target.value)}
                          placeholder="Enrollment No."
                          className="w-full px-3 py-2.5 text-sm font-mono font-bold border-2 border-gray-400 focus:border-[#0f172a] focus:outline-none rounded-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-gray-500 mb-1">
                          WhatsApp Mobile
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="tel"
                            value={pMobile}
                            onChange={(e) => setPMobile(e.target.value)}
                            placeholder="Mobile No."
                            className="w-full px-3 py-2.5 text-sm font-bold border-2 border-gray-400 focus:border-[#0f172a] focus:outline-none rounded-none"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2.5 bg-[#0f172a] text-white hover:bg-emerald-600 font-mono font-black text-xs uppercase shrink-0 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* Added Players List */}
                    {players.length > 0 && (
                      <div className="mt-4 pt-4 border-t-2 border-gray-200">
                        <span className="text-[10px] font-mono font-black uppercase text-gray-500 block mb-2">
                          Registered Teammates ({players.length}):
                        </span>
                        <div className="space-y-2">
                          {players.map((pl, idx) => (
                            <div
                              key={pl.id}
                              className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-300 text-xs font-mono"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-5 h-5 bg-[#0f172a] text-white font-black text-[10px] flex items-center justify-center shrink-0">
                                  {idx + 2}
                                </span>
                                <div>
                                  <span className="font-bold text-[#0f172a] block">{pl.name}</span>
                                  <span className="text-[10px] text-gray-500">
                                    {pl.enrollmentNo} • {pl.mobileNo}
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemovePlayer(pl.id)}
                                className="text-red-600 hover:text-red-800 p-1 active:scale-95"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Desktop Stepper Buttons */}
              <div className="hidden sm:flex items-center justify-between pt-4 border-t-3 border-[#0f172a]">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-6 py-3.5 bg-gray-200 hover:bg-gray-300 text-[#0f172a] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sport Selection</span>
                </button>

                <button
                  type="button"
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
                  className="px-8 py-4 bg-[#0f172a] hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_#059669]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span>Continue To Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT PROOF UPLOAD */}
          {activeStep === 3 && (
            <div className="p-3.5 sm:p-10 pb-28 sm:pb-10">
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b-2 sm:border-b-3 border-[#0f172a] gap-2">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-black text-emerald-800 uppercase font-mono tracking-widest block bg-emerald-100 inline-flex px-2 py-0.5 border border-emerald-400 mb-1">
                    Step 3 of 3 • Payment Verification
                  </span>
                  <h3
                    className="text-lg sm:text-3xl font-black uppercase tracking-tight text-[#0f172a]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    UPI Payment & Screenshot Proof
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 hover:text-[#0f172a] bg-emerald-50 border border-emerald-300 px-2.5 py-1.5 active:scale-95 transition-transform shrink-0"
                >
                  Edit Details
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* UPI QR & Payment Info Card */}
                <div className="bg-[#0f172a] text-white p-4 sm:p-6 border-4 border-[#0f172a] shadow-[6px_6px_0px_0px_#059669] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-emerald-500/40 mb-4">
                      <span className="text-xs font-mono font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4" />
                        <span>Official UPI Payment QR</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 border border-emerald-400/30 uppercase">
                        Instant Scan
                      </span>
                    </div>

                    {/* QR Code Container */}
                    <div className="bg-white p-3 border-3 border-emerald-400 w-fit mx-auto mb-4 shadow-md">
                      <div className="relative w-44 h-44 sm:w-52 sm:h-52 overflow-hidden">
                        <Image
                          src="/images/Qr.jpeg"
                          alt="SEST Official Payment QR Code"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] sm:text-xs font-mono font-bold text-gray-300 bg-[#064e3b] p-2.5 sm:p-3 border border-emerald-400/40">
                    <p>Amount: <span className="text-emerald-300 font-black text-sm sm:text-base">₹{calculatedFee}</span></p>
                    <p className="text-[9px] sm:text-[10px] text-emerald-200 font-medium mt-0.5">GPay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>

                {/* File Upload Box */}
                <div className="bg-emerald-50/70 p-4 sm:p-6 border-4 border-[#0f172a] shadow-[6px_6px_0px_0px_#0f172a] flex flex-col justify-between">
                  <div>
                    <div className="pb-3 border-b-2 border-[#0f172a] mb-4">
                      <h4
                        className="text-sm sm:text-lg font-black uppercase text-[#0f172a]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Upload Payment Screenshot *
                      </h4>
                      <p className="text-[11px] font-mono text-gray-600 mt-0.5">
                        Scan QR, pay fee, and attach screenshot below.
                      </p>
                    </div>

                    <div className="mb-4">
                      <label className="block relative cursor-pointer group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="sr-only"
                        />
                        <div className={`p-6 text-center border-3 border-dashed transition-all ${
                          fileUploaded
                            ? "border-emerald-600 bg-emerald-100/90"
                            : "border-[#0f172a] hover:border-emerald-600 bg-white hover:bg-emerald-50"
                        }`}>
                          <div className="w-12 h-12 bg-[#0f172a] text-white flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0px_0px_#059669]">
                            {fileUploaded ? <FileCheck className="w-6 h-6 text-emerald-400" /> : <Upload className="w-6 h-6" />}
                          </div>

                          {fileUploaded ? (
                            <div>
                              <span className="font-mono font-black text-xs uppercase text-emerald-900 block truncate">
                                {fileUploaded.name}
                              </span>
                              <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-0.5">
                                Size: {fileUploaded.size} • Attached Successfully!
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="font-black text-xs uppercase text-[#0f172a] block">
                                Tap to Choose Image File
                              </span>
                              <span className="text-[10px] font-mono text-gray-500 block mt-1">
                                JPG, PNG, WEBP allowed (Max 10 MB)
                              </span>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-100 border-2 border-emerald-600 text-[11px] font-mono font-bold text-emerald-900">
                    <span className="block font-black uppercase text-xs mb-0.5">Verification Notice:</span>
                    Your registration entry will be instantly sent to Student Leads & Admin for sports fixture generation.
                  </div>
                </div>
              </div>

              {/* Desktop Stepper Action Buttons */}
              <div className="hidden sm:flex items-center justify-between pt-4 border-t-3 border-[#0f172a]">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-3.5 bg-gray-200 hover:bg-gray-300 text-[#0f172a] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Squad Roster</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting || !fileUploaded}
                  className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-[#0f172a] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_#0f172a] border-2 border-[#0f172a]"
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
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 text-[#0f172a] flex items-center justify-center mx-auto mb-5 shadow-[4px_4px_0px_0px_#ffffff]">
                <Check className="w-8 h-8 sm:w-10 sm:h-10 stroke-[4]" />
              </div>

              <h3
                className="text-2xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Registration Confirmed!
              </h3>
              <p className="text-xs font-mono text-emerald-400 max-w-md mx-auto mb-6 uppercase tracking-widest">
                SEST Sports Week 2026 • Jamia Hamdard
              </p>

              {/* Receipt Pass Box */}
              <div className="max-w-xl mx-auto bg-white text-[#0f172a] border-4 border-emerald-500 p-4 sm:p-6 text-left mb-6 shadow-[6px_6px_0px_0px_#10b981]">
                <div className="flex items-center justify-between border-b-3 border-[#0f172a] pb-3 mb-4">
                  <div>
                    <span className="text-[10px] font-black font-mono uppercase text-gray-500 block">
                      OFFICIAL REGISTRATION ID
                    </span>
                    <span className="text-lg sm:text-2xl font-black font-mono tracking-tight text-[#0f172a]">
                      {submittedRegId || "SEST-2026-104"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (submittedRegId) {
                        navigator.clipboard.writeText(submittedRegId);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }
                    }}
                    className="px-3 py-1.5 bg-[#0f172a] text-emerald-400 font-mono font-bold text-xs uppercase flex items-center gap-1.5"
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
                    <span className="font-bold">{totalSquadCount} Registered</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">PROOF ATTACHED</span>
                    <span className="font-bold text-emerald-700 truncate">{fileUploaded?.name || "Uploaded"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
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

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      {activeStep !== 4 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-t-3 border-emerald-500 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_30px_rgba(0,0,0,0.3)] sm:hidden">
          <div className="flex items-center gap-2.5">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white border border-gray-600 active:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <span className="text-[10px] text-gray-400 block font-bold uppercase font-mono leading-none">
                {activeStep === 1 ? "Choose Sport" : activeStep === 2 ? "Fill Details" : "Upload Proof"}
              </span>
              <span className="text-sm font-black text-emerald-400 uppercase block mt-0.5 leading-none font-mono">
                ₹{calculatedFee}
              </span>
            </div>
          </div>

          {activeStep === 1 && (
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="flex-1 max-w-[160px] py-3 bg-emerald-500 text-[#0f172a] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-white shadow-[2px_2px_0px_0px_#ffffff] active:scale-[0.97] transition-transform"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {activeStep === 2 && (
            <button
              type="button"
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
              className="flex-1 max-w-[160px] py-3 bg-emerald-500 text-[#0f172a] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-white shadow-[2px_2px_0px_0px_#ffffff] active:scale-[0.97] transition-transform"
            >
              <span>Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {activeStep === 3 && (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="flex-1 max-w-[180px] py-3 bg-emerald-500 text-[#0f172a] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-white shadow-[2px_2px_0px_0px_#ffffff] active:scale-[0.97] transition-transform disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Submit</span>
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </section>
  );
};
