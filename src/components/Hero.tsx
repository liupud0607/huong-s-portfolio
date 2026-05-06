import { motion } from "motion/react";
import { fadeUp } from "@/src/lib/utils";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/src/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-6">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 shadow-2xl"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4" type="video/mp4" />
        </video>
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black to-transparent z-1" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-[#FFC0CB]">
          {t.hero.tags.map((tag, i) => (
            <motion.div
              key={tag}
              {...fadeUp(0.1 + i * 0.1)}
              className="z-20"
            >
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
                className={`liquid-glass px-4 py-1.5 rounded-full border border-[#FFC0CB] text-[10px] md:text-xs font-medium tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ${i === 1 ? 'bg-black' : 'text-[#FFC0CB]'}`}
              >
                {tag}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.h1 
          {...fadeUp(0.3)}
          className="text-6xl md:text-[70px] font-medium tracking-tighter mb-8 leading-[1.05] max-w-4xl mx-auto [text-shadow:_0_0_20px_rgba(255,255,255,0.4),_0_0_40px_rgba(255,255,255,0.2)]"
        >
          {t.hero.titlePrefix} <br />
          <span className="font-serif italic font-normal text-[#FFC0CB] [text-shadow:_0_0_20px_rgba(255,192,203,0.7),_0_0_40px_rgba(255,192,203,0.4)]">{t.hero.titleItalic}</span> {t.hero.titleSuffix}
        </motion.h1>

        <motion.p 
          {...fadeUp(0.5)}
          style={{ color: 'hsl(var(--hero-subtitle))' }}
          className="text-[15.5px] max-w-2xl mx-auto mb-16 leading-relaxed font-light opacity-80 [text-shadow:_0_0_20px_rgba(255,255,255,0.4),_0_0_40px_rgba(255,255,255,0.2)]"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Scroll Down Indicator */}
        <motion.button
          {...fadeUp(0.7)}
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 group cursor-pointer"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#eac4cb]">{t.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown size={24} strokeWidth={1.5} className="text-[#FFC0CB] drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
