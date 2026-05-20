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

  // AUTO SLIDE
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
    <section className="relative w-full h-[70vh] overflow-hidden">

      {/* SLIDES */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* IMAGE */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center max-w-2xl text-white">

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h1>

              <p className="text-gray-200 text-sm md:text-lg mb-6">
                {slide.desc}
              </p>

              <Link href="/tutors">
                <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full font-semibold transition">
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
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur"
      >
        <ChevronLeft size={28} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur"
      >
        <ChevronRight size={28} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-green-500" : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </section>
  );
}