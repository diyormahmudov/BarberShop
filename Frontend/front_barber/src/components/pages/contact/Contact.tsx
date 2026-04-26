// components/Contact.tsx
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

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
  const [reviews, setReviews] = useState<ReviewType[]>(() => {
    const savedReviews = localStorage.getItem("barber_reviews");
    if (savedReviews) {
      return JSON.parse(savedReviews) as ReviewType[];
    }
    return [];
  });

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

  return (
    <section className="relative min-h-screen w-full px-4 py-14 text-white sm:px-6 md:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(56,189,248,0.16),transparent_58%)]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <h1 className="mb-5 text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Контакты
        </h1>

        <p className="mb-8 max-w-2xl text-center text-base text-slate-300 sm:text-lg md:mb-10">
          Свяжитесь с нами для записи или получения дополнительной информации о наших услугах.
        </p>

        <div className="grid w-full grid-cols-1 gap-4 text-center sm:gap-6 md:grid-cols-3 md:gap-7">
          <div className="flex h-full flex-col items-center rounded-2xl border border-slate-700/70 bg-slate-900/55 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:bg-slate-900/70">
            <FaMapMarkerAlt className="mb-4 text-3xl text-indigo-300 sm:text-4xl" />
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Адрес</h3>
            <p className="text-sm text-slate-300 sm:text-base">г. Ош, район Араван</p>
          </div>

          <div className="flex h-full flex-col items-center rounded-2xl border border-slate-700/70 bg-slate-900/55 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:bg-slate-900/70">
            <FaPhoneAlt className="mb-4 text-3xl text-indigo-300 sm:text-4xl" />
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Телефон</h3>
            <p className="text-sm text-slate-300 sm:text-base">+7 911 604 38 67</p>
          </div>

          <div className="flex h-full flex-col items-center rounded-2xl border border-slate-700/70 bg-slate-900/55 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:bg-slate-900/70">
            <FaEnvelope className="mb-4 text-3xl text-indigo-300 sm:text-4xl" />
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Email</h3>
            <p className="text-sm text-slate-300 sm:text-base">info@barberbooking.com</p>
          </div>
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          <form
            onSubmit={handleSubmitReview}
            className="rounded-2xl border border-slate-700/70 bg-slate-900/55 p-5 backdrop-blur-md sm:p-6"
          >
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Оставить отзыв</h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше имя"
              className="mb-3 w-full rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400 focus:border-sky-400 sm:text-base"
              required
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ваш отзыв"
              rows={4}
              className="mb-3 w-full resize-none rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400 focus:border-sky-400 sm:text-base"
              required
            />

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mb-4 w-full rounded-lg border border-slate-600 bg-slate-800/70 px-3 py-2 text-sm text-white outline-none focus:border-sky-400 sm:text-base"
            >
              <option value={5}>5 - Отлично</option>
              <option value={4}>4 - Хорошо</option>
              <option value={3}>3 - Нормально</option>
              <option value={2}>2 - Слабо</option>
              <option value={1}>1 - Плохо</option>
            </select>

            <button
              type="submit"
              className="w-full rounded-lg bg-sky-500 py-2.5 font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Отправить отзыв
            </button>
          </form>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/55 p-5 backdrop-blur-md sm:p-6">
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Отзывы клиентов</h2>

            <div className="space-y-3">
              {reviews.length === 0 ? (
                <p className="text-sm text-slate-300 sm:text-base">Пока нет отзывов.</p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-slate-700/60 bg-slate-800/60 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-yellow-300">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-slate-300 sm:text-base">{review.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-center text-xs text-slate-400 sm:mt-10 sm:text-sm">
          © 2026 Запись в барбершоп. Все права защищены.
        </p>
      </div>
    </section>
  );
}

export default Contact;