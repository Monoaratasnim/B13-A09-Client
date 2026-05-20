"use client";

import axios from "axios";
import toast from "react-hot-toast";

export default function AddTutorPage() {

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      createdAt: new Date(),
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/tutor",
        tutorData
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
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Tutor Name
            </label>

            <input
              type="text"
              name="tutorName"
              placeholder="Rahim Ahmed"
              required
              className="
                w-full border rounded-xl px-4 py-3
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-slate-700
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                focus:ring-2 focus:ring-green-500
                hover:border-green-400 transition
              "
            />
          </div>

          {/* PHOTO URL */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Photo URL
            </label>

            <input
              type="text"
              name="photo"
              placeholder="https://example.com/photo.jpg"
              required
              className="
                w-full border rounded-xl px-4 py-3
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-slate-700
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                focus:ring-2 focus:ring-green-500
                hover:border-green-400 transition
              "
            />
          </div>

          {/* AVAILABILITY */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Available Time
            </label>

            <input
              type="text"
              name="availability"
              placeholder="Sun - Thu 5:00 PM - 8:00 PM"
              required
              className="
                w-full border rounded-xl px-4 py-3
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-slate-700
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                focus:ring-2 focus:ring-green-500
                hover:border-green-400 transition
              "
            />
          </div>

          {/* HOURLY FEE */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Hourly Fee
            </label>

            <input
              type="number"
              name="hourlyFee"
              placeholder="500"
              required
              className="
                w-full border rounded-xl px-4 py-3
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-slate-700
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                focus:ring-2 focus:ring-green-500
                hover:border-green-400 transition
              "
            />
          </div>

          {/* TOTAL SLOT */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Total Slot
            </label>

            <input
              type="number"
              name="totalSlot"
              placeholder="10"
              required
              className="
                w-full border rounded-xl px-4 py-3
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-slate-700
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                focus:ring-2 focus:ring-green-500
                hover:border-green-400 transition
              "
            />
          </div>

          {/* SESSION START DATE */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Session Start Date
            </label>

            <input
              type="date"
              name="sessionStartDate"
              required
              className="
                w-full border rounded-xl px-4 py-3
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-slate-700
                focus:ring-2 focus:ring-green-500
                hover:border-green-400 transition
              "
            />
          </div>

          {/* INSTITUTION */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Institution
            </label>

            <input
              type="text"
              name="institution"
              placeholder="Dhaka University"
              required
              className="
                w-full border rounded-xl px-4 py-3
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-slate-700
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                focus:ring-2 focus:ring-green-500
                hover:border-green-400 transition
              "
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Dhaka"
              required
              className="
                w-full border rounded-xl px-4 py-3
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-slate-700
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                focus:ring-2 focus:ring-green-500
                hover:border-green-400 transition
              "
            />
          </div>

          {/* SUBJECT */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Subject / Category
            </label>

            <select
              name="subject"
              required
              className="
                w-full border rounded-xl px-4 py-3
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-slate-700
                focus:ring-2 focus:ring-green-500
                transition
              "
            >
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="English">English</option>
              <option value="ICT">ICT</option>
            </select>
          </div>

          {/* TEACHING MODE */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Teaching Mode
            </label>

            <select
              name="teachingMode"
              required
              className="
                w-full border rounded-xl px-4 py-3
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-slate-700
                focus:ring-2 focus:ring-green-500
                transition
              "
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {/* EXPERIENCE */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Experience
            </label>

            <textarea
              name="experience"
              rows={5}
              placeholder="3 years teaching experience..."
              required
              className="
                w-full border rounded-xl px-4 py-3
                bg-white dark:bg-slate-800
                text-gray-900 dark:text-white
                border-gray-300 dark:border-slate-700
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                focus:ring-2 focus:ring-green-500
                transition
              "
            ></textarea>
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="
                w-full bg-green-600 hover:bg-green-700
                text-white py-3 rounded-xl font-semibold
                transition-all duration-200
                hover:shadow-lg active:scale-[0.98]
              "
            >
              Add Tutor
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}