import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp } from "@/src/lib/utils";
import { X } from "lucide-react";
import zaloQrImg from "@/src/assets/images/regenerated_image_1777981935679.jpg";
import { useLanguage } from "@/src/lib/LanguageContext";

export default function CTA() {
  const { t } = useLanguage();
  const [showZaloQR, setShowZaloQR] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  // Handle body scroll locking
  useEffect(() => {
    if (showZaloQR) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showZaloQR]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
    }
  }, [videoUrl]);

  return (
    <section id="contact" className="relative py-32 md:py-44 px-8 md:px-28 border-t border-border/30 overflow-hidden flex items-center justify-center min-h-[600px]">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      />
      <div className="absolute inset-0 bg-background/60 z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        <motion.h2 
          {...fadeUp(0.1)}
          className="text-5xl md:text-[55px] font-medium tracking-tight mb-8 leading-tight"
        >
          {t.cta.title} <br />
          <span className="font-serif italic font-normal text-[#FFC0CB]">{t.cta.titleItalic}</span>
        </motion.h2>
        <motion.p 
          {...fadeUp(0.2)}
          style={{ maxWidth: '600px', minHeight: '88px' }}
          className="text-muted-foreground text-[18.5px] mb-12 mx-auto"
        >
          {t.cta.subtitle}
        </motion.p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            {...fadeUp(0.3)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ddo287658@gmail.com"
            className="w-full sm:w-auto bg-[#FFC0CB] text-black font-bold px-12 py-4 rounded-full text-sm uppercase tracking-widest transition-all shadow-xl text-center"
          >
            {t.cta.email}
          </motion.a>
          <motion.button
            {...fadeUp(0.4)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowZaloQR(true)}
            className="w-full sm:w-auto liquid-glass px-12 py-4 rounded-full text-sm uppercase tracking-widest font-bold transition-all border border-[#FFC0CB]"
          >
            {t.cta.contact}
          </motion.button>
        </div>
      </div>

      {/* Zalo QR Modal */}
      <AnimatePresence>
        {showZaloQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowZaloQR(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm liquid-glass p-8 rounded-2xl flex flex-col items-center border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setShowZaloQR(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
              >
                <X size={20} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
              </button>

              <h3 className="text-xl font-semibold mb-6 tracking-tight text-white">{t.cta.connectZalo}</h3>
              
              <div className="bg-white p-4 rounded-2xl mb-4 shadow-xl">
                <img 
                  src={zaloQrImg} 
                  alt="Zalo QR Code" 
                  className="w-48 h-48 rounded-lg object-contain"
                />
              </div>

              <p className="text-muted-foreground text-sm text-center">
                {t.cta.scanToChat}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
