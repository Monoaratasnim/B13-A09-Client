"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyTutorsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editTutor, setEditTutor] = useState(null);
  const [deleteTutor, setDeleteTutor] = useState(null);

  /* ================= FETCH ================= */
  const fetchMyTutors = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/my-tutors/${user?.email}`
      );

      setTutors(res.data);
    } catch (err) {
      toast.error("Failed to load tutors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyTutors();
  }, [user?.email]);

  /* ================= UPDATE ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updated = {
      tutorName: form.tutorName.value,
      subject: form.subject.value,
      hourlyFee: Number(form.hourlyFee.value),
      location: form.location.value,
    };

    try {
      const res = await axios.patch(
        `http://localhost:5000/tutor/${editTutor._id}`,
        updated
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Tutor updated");
        setEditTutor(null);
        fetchMyTutors();
      }
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/tutor/${deleteTutor._id}`
      );

      if (res.data.deletedCount > 0) {
        toast.success("Tutor deleted");
        setDeleteTutor(null);
        fetchMyTutors();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-600">
        Loading tutors...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 p-4 md:p-8">

      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
        My Tutors
      </h1>

      {/* EMPTY */}
      {tutors.length === 0 ? (
        <p className="text-center text-gray-500">No tutors found</p>
      ) : (
        <div className="overflow-x-auto max-w-6xl mx-auto">
          <table className="w-full bg-white dark:bg-slate-900 rounded-xl shadow">

            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="text-left">Subject</th>
                <th className="text-left">Fee</th>
                <th className="text-left">Location</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tutors.map((t) => (
                <tr key={t._id} className="border-b">

                  <td className="p-3">{t.tutorName}</td>
                  <td>{t.subject}</td>
                  <td>{t.hourlyFee}</td>
                  <td>{t.location}</td>

                  <td className="text-center space-x-2">

                    <button
                      onClick={() => setEditTutor(t)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleteTutor(t)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* UPDATE MODAL */}
      {editTutor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-5 rounded-xl w-[350px]"
          >
            <input
              name="tutorName"
              defaultValue={editTutor.tutorName}
              className="w-full p-2 border mb-2"
            />
            <input
              name="subject"
              defaultValue={editTutor.subject}
              className="w-full p-2 border mb-2"
            />
            <input
              name="hourlyFee"
              defaultValue={editTutor.hourlyFee}
              className="w-full p-2 border mb-2"
            />
            <input
              name="location"
              defaultValue={editTutor.location}
              className="w-full p-2 border mb-2"
            />

            <button className="bg-green-600 text-white px-4 py-1">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditTutor(null)}
              className="ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteTutor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl text-center">
            <p>Delete this tutor?</p>

            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-3 py-1 m-2"
            >
              Delete
            </button>

            <button onClick={() => setDeleteTutor(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}