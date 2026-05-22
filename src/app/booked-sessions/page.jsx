"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  useEffect(() => {
    document.title = "My Booked Sessions | EduQueue";
  }, []);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // MODAL STATE
  const [selectedBooking, setSelectedBooking] = useState(null);

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const {data:tokenData} = await authClient.token()
           console.log(tokenData)
     
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/email/${user?.email}`, {
          headers: {
            authorization: `Bearer ${tokenData?.token}`
          }
        }
      );

      setBookings(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user?.email]);

  /* ================= CANCEL BOOKING ================= */
  const handleCancelBooking = async () => {
    const {data:tokenData} = await authClient.token()
    try {
    const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/cancel/${selectedBooking._id}`,
  {}, // body
  {
    headers: {
      authorization: `Bearer ${tokenData?.token}`,
    },
  }
);

      if (res.data.modifiedCount > 0) {
        toast.success("Booking cancelled successfully");

        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === selectedBooking._id
              ? { ...booking, bookStatus: "Cancelled" }
              : booking
          )
        );

        setSelectedBooking(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("Cancel failed");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-slate-950 px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-green-600 dark:text-green-400 font-semibold text-sm sm:text-base">
            Loading bookings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 dark:bg-slate-950 px-3 sm:px-5 md:px-8 py-6 sm:py-8">

      {/* HEADER */}
      <div className="text-center mb-6 sm:mb-10">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
          My Booked Sessions
        </h1>

        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
          View and manage all your booked tutor sessions
        </p>

      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 sm:p-10 text-center border border-green-200 dark:border-green-900">

          <div className="text-5xl sm:text-6xl mb-4">
            📚
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            No Bookings Yet
          </h2>

          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
            You haven’t booked any tutor sessions yet.
          </p>

        </div>
      ) : (
        <>
          {/* ================= MOBILE CARD VIEW ================= */}
          <div className="grid grid-cols-1 gap-4 md:hidden">

            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-green-200 dark:border-green-900 p-5"
              >

                <div className="space-y-3">

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Tutor Name
                    </p>

                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                      {booking.tutorName}
                    </h2>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Student Name
                    </p>

                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {booking.studentName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Email
                    </p>

                    <p className="text-sm break-all text-gray-700 dark:text-gray-300">
                      {booking.studentEmail}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.bookStatus === "Cancelled"
                          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                    >
                      {booking.bookStatus}
                    </span>

                    <button
                      disabled={booking.bookStatus === "Cancelled"}
                      onClick={() => setSelectedBooking(booking)}
                      className="
                        bg-red-500 hover:bg-red-600
                        text-white
                        px-4 py-2
                        rounded-lg
                        text-sm
                        font-medium
                        transition
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                      "
                    >
                      Cancel
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= TABLE VIEW ================= */}
          <div className="hidden md:block max-w-7xl mx-auto overflow-x-auto">

            <div className="bg-green-50 dark:bg-slate-900 rounded-3xl shadow-2xl border border-green-200 dark:border-green-900 overflow-hidden">

              <table className="w-full">

                {/* TABLE HEAD */}
                <thead className="bg-green-600 text-white">
                  <tr>

                    <th className="px-6 lg:px-8 py-4 text-left font-semibold text-sm lg:text-base">
                      Tutor Name
                    </th>

                    <th className="px-6 lg:px-8 py-4 text-left font-semibold text-sm lg:text-base">
                      Student Name
                    </th>

                    <th className="px-6 lg:px-8 py-4 text-left font-semibold text-sm lg:text-base">
                      Email
                    </th>

                    <th className="px-6 lg:px-8 py-4 text-left font-semibold text-sm lg:text-base">
                      Status
                    </th>

                    <th className="px-6 lg:px-8 py-4 text-center font-semibold text-sm lg:text-base">
                      Action
                    </th>

                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>

                  {bookings.map((booking, index) => (
                    <tr
                      key={booking._id}
                      className={`
                        border-b border-green-100 dark:border-green-700 shadow-sm
                        hover:bg-green-100/70 dark:hover:bg-green-900/20
                        transition
                        ${
                          index % 2 === 0
                            ? "bg-green-50/40 dark:bg-green-300"
                            : "bg-green-100/40 dark:bg-green-200"
                        }
                      `}
                    >

                      {/* TUTOR */}
                      <td className="px-6 lg:px-8 py-5 font-semibold text-gray-800 dark:text-green-800">
                        {booking.tutorName}
                      </td>

                      {/* STUDENT */}
                      <td className="px-6 lg:px-8 py-5 text-slate-700 dark:text-green-800">
                        {booking.studentName}
                      </td>

                      {/* EMAIL */}
                      <td className="px-6 lg:px-8 py-5 text-slate-700 dark:text-green-800">
                        {booking.studentEmail}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 lg:px-8 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.bookStatus === "Cancelled"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-800"
                          }`}
                        >
                          {booking.bookStatus}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="px-6 lg:px-8 py-5 text-center">

                        <button
                          disabled={booking.bookStatus === "Cancelled"}
                          onClick={() => setSelectedBooking(booking)}
                          className="
                            bg-red-500 hover:bg-red-600
                            text-white
                            px-4 py-2
                            rounded-lg
                            text-sm
                            font-medium
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                          "
                        >
                          Cancel
                        </button>

                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ================= CONFIRM MODAL ================= */}
      {selectedBooking && (
        <div className="fixed inset-0 z-45 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-5 sm:p-6 border border-green-200 dark:border-green-900">

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              Cancel Booking?
            </h2>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
              Are you sure you want to cancel your booking with{" "}
              <span className="font-semibold text-red-500">
                {selectedBooking.tutorName}
              </span>
              ?
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

              <button
                onClick={() => setSelectedBooking(null)}
                className="
                  w-full sm:w-auto
                  px-4 py-2.5
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-slate-700
                  text-gray-700
                  dark:text-gray-300
                  hover:bg-gray-100
                  dark:hover:bg-slate-800
                  transition
                "
              >
                Keep Booking
              </button>

              <button
                onClick={handleCancelBooking}
                className="
                  w-full sm:w-auto
                  px-4 py-2.5
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  transition
                "
              >
                Yes, Cancel
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}