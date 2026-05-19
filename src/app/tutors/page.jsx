"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg">
        Loading tutors...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Find Expert Tutors
        </h1>
        <p className="text-gray-600 mt-2">
          Search and book the best tutors for your learning needs
        </p>
      </div>

      {/* FILTER BOX */}
      <div className="max-w-6xl mx-auto bg-white p-5 rounded-xl shadow mb-10">
        <h2 className="text-lg font-semibold mb-4">
          🔍 Search & Filter Tutors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search by tutor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >

      
<div className="w-full h-52 bg-gray-100 flex items-center justify-center">
  <img
    src={tutor.photo}
    alt={tutor.tutorName}
    className="max-h-full max-w-full object-contain"
  />
</div>

         
            <div className="p-5 space-y-2">

              <h2 className="text-xl font-bold text-gray-800">
                {tutor.tutorName}
              </h2>

              <p className="text-sm text-gray-600">
                📘 {tutor.subject}
              </p>

              <p className="text-sm text-gray-600">
                ⏰ {tutor.availability}
              </p>

              <p className="text-sm text-gray-600">
                📅 Start: {tutor.sessionStartDate || "Not set"}
              </p>

              <p className="text-sm text-gray-600">
                📍 {tutor.location}
              </p>

              <div className="flex justify-between items-center pt-2">
                <p className="text-green-600 font-bold">
                  💰 {tutor.hourlyFee} BDT/hr
                </p>
              </div>

              <Link href={`/tutors/${tutor._id}`}>
                <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg transition">
                  Book Session
                </button>
              </Link>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}