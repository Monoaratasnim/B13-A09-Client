"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Pencil, Trash2, BookOpen } from "lucide-react";

export default function MyTutorsPage() {
  useEffect(() => {
    document.title = "My Tutors | EduQueue";
  }, []);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editTutor, setEditTutor] = useState(null);
  const [deleteTutor, setDeleteTutor] = useState(null);

  /* ================= FETCH MY TUTORS ================= */
  const fetchMyTutors = async () => {
    try {
      setLoading(true);

 const {data:tokenData} = await authClient.token()
           console.log(tokenData)
     
      const res = await axios.get(
        `http://localhost:5000/my-tutors/${user?.email}`,{
          headers: {
            authorization: `Bearer ${tokenData?.token}`
          }
        }
      );

      setTutors(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load tutors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyTutors();
    }
  }, [user?.email]);

  /* ================= UPDATE TUTOR ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedTutor = {
      tutorName: form.tutorName.value,
      subject: form.subject.value,
      hourlyFee: Number(form.hourlyFee.value),
      location: form.location.value,
    };
     

     const {data:tokenData} = await authClient.token()
      console.log(tokenData)
    try {
      const res = await axios.patch(
        `http://localhost:5000/tutor/${editTutor._id}`,
        updatedTutor, {
          headers: {
            authorization: `Bearer ${tokenData?.token}`
          }
        }
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Tutor updated successfully");

        setTutors((prev) =>
          prev.map((t) =>
            t._id === editTutor._id
              ? { ...t, ...updatedTutor }
              : t
          )
        );

        setEditTutor(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  /* ================= DELETE TUTOR ================= */
  const handleDelete = async () => {
     const {data:tokenData} = await authClient.token()
           console.log(tokenData)
    try {
      const res = await axios.delete(
        `http://localhost:5000/tutor/${deleteTutor._id}`, {
          headers: {
            authorization: `Bearer ${tokenData?.token}`
          }
        }
      );

      if (res.data.deletedCount > 0) {
        toast.success("Tutor deleted successfully");

        setTutors((prev) =>
          prev.filter((t) => t._id !== deleteTutor._id)
        );

        setDeleteTutor(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-green-600 font-semibold">
            Loading tutors...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-6 sm:px-6 lg:px-8">

      {/* HEADER */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">
          My Tutors
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
          Manage all tutors you have added
        </p>
      </div>

      {/* EMPTY STATE */}
      {tutors.length === 0 ? (
        <div className="max-w-xl mx-auto bg-white/80 dark:bg-slate-900/90 backdrop-blur rounded-3xl shadow-xl border border-green-100 dark:border-green-900/30 p-8 sm:p-10 text-center">

          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-5">
            <BookOpen className="text-green-600 dark:text-green-400" size={36} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            No Tutors Found
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            You haven’t added any tutors yet.
          </p>
        </div>
      ) : (
        <>
          {/* ================= MOBILE CARDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">

            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-2xl shadow-lg border border-green-100 dark:border-green-900/30 p-5"
              >

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      {tutor.tutorName}
                    </h2>

                    <p className="text-green-600 dark:text-green-400 font-medium mt-1">
                      {tutor.subject}
                    </p>
                  </div>

                  <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                    ৳ {tutor.hourlyFee}
                  </div>

                </div>

                <div className="mt-4 space-y-2">

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Location
                    </span>

                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {tutor.location}
                    </span>
                  </div>

                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => setEditTutor(tutor)}
                    className="
                      flex-1 flex items-center justify-center gap-2
                      bg-green-200 hover:bg-green-300
                      text-green-800
                      py-2.5 rounded-xl
                      font-medium
                      transition
                    "
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteTutor(tutor)}
                    className="
                      flex-1 flex items-center justify-center gap-2
                      bg-red-500 hover:bg-red-600
                      text-white
                      py-2.5 rounded-xl
                      font-medium
                      transition
                    "
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden lg:block max-w-7xl mx-auto overflow-x-auto">

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-3xl shadow-2xl border border-green-100 dark:border-green-900/30 overflow-hidden">

              <table className="w-full">

                {/* TABLE HEAD */}
                <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <tr>
                    <th className="px-6 py-5 text-left font-semibold">
                      Tutor Name
                    </th>

                    <th className="px-6 py-5 text-left font-semibold">
                      Subject
                    </th>

                    <th className="px-6 py-5 text-left font-semibold">
                      Hourly Fee
                    </th>

                    <th className="px-6 py-5 text-left font-semibold">
                      Location
                    </th>

                    <th className="px-6 py-5 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>

                  {tutors.map((tutor, index) => (
                    <tr
                      key={tutor._id}
                      className={`
                        border-b border-green-100 dark:border-green-900/20
                        hover:bg-green-50 dark:hover:bg-green-900/10
                        transition
                        ${index % 2 === 0
                          ? "bg-white dark:bg-slate-900"
                          : "bg-green-50/40 dark:bg-slate-900/60"}
                      `}
                    >

                      <td className="px-6 py-5 font-semibold text-gray-800 dark:text-white">
                        {tutor.tutorName}
                      </td>

                      <td className="px-6 py-5 text-gray-700 dark:text-gray-300">
                        {tutor.subject}
                      </td>

                      <td className="px-6 py-5">
                        <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                          ৳ {tutor.hourlyFee}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-gray-700 dark:text-gray-300">
                        {tutor.location}
                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center justify-center gap-3">

                          <button
                            onClick={() => setEditTutor(tutor)}
                            className="
                              flex items-center gap-2
                              bg-green-200 hover:bg-green-300
                              text-green-800 
                              px-4 py-2 rounded-xl
                              transition
                            "
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            onClick={() => setDeleteTutor(tutor)}
                            className="
                              flex items-center gap-2
                              bg-red-500 hover:bg-red-600
                              text-white
                              px-4 py-2 rounded-xl
                              transition
                            "
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editTutor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">

          <form
            onSubmit={handleUpdate}
            className="
              w-full max-w-md
              bg-white dark:bg-slate-900
              rounded-3xl
              shadow-2xl
              border border-green-100 dark:border-green-900/30
              p-6 sm:p-7
            "
          >

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Edit Tutor
            </h2>

            <div className="space-y-4">

              <input
                name="tutorName"
                defaultValue={editTutor.tutorName}
                placeholder="Tutor Name"
                className="
                  w-full p-3 rounded-xl border
                  border-gray-300 dark:border-slate-700
                  bg-white dark:bg-slate-800
                  text-gray-800 dark:text-white
                  outline-none focus:ring-2 focus:ring-green-500
                "
              />

              <input
                name="subject"
                defaultValue={editTutor.subject}
                placeholder="Subject"
                className="
                  w-full p-3 rounded-xl border
                  border-gray-300 dark:border-slate-700
                  bg-white dark:bg-slate-800
                  text-gray-800 dark:text-white
                  outline-none focus:ring-2 focus:ring-green-500
                "
              />

              <input
                type="number"
                name="hourlyFee"
                defaultValue={editTutor.hourlyFee}
                placeholder="Hourly Fee"
                className="
                  w-full p-3 rounded-xl border
                  border-gray-300 dark:border-slate-700
                  bg-white dark:bg-slate-800
                  text-gray-800 dark:text-white
                  outline-none focus:ring-2 focus:ring-green-500
                "
              />

              <input
                name="location"
                defaultValue={editTutor.location}
                placeholder="Location"
                className="
                  w-full p-3 rounded-xl border
                  border-gray-300 dark:border-slate-700
                  bg-white dark:bg-slate-800
                  text-gray-800 dark:text-white
                  outline-none focus:ring-2 focus:ring-green-500
                "
              />

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">

              <button
                type="submit"
                className="
                  flex-1
                  bg-green-600 hover:bg-green-700
                  text-white
                  py-3 rounded-xl
                  font-semibold
                  transition
                "
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setEditTutor(null)}
                className="
                  flex-1
                  border border-gray-300 dark:border-slate-700
                  text-gray-700 dark:text-gray-300
                  py-3 rounded-xl
                  hover:bg-gray-100 dark:hover:bg-slate-800
                  transition
                "
              >
                Cancel
              </button>

            </div>
          </form>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {deleteTutor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">

          <div
            className="
              w-full max-w-md
              bg-white dark:bg-slate-900
              rounded-3xl
              shadow-2xl
              border border-green-100 dark:border-green-900/30
              p-6 sm:p-7
            "
          >

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Delete Tutor?
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-500">
                {deleteTutor.tutorName}
              </span>
              ?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">

              <button
                onClick={handleDelete}
                className="
                  flex-1
                  bg-red-500 hover:bg-red-600
                  text-white
                  py-3 rounded-xl
                  font-semibold
                  transition
                "
              >
                Delete
              </button>

              <button
                onClick={() => setDeleteTutor(null)}
                className="
                  flex-1
                  border border-gray-300 dark:border-slate-700
                  text-gray-700 dark:text-gray-300
                  py-3 rounded-xl
                  hover:bg-gray-100 dark:hover:bg-slate-800
                  transition
                "
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}