"use client";

import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function TutorDetailsPage() {
  useEffect(() => {
    document.title = "Tutor Details | EduQueue";
  }, []);

  const params = useParams();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (params?.id) fetchTutor();
  }, [params?.id]);

  const fetchTutor = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/tutor/${params.id}`
      );

      setTutor(res.data);
    } catch (error) {
      toast.error("Failed to load tutor");
    } finally {
      setLoading(false);
    }
  };

  const handleBookSession = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("Please login first");

    if (tutor?.totalSlot <= 0) {
      return toast.error("This session is fully booked.");
    }

    const currentDate = new Date();
    const sessionDate = new Date(tutor?.sessionStartDate);

    if (currentDate < sessionDate) {
      return toast.error("Booking is not available yet for this tutor");
    }

    const form = e.target;

    const bookingData = {
      studentName: user?.name,
      phone: form.phone.value,
      tutorId: tutor?._id,
      tutorName: tutor?.tutorName,
      studentEmail: user?.email,
      bookStatus: "Booked",
      bookedAt: new Date(),
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/bookings",
        bookingData
      );

      if (res.data.insertedId) {
        toast.success("Session booked successfully");

        setTutor({
          ...tutor,
          totalSlot: tutor.totalSlot - 1,
        });

        setOpenModal(false);
        form.reset();
      }
    } catch (error) {
      console.log(error);

      const message =
        error?.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
  };

  /* =========================
     DATE FORMAT FUNCTION
  ========================== */
  function formatDate(dateString) {
    if (!dateString) return "Not set";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  if (loading || !tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-950 text-white">
        <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-800">

          {/* IMAGE */}
          <div className="w-full bg-gray-100 dark:bg-slate-800 flex justify-center p-4">
            <img
              src={tutor?.photo}
              alt={tutor?.tutorName}
              className="w-full max-h-[320px] object-contain rounded-xl"
            />
          </div>

          {/* CONTENT */}
          <div className="p-5 md:p-7">

            {/* TOP */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {tutor?.tutorName}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {tutor?.subject}
                </p>
              </div>

              <div className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold text-sm w-fit">
                ৳ {tutor?.hourlyFee}/hr
              </div>

            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">

              <Info label="Institution" value={tutor?.institution} />
              <Info label="Location" value={tutor?.location} />
              <Info label="Mode" value={tutor?.teachingMode} />
              <Info label="Availability" value={tutor?.availability} />

              {/* ✅ FIXED DATE */}
              <Info
                label="Session Date"
                value={formatDate(tutor?.sessionStartDate)}
              />

              <Info label="Slots" value={tutor?.totalSlot} />

            </div>

            {/* EXPERIENCE */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Experience
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                {tutor?.experience}
              </p>
            </div>

            {/* SLOT WARNING */}
            {tutor?.totalSlot <= 0 && (
              <div className="mt-5 p-3 rounded-xl bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-center text-sm">
                No available slots left
              </div>
            )}

            {/* BUTTON */}
            <button
              onClick={() => setOpenModal(true)}
              disabled={tutor?.totalSlot <= 0}
              className="w-full mt-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold transition"
            >
              Book Session
            </button>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-5 relative">

            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Book Session
              </h2>
            </div>

            <form onSubmit={handleBookSession} className="space-y-3">

              <input
                value={user?.name || ""}
                readOnly
                className="w-full p-2 rounded bg-gray-100 dark:bg-slate-800 text-sm"
              />

              <input
                name="phone"
                required
                placeholder="Phone Number"
                className="w-full p-2 rounded border dark:bg-slate-800 text-sm"
              />

              <input
                value={tutor?.tutorName || ""}
                readOnly
                className="w-full p-2 rounded bg-gray-100 dark:bg-slate-800 text-sm"
              />

              <input
                value={user?.email || ""}
                readOnly
                className="w-full p-2 rounded bg-gray-100 dark:bg-slate-800 text-sm"
              />

              <div className="flex justify-end gap-2 pt-2">

                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-3 py-1 bg-emerald-600 text-white rounded text-sm"
                >
                  Confirm
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* INFO COMPONENT */
function Info({ label, value }) {
  return (
    <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
        {value}
      </p>
    </div>
  );
}