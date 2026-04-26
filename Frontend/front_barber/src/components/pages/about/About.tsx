// pages/About.tsx

import { FaCut, FaClock, FaUser } from "react-icons/fa";
function About() {
  return (
    <section className="relative min-h-screen w-full px-4 py-14 text-white sm:px-6 md:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2),transparent_60%)]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <h1 className="mb-5 text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          О нашем барбершопе
        </h1>

        <p className="mb-8 max-w-3xl text-center text-base leading-relaxed text-slate-300 sm:text-lg md:mb-10 md:text-xl">
          Добро пожаловать в наше приложение для бронирования барбершопа! Мы делаем процесс записи
          к вашему любимому барберу быстрым и удобным. Выберите мастера, выберите удобное время и
          наслаждайтесь вашим стилем.
        </p>

        <div className="grid w-full grid-cols-1 gap-4 text-center sm:gap-6 md:grid-cols-3 md:gap-7">
          <div className="flex h-full flex-col items-center rounded-2xl border border-slate-700/70 bg-slate-900/55 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-indigo-400/60 hover:bg-slate-900/70">
            <FaCut className="mb-4 text-3xl text-indigo-300 sm:text-4xl" />
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Стрижки</h3>
            <p className="text-sm text-slate-300 sm:text-base">
              Профессиональные стрижки и оформление бороды для вашего уникального стиля.
            </p>
          </div>

          <div className="flex h-full flex-col items-center rounded-2xl border border-slate-700/70 bg-slate-900/55 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-indigo-400/60 hover:bg-slate-900/70">
            <FaClock className="mb-4 text-3xl text-indigo-300 sm:text-4xl" />
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Удобное время</h3>
            <p className="text-sm text-slate-300 sm:text-base">
              Выберите удобное время для записи и будьте уверены, что ваш слот свободен.
            </p>
          </div>

          <div className="flex h-full flex-col items-center rounded-2xl border border-slate-700/70 bg-slate-900/55 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-indigo-400/60 hover:bg-slate-900/70">
            <FaUser className="mb-4 text-3xl text-indigo-300 sm:text-4xl" />
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Лучшие мастера</h3>
            <p className="text-sm text-slate-300 sm:text-base">
              Наши барберы — профессионалы с опытом работы и вниманием к деталям.
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-center text-xs text-slate-400 sm:mt-10 sm:text-sm">
          © 2026 Запись в барбершоп. Все права защищены.
        </p>
      </div>
    </section>
  );
}

export default About;