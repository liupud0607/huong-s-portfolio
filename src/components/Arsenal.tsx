import { motion } from "motion/react";
import { fadeUp } from "@/src/lib/utils";
import { Layout, Video, Sparkles, LucideIcon } from "lucide-react";
import { useLanguage } from "@/src/lib/LanguageContext";

export default function Arsenal() {
  const { t } = useLanguage();

  const iconMap: Record<number, LucideIcon> = {
    0: Sparkles, // Content Strategy
    1: Layout,   // Visual Identity
    2: Video,    // Motion & Editing
  };

  return (
    <section id="skills" className="pt-52 md:pt-64 pb-20 px-8 md:px-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              {...fadeUp(0.1)}
              className="text-5xl md:text-7xl font-medium tracking-tight mb-4"
            >
              {t.arsenal.title} <span className="font-serif italic font-normal text-[#FFC0CB]">{t.arsenal.titleItalic}</span>
            </motion.h2>
            <motion.p 
              {...fadeUp(0.2)}
              className="text-white/50 text-base md:text-lg"
            >
              {t.arsenal.subtitle}
            </motion.p>
          </div>
          <motion.div 
            {...fadeUp(0.3)}
            className="text-xs tracking-[0.2em] text-white/30 uppercase font-bold hidden md:block"
          >
            TECHNICAL PROFICIENCY / 2026
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.arsenal.skills.map((skill, index) => {
            const Icon = iconMap[index] || Sparkles;
            return (
              <motion.div
                key={skill.title}
                {...fadeUp(0.3 + index * 0.1)}
                className="liquid-glass rounded-3xl p-8 md:p-10 flex flex-col h-full border border-[#FFC0CB] hover:border-[#FFC0CB]/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFC0CB] border border-[#FFC0CB] flex items-center justify-center mb-8">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight text-[#FFC0CB]">{skill.title}</h3>
                <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-bold mb-6">
                  {skill.tools}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
