"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface GalleryItemProps {
  galleryData: {
    id: number;
    img: string;
  }[];
}

function GalleryItem(props: GalleryItemProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % props.galleryData.length);
  };

  const slideToPrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + props.galleryData.length) % props.galleryData.length,
    );
  };

  const slideTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  useEffect(() => {
    if (!props.galleryData.length) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % props.galleryData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [props.galleryData.length]);

  if (!props.galleryData.length) {
    return null;
  }

  return (
    <div className="w-full px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, damping: 25, stiffness: 100 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ damping: 20, stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              ГАЛЕРЕЯ
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
          </motion.div>
          <p className="text-zinc-400 text-lg">Наши лучшие работы</p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, damping: 25, stiffness: 100 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-2xl shadow-yellow-400/10 border border-yellow-400/20">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    slideToNext();
                  } else if (swipe > swipeConfidenceThreshold) {
                    slideToPrev();
                  }
                }}
                className="relative w-full"
              >
                <img
                  src={props.galleryData[currentIndex].img}
                  alt={`Gallery item ${currentIndex + 1}`}
                  className="h-[400px] w-full object-cover sm:h-[500px] md:h-[600px] lg:h-[700px]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              type="button"
              onClick={slideToPrev}
              whileHover={{ scale: 1.15, backgroundColor: "rgba(250, 204, 21, 0.3)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 backdrop-blur-sm p-4 text-white border border-yellow-400/30 shadow-lg shadow-yellow-400/20 transition-all sm:left-6"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-yellow-400" />
            </motion.button>

            <motion.button
              type="button"
              onClick={slideToNext}
              whileHover={{ scale: 1.15, backgroundColor: "rgba(250, 204, 21, 0.3)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 backdrop-blur-sm p-4 text-white border border-yellow-400/30 shadow-lg shadow-yellow-400/20 transition-all sm:right-6"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-yellow-400" />
            </motion.button>
          </div>

          {/* Dot Indicators */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {props.galleryData.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => slideTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-12 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-400/50"
                    : "w-3 bg-zinc-600 hover:bg-zinc-500"
                }`}
                animate={{
                  scale: currentIndex === index ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  repeat: currentIndex === index ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Image Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-zinc-400 text-sm">
              <span className="text-yellow-400 font-bold">{currentIndex + 1}</span> / {props.galleryData.length}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default GalleryItem;
