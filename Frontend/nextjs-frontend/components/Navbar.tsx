"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = (sectionId: string) => {
    setIsOpen(false);
    setActiveSection(sectionId);

    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "pricing", label: "Услуги" },
    { id: "gallery", label: "Галерея" },
    { id: "about", label: "Барберы" },
    { id: "contact", label: "Контакты" },
    { id: "booking", label: "Записаться", highlight: true },
  ];

  return (
    <motion.div
      className="fixed top-6 left-130 z-50 w-[95%] md:w-auto"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, damping: 25, stiffness: 100 }}
    >
      <motion.div
        className="flex items-center justify-center px-6 py-4 border border-yellow-400/20 rounded-2xl shadow-2xl shadow-yellow-400/10"
        whileHover={{ 
          borderColor: "rgba(148, 147, 142, 0.68)",
          boxShadow: "0 25px 50px -12px rgba(250, 204, 21, 0.25)"
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-3 py-2 rounded-lg font-medium transition-all text-xs ${
                activeSection === item.id
                  ? "text-yellow-400 bg-yellow-400/10"
                  : "text-white hover:text-yellow-400 hover:bg-white/5"
              } ${item.highlight ? "bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/30" : ""}`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ damping: 20, stiffness: 300 }}
                />
              )}
              {item.highlight && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative p-2 rounded-xl bg-yellow-400/10 border border-yellow-400/30"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(250, 204, 21, 0.2)" }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-yellow-400" />
            ) : (
              <Menu className="h-6 w-6 text-yellow-400" />
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, damping: 25, stiffness: 300 }}
            className="md:hidden mt-3 bg-gradient-to-b from-black/90 to-black/95 backdrop-blur-2xl border border-yellow-400/20 rounded-2xl p-6 shadow-2xl shadow-yellow-400/20"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, damping: 20, stiffness: 100 }}
                  whileHover={{ x: 5, backgroundColor: "rgba(250, 204, 21, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-4 py-3 rounded-xl font-medium text-left transition-all ${
                    activeSection === item.id
                      ? "text-yellow-400 bg-yellow-400/10 border border-yellow-400/30"
                      : "text-white hover:text-yellow-400 hover:bg-white/5"
                  } ${item.highlight ? "bg-gradient-to-r from-yellow-400/15 to-yellow-500/15 border border-yellow-400/30" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    {item.highlight && <Sparkles className="h-4 w-4 text-yellow-400" />}
                    {item.label}
                  </div>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSectionMobile"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-l-xl"
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Navbar;
