"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Phone, Mail, Star, MessageSquare, Send } from "lucide-react";

type ReviewType = {
  id: number;
  name: string;
  message: string;
  rating: number;
};

function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedReviews = localStorage.getItem("barber_reviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews) as ReviewType[]);
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: ReviewType = {
      id: Date.now(),
      name,
      message,
      rating,
    };

    const updatedReviews = [newReview, ...reviews].slice(0, 6);
    setReviews(updatedReviews);
    localStorage.setItem("barber_reviews", JSON.stringify(updatedReviews));

    setName("");
    setMessage("");
    setRating(5);
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        damping: 25,
        stiffness: 100,
      },
    },
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Адрес",
      value: "Орозбекова 2/2",
    },
    {
      icon: Phone,
      label: "Телефон",
      value: "+996 554801024",
    },
    {
      icon: Mail,
      label: "Email",
      value: "sergeyvicha08@gmail.com",
    },
  ];

  return (
    <section className="relative min-h-screen w-full px-4 py-16 text-white sm:px-6 md:px-8 lg:px-10">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />
      
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 200, y: -30 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.8, damping: 25, stiffness: 100 }}
          className="text-center mb-12"
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
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              КОНТАКТЫ
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
          </motion.div>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Свяжитесь с нами для записи или получения дополнительной информации о наших услугах
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full grid-cols-1 gap-6 text-center sm:grid-cols-3"
        >
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="flex h-full flex-col items-center rounded-3xl border border-yellow-400/20 bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 backdrop-blur-xl p-6 shadow-2xl shadow-yellow-400/10 transition-all hover:border-yellow-400/40 hover:shadow-yellow-400/20"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-4"
              >
                <item.icon className="h-8 w-8 text-yellow-400" />
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold">{item.label}</h3>
              <p className="text-zinc-300 text-sm sm:text-base">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 grid w-full grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {/* Review Form */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-yellow-400/20 bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-yellow-400/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="h-6 w-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">Оставить отзыв</h2>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full rounded-2xl border border-yellow-400/20 bg-zinc-800/80 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-400 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 sm:text-base backdrop-blur-sm transition-all"
                  required
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ваш отзыв"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-yellow-400/20 bg-zinc-800/80 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-400 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 sm:text-base backdrop-blur-sm transition-all"
                  required
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full rounded-2xl border border-yellow-400/20 bg-zinc-800/80 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 sm:text-base backdrop-blur-sm transition-all"
                >
                  <option value={5}>5 - Отлично ★★★★★</option>
                  <option value={4}>4 - Хорошо ★★★★☆</option>
                  <option value={3}>3 - Нормально ★★★☆☆</option>
                  <option value={2}>2 - Слабо ★★☆☆☆</option>
                  <option value={1}>1 - Плохо ★☆☆☆☆</option>
                </select>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px -10px rgba(250, 204, 21, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 py-4 text-sm font-bold text-black transition sm:text-base shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Отправить отзыв
              </motion.button>
            </form>
          </motion.div>

          {/* Reviews Display */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-yellow-400/20 bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-yellow-400/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              <h2 className="text-2xl font-bold">Отзывы клиентов</h2>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {!mounted ? (
                <p className="text-zinc-400 text-center py-8">Загрузка отзывов...</p>
              ) : reviews.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-zinc-400 text-center py-8"
                >
                  Пока нет отзывов. Будьте первым!
                </motion.p>
              ) : (
                reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl border border-zinc-700/60 bg-zinc-800/60 p-4 backdrop-blur-sm hover:border-yellow-400/30 transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <p className="font-semibold text-white">{review.name}</p>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-zinc-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm sm:text-base">{review.message}</p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center text-zinc-500 text-sm"
        >
          © 2026 BURAN Barbershop. Все права защищены.
        </motion.p>
      </div>
    </section>
  );
}

export default Contact;
