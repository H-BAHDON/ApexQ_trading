import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import ChartExamples from "../components/ChartExamples";
import Comparison from "../components/Comparison";
import WhoItsFor from "../components/WhoItsFor";
import Disclaimer from "../components/Disclaimer";
import Pricing from "../components/Pricing";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-bg-base text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ChartExamples />
        <Comparison />
        <WhoItsFor />
        <Disclaimer />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
