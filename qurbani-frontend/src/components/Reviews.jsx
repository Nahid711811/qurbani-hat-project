import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=1",
    text: "Amazing service! The animals were healthy and well cared for.",
  },
  {
    id: 2,
    name: "Sarah Khan",
    image: "https://i.pravatar.cc/150?img=2",
    text: "Very smooth experience. Highly recommended!",
  },
  {
    id: 3,
    name: "Ali Hasan",
    image: "https://i.pravatar.cc/150?img=3",
    text: "Great quality and fast response. Loved it!",
  },
  {
    id: 4,
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=1",
    text: "Amazing service! The animals were healthy and well cared for.",
  },
  {
    id: 5,
    name: "Sarah Khan",
    image: "https://i.pravatar.cc/150?img=2",
    text: "Very smooth experience. Highly recommended!",
  },
  {
    id: 6,
    name: "Ali Hasan",
    image: "https://i.pravatar.cc/150?img=3",
    text: "Great quality and fast response. Loved it!",
  },
];
export default function ReviewsSlider() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const next = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleNext = () => {
    next();
    startAutoSlide();
  };

  const handlePrev = () => {
    prev();
    startAutoSlide();
  };

  return (
    <div className="py-12 px-4 relative max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      <div className="relative h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={reviews[index].id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full bg-white shadow-lg rounded-xl p-6 flex flex-col items-center gap-3"
          >
            <img
              src={reviews[index].image}
              alt={reviews[index].name}
              className="w-20 h-20 rounded-full border-2 border-green-500"
            />

            <h3 className="font-bold text-lg">{reviews[index].name}</h3>
            <p className="text-gray-600">{reviews[index].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}