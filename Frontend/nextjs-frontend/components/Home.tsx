"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Pricing from "./Pricing";
import Gallery from "./Gallery";
import Booking from "./Booking";
import About from "./About";
import Contact from "./Contact";
import { ArrowRight, Star, Award, Scissors, Sparkles, ChevronDown } from "lucide-react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBookingClick = () => {
    document.getElementById("booking")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* HERO */}
      <section id="home">
        <header className="relative h-screen overflow-hidden">
          {/* Background with parallax effect */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: "easeOut" }}
          >
            <img
              src="/imgs/barbershop-hero.png"
              alt="Barbershop"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Animated gradient overlays */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/15 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />

          {/* Decorative particles */}
          {isMounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + "%", 
                    y: Math.random() * 100 + "%",
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -100]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2, 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <motion.div 
              className="max-w-4xl px-8 md:px-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Premium Badge
              <motion.div
                variants={itemVariants}
                className="mb-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/30 px-6 py-3 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ damping: 20, stiffness: 300 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                </motion.div>
                <p className="text-lg uppercase tracking-[8px] text-yellow-400 font-semibold">
                  Премиальный барбершоп
                </p>
              </motion.div> */}

              {/* Main Title with premium styling */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold md:text-4xl lg:text-5xl mb-2 tracking-tight"
              >
                <motion.span
                  className="inline-block bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  BURAN
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                variants={itemVariants}
                className="text-4xl font-light text-yellow-400 md:text-3xl mb-8 tracking-widest"
              >
                BARBERSHOP
              </motion.h2>

              {/* Description with premium styling */}
              <motion.p
                variants={itemVariants}
                className="max-w-2xl text-sm text-zinc-300 leading-relaxed font-light"
              >
                Место, где стиль, характер и качество становятся одним целым.
                <span className="block mt-2 text-yellow-400/80">Превосходство в каждой детали.</span>
              </motion.p>

              {/* Premium Buttons */}
              <motion.div
                variants={itemVariants}
                className="mt-12 flex flex-wrap gap-5"
              >
                <motion.button
                  onClick={handleBookingClick}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(250, 204, 21, 0.4)",
                      "0 0 50px rgba(250, 204, 21, 0.6)",
                      "0 0 30px rgba(250, 204, 21, 0.4)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-6 py-3 font-bold text-black text-sm shadow-2xl shadow-yellow-400/40 transition-all hover:shadow-3xl hover:shadow-yellow-400/60"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Записаться онлайн
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-3 w-3" />
                    </motion.div>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-yellow-400/40 px-6 py-3 text-yellow-400 text-sm font-semibold transition-all hover:bg-yellow-400/10 hover:border-yellow-400/60 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-3">
                    Наши услуги
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.a>
              </motion.div>

              {/* Premium Stats */}
              <motion.div
                variants={itemVariants}
                className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
              >
                {[
                  { value: "3+", label: "Лет опыта", icon: Award, color: "from-yellow-400 to-yellow-500" },
                  { value: "5.0★", label: "Рейтинг", icon: Star, color: "from-yellow-400 to-yellow-500" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.15, damping: 20, stiffness: 100 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-yellow-400/30"
                  >
                    <motion.div
                      className={`rounded-xl bg-gradient-to-br ${stat.color} p-3 shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className="h-6 w-6 text-black" />
                    </motion.div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                      <p className="text-zinc-400 text-sm mt-1">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Premium Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="rounded-2xl bg-gradient-to-br from-yellow-400/10 to-yellow-500/10 border border-yellow-400/30 p-4 backdrop-blur-sm"
              whileHover={{ scale: 1.15 }}
              transition={{ damping: 20, stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <ChevronDown className="h-7 w-7 text-yellow-400" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </header>
      </section>

      {/* GALLERY */}
      <motion.section
        id="gallery"
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, damping: 25, stiffness: 100 }}
      >
        <Gallery />
      </motion.section>

      {/* PRICING */}
      <motion.section
        id="pricing"
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, damping: 25, stiffness: 100 }}
      >
        <Pricing />
      </motion.section>

      {/* BOOKING */}
      <motion.section
        id="booking"
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, damping: 25, stiffness: 100 }}
      >
        <Booking />
      </motion.section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, damping: 25, stiffness: 100 }}
      >
        <About />
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, damping: 25, stiffness: 100 }}
      >
        <Contact />
      </motion.section>
    </main>
  );
}