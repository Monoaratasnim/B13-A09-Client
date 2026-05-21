"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/assets/p1.jpg",
    title: "Find Expert Tutors Instantly",
    desc: "Connect with verified tutors across multiple subjects and start learning without delay.",
  },
  {
    image: "/assets/p2.jpg",
    title: "Book Sessions in Seconds",
    desc: "Choose your preferred time slot and book learning sessions without any hassle.",
  },
  {
    image: "/assets/p3.jpg",
    title: "Learn Smarter, Grow Faster",
    desc: "Personalized learning experience designed to boost your academic performance.",
  },
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full overflow-hidden">

      {/* ✅ RESPONSIVE HEIGHT FIX */}
      <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[85vh]">

        {/* SLIDES */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/60" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-10">

              <div className="
                text-center text-white
                max-w-[95%] sm:max-w-2xl lg:max-w-4xl
                translate-y-[-6%] sm:translate-y-0
              ">

                {/* TITLE */}
                <h1 className="
                  font-bold leading-snug sm:leading-tight
                  text-xl sm:text-3xl md:text-5xl lg:text-6xl
                  mb-3 sm:mb-5
                ">
                  {slide.title}
                </h1>

                {/* DESCRIPTION */}
                <p className="
                  text-gray-200
                  text-xs sm:text-sm md:text-lg lg:text-xl
                  mb-5 sm:mb-7
                ">
                  {slide.desc}
                </p>

                {/* BUTTON */}
                <Link href="/tutors">
                  <button className="
                    bg-green-600 hover:bg-green-700
                    px-5 sm:px-7 md:px-9
                    py-2.5 sm:py-3 md:py-4
                    rounded-full
                    text-sm sm:text-base md:text-lg
                    font-semibold
                    transition shadow-lg
                    w-full sm:w-auto
                  ">
                    Explore Tutors
                  </button>
                </Link>

              </div>
            </div>
          </div>
        ))}

        {/* LEFT BUTTON */}
        <button
          onClick={prevSlide}
          className="
            absolute left-2 sm:left-4 md:left-6
            top-1/2 -translate-y-1/2
            bg-white/20 hover:bg-white/40
            text-white
            p-2 sm:p-3 md:p-4
            rounded-full backdrop-blur
          "
        >
          <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={nextSlide}
          className="
            absolute right-2 sm:right-4 md:right-6
            top-1/2 -translate-y-1/2
            bg-white/20 hover:bg-white/40
            text-white
            p-2 sm:p-3 md:p-4
            rounded-full backdrop-blur
          "
        >
          <ChevronRight size={24} className="sm:w-7 sm:h-7" />
        </button>

        {/* DOTS */}
        <div className="
          absolute bottom-3 sm:bottom-5 md:bottom-6
          left-1/2 -translate-x-1/2
          flex gap-2 sm:gap-3
        ">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`transition rounded-full ${
                i === index
                  ? "bg-green-500 w-3 h-3 sm:w-3.5 sm:h-3.5 scale-125"
                  : "bg-white/50 w-2.5 h-2.5 sm:w-3 sm:h-3"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}