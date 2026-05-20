"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/bookings/email/${user?.email}`
      );

      setBookings(res.data);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchBookings();
  }, [user?.email]);

  /* ================= CANCEL BOOKING ================= */
  const cancelBooking = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/booking/cancel/${id}`
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Booking cancelled");
        fetchBookings();
      }
    } catch {
      toast.error("Cancel failed");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-600">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-4 md:p-8">

      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
        My Booked Sessions
      </h1>

      {/* EMPTY */}
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No bookings found
        </p>
      ) : (
        <div className="overflow-x-auto max-w-6xl mx-auto">
          <table className="w-full bg-white dark:bg-slate-900 rounded-xl shadow">

            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Tutor</th>
                <th className="text-left">Student</th>
                <th className="text-left">Email</th>
                <th className="text-left">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b">

                  <td className="p-3">{b.tutorName}</td>
                  <td>{b.studentName}</td>
                  <td>{b.studentEmail}</td>

                  <td>
                    <span
                      className={
                        b.bookStatus === "Cancelled"
                          ? "text-red-500"
                          : "text-green-600"
                      }
                    >
                      {b.bookStatus}
                    </span>
                  </td>

                  <td className="text-center">
                    <button
                      disabled={b.bookStatus === "Cancelled"}
                      onClick={() => cancelBooking(b._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}