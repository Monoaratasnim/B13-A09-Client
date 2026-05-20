"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function TutorsPage() {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // FETCH TUTORS
  const fetchTutors = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/tutor", {
        params: {
          search,
          startDate,
          endDate,
        },
      });

      setTutors(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTutors();
    }, 500);

    return () => clearTimeout(delay);
  }, [search, startDate, endDate]);

  const handleOpenTutor = (id) => {
    if (!user) {
      toast.error("Please login first");
      router.push("/login"); // change if needed
      return;
    }

    router.push(`/tutors/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-green-600 dark:text-green-400 bg-gray-100 dark:bg-slate-950 font-semibold">
        Loading tutors...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 py-10 px-4">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-green-600 dark:text-green-400">
          Find Expert Tutors
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-3">
          Search and book the best tutors for your learning journey
        </p>
      </div>

      {/* FILTER BOX */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xl border dark:border-slate-800 mb-10">

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search tutor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
          />

        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-2xl transition border dark:border-slate-800 hover:-translate-y-2"
          >

            {/* IMAGE (NO CROPPING) */}
            <div className="h-60 flex items-center justify-center bg-gray-100 dark:bg-slate-800 p-4">
              <img
                src={tutor.photo}
                alt={tutor.tutorName}
                className="max-h-full max-w-full object-contain rounded-xl"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-2">

              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {tutor.tutorName}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                📘 {tutor.subject}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                ⏰ {tutor.availability}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                📍 {tutor.location}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                📅 {tutor.sessionStartDate || "Not set"}
              </p>

              <div className="pt-2">
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  ৳ {tutor.hourlyFee}/hr
                </p>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => handleOpenTutor(tutor._id)}
                className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold transition"
              >
                Book Session
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* EMPTY */}
      {tutors.length === 0 && (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            No Tutors Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try changing search or filters
          </p>
        </div>
      )}

    </div>
  );
}