import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import avatarImg from "../assets/images/huong-avatar.jpg";
import { cn } from "@/src/lib/utils";
import { useLanguage } from "@/src/lib/LanguageContext";

export default function Philosophy() {
  const container = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  return (
    <section id="about" ref={container} className="py-32 md:py-44 px-8 md:px-28 relative">
      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(10px) brightness(0.5)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px) brightness(1)' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-stretch"
      >
        {/* Left: Animated Profile Image */}
        <motion.div 
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full lg:col-span-5 h-full"
        >
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-full rounded-[2rem] overflow-hidden flex items-center justify-center shadow-[0_0_80px_rgba(255,192,203,0.45)] p-[3px]">
            {/* The Spinning Gradient */}
            <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#FFC0CB_100%)] z-0" />
            
            {/* The Image Mask */}
            <div className="absolute inset-[3px] bg-background rounded-[1.8rem] overflow-hidden z-10 w-full h-full">
              <img 
                src={avatarImg} 
                alt="Huong" 
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>

        {/* Right: Text Content with Matching Glowing Border */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full lg:col-span-7 h-full relative rounded-[2rem] overflow-hidden p-[3px] shadow-[0_0_80px_rgba(255,192,203,0.45)] flex flex-col justify-center"
        >
          {/* The Spinning Gradient */}
          <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#FFC0CB_100%)] z-0" />
          
          {/* The Inner Mask (Content Area) */}
          <div className="relative h-full bg-background rounded-[1.8rem] p-8 md:p-14 z-10 w-full flex flex-col justify-center liquid-glass border border-white/5">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <span className="text-[#FFC0CB] text-xs font-bold uppercase tracking-[0.4em] mb-4 block text-pink-glow [text-shadow:_0_0_20px_rgba(255,192,203,0.7),_0_0_40px_rgba(255,192,203,0.4)]">
                {t.philosophy.label}
              </span>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white mb-8 leading-tight [text-shadow:_0_0_20px_rgba(255,255,255,0.4),_0_0_40px_rgba(255,255,255,0.2)]">
                {t.philosophy.titlePrefix}
                <span className="font-serif italic text-[#FFC0CB] text-pink-glow [text-shadow:_0_0_20px_rgba(255,192,203,0.7),_0_0_40px_rgba(255,192,203,0.4)]">{t.philosophy.titleItalic}</span>
                {t.philosophy.titleSuffix}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light whitespace-pre-line tracking-wide [text-shadow:_0_0_20px_rgba(255,255,255,0.4),_0_0_40px_rgba(255,255,255,0.2)]">
                {t.philosophy.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
