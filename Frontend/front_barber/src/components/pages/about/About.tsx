// pages/About.tsx

import { FaCut, FaClock, FaUser } from "react-icons/fa";
function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 px-4 py-10 text-white sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <h1 className="mb-5 text-center text-3xl font-extrabold drop-shadow-lg sm:text-4xl lg:text-5xl">
          О нашем барбершопе
        </h1>

        <p className="mb-8 max-w-3xl text-center text-base leading-relaxed text-slate-100 drop-shadow-sm sm:text-lg md:mb-10 md:text-xl">
          Добро пожаловать в наше приложение для бронирования барбершопа! Мы делаем процесс записи
          к вашему любимому барберу быстрым и удобным. Выберите мастера, выберите удобное время и
          наслаждайтесь вашим стилем.
        </p>

        <div className="grid w-full grid-cols-1 gap-4 text-center sm:gap-6 md:grid-cols-3 md:gap-7">
          <div className="flex h-full flex-col items-center rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
            <FaCut className="mb-4 text-3xl text-indigo-300 sm:text-4xl" />
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Стрижки</h3>
            <p className="text-sm text-gray-300 sm:text-base">
              Профессиональные стрижки и оформление бороды для вашего уникального стиля.
            </p>
          </div>

          <div className="flex h-full flex-col items-center rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
            <FaClock className="mb-4 text-3xl text-indigo-300 sm:text-4xl" />
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Удобное время</h3>
            <p className="text-sm text-gray-300 sm:text-base">
              Выберите удобное время для записи и будьте уверены, что ваш слот свободен.
            </p>
          </div>

          <div className="flex h-full flex-col items-center rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
            <FaUser className="mb-4 text-3xl text-indigo-300 sm:text-4xl" />
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Лучшие мастера</h3>
            <p className="text-sm text-gray-300 sm:text-base">
              Наши барберы — профессионалы с опытом работы и вниманием к деталям.
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-center text-xs text-gray-400 sm:mt-10 sm:text-sm">
          © 2026 Запись в барбершоп. Все права защищены.
        </p>
      </div>
    </section>
  );
}

export default About;