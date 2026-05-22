"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

export default function AddTutorPage() {
    useEffect(() => {
      document.title = "Add Tutor | EduQueue";
    }, []);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login first");
      return;
    }

    const form = e.target;

    const tutorData = {
      tutorName: form.tutorName.value,
      photo: form.photo.value,
      subject: form.subject.value,
      availability: form.availability.value,
      hourlyFee: Number(form.hourlyFee.value),
      totalSlot: Number(form.totalSlot.value),
      sessionStartDate: form.sessionStartDate.value,
      institution: form.institution.value,
      experience: form.experience.value,
      location: form.location.value,
      teachingMode: form.teachingMode.value,

      // ✅ IMPORTANT FIX
      creatorEmail: user.email,

      createdAt: new Date(),
    };
   
     const {data:tokenData} = await authClient.token()
          console.log(tokenData)
    
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tutor`,
        tutorData,
        {
          headers: {
            authorization: `Bearer ${tokenData?.token}`
          }
        }
      );

      if (res.data.insertedId) {
        toast.success("Tutor Added Successfully");
        form.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 py-10 px-4 transition">

      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 p-6 md:p-10 transition">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
            Add Tutor
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Create your tutor profile and start teaching students
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* TUTOR NAME */}
          <input
            type="text"
            name="tutorName"
            placeholder="Tutor Name"
            required
            className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800"
          />

          {/* PHOTO */}
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            required
            className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800"
          />

          {/* SUBJECT */}
          <select
            name="subject"
            required
            className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800"
          >
            <option value="">Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="English">English</option>
            <option value="ICT">ICT</option>
            
          </select>

          {/* AVAILABILITY */}
          <input
            type="text"
            name="availability"
            placeholder="Sun - Thu 5:00 PM - 8:00 PM"
            required
            className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800"
          />

          {/* HOURLY FEE */}
          <input
            type="number"
            name="hourlyFee"
            placeholder="Hourly Fee"
            required
            className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800"
          />

          {/* TOTAL SLOT */}
          <input
            type="number"
            name="totalSlot"
            placeholder="Total Slot"
            required
            className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800"
          />

          {/* SESSION START DATE */}
          <input
            type="date"
            name="sessionStartDate"
            required
            className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800"
          />

          {/* INSTITUTION */}
          <input
            type="text"
            name="institution"
            placeholder="Institution"
            required
            className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800"
          />

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800"
          />

          {/* TEACHING MODE */}
          <select
            name="teachingMode"
            required
            className="w-full border rounded-xl px-4 py-3 dark:bg-slate-800"
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both">Both</option>
          </select>

          {/* EXPERIENCE */}
          <textarea
            name="experience"
            placeholder="Experience"
            rows={5}
            required
            className="w-full border rounded-xl px-4 py-3 md:col-span-2"
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Add Tutor
          </button>

        </form>
      </div>
    </div>
  );
}