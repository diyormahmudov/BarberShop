"use client";

import { motion } from "framer-motion";
import { Sparkles, Award, Scissors, Star, Clock } from "lucide-react";

const barbers = [
  {
    id: 1,
    name: "Икбол",
    role: "Главный барбер",
    experience: "3 года",
    image: "/imgs/10132aef-2e19-4589-982b-26ad88bc4e7c.png",
    skills: ["Классические стрижки", "Оформление бороды", "Уход за волосами", "Современные стрижки"],
    rating: "5.0",
    specialties: "Мастер сложных фейдов"
  },
  // {
  //   id: 2,
  //   name: "Максим",
  //   role: "Старший барбер",
  //   experience: "5 лет",
  //   image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
  //   skills: ["Современные стрижки", "Камуфляж седины", "Уход за волосами"],
  //   rating: "4.9",
  //   specialties: "Эксперт по мужским укладкам"
  // },
  // {
  //   id: 3,
  //   name: "Дмитрий",
  //   role: "Барбер",
  //   experience: "3 года",
  //   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
  //   skills: ["Детские стрижки", "Моделирование", "Королевское бритье"],
  //   rating: "4.8",
  //   specialties: "Мастер по детским стрижкам"
  // }
];

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        damping: 25,
        stiffness: 100
      }
    }
  };

  return (
    <section className="relative min-h-screen w-full px-4 py-16 text-white sm:px-6 md:px-8 lg:px-10">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />
      
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 200, y: -30 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ duration: 0.8, damping: 25, stiffness: 100 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ damping: 20, stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
            <h2 className="text-4xl font-bold text-yellow-400">
              НАШИ БАРБЕРЫ
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
          </motion.div>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Профессионалы своего дела с многолетним опытом и страстью к своему ремеслу
          </p>
        </motion.div>

        {/* Barber Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {barbers.map((barber) => (
            <motion.div
              key={barber.id}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group relative"
            >
              <motion.div
                className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 backdrop-blur-xl border border-yellow-400/20 shadow-2xl shadow-yellow-400/10"
                whileHover={{
                  borderColor: "rgba(250, 204, 21, 0.4)",
                  boxShadow: "0 25px 50px -12px rgba(250, 204, 21, 0.25)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={barber.image}
                    alt={barber.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <motion.div
                    className="absolute top-4 right-4 flex items-center gap-1 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-3 py-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm">{barber.rating}</span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.h3
                    className="text-2xl font-bold text-white mb-1"
                    whileHover={{ color: "#facc15" }}
                  >
                    {barber.name}
                  </motion.h3>
                  <p className="text-yellow-400 font-medium mb-3">{barber.role}</p>
                  
                  {/* Experience */}
                  <motion.div
                    className="flex items-center gap-2 mb-4 text-zinc-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">{barber.experience} опыта</span>
                  </motion.div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-zinc-400 text-xs uppercase tracking-wider mb-2">Навыки</p>
                    <div className="flex flex-wrap gap-2">
                      {barber.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-xs text-yellow-400"
                          whileHover={{ 
                            backgroundColor: "rgba(250, 204, 21, 0.2)",
                            scale: 1.05
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Specialty */}
                  <motion.div
                    className="pt-4 border-t border-zinc-700/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-400" />
                      <p className="text-zinc-300 text-sm">{barber.specialties}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: Scissors, label: "Стрижек", value: "5000+" },
            { icon: Star, label: "Отзывов", value: "4.9★" },
            { icon: Award, label: "Наград", value: "12" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              whileHover={{ 
                y: -5,
                borderColor: "rgba(250, 204, 21, 0.3)",
                backgroundColor: "rgba(250, 204, 21, 0.05)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex justify-center mb-3"
              >
                <stat.icon className="h-8 w-8 text-yellow-400" />
              </motion.div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-zinc-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
