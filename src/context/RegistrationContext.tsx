"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SPORTS, SportInfo, Player, Registration, INITIAL_REGISTRATIONS } from "@/data/mockData";

interface RegistrationContextType {
  selectedSportId: string;
  setSelectedSportId: (id: string) => void;
  selectedSport: SportInfo;
  
  // Registration Form State
  currentStep: number;
  setCurrentStep: (step: number) => void;
  
  teamName: string;
  setTeamName: (val: string) => void;
  captainName: string;
  setCaptainName: (val: string) => void;
  captainEnrollment: string;
  setCaptainEnrollment: (val: string) => void;
  captainMobile: string;
  setCaptainMobile: (val: string) => void;
  
  players: Player[];
  addPlayer: (player: Omit<Player, "id">) => void;
  deletePlayer: (id: string) => void;
  
  utr: string;
  setUtr: (val: string) => void;
  paymentScreenshot: { name: string; size: string; url?: string } | null;
  setPaymentScreenshot: (file: { name: string; size: string; url?: string } | null) => void;
  
  // Submitted Registrations List
  registrations: Registration[];
  currentRegistrationId: string | null;
  isLoadingFromSheets: boolean;
  lastSyncedAt: string | null;
  
  // Actions
  submitRegistration: (customData?: {
    sportId?: string;
    sportName?: string;
    teamName?: string;
    captainName?: string;
    captainEnrollment?: string;
    captainMobile?: string;
    players?: Player[];
    amount?: number;
    screenshotName?: string;
    screenshotUrl?: string;
  }) => string;
  getRegistrationById: (id: string) => Registration | undefined;
  approveRegistration: (id: string) => void;
  rejectRegistration: (id: string, remarks?: string) => void;
  resetForm: () => void;
  syncWithGoogleSheets: () => Promise<void>;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSportId, setSelectedSportId] = useState<string>("cricket");
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Form details
  const [teamName, setTeamName] = useState<string>("SEST Strikers");
  const [captainName, setCaptainName] = useState<string>("Rahul Sharma");
  const [captainEnrollment, setCaptainEnrollment] = useState<string>("2023CS1234");
  const [captainMobile, setCaptainMobile] = useState<string>("+91 98765 43210");
  
  // Players
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "Rahul Sharma", enrollmentNo: "2023CS1234", mobileNo: "9876512340" },
    { id: "2", name: "Ahmed Khan", enrollmentNo: "2023ME5678", mobileNo: "9876623451" },
    { id: "3", name: "Sameer Ali", enrollmentNo: "2023CS9012", mobileNo: "9876534562" },
    { id: "4", name: "Faizan Khan", enrollmentNo: "2023IT3456", mobileNo: "9876545673" },
    { id: "5", name: "Arjun Verma", enrollmentNo: "2023CS7890", mobileNo: "9876556784" },
  ]);
  
  // Payment
  const [utr, setUtr] = useState<string>("123456789012");
  const [paymentScreenshot, setPaymentScreenshot] = useState<{ name: string; size: string; url?: string } | null>({
    name: "payment_screenshot.jpg",
    size: "2.4 MB",
  });
  
  // Global registrations store with localStorage persistence & real-time sync
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sest_registrations");
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.error("Failed to load registrations from localStorage", e);
      }
    }
    return INITIAL_REGISTRATIONS;
  });
  const [currentRegistrationId, setCurrentRegistrationId] = useState<string | null>("C-027");

  // Helper to persist to localStorage and broadcast real-time sync event
  const saveRegistrations = (updater: Registration[] | ((prev: Registration[]) => Registration[])) => {
    setRegistrations((prev) => {
      const nextRegs = typeof updater === "function" ? updater(prev) : updater;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("sest_registrations", JSON.stringify(nextRegs));
          window.dispatchEvent(new CustomEvent("sest_registration_updated"));
        } catch (e) {
          console.error("Failed to save registrations to localStorage", e);
        }
      }
      return nextRegs;
    });
  };

  const [isLoadingFromSheets, setIsLoadingFromSheets] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  // Helper parser for Google Sheet rows
  const parseGoogleSheetRow = (row: Record<string, any>, index: number): Registration => {
    const getVal = (...possibleKeys: string[]): any => {
      for (const pKey of possibleKeys) {
        const cleanP = pKey.toLowerCase().replace(/[^a-z0-9]/g, "");
        const matchedKey = Object.keys(row).find(
          (k) => k.toLowerCase().replace(/[^a-z0-9]/g, "") === cleanP
        );
        if (
          matchedKey &&
          row[matchedKey] !== undefined &&
          row[matchedKey] !== null &&
          String(row[matchedKey]).trim() !== ""
        ) {
          return row[matchedKey];
        }
      }
      return undefined;
    };

    const id = String(getVal("id", "registration id", "registration_id") || `SEST-REG-${1000 + index}`).trim();
    const sportName = String(getVal("sportname", "sport name", "sport") || "Cricket").trim();
    const sportId = sportName.toLowerCase();
    const teamName = String(getVal("teamname", "team name", "team") || "Team").trim();
    const captainName = String(getVal("captainname", "captain name", "captain") || "N/A").trim();
    const captainEnrollment = String(getVal("captainenrollment", "captain enrollment", "enrollment") || "N/A").trim();
    const captainMobile = String(getVal("captainmobile", "captain mobile", "mobile") || "N/A").trim();

    const rawPlayers = getVal("players", "players count", "players_count");
    let playersList: Player[] = [];

    if (Array.isArray(rawPlayers)) {
      playersList = rawPlayers;
    } else if (typeof rawPlayers === "string" && rawPlayers.trim().startsWith("[")) {
      try {
        playersList = JSON.parse(rawPlayers);
      } catch {
        // fallback
      }
    }

    if (playersList.length === 0) {
      if (typeof rawPlayers === "string" && rawPlayers.includes(",")) {
        playersList = rawPlayers.split(",").map((pStr: string, i: number) => {
          const cleanStr = pStr.trim();
          const match = cleanStr.match(/^(.*?)(?:\s*\((.*?)\))?$/);
          const name = match ? match[1].trim() : cleanStr;
          const enrollmentNo = match && match[2] ? match[2].trim() : "N/A";
          return {
            id: `${id}-p${i + 1}`,
            name: name || `Player ${i + 1}`,
            enrollmentNo: enrollmentNo,
            mobileNo: i === 0 ? captainMobile : "N/A",
          };
        });
      } else {
        const count = parseInt(String(rawPlayers)) || 1;
        playersList = Array.from({ length: count }, (_, i) => ({
          id: `${id}-p${i + 1}`,
          name: i === 0 ? captainName : `Player ${i + 1}`,
          enrollmentNo: i === 0 ? captainEnrollment : "N/A",
          mobileNo: i === 0 ? captainMobile : "N/A",
        }));
      }
    }

    // Clean currency string e.g. "₹300" or "₹200" or "300"
    const rawAmount = getVal("amount", "amount paid", "amount_paid", "fee", "fees");
    const cleanedAmountStr = String(rawAmount || "").replace(/[^0-9.]/g, "");
    let amount = Number(cleanedAmountStr);

    if (!rawAmount || isNaN(amount) || amount <= 0) {
      const sportLower = sportName.toLowerCase();
      if (sportLower.includes("badminton")) {
        if (sportLower.includes("doubles")) {
          amount = 300;
        } else if (sportLower.includes("singles")) {
          amount = 200;
        } else {
          amount = playersList.length > 1 ? 300 : 200;
        }
      } else {
        amount = (playersList.length || 1) * 150;
      }
    }

    // First check for the dedicated Screenshot URL column (Google Drive URL from Apps Script)
    const rawScreenshotUrl = String(getVal("screenshoturl", "screenshot url") || "").trim();
    // Then check the Payment Screenshot / screenshotName column (may be just a filename)
    const rawScreenshotName = String(getVal("paymentproof", "payment proof", "paymentscreenshot", "screenshotname", "screenshot") || "").trim();
    
    let screenshotName = "Payment Proof Attached";
    let screenshotUrl: string | undefined = undefined;

    // Priority 1: Dedicated Screenshot URL column (Drive URL or hosted URL)
    if (rawScreenshotUrl && (rawScreenshotUrl.startsWith("http://") || rawScreenshotUrl.startsWith("https://") || rawScreenshotUrl.startsWith("data:image/"))) {
      screenshotUrl = rawScreenshotUrl;
      screenshotName = rawScreenshotName || "Payment Screenshot";
    }
    // Priority 2: Payment Screenshot column might contain a URL
    else if (rawScreenshotName && (rawScreenshotName.startsWith("http://") || rawScreenshotName.startsWith("https://") || rawScreenshotName.startsWith("data:image/"))) {
      screenshotUrl = rawScreenshotName;
      screenshotName = "Payment Screenshot";
    }
    // Priority 3: Just a filename
    else if (rawScreenshotName && rawScreenshotName !== "Verified Image") {
      screenshotName = rawScreenshotName;
    }

    const statusRaw = String(getVal("status") || "Confirmed").trim();
    const status: "Confirmed" | "Pending" | "Rejected" =
      statusRaw.toLowerCase().includes("pend") ? "Pending" : statusRaw.toLowerCase().includes("reject") ? "Rejected" : "Confirmed";
    const createdAt = String(getVal("createdat", "created at", "timestamp") || new Date().toISOString().split("T")[0]).trim();

    return {
      id,
      sportId,
      sportName,
      teamName,
      captainName,
      captainEnrollment,
      captainMobile,
      players: playersList,
      amount,
      utr: "Verified",
      screenshotName,
      screenshotSize: "Verified Image",
      screenshotUrl,
      status,
      createdAt,
    };
  };

  const syncWithGoogleSheets = async () => {
    const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
    if (!sheetsUrl) return;

    setIsLoadingFromSheets(true);
    try {
      const response = await fetch(sheetsUrl);
      if (response.ok) {
        const remoteData = await response.json();
        if (Array.isArray(remoteData) && remoteData.length > 0) {
          const parsedRemoteRegs: Registration[] = remoteData.map((row: any, idx: number) => parseGoogleSheetRow(row, idx));

          // Merge instead of replace — preserve local screenshot URLs and local-only registrations
          saveRegistrations((prev) => {
            const localScreenshots = new Map<string, string>();
            prev.forEach((r) => {
              if (r.screenshotUrl) localScreenshots.set(r.id, r.screenshotUrl);
            });

            const merged = parsedRemoteRegs.map((r) => ({
              ...r,
              screenshotUrl: r.screenshotUrl || localScreenshots.get(r.id),
            }));

            // Keep any local registrations that haven't synced to Sheets yet
            const remoteIds = new Set(parsedRemoteRegs.map((r) => r.id));
            const localOnly = prev.filter((r) => !remoteIds.has(r.id));

            return [...localOnly, ...merged];
          });

          setLastSyncedAt(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }));
        }
      }
    } catch (err) {
      console.error("Error syncing registrations from Google Sheets:", err);
    } finally {
      setIsLoadingFromSheets(false);
    }
  };

  // Sync state when localStorage changes across tabs or via custom event & auto fetch from Sheets
  useEffect(() => {
    const syncFromStorage = () => {
      if (typeof window !== "undefined") {
        try {
          const saved = localStorage.getItem("sest_registrations");
          if (saved) {
            setRegistrations(JSON.parse(saved));
          }
        } catch (e) {
          console.error("Failed to sync registrations from storage", e);
        }
      }
    };

    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("sest_registration_updated", syncFromStorage);

    // Initial sync from Google Sheets
    syncWithGoogleSheets();

    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("sest_registration_updated", syncFromStorage);
    };
  }, []);

  const selectedSport = SPORTS.find((s) => s.id === selectedSportId) || SPORTS[0];

  const addPlayer = (playerData: Omit<Player, "id">) => {
    const newPlayer: Player = {
      ...playerData,
      id: Date.now().toString(),
    };
    setPlayers((prev) => [...prev, newPlayer]);
  };

  const deletePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const submitRegistration = (customData?: {
    sportId?: string;
    sportName?: string;
    teamName?: string;
    captainName?: string;
    captainEnrollment?: string;
    captainMobile?: string;
    players?: Player[];
    amount?: number;
    screenshotName?: string;
    screenshotUrl?: string;
  }): string => {
    const targetSportId = customData?.sportId || selectedSportId;
    const targetSport = SPORTS.find((s) => s.id === targetSportId) || selectedSport;
    const sportCode = targetSportId.toUpperCase().slice(0, 2);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `SEST-${sportCode}-${randomNum}`;
    
    const finalTeamName = customData?.teamName || teamName || `${targetSport.name} Team`;
    const finalCaptainName = customData?.captainName || captainName;
    const finalCaptainEnrollment = customData?.captainEnrollment || captainEnrollment;
    const finalCaptainMobile = customData?.captainMobile || captainMobile;
    const finalPlayers = customData?.players || players;
    const finalAmount = customData?.amount || (finalPlayers.length * 150);
    const finalScreenshotName = customData?.screenshotName || paymentScreenshot?.name || "screenshot_uploaded.png";
    const finalScreenshotUrl = customData?.screenshotUrl || paymentScreenshot?.url;

    const finalSportName = customData?.sportName || targetSport.name;

    const newReg: Registration = {
      id: newId,
      sportId: targetSportId,
      sportName: finalSportName,
      teamName: finalTeamName,
      captainName: finalCaptainName,
      captainEnrollment: finalCaptainEnrollment,
      captainMobile: finalCaptainMobile,
      players: finalPlayers,
      amount: finalAmount,
      utr: "Screenshot Verified",
      screenshotName: finalScreenshotName,
      screenshotSize: "Verified Image",
      screenshotUrl: finalScreenshotUrl,
      status: "Confirmed",
      createdAt: new Date().toISOString().split("T")[0],
    };

    saveRegistrations((prev) => [newReg, ...prev]);
    setCurrentRegistrationId(newId);

    // Send payload to Google Sheets Web App if configured
    const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
    if (sheetsUrl) {
      const payload = {
        id: newId,
        createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        sportName: finalSportName,
        teamName: finalTeamName,
        captainName: finalCaptainName,
        captainEnrollment: finalCaptainEnrollment,
        captainMobile: finalCaptainMobile,
        players: finalPlayers,
        amount: finalAmount,
        screenshotName: finalScreenshotName,
        screenshotUrl: finalScreenshotUrl || "",
        status: "Confirmed",
      };

      try {
        fetch(sheetsUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((err) => console.log("Google Sheets sync background attempt:", err));
      } catch (err) {
        console.log("Google Sheets error:", err);
      }
    }

    return newId;
  };

  const getRegistrationById = (id: string) => {
    return registrations.find((r) => r.id === id);
  };

  const approveRegistration = (id: string) => {
    saveRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Confirmed" } : r))
    );
  };

  const rejectRegistration = (id: string) => {
    saveRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
  };

  const resetForm = () => {
    setCurrentStep(1);
    setTeamName("SEST Strikers");
    setCaptainName("Rahul Sharma");
    setCaptainEnrollment("2023CS1234");
    setCaptainMobile("+91 98765 43210");
    setPlayers([
      { id: "1", name: "Rahul Sharma", enrollmentNo: "2023CS1234", mobileNo: "9876512340" },
      { id: "2", name: "Ahmed Khan", enrollmentNo: "2023ME5678", mobileNo: "9876623451" },
      { id: "3", name: "Sameer Ali", enrollmentNo: "2023CS9012", mobileNo: "9876534562" },
      { id: "4", name: "Faizan Khan", enrollmentNo: "2023IT3456", mobileNo: "9876545673" },
      { id: "5", name: "Arjun Verma", enrollmentNo: "2023CS7890", mobileNo: "9876556784" },
    ]);
    setUtr("123456789012");
    setPaymentScreenshot({ name: "payment_screenshot.jpg", size: "2.4 MB" });
  };

  return (
    <RegistrationContext.Provider
      value={{
        selectedSportId,
        setSelectedSportId,
        selectedSport,
        currentStep,
        setCurrentStep,
        teamName,
        setTeamName,
        captainName,
        setCaptainName,
        captainEnrollment,
        setCaptainEnrollment,
        captainMobile,
        setCaptainMobile,
        players,
        addPlayer,
        deletePlayer,
        utr,
        setUtr,
        paymentScreenshot,
        setPaymentScreenshot,
        registrations,
        currentRegistrationId,
        isLoadingFromSheets,
        lastSyncedAt,
        submitRegistration,
        getRegistrationById,
        approveRegistration,
        rejectRegistration,
        resetForm,
        syncWithGoogleSheets,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return context;
};
