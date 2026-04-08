
import { useEffect, useState } from "react";

interface GalleryItemProps {
  galleryData: {
    id: number;
    img: string;
  }[];
}

function GalleryItem(props: GalleryItemProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % props.galleryData.length);
  };

  const slideToPrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + props.galleryData.length) % props.galleryData.length,
    );
  };

  const slideTo = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!props.galleryData.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % props.galleryData.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [props.galleryData.length]);

  if (!props.galleryData.length) {
    return null;
  }

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl bg-zinc-100 shadow-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {props.galleryData.map((item) => (
              <div key={item.id} className="w-full shrink-0">
                <img
                  src={item.img}
                  alt={`Gallery item ${item.id}`}
                  className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-[30rem]"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={slideToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white transition hover:bg-black/75 sm:left-4 sm:p-3"
            aria-label="Previous slide"
          >
            <span className="text-xl leading-none sm:text-2xl">&#8249;</span>
          </button>

          <button
            type="button"
            onClick={slideToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white transition hover:bg-black/75 sm:right-4 sm:p-3"
            aria-label="Next slide"
          >
            <span className="text-xl leading-none sm:text-2xl">&#8250;</span>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {props.galleryData.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => slideTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                currentIndex === index
                  ? "w-8 bg-zinc-900"
                  : "w-2.5 bg-zinc-400 hover:bg-zinc-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryItem;