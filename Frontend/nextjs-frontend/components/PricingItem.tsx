"use client";

import type { PricingType } from "../types/PricingType";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Scissors, Clock, Star, Check, Shield, Award, Zap } from "lucide-react";

interface PricingProps {
  pricingData: PricingType[];
}

export const PricingItem = ({ pricingData }: PricingProps) => {
  const router = useRouter();

  const handleOpenBooking = () => {
    router.push("/#booking");
  };

  return (
    <main className="w-full px-4 py-20 sm:px-6 md:px-8 lg:px-10">
      {/* Premium Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-16 max-w-4xl text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 px-6 py-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-yellow-400">Премиум качество</span>
        </div>
        <h2 className="mb-6 text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
          Наши <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">Цены</span>
        </h2>
        <p className="text-lg text-gray-300 sm:text-xl max-w-2xl mx-auto">
          Профессиональные услуги от лучших мастеров. Качество, которое заслуживаете.
        </p>
      </motion.div>

      {/* Features Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mb-12 max-w-5xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, text: "Гарантия качества" },
            { icon: Award, text: "Опытные мастера" },
            { icon: Zap, text: "Быстрое обслуживание" },
            { icon: Check, text: "Премиум продукты" },
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
              <feature.icon className="h-4 w-4 text-yellow-400" />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.section
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {pricingData.map((item, index) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 100, scale: 0.85 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ 
              y: -16, 
              scale: 1.02,
              boxShadow: "0 35px 60px -15px rgba(250, 204, 21, 0.3)"
            }}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/15 via-white/5 to-black/30 backdrop-blur-2xl transition-all duration-700 hover:border-yellow-400/60"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Popular badge */}
            {index === 0 && (
              <div className="absolute left-0 top-0 z-20">
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-5 py-2 rounded-br-2xl rounded-tl-2xl shadow-lg shadow-yellow-400/50">
                  <span className="flex items-center gap-2 text-sm font-bold text-black">
                    <Star className="h-4 w-4 fill-black" />
                    Популярный
                  </span>
                </div>
              </div>
            )}

            {/* Image container with premium styling */}
            <div className="relative mx-5 mt-7 h-56 overflow-hidden rounded-2xl sm:h-64 shadow-2xl">
              <motion.img
                src={item.img}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                whileHover={{ scale: 1.1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Floating badge */}
              <div className="absolute bottom-4 right-4 rounded-xl bg-yellow-400/90 backdrop-blur-sm px-4 py-2 shadow-lg">
                <span className="text-sm font-bold text-black">Premium</span>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-1 flex-col p-7">
              <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl tracking-tight">
                {item.name}
              </h3>

              <p className="mb-6 flex-1 text-base leading-relaxed text-gray-300 sm:text-lg">
                {item.description}
              </p>

              {/* Premium Features */}
              <div className="mb-8 space-y-3">
                {[
                  { icon: Clock, text: "30-45 минут" },
                  { icon: Scissors, text: "Премиум инструменты" },
                  { icon: Check, text: "Гарантия результата" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    <div className="rounded-lg bg-yellow-400/10 p-2">
                      <feature.icon className="h-4 w-4 text-yellow-400" />
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Price with premium styling */}
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent sm:text-6xl">
                  {item.price}
                </span>
                <span className="text-xl text-gray-400 font-medium">руб.</span>
              </div>

              {/* Premium Button */}
              <motion.button
                onClick={handleOpenBooking}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-8 py-5 text-lg font-bold text-black shadow-2xl shadow-yellow-400/40 transition-all hover:shadow-3xl hover:shadow-yellow-400/60 sm:text-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {item.buttonText}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mx-auto mt-16 max-w-3xl text-center"
      >
        <div className="rounded-2xl border border-yellow-400/20 bg-gradient-to-r from-yellow-400/5 to-purple-500/5 p-8 backdrop-blur-xl">
          <div className="flex items-center justify-center gap-4 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-lg text-gray-300">
            Более 10,000 довольных клиентов доверяют нам свой стиль
          </p>
        </div>
      </motion.div>
    </main>
  );
};
