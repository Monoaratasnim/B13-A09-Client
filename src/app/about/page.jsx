"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export default function AboutPage() {
      useEffect(() => {
        document.title = "About | EduQueue";
      }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-16 px-4">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-green-600 mb-12"
      >
        About EduQueue
      </motion.h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/assets/p6.jpg"
            alt="EduQueue"
            fill
            className="object-cover"
          />
        </div>

        {/* TEXT */}
        <div className="space-y-4">

          <p className="text-gray-700 dark:text-gray-300 leading-7">
            <b>EduQueue</b> is a modern tutor booking platform that allows students
            to easily find, schedule, and manage online learning sessions.
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-7">
            Students can browse tutors based on subject, availability, and price,
            then book sessions instantly without manual scheduling issues.
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-7">
            The system generates <b>digital session tokens</b> for each booking,
            ensuring secure and organized class management.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow text-center">
              <h3 className="text-2xl font-bold text-green-600">1000+</h3>
              <p className="text-gray-500">Students</p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow text-center">
              <h3 className="text-2xl font-bold text-green-600">200+</h3>
              <p className="text-gray-500">Tutors</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}