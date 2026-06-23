"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Sparkles, Clock, Calendar, User, Phone, Scissors, CheckCircle } from "lucide-react";

type BusySlotResponse = {
  time: string;
};

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 10; hour <= 22; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api";

const BookingForm: React.FC = () => {
  const [barberName, setBarberName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const timeSlots = generateTimeSlots();
  const fieldClassName =
    "w-full rounded-2xl border border-yellow-400/20 bg-zinc-800/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-400 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 sm:text-base backdrop-blur-sm";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        damping: 25,
        stiffness: 100
      }
    }
  };

  useEffect(() => {
    if (!barberName || !date) return;

    const fetchBusySlots = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/bot-form/busy?barber=${encodeURIComponent(barberName)}&date=${encodeURIComponent(date)}`
        );

        const busyTimes = res.data.map((item: BusySlotResponse) => {
          const d = new Date(item.time);
          const hours = d.getHours().toString().padStart(2, "0");
          const minutes = d.getMinutes().toString().padStart(2, "0");
          return `${hours}:${minutes}`;
        });

        setBusySlots(busyTimes);

        if (busyTimes.includes(selectedTime)) {
          setSelectedTime("");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBusySlots();
  }, [barberName, date, selectedTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      barberName,
      clientName: userName,
      phoneNumber,
      service: services.join(", "),
      time: new Date(`${date}T${selectedTime}:00`).toISOString(),
    };

    try {
      await axios.post(`${API_BASE_URL}/bot-form`, payload);
      setShowSuccessModal(true);
      setSelectedTime("");
      setUserName("");
      setPhoneNumber("");
      setBarberName("");
      setServices([]);
      setDate("");
      setBusySlots([]);
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      alert(message || "Error ❌");
    }
  };

  return (
    <section className="relative min-h-screen w-full px-4 py-16 text-white sm:px-6 md:px-8 lg:px-10">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />
      
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 10, y: -30 }}
          animate={{ opacity: 200, y: 10 }}
          transition={{ duration: 0.8, damping: 25, stiffness: 100 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            <h2 className="text-4xl font-bold text-yellow-400">
              ЗАПИСЬ
            </h2>
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </div>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Выберите мастера, услугу и удобное время для вашей записи
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-2">
            <Clock className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Режим работы: 10:00 - 23:00</span>
          </div>
        </motion.div>

        {/* Main Form Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="rounded-3xl border border-yellow-400/20 bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 backdrop-blur-xl shadow-2xl shadow-yellow-400/10 p-6 sm:p-8 lg:p-10"
        >
          {/* Summary Cards */}
          <motion.div
            variants={itemVariants}
            className="mb-8 grid gap-4 rounded-2xl border border-yellow-400/10 bg-zinc-900/50 p-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: User, label: "Барбер", value: barberName || "Не выбран" },
              { icon: Phone, label: "Телефон", value: phoneNumber || "Не указан" },
              { icon: Scissors, label: "Услуги", value: services.length > 0 ? `${services.length} услуг` : "Не выбраны" },
              { icon: Clock, label: "Время", value: selectedTime || "Не выбрано", highlight: true }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="rounded-xl border border-zinc-700/60 bg-zinc-800/60 px-4 py-3"
                whileHover={{ scale: 1.02, borderColor: "rgba(250, 204, 21, 0.3)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className={`h-4 w-4 ${item.highlight ? 'text-yellow-400' : 'text-zinc-400'}`} />
                  <span className="text-zinc-400 text-xs uppercase tracking-wider">{item.label}</span>
                </div>
                <p className={`font-semibold ${item.highlight ? 'text-yellow-400' : 'text-white'}`}>{item.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className={fieldClassName}
                  required
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <input
                  type="tel"
                  placeholder="Ваш номер телефона"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={fieldClassName}
                  required
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <select
                  value={barberName}
                  onChange={(e) => setBarberName(e.target.value)}
                  className={fieldClassName}
                  required
                >
                  <option value="">Выберите барбера</option>
                  <option value="Ikbol">Ikbol</option>
                </select>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="sm:col-span-2">
                <div className="rounded-2xl border border-yellow-400/20 bg-zinc-800/80 p-4 backdrop-blur-sm">
                  <label className="mb-3 block text-sm font-medium text-zinc-400">Выберите услуги</label>
                  <div className="space-y-3">
                    {[
                      { label: "Стрижки", options: ["Мужская стрижка", "Студенческая стрижка", "Стрижка ножницами", "Детская стрижка", "Стрижка машинкой", "Налысо"] },
                      { label: "Борода и голова", options: ["Моделирование бороды", "Тонирование бороды", "Бритьё головы", "Тонирование головы"] },
                      { label: "Уход за лицом", options: ["Чёрная маска + скраб", "Глиняная маска", "Воск (3 зоны)"] },
                      { label: "Дополнительные услуги", options: ["Укладка с мытьём головы"] }
                    ].map((category, catIndex) => (
                      <div key={catIndex}>
                        <p className="mb-2 text-xs font-semibold text-yellow-400 uppercase tracking-wider">{category.label}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {category.options.map((option) => (
                            <label
                              key={option}
                              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                                services.includes(option)
                                  ? "border-yellow-400 bg-yellow-400/20 text-yellow-400"
                                  : "border-zinc-600/50 bg-zinc-700/30 text-zinc-300 hover:border-yellow-400/30 hover:bg-yellow-400/5"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={services.includes(option)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setServices([...services, option]);
                                  } else {
                                    setServices(services.filter((s) => s !== option));
                                  }
                                }}
                                className="hidden"
                              />
                              <span className="flex-1">{option}</span>
                              {services.includes(option) && <CheckCircle className="h-4 w-4" />}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="sm:col-span-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={fieldClassName}
                  required
                />
              </motion.div>
            </div>

            {/* Time Slots */}
            <motion.div
              variants={itemVariants}
              className="mt-8 rounded-2xl border border-yellow-400/10 bg-zinc-900/50 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-yellow-400" />
                <p className="text-sm font-medium text-zinc-200 sm:text-base">
                  Выберите удобное время
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {timeSlots.map((slot) => {
                  const isBusy = busySlots.includes(slot);

                  return (
                    <motion.button
                      type="button"
                      key={slot}
                      disabled={isBusy}
                      onClick={() => setSelectedTime(slot)}
                      whileHover={!isBusy ? { scale: 1.05 } : {}}
                      whileTap={!isBusy ? { scale: 0.95 } : {}}
                      className={`rounded-xl border px-3 py-3 text-xs font-medium transition sm:text-sm backdrop-blur-sm
                        ${
                          isBusy
                            ? "cursor-not-allowed border-zinc-700/50 bg-zinc-800/30 text-zinc-500"
                            : selectedTime === slot
                              ? "border-yellow-400 bg-yellow-400/20 text-yellow-400 shadow-lg shadow-yellow-400/20"
                              : "border-zinc-600/50 bg-zinc-800/50 text-white hover:border-yellow-400/30 hover:bg-yellow-400/10"
                        }`}
                    >
                      {slot}
                    </motion.button>
                  );
                })}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-sm text-zinc-400 flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4 text-yellow-400" />
                Занятые слоты автоматически отключаются после выбора барбера и даты
              </motion.p>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={!selectedTime}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 40px -10px rgba(250, 204, 21, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 py-4 text-sm font-bold text-black transition disabled:cursor-not-allowed disabled:from-zinc-600 disabled:to-zinc-600 disabled:text-zinc-300 sm:text-base shadow-lg shadow-yellow-400/20"
            >
              Подтвердить запись
            </motion.button>
          </motion.form>
        </motion.div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowSuccessModal(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.5
            }}
            className="relative rounded-3xl border border-yellow-400/30 bg-gradient-to-b from-zinc-800 to-zinc-900 p-8 shadow-2xl shadow-yellow-400/20"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 200 }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-400/30"
            >
              <CheckCircle className="h-12 w-12 text-black" />
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 text-center text-2xl font-bold text-white"
            >
              Запись успешно создана
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-center text-zinc-400"
            >
              Мы ждем вас в назначенное время!
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSuccessModal(false)}
              className="w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 py-3 font-bold text-black shadow-lg shadow-yellow-400/20 transition hover:shadow-yellow-400/30"
            >
              Отлично!
            </motion.button>

            {/* Confetti particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  x: Math.cos(i * 60 * Math.PI / 180) * 100,
                  y: Math.sin(i * 60 * Math.PI / 180) * 100,
                  scale: [0, 1, 0],
                  rotate: [0, 360, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{
                  delay: 0.3 + i * 0.05,
                  duration: 1.5,
                  ease: "easeOut"
                }}
                className="absolute top-1/2 left-1/2 h-3 w-3 rounded-full"
                style={{
                  backgroundColor: i % 2 === 0 ? '#facc15' : '#fbbf24'
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default BookingForm;
