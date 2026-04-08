import type { PricingType } from "../../types/pricingType/Pricing";
import { motion } from "framer-motion";

interface PricingProps {
  pricingData: PricingType[];
}

export const PricingItem = ({ pricingData }: PricingProps) => {
  const handleOpenBooking = () => {
    window.location.href = "/booking";
  };

  return (
    <main className="w-full px-4 py-8 sm:px-6 md:px-8 lg:px-10">
      <motion.section
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.25,
            },
          },
        }}
      >
        {pricingData.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 60, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-md transition sm:p-6"
          >
            <h2 className="text-center text-lg font-bold text-white sm:text-xl">
              {item.name}
            </h2>

            <motion.img
              src={item.img}
              alt={item.name}
              className="mt-1 h-44 w-full max-w-[220px] rounded-xl object-cover sm:h-48 sm:max-w-[240px]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />

            <p className="mt-3 min-h-[72px] text-center text-sm leading-6 text-gray-300 sm:text-base">
              {item.description}
            </p>

            <p className="mt-2 text-base font-semibold text-yellow-400 sm:text-lg">
              Цена: {item.price} руб.
            </p>

            <motion.button
              onClick={handleOpenBooking}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300 sm:text-base"
            >
              {item.buttonText}
            </motion.button>
          </motion.div>
        ))}
      </motion.section>
    </main>
  );
};