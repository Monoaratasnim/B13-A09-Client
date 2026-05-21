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
    <section
      className="
        relative w-full overflow-hidden
        h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[90vh]
      "
    >
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

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
            <div className="text-center max-w-xl sm:max-w-2xl lg:max-w-3xl text-white">

              <h1 className="
                font-bold leading-snug lg:leading-tight
                text-2xl sm:text-4xl lg:text-6xl
                mb-3 sm:mb-6
              ">
                {slide.title}
              </h1>

              <p className="
                text-gray-200
                text-sm sm:text-base lg:text-lg
                mb-5 sm:mb-8
              ">
                {slide.desc}
              </p>

              <Link href="/tutors">
                <button className="
                  bg-green-600 hover:bg-green-700
                  px-5 sm:px-8 py-3 sm:py-4
                  rounded-full
                  text-sm sm:text-lg font-semibold
                  transition shadow-lg
                ">
                  Explore Tutors
                </button>
              </Link>

            </div>
          </div>
        </div>
      ))}

      {/* LEFT */}
      <button
        onClick={prevSlide}
        className="
          absolute left-2 sm:left-5
          top-1/2 -translate-y-1/2
          bg-white/20 hover:bg-white/40
          text-white p-2 sm:p-3
          rounded-full backdrop-blur
        "
      >
        <ChevronLeft size={28} />
      </button>

      {/* RIGHT */}
      <button
        onClick={nextSlide}
        className="
          absolute right-2 sm:right-5
          top-1/2 -translate-y-1/2
          bg-white/20 hover:bg-white/40
          text-white p-2 sm:p-3
          rounded-full backdrop-blur
        "
      >
        <ChevronRight size={28} />
      </button>

      {/* DOTS */}
      <div className="
        absolute bottom-3 sm:bottom-6
        left-1/2 -translate-x-1/2
        flex gap-2
      ">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
              i === index ? "bg-green-500 scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}