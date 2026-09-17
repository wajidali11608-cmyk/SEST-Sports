"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useRegistration } from "@/context/RegistrationContext";
import {
  Users,
  CreditCard,
  Lock,
  Download,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Key,
  ShieldCheck,
  TrendingUp,
  Menu,
  X,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { registrations, approveRegistration, rejectRegistration, isLoadingFromSheets, lastSyncedAt, syncWithGoogleSheets } = useRegistration();

  // Password Protection State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passInput, setPassInput] = useState<string>("");
  const [passError, setPassError] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Table Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sportFilter, setSportFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [viewProofModal, setViewProofModal] = useState<{ id: string; teamName: string; fileName: string; url?: string } | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "sest2026";
    if (passInput.trim() === envPassword.trim()) {
      setIsAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  // Export entries to CSV
  const handleExportCSV = () => {
    const headers = [
      "Registration ID",
      "Sport",
      "Team Name",
      "Captain Name",
      "Captain Enrollment",
      "Captain Mobile",
      "Players Count",
      "Amount Paid",
      "UTR Number",
      "Status",
      "Created At",
    ];

    const rows = registrations.map((r) => [
      r.id,
      r.sportName,
      `"${r.teamName}"`,
      `"${r.captainName}"`,
      r.captainEnrollment,
      r.captainMobile,
      r.players.length,
      r.amount,
      r.utr,
      r.status,
      r.createdAt,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SEST_Sports_Week_Entries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered registrations
  const filteredRegs = registrations.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.captainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.captainEnrollment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSport = sportFilter === "ALL" || r.sportId === sportFilter;
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;

    return matchesSearch && matchesSport && matchesStatus;
  });

  // Calculate totals
  const totalRevenue = registrations.reduce((acc, r) => acc + (r.status === "Confirmed" ? r.amount : 0), 0);
  const totalPlayersCount = registrations.reduce((acc, r) => acc + r.players.length, 0);
  const pendingCount = registrations.filter((r) => r.status === "Pending").length;
  const confirmedCount = registrations.filter((r) => r.status === "Confirmed").length;

  // PASSKEY LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#03120c] text-white flex items-center justify-center p-6 grain-overlay">
        <div className="max-w-md w-full bg-white text-[#03120c] border-4 border-emerald-400 shadow-[14px_14px_0px_0px_#10b981] p-8 sm:p-10 relative">
          <div className="flex items-center gap-4 pb-6 mb-6 border-b-4 border-[#03120c]">
            <div className="relative w-16 h-16 bg-[#03120c] p-1 border-2 border-emerald-400 shrink-0">
              <Image
                src="/images/jamia-hamdard-logo.jpg"
                alt="Jamia Hamdard Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div>
              <h1
                className="text-2xl font-black uppercase tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                SEST ADMIN PORTAL
              </h1>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-200 px-2 py-0.5 border border-emerald-400">
                Jamia Hamdard Authorized Only
              </span>
            </div>
          </div>

          <p className="text-xs font-mono font-bold text-gray-700 mb-6 uppercase tracking-wider">
            Enter Organizer Passkey to unlock live dashboard:
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-black uppercase font-mono mb-2">
                Organizer Passkey *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passInput}
                  onChange={(e) => {
                    setPassInput(e.target.value);
                    setPassError(false);
                  }}
                  placeholder="Enter Password (e.g. sest2026)"
                  className="w-full px-4 py-3.5 text-sm font-mono font-black border-3 border-[#03120c] focus:outline-none focus:bg-emerald-50 text-[#03120c]"
                  style={{ borderWidth: "3px" }}
                />
                <Key className="w-5 h-5 absolute right-3.5 top-3.5 text-gray-500" />
              </div>
              {passError && (
                <p className="text-xs font-mono font-black text-red-600 mt-2">
                  Incorrect passkey. Please enter the valid organizer passkey.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#03120c] hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#10b981] transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="pt-6 mt-6 border-t-3 border-[#03120c] text-center">
            <Link
              href="/"
              className="text-xs font-mono font-bold text-gray-600 hover:text-[#03120c] uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-600" />
              <span>Back To Main Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED VIBRANT BRUTALIST DASHBOARD
  return (
    <div className="flex min-h-screen bg-[#f4f6f8] text-[#1a1a1a]">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar onLockAdmin={() => setIsAuthenticated(false)} />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80">
          <div className="w-72 bg-[#03120c] h-full">
            <div className="p-4 flex justify-between items-center border-b border-white/20">
              <span className="text-white font-mono font-bold text-xs uppercase">SEST Admin Menu</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <AdminSidebar onLockAdmin={() => setIsAuthenticated(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-[1400px] w-full overflow-y-auto">
        {/* Top Header Bar */}
        <div className="mb-8 p-6 bg-white border-4 border-[#03120c] shadow-[8px_8px_0px_0px_#03120c] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 bg-[#03120c] text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-14 h-14 bg-white p-1 border-2 border-[#03120c] shadow-[3px_3px_0px_0px_#10b981] shrink-0">
              <Image
                src="/images/jamia-hamdard-logo.jpg"
                alt="Jamia Hamdard Crest"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div>
              <h1
                className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#03120c]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                SEST Sports Entries Dashboard
              </h1>
              <p className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest mt-0.5 flex flex-wrap items-center gap-2">
                <span>Jamia Hamdard Organizers Control Panel</span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-[10px] px-2 py-0.5 border border-emerald-400 font-mono font-black">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {isLoadingFromSheets ? "Syncing..." : lastSyncedAt ? `Synced at ${lastSyncedAt}` : "Live Connected"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => syncWithGoogleSheets()}
              disabled={isLoadingFromSheets}
              className="px-5 py-3 bg-[#03120c] hover:bg-emerald-700 text-emerald-400 font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_#10b981] border-2 border-[#03120c] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingFromSheets ? "animate-spin" : ""}`} />
              <span>{isLoadingFromSheets ? "Fetching Sheets..." : "Sync Google Sheets"}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-[#03120c] font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_#03120c] border-2 border-[#03120c] transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <Download className="w-4 h-4 stroke-[3]" />
              <span>Export Excel / CSV</span>
            </button>
          </div>
        </div>

        {/* Stats Grid — Vibrant Colorful Brutalist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stat 1 */}
          <div className="p-6 bg-white border-4 border-[#03120c] shadow-[6px_6px_0px_0px_#03120c] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-gray-500">
                Total Teams Registered
              </span>
              <div className="w-9 h-9 bg-emerald-100 text-emerald-800 border-2 border-[#03120c] flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-4xl font-black font-mono text-[#03120c]">{registrations.length}</div>
            <div className="text-[11px] font-mono font-bold text-emerald-700 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{confirmedCount} Confirmed Teams</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-6 bg-white border-4 border-[#03120c] shadow-[6px_6px_0px_0px_#03120c] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-indigo-500" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-gray-500">
                Total Athletes Enrolled
              </span>
              <div className="w-9 h-9 bg-indigo-100 text-indigo-800 border-2 border-[#03120c] flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-4xl font-black font-mono text-[#03120c]">{totalPlayersCount}</div>
            <div className="text-[11px] font-mono font-bold text-indigo-700 mt-2">
              Team: ₹150/athlete • Badm.: ₹200-₹300
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-6 bg-white border-4 border-[#03120c] shadow-[6px_6px_0px_0px_#03120c] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-amber-500" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-gray-500">
                Pending Verification
              </span>
              <div className="w-9 h-9 bg-amber-100 text-amber-900 border-2 border-[#03120c] flex items-center justify-center font-bold">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-4xl font-black font-mono text-amber-600">{pendingCount}</div>
            <div className="text-[11px] font-mono font-bold text-amber-700 mt-2">
              Requires Organizer Action
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-6 bg-[#03120c] text-white border-4 border-[#03120c] shadow-[6px_6px_0px_0px_#10b981] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-400" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-emerald-400">
                Total Collection
              </span>
              <div className="w-9 h-9 bg-emerald-500 text-[#03120c] font-black flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400">₹{totalRevenue.toLocaleString()}</div>
            <div className="text-[11px] font-mono font-bold text-gray-300 mt-2">
              Verified UPI Payments
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white border-4 border-[#03120c] shadow-[6px_6px_0px_0px_#03120c] p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Registration ID, Captain Name, Team Name, UTR..."
                className="w-full pl-10 pr-4 py-3 text-xs font-mono font-black border-3 border-[#03120c] focus:outline-none focus:bg-emerald-50 text-[#03120c]"
                style={{ borderWidth: "3px" }}
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-mono font-black uppercase text-gray-700 shrink-0">
                Status:
              </span>
              {["ALL", "Confirmed", "Pending", "Rejected"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 text-[10px] font-mono font-black uppercase border-2 transition-all ${
                    statusFilter === st
                      ? "bg-[#03120c] text-emerald-400 border-[#03120c]"
                      : "bg-gray-100 text-gray-700 border-gray-400 hover:border-[#03120c]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Sport Filter */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-mono font-black uppercase text-gray-700 shrink-0">
                Sport:
              </span>
              {["ALL", "cricket", "football", "badminton", "volleyball", "basketball"].map((sp) => (
                <button
                  key={sp}
                  onClick={() => setSportFilter(sp)}
                  className={`px-3 py-1.5 text-[10px] font-mono font-black uppercase border-2 transition-all ${
                    sportFilter === sp
                      ? "bg-emerald-500 text-[#03120c] border-[#03120c] font-black"
                      : "bg-gray-100 text-gray-700 border-gray-400 hover:border-[#03120c]"
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Entries Data Table — Ultra Responsive */}
        <div className="bg-white border-4 border-[#03120c] shadow-[10px_10px_0px_0px_#03120c] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#03120c] text-white border-b-4 border-[#03120c] text-[11px] font-black uppercase font-mono">
                  <th className="p-4 border-r border-white/20">Reg ID</th>
                  <th className="p-4 border-r border-white/20">Sport</th>
                  <th className="p-4 border-r border-white/20">Team / Alias</th>
                  <th className="p-4 border-r border-white/20">Captain Name</th>
                  <th className="p-4 border-r border-white/20">Enrollment</th>
                  <th className="p-4 border-r border-white/20">Mobile</th>
                  <th className="p-4 border-r border-white/20">Fee Paid</th>
                  <th className="p-4 border-r border-white/20">Payment Proof</th>
                  <th className="p-4 border-r border-white/20">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#03120c] text-xs font-medium">
                {filteredRegs.map((reg) => (
                  <tr key={reg.id} className="hover:bg-emerald-50/80 transition-colors">
                    <td className="p-4 font-mono font-black border-r-2 border-[#03120c] text-[#03120c]">
                      {reg.id}
                    </td>
                    <td className="p-4 font-extrabold uppercase border-r-2 border-[#03120c]">
                      {reg.sportName}
                    </td>
                    <td className="p-4 font-black border-r-2 border-[#03120c] text-[#03120c]">
                      {reg.teamName}
                    </td>
                    <td className="p-4 border-r-2 border-[#03120c] font-bold text-gray-900">
                      {reg.captainName}
                    </td>
                    <td className="p-4 font-mono border-r-2 border-[#03120c]">
                      {reg.captainEnrollment}
                    </td>
                    <td className="p-4 font-mono border-r-2 border-[#03120c]">
                      {reg.captainMobile}
                    </td>
                    <td className="p-4 font-mono font-black text-emerald-800 border-r-2 border-[#03120c]">
                      ₹{reg.amount}
                    </td>
                    <td className="p-4 font-mono font-bold border-r-2 border-[#03120c]">
                      <button
                        onClick={() =>
                          setViewProofModal({
                            id: reg.id,
                            teamName: reg.teamName,
                            fileName: reg.screenshotName || "Payment Proof",
                            url: reg.screenshotUrl,
                          })
                        }
                        className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-300 text-[#03120c] border border-[#03120c] font-mono text-[10px] font-black rounded-none flex items-center gap-1.5 w-fit transition-colors shadow-[2px_2px_0px_0px_#03120c]"
                        title="Click to view full payment screenshot"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-emerald-800" />
                        <span>View Screenshot ({reg.screenshotName || "Attached"})</span>
                      </button>
                    </td>
                    <td className="p-4 border-r-2 border-[#03120c]">
                      <span
                        className={`px-3 py-1 text-[10px] font-mono font-black uppercase border-2 inline-block ${
                          reg.status === "Confirmed"
                            ? "bg-emerald-400 text-[#03120c] border-[#03120c]"
                            : reg.status === "Pending"
                            ? "bg-amber-300 text-[#03120c] border-[#03120c]"
                            : "bg-red-400 text-[#03120c] border-[#03120c]"
                        }`}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-1">
                      {reg.status !== "Confirmed" && (
                        <button
                          onClick={() => approveRegistration(reg.id)}
                          className="px-3 py-1 bg-emerald-600 text-white font-mono font-black text-[10px] uppercase border border-[#03120c] hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                      )}
                      {reg.status !== "Rejected" && (
                        <button
                          onClick={() => rejectRegistration(reg.id)}
                          className="px-3 py-1 bg-red-600 text-white font-mono font-black text-[10px] uppercase border border-[#03120c] hover:bg-red-700"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredRegs.length === 0 && (
                  <tr>
                    <td colSpan={10} className="p-10 text-center text-gray-500 font-mono text-xs">
                      No registrations match your search and filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Payment Screenshot Viewer Modal */}
      {viewProofModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white text-[#03120c] border-4 border-[#03120c] max-w-md w-full p-5 shadow-[8px_8px_0px_0px_#10b981] relative max-h-[90vh] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b-3 border-[#03120c] pb-3 mb-3">
              <div>
                <span className="text-[10px] font-black font-mono uppercase text-emerald-800 block">
                  Payment Screenshot Proof • {viewProofModal.id}
                </span>
                <h3 className="text-base font-black uppercase text-[#03120c]">
                  {viewProofModal.teamName}
                </h3>
              </div>
              <button
                onClick={() => setViewProofModal(null)}
                className="p-1.5 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-100 border-2 border-[#03120c] p-2 text-center mb-4 flex items-center justify-center h-[260px] overflow-hidden">
              {viewProofModal.url ? (
                <img
                  src={viewProofModal.url}
                  alt="Payment Screenshot"
                  className="max-h-[240px] max-w-full object-contain border border-[#03120c] shadow-sm bg-white"
                />
              ) : (
                <div className="p-6 text-center text-gray-600 font-mono text-xs">
                  <CreditCard className="w-10 h-10 mx-auto text-emerald-600 mb-2" />
                  <p className="font-bold text-gray-900">{viewProofModal.fileName}</p>
                  <p className="text-[10px] text-gray-500 mt-1">Payment verified via uploaded image screenshot.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 font-mono pt-2 border-t-2 border-gray-200">
              <span className="text-[11px] font-bold text-gray-600 truncate max-w-[180px]">
                {viewProofModal.fileName}
              </span>
              {viewProofModal.url ? (
                <a
                  href={viewProofModal.url}
                  download={`Payment_Proof_${viewProofModal.id}.jpg`}
                  className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#03120c] font-black text-[11px] uppercase tracking-wider border-2 border-[#03120c] flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#03120c]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              ) : (
                <button
                  onClick={() => setViewProofModal(null)}
                  className="px-3 py-1.5 bg-[#03120c] text-white font-black text-xs uppercase"
                >
                  Close Window
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
