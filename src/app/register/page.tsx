"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrutalistRegisterSection } from "@/components/home/BrutalistRegisterSection";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#03120c] text-white flex flex-col pt-20">
      <Navbar transparent />

      <main className="flex-grow">
        <BrutalistRegisterSection />
      </main>

      <Footer />
    </div>
  );
}
