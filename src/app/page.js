"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Banner from "@/components/Banner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function HomePage() {
    useEffect(() => {
      document.title = "Home | EduQueue";
    }, []);
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/tutor");
        setTutors(res.data.slice(0, 6));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  // ✅ LOGIN PROTECTED NAVIGATION
  const handleBookSession = (id) => {
    if (!user) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    router.push(`/tutors/${id}`);
  };
 

  return (
    <div className="bg-gray-50 dark:bg-slate-950">

      {/* ================= BANNER ================= */}
      <Banner />

      {/* ================= AVAILABLE TUTORS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center text-green-600 mb-12"
        >
          Available Tutors
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading tutors...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {tutors.map((tutor) => (
              <motion.div
                key={tutor._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-md overflow-hidden"
              >

                {/* IMAGE */}
                <div className="h-52 flex items-center justify-center bg-gray-100 dark:bg-slate-800 p-4">
                  <Image
                    src={tutor.photo}
                    alt={tutor.tutorName}
                    width={300}
                    height={200}
                    className="object-contain w-full h-full"
                  />
                </div>

                <div className="p-5 space-y-2">

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {tutor.tutorName}
                  </h3>

                  <p className="text-gray-500">
                    Subject: {tutor.subject}
                  </p>

                  <p className="text-gray-500">
                    Fee:   ৳{tutor.hourlyFee}/hr
                  </p>

                  <p className="text-gray-500">
                    Location: {tutor.location}
                  </p>

                  {/* ✅ LOGIN PROTECTED BUTTON */}
                  <button
                    onClick={() => handleBookSession(tutor._id)}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                  >
                    Book Session
                  </button>

                </div>
              </motion.div>
            ))}

          </div>
        )}
      </section>

      {/* ================= POPULAR SUBJECTS ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center text-green-600 mb-10">
          Popular Subjects
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {["Math", "Physics", "Chemistry", "ICT", "English", "Biology", "Programming", "Accounting"].map((s, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 p-6 text-center rounded-xl shadow hover:shadow-lg hover:scale-105 transition"
            >
              {s}
            </div>
          ))}

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-white dark:bg-slate-900">

        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold text-green-600 mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              { title: "Find Tutor", desc: "Search tutors by subject & availability" },
              { title: "Book Session", desc: "Select time and confirm instantly" },
              { title: "Start Learning", desc: "Join session and improve skills" },
            ].map((step, i) => (
              <div
                key={i}
                className="p-8 bg-gray-50 dark:bg-slate-800 rounded-2xl shadow"
              >
                <h3 className="text-xl font-bold mb-2">
                  {i + 1}. {step.title}
                </h3>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= ABOUT US ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/assets/p6.jpg"
              alt="About EduQueue"
              fill
              sizes="( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw"
              className="object-cover" 
            />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-green-600 mb-4">
              About EduQueue
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-7">
              EduQueue is a smart tutor booking platform designed to connect students
              with qualified tutors in the fastest and most efficient way.
            </p>

            <p className="text-gray-600 dark:text-gray-300 mt-4 leading-7">
              We remove the hassle of manual scheduling and provide a smooth learning experience.
            </p>

          </div>

        </div>

      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center text-green-600 mb-12">
          What Students Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            { name: "Rahim", text: "Very easy booking system and great tutors." },
            { name: "Nusrat", text: "I improved my grades with this platform." },
            { name: "Tanvir", text: "Fast, reliable and user friendly." },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow"
            >
              <p className="text-gray-600 dark:text-gray-300">
                “{t.text}”
              </p>
              <h4 className="text-green-600 font-semibold mt-3">
                - {t.name}
              </h4>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}