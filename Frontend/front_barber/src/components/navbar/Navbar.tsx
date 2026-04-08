import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/imgs/ChatGPT Image 23 февр. 2026 г., 03_58_03.png";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (sectionId: string) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className="flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">


        <div className="hidden md:flex gap-6 text-white">
          <button onClick={() => handleScroll("home")} className="hover:text-yellow-400">Home</button>
          <button onClick={() => handleScroll("pricing")} className="hover:text-yellow-400">Pricing</button>
          <button onClick={() => handleScroll("gallery")} className="hover:text-yellow-400">Gallery</button>
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <button onClick={() => handleScroll("booking")} className="hover:text-yellow-400">Booking</button>
          <button onClick={() => handleScroll("about")} className="hover:text-yellow-400">About</button>
          <button onClick={() => handleScroll("contact")} className="hover:text-yellow-400">Contact</button>
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 text-white text-center">
          <button onClick={() => handleScroll("home")} className="hover:text-yellow-400">Home</button>
          <button onClick={() => handleScroll("pricing")} className="hover:text-yellow-400">Pricing</button>
          <button onClick={() => handleScroll("gallery")} className="hover:text-yellow-400">Gallery</button>
          <button onClick={() => handleScroll("booking")} className="hover:text-yellow-400">Booking</button>
          <button onClick={() => handleScroll("about")} className="hover:text-yellow-400">About</button>
          <button onClick={() => handleScroll("contact")} className="hover:text-yellow-400">Contact</button>
        </div>
      )}
    </motion.div>
  );
}

export default Navbar;