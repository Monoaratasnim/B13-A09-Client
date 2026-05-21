"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ServicesPage() {
    useEffect(() => {
    document.title = "Services | EduQueue";
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-16 px-4">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-green-600 mb-12"
      >
        Our Services
      </motion.h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {[
          {
            title: "Tutor Booking",
            desc: "Browse verified tutors and book sessions based on subject and availability.",
          },
          {
            title: "Digital Session Tokens",
            desc: "Each booking generates a unique session token for secure class access.",
          },
          {
            title: "Smart Scheduling",
            desc: "Avoid conflicts with automated time-slot management system.",
          },
          {
            title: "Online Learning",
            desc: "Join live online sessions with qualified tutors anytime, anywhere.",
          },
          {
            title: "Profile Management",
            desc: "Manage your bookings, history, and learning progress easily.",
          },
          {
            title: "Secure System",
            desc: "JWT-based authentication ensures safe and private access.",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              {s.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {s.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}