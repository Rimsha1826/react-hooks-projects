import { useState, useEffect } from "react";

const images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    alt: "Beach",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    alt: "Mountains",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
    alt: "City",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800",
    alt: "Bali",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    alt: "Paris",
  },
];

function ImageSlider() {
  const [current, setCurrent] = useState(0);

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  function handlePrev() {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  }

  function handleNext() {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-3xl font-bold text-white mb-8">Image Slider</h1>

      <div className="relative w-full max-w-2xl">
        {/* Image */}
        <img
          src={images[current].url}
          alt={images[current].alt}
          className="w-full h-96 object-cover rounded-2xl"
        />

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white text-2xl px-4 py-2 rounded-full hover:bg-black/80 transition"
        >
          ❮
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white text-2xl px-4 py-2 rounded-full hover:bg-black/80 transition"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                current === index ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-gray-400 mt-4">
        {current + 1} / {images.length}
      </p>
    </div>
  );
}

export default ImageSlider;