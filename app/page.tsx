"use client";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Features from "../components/Features";
import WillInfo from "../components/WillInfo";
import ImpactSection from "../components/ImpactSection";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; // Import Navbar
import { DotBackground } from "@/components/animateddots";

export default function Home() {
  return (
  <div className="min-h-screen bg-black">
    <DotBackground>
     <Navbar />
      <main>
       <Hero />
        {/* <Partners /> */}
        <Features />
        <WillInfo />
        {/* <ImpactSection /> */}
        <FAQ />
      </main>
      
      <Footer />
      </DotBackground>
      </div >
  );
}
