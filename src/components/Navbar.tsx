import { Instagram, Mail, Music2 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useState, useEffect, MouseEvent } from "react";
import { useLanguage } from "@/src/lib/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: t.nav.home, href: "#home", id: "home" },
    { name: t.nav.about, href: "#about", id: "about" },
    { name: t.nav.skills, href: "#skills", id: "skills" },
    { name: t.nav.projects, href: "#projects", id: "projects" },
    { name: t.nav.contact, href: "#contact", id: "contact" },
  ];

  const socials = [
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/pudkhooo.___/",
      isExternal: true 
    },
    { 
      icon: Music2, 
      href: "https://www.tiktok.com/@vineb00m",
      isExternal: true 
    },
    { 
      icon: Mail, 
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=ddo287658@gmail.com",
      isExternal: true 
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ["home", "about", "skills", "projects", "contact"];
    
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-8 flex items-center justify-between">
      {/* Center: Nav links */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:flex items-center space-x-4 text-sm font-medium"
      >
        {navLinks.map((link, i) => (
          <div key={link.id} className="flex items-center space-x-4">
            <a 
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={cn(
                "transition-all duration-300",
                activeSection === link.id 
                  ? "text-foreground font-semibold scale-110" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.name}
            </a>
            {i < navLinks.length - 1 && (
              <span className="text-white/30 font-bold text-[10px]">•</span>
            ) }
          </div>
        ))}
      </motion.div>

      {/* Right: Social icons & Language Switcher */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center space-x-6"
      >
        {/* Language Switcher */}
        <div className="flex items-center liquid-glass p-1 rounded-full border border-[#FFC0CB]">
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              "px-3 py-1 text-[10px] font-bold rounded-full transition-all duration-300",
              language === 'en' 
                ? "bg-[#FFC0CB] text-black drop-shadow-[0_0_8px_rgba(255,192,203,0.4)]" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('vi')}
            className={cn(
              "px-3 py-1 text-[10px] font-bold rounded-full transition-all duration-300",
              language === 'vi' 
                ? "bg-[#FFC0CB] text-black drop-shadow-[0_0_8px_rgba(255,192,203,0.4)]" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            VN
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {socials.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ color: '#FFC0CB' }}
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:bg-white/10 transition-colors group"
            >
              <social.icon size={18} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
