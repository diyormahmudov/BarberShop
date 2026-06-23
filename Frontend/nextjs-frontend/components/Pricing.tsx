"use client";

import { motion } from "framer-motion";
import { Scissors, Sparkles, Crown, ArrowRight, Star } from "lucide-react";

function Pricing() {
  const categories = [
    {
      title: "Стрижки",
      icon: Scissors,
      services: [
        ["Мужская стрижка", 700],
        ["Студенческая стрижка", 600],
        ["Стрижка ножницами", 800],
        ["Детская стрижка", 500],
        ["Стрижка машинкой", 400],
        ["Налысо", 200],
      ],
    },
    {
      title: "Борода и голова",
      icon: Sparkles,
      services: [
        ["Моделирование бороды", 500],
        ["Тонирование бороды", 400],
        ["Бритьё головы", 400],
        ["Тонирование головы", 500],
      ],
    },
    {
      title: "Уход за лицом",
      icon: Sparkles,
      services: [
        ["Чёрная маска + скраб", 500],
        ["Глиняная маска", 200],
        ["Воск (3 зоны)", 150],
      ],
    },
    {
      title: "Дополнительные услуги",
      icon: Crown,
      services: [["Укладка с мытьём головы", 300]],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
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

  const serviceItemVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
    },
    visible: (i: number) => ({
      opacity: 1, 
      x: 0,
      transition: {
        delay: i * 0.05,
        damping: 15,
        stiffness: 80,
      },
    }),
  };

  return (
    <section className="w-full bg-gradient-to-b from-black via-zinc-950 to-black py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header with premium animation */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            damping: 25,
            stiffness: 100,
          }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              damping: 15, 
              stiffness: 200,
              delay: 0.3 
            }}
            className="inline-block mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: i * 0.1,
                    damping: 15,
                    stiffness: 200,
                  }}
                >
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="text-white">ПРАЙС-</span>
            <motion.span 
              className="text-yellow-400 inline-block"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(250, 204, 21, 0.5)",
                  "0 0 40px rgba(250, 204, 21, 0.8)",
                  "0 0 20px rgba(250, 204, 21, 0.5)",
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ЛИСТ
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-zinc-400 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Качество • Стиль • Характер
          </motion.p>
        </motion.div>

        {/* Categories Grid with staggered animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {categories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                  transition: {
                    damping: 20,
                    stiffness: 300,
                  }
                }}
                className="group relative overflow-hidden rounded-2xl border border-yellow-400/20 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-8 backdrop-blur-xl transition-all duration-500 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20"
              >
                {/* Animated gradient background */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  whileHover={{ translateX: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                
                <div className="relative z-10">
                  {/* Category Header with icon animation */}
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    whileHover={{ gap: 4 }}
                    transition={{ stiffness: 300, damping: 20 }}
                  >
                    <motion.div 
                      className="rounded-xl bg-yellow-400/10 p-3"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                        backgroundColor: "rgba(250, 204, 21, 0.2)"
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="h-6 w-6 text-yellow-400" />
                    </motion.div>
                    <motion.h3 
                      className="text-2xl font-bold text-white"
                      whileHover={{ x: 5 }}
                      transition={{ stiffness: 300 }}
                    >
                      {category.title}
                    </motion.h3>
                  </motion.div>

                  {/* Services List with staggered animations */}
                  <div className="space-y-3">
                    {category.services.map(([name, price], serviceIndex) => (
                      <motion.div
                        key={name}
                        variants={serviceItemVariants}
                        custom={serviceIndex}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ 
                          x: 10,
                          backgroundColor: "rgba(250, 204, 21, 0.05)",
                          paddingLeft: "1rem"
                        }}
                        className="flex justify-between items-center border-b border-zinc-800 pb-3 last:border-0 rounded-lg transition-all duration-300 cursor-default"
                      >
                        <motion.span 
                          className="text-zinc-300 group-hover:text-white transition-colors"
                          whileHover={{ color: "#facc15" }}
                        >
                          {name}
                        </motion.span>
                        <motion.span 
                          className="text-xl font-bold text-yellow-400"
                          whileHover={{ scale: 1.1 }}
                          transition={{ stiffness: 400 }}
                        >
                          {price} сом
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Complex Services & CTA with premium animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-8"
        >
          {/* Complex Services */}
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              y: -12,
              scale: 1.02,
              transition: {
                damping: 20,
                stiffness: 300,
              }
            }}
            className="group relative overflow-hidden rounded-2xl border-2 border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-zinc-900/80 p-8 backdrop-blur-xl transition-all duration-500 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-400/30"
          >
            {/* Animated border glow */}
            <motion.div 
              className="absolute inset-0 rounded-2xl border-2 border-yellow-400/0"
              whileHover={{ 
                borderColor: "rgba(250, 204, 21, 0.3)",
                boxShadow: "0 0 30px rgba(250, 204, 21, 0.2)"
              }}
              transition={{ duration: 0.5 }}
            />
            
            <div className="relative z-10">
              <motion.div 
                className="flex items-center gap-3 mb-6"
                whileHover={{ gap: 4 }}
                transition={{ stiffness: 300 }}
              >
                <motion.div 
                  className="rounded-xl bg-yellow-400/20 p-3"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Crown className="h-6 w-6 text-yellow-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">
                  Комплексные услуги
                </h3>
              </motion.div>

              <div className="space-y-4">
                {[
                  { name: "Отец + сын", price: "1100 сом" },
                  { name: "Друг + друг", price: "1300 сом" },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ 
                      x: 10,
                      backgroundColor: "rgba(250, 204, 21, 0.1)",
                      paddingLeft: "1rem"
                    }}
                    className="flex justify-between items-center border-b border-yellow-400/20 pb-3 rounded-lg transition-all duration-300 cursor-default"
                  >
                    <span className="text-zinc-300 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                    <motion.span 
                      className="text-2xl font-bold text-yellow-400"
                      whileHover={{ scale: 1.1 }}
                      transition={{ stiffness: 400 }}
                    >
                      {item.price}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Button with premium animation */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center"
          >
            <motion.button
              onClick={() =>
                document
                  .getElementById("booking")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(250, 204, 21, 0.3)",
                  "0 0 40px rgba(250, 204, 21, 0.5)",
                  "0 0 20px rgba(250, 204, 21, 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-12 py-6 font-bold text-black shadow-2xl shadow-yellow-400/30 transition-all hover:shadow-3xl hover:shadow-yellow-400/50"
            >
              <motion.span 
                className="relative z-10 flex items-center gap-3 text-xl"
                whileHover={{ gap: 5 }}
                transition={{ stiffness: 300 }}
              >
                Записаться
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {/* Ripple effect */}
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0, opacity: 0.5 }}
                whileHover={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Pricing;