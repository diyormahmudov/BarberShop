import img from "../../../assets/imgs/barbershop_1200x.webp";
import { motion } from "framer-motion";
import Pricing from "../pricing/Pricing";
import Gallery from "../gallery/Gallery";
import Booking from "../booking/Booking";
import About from "../about/About";
import Contact from "../contact/Contact";

function Home() {
  const handleBookingClick = (): void => {
    document.getElementById("booking")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main>
      <section id="home">
        <header>
          <motion.div
            className="relative flex-wrap flex flex-col items-center justify-center h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative">
              <img
                src={img}
                alt="Barbershop"
                className="w-820 h-240 rounded-xl shadow-lg brightness-90"
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
            </div>
              <h1 className="absolute top-auto left-auto right-auto
              italic text-9xl 
              
              font-bold text-white 
              whitespace-nowrap overflow-hidden 
              animate-typing animate-blink">
                SCHEGOL
              </h1>

            <button
              onClick={handleBookingClick}
              className="mb-40 absolute bottom-5 left-1/2 -translate-x-1/2 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition"
            >
              Записаться на стрижку
            </button>
          </motion.div>
        </header>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="min-h-screen flex items-center justify-center">
        <Pricing />
      </section>

      {/* GALLERY */}

      <section id="gallery" className="min-h-screen flex items-center justify-center">
        <Gallery />
      </section>

      {/* BOOKING */}
      <section id="booking" className="min-h-screen flex items-center justify-center">
        <Booking />
      </section>

      {/* ABOUT */}
      <section id="about" className="min-h-screen flex items-center justify-center">
        <About />
      </section>

      {/* CONTACT */}
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <Contact />
      </section>
    </main>
  );
}

export default Home;