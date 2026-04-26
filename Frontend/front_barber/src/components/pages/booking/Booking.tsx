import React, { useEffect, useState } from "react";
import axios from "axios";

type BusySlotResponse = {
  time: string;
};

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 9; hour <= 18; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

const BookingForm: React.FC = () => {
  const [barberName, setBarberName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [busySlots, setBusySlots] = useState<string[]>([]);

  const timeSlots = generateTimeSlots();
  const fieldClassName =
    "w-full rounded-xl border border-slate-600 bg-slate-800/80 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 sm:text-base";

  useEffect(() => {
    if (!barberName || !date) return;

    const fetchBusySlots = async () => {
      try {
        const res = await axios.get(
          `https://barbershoparavan.ru/bot-form/busy?barber=${barberName}&date=${date}`
        );

        const busyTimes = res.data.map((item: BusySlotResponse) => {
          const d = new Date(item.time);
          // UTC saatini olish - timezone muammosini hal qiladi
          const hours = d.getUTCHours().toString().padStart(2, "0");
          const minutes = d.getUTCMinutes().toString().padStart(2, "0");
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
      service,
      time: `${date}T${selectedTime}:00`, 
    };

    try {
      await axios.post("https://barbershoparavan.ru/bot-form", payload);
      alert("Booking created successfully ✅");
      setSelectedTime("");
      setUserName("");
      setPhoneNumber("");
      setBarberName("");
      setService("");
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
    <section className="relative min-h-screen w-full px-4 py-14 text-white sm:px-6 md:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.2),transparent_58%)]" />

      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-700/70 bg-slate-900/50 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-md sm:p-7 lg:p-9">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Запись к барберу
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Выберите мастера, услугу и время - мы сохраним вашу бронь за несколько секунд.
          </p>
        </div>

        <div className="mb-6 grid gap-3 rounded-2xl border border-slate-700/70 bg-slate-950/45 p-4 text-sm sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:text-base">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2 text-slate-200">
            Барбер: <span className="font-semibold text-white">{barberName || "Не выбран"}</span>
          </div>
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2 text-slate-200">
            Телефон: <span className="font-semibold text-white">{phoneNumber || "Не указан"}</span>
          </div>
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2 text-slate-200">
            Услуга: <span className="font-semibold text-white">{service || "Не выбрана"}</span>
          </div>
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2 text-slate-200">
            Время: <span className="font-semibold text-sky-300">{selectedTime || "Не выбрано"}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <input
              type="text"
              placeholder="Ваше имя"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={fieldClassName}
              required
            />

            <input
              type="tel"
              placeholder="Ваш номер телефона"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={fieldClassName}
              required
            />

            <select
              value={barberName}
              onChange={(e) => setBarberName(e.target.value)}
              className={fieldClassName}
              required
            >
              <option value="">Выберите барбера</option>
              <option value="Ahror">Ahror</option>
            </select>

            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={fieldClassName}
              required
            >
              <option value="">Выбрать услугу</option>
              <option value="Стрижка">Стрижка</option>
              <option value="Оформление бороды">Оформление бороды</option>
              <option value="Стрижка + борода">Стрижка + борода</option>
              <option value="Стрижка детская">Стрижка детская</option>
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={fieldClassName}
              required
            />
          </div>

          <div className="mt-6 rounded-2xl border border-slate-700/70 bg-slate-950/45 p-4 sm:p-5">
            <p className="mb-3 text-sm font-medium text-slate-200 sm:text-base">
              Выберите удобное время
            </p>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
              {timeSlots.map((slot) => {
                const isBusy = busySlots.includes(slot);

                return (
                  <button
                    type="button"
                    key={slot}
                    disabled={isBusy}
                    onClick={() => setSelectedTime(slot)}
                    className={`rounded-lg border px-2 py-2 text-xs font-medium transition sm:text-sm
                      ${
                        isBusy
                          ? "cursor-not-allowed border-slate-700 bg-slate-700/50 text-slate-400"
                          : selectedTime === slot
                            ? "border-sky-400 bg-sky-500/20 text-sky-200 shadow-[0_0_0_1px_rgba(56,189,248,0.25)]"
                            : "border-slate-600 bg-slate-800/80 text-white hover:border-slate-500 hover:bg-slate-700/80"
                      }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-sm text-slate-300">
              Занятые слоты автоматически отключаются после выбора барбера и даты.
            </p>
          </div>

          <button
            type="submit"
            disabled={!selectedTime}
            className="mt-6 w-full rounded-xl bg-sky-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300 sm:text-base"
          >
            Подтвердить запись
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;