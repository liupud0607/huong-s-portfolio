import { motion } from "motion/react";
import { useLanguage } from "@/src/lib/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 px-8 md:px-28 border-t border-border/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-center">
        <div className="text-muted-foreground text-sm tracking-wide">
          © {currentYear} Huong. {language === 'en' ? 'All rights reserved.' : 'Bản quyền đã được bảo hộ.'}
        </div>
        
        <div className="flex items-center">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ddo287658@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
          >
            {language === 'en' ? "Contact" : "Liên hệ"}
          </a>
        </div>
      </div>
    </footer>
  );
}
