import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { fadeUp } from "@/src/lib/utils";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/src/lib/LanguageContext";

type Project = {
  title: string;
  category: string;
  description: string;
  details: string;
  role: string;
  tools: string;
  timeline: string;
  image: string;
  gallery: string[];
};

export default function Experience() {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-32 md:py-44 px-8 md:px-28 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <motion.span 
              {...fadeUp(0.1)}
              className="text-xs tracking-[3px] uppercase text-muted-foreground block mb-6 px-1"
            >
              EXPERIENCE
            </motion.span>
            <motion.h2 
              {...fadeUp(0.2)}
              className="text-4xl md:text-6xl font-medium tracking-tight"
            >
              {t.experience.title} <span className="font-serif italic font-normal text-[#FFC0CB]">{t.experience.titleItalic}</span> {t.experience.titleSuffix}
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {t.experience.projects.map((project, index) => (
            <motion.div
              key={project.title}
              {...fadeUp(0.3 + index * 0.1)}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                backgroundColor: 'rgba(255, 192, 203, 0.05)' 
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
              className="liquid-glass rounded-2xl p-6 border border-[#FFC0CB] flex flex-col h-full cursor-pointer transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                  <span className="text-[10px] font-bold">W{index + 1}</span>
                </div>
                <div className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
              <h3 className="text-base font-bold mb-1 tracking-tight text-[#FFC0CB] group-hover:text-white">
                {project.title}
              </h3>
              <p className="text-[10px] text-[#FFC0CB] mb-4 uppercase tracking-widest font-semibold">
                {project.category}
              </p>
              <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 cursor-pointer"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="liquid-glass relative w-full max-w-4xl max-h-[85vh] rounded-3xl flex flex-col overflow-hidden"
            >
              {/* Close Button - Stays fixed at the top right of the modal wrapper */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto flex-1 p-6 md:p-10 pb-20">
                {/* Header Image */}
                <div className="aspect-video w-full bg-white/5 rounded-2xl mb-12 flex items-center justify-center overflow-hidden border border-white/5 group relative">
                   <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                {/* Title & Category */}
                <div className="mb-12">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-[#FFC0CB] text-lg uppercase tracking-widest">
                    {selectedProject.category}
                  </p>
                </div>

                {/* Detail Grid */}
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                  <div className="md:col-span-2">
                    <h4 className="text-sm uppercase tracking-[3px] text-white/40 mb-6 font-bold">{language === 'en' ? 'THE CHALLENGE' : 'THÁCH THỨC'}</h4>
                    <div className="text-white/70 text-lg leading-relaxed project-details-markdown">
                      <Markdown>{selectedProject.details}</Markdown>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-white/30 mb-3 font-bold">{language === 'en' ? 'ROLE' : 'VAI TRÒ'}</h4>
                      <p className="text-foreground text-sm font-semibold">{selectedProject.role}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-white/30 mb-3 font-bold">{language === 'en' ? 'TOOLS' : 'CÔNG CỤ'}</h4>
                      <p className="text-foreground text-sm font-semibold">{selectedProject.tools}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-white/30 mb-3 font-bold">{language === 'en' ? 'TIMELINE' : 'THỜI GIAN'}</h4>
                      <p className="text-foreground text-sm font-semibold">{selectedProject.timeline}</p>
                    </div>
                  </div>
                </div>

                {/* Gallery */}
                <div>
                  <h4 className="text-sm uppercase tracking-[3px] text-white/40 mb-8 font-bold text-center">{language === 'en' ? 'GALLERY' : 'BỘ SƯU TẬP'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedProject.gallery.map((img, idx) => (
                      <div key={idx} className="aspect-square bg-white/5 rounded-2xl border border-white/5 overflow-hidden group">
                        <img 
                          src={img} 
                          alt={`${selectedProject.title} gallery ${idx + 1}`} 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
