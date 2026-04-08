import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [busySlots, setBusySlots] = useState<string[]>([]);

  const timeSlots = generateTimeSlots();
  const fieldClassName =
    "w-full rounded-xl border border-slate-600 bg-slate-700/90 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 sm:text-base";

  useEffect(() => {
    if (!barberName || !date) return;

    const fetchBusySlots = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/bot-form/busy?barber=${barberName}&date=${date}`
        );

        const busyTimes = res.data.map((item: any) => {
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
      service,
      time: `${date}T${selectedTime}:00`, // ✅ UTC ga o'zgartirmasdan yuborish
    };

    try {
      await axios.post("http://localhost:3000/bot-form", payload);
      alert("Booking created successfully ✅");
      setSelectedTime("");
      setUserName("");
      setBarberName("");
      setService("");
      setDate("");
      setBusySlots([]);
    } catch (error: any) {
      alert(error.response?.data?.message || "Error ❌");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-3 py-8 sm:px-6 md:py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-slate-700/80 bg-slate-800/95 p-5 text-white shadow-2xl backdrop-blur-sm sm:max-w-xl sm:p-6 lg:max-w-2xl lg:p-8"
      >
        <h2 className="text-center text-2xl font-bold sm:text-3xl">💈 Запись к барберу</h2>
        <p className="mt-2 text-center text-sm text-slate-300 sm:text-base">
          Выберите удобное время и оформите бронь за пару кликов.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <input
            type="text"
            placeholder="Ваше имя"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={fieldClassName}
            required
          />

          <input
            type="text"
            placeholder="Имя парикмахера"
            value={barberName}
            onChange={(e) => setBarberName(e.target.value)}
            className={fieldClassName}
            required
          />

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

        <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-900/40 p-3 sm:p-4">
          <p className="mb-3 text-sm font-medium text-slate-200 sm:text-base">
            Выберите время
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
                className={`rounded-lg border px-2 py-2 text-xs transition sm:text-sm
                  ${
                    isBusy
                      ? "cursor-not-allowed border-slate-500 bg-slate-500/60 text-slate-200"
                      : selectedTime === slot
                      ? "border-indigo-500 bg-indigo-600 text-white"
                      : "border-slate-600 bg-slate-700 text-white hover:bg-slate-600"
                  }`}
              >
                {slot}
              </button>
            );
          })}
          </div>

          {selectedTime && (
            <p className="mt-3 text-sm text-indigo-300">
              Выбранное время: <span className="font-semibold">{selectedTime}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!selectedTime}
          className="mt-5 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold transition hover:bg-indigo-700 disabled:bg-slate-500 sm:text-base"
        >
          Записаться
        </button>
      </form>
    </div>
  );
};

export default BookingForm;