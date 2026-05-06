/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Arsenal from "./components/Arsenal";
import Philosophy from "./components/Philosophy";
import Experience from "./components/Experience";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { LanguageProvider } from "./lib/LanguageContext";

export default function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <LanguageProvider>
      <main className="bg-background text-foreground antialiased selection:bg-white/10 selection:text-white relative overflow-hidden">
        {/* Interactive Mouse Glow */}
        <motion.div
          className="pointer-events-none fixed z-0 opacity-30 blur-[120px]"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(255, 192, 203, 0.4)",
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
        
        <Navbar />
        <Hero />
        <Philosophy />
        <Arsenal />
        <Experience />
        <CTA />
        <Footer />
      </main>
    </LanguageProvider>
  );
}

