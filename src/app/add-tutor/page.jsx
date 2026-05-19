"use client";

import axios from "axios";
import toast from "react-hot-toast";

export default function AddTutorPage() {

  // submit function
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

    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">

        {/* Heading */}
        <div className="mb-8 text-center">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Add Tutor
          </h1>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Create your tutor profile and start teaching students.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* Tutor Name */}
          <div>

            <label className="block mb-2 font-medium">
              Tutor Name
            </label>

            <input
              type="text"
              name="tutorName"
              placeholder="Rahim Ahmed"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Photo */}
          <div>

            <label className="block mb-2 font-medium">
              Photo URL
            </label>

            <input
              type="text"
              name="photo"
              placeholder="imgbb / postimage link"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Subject */}
          <div>

            <label className="block mb-2 font-medium">
              Subject / Category
            </label>

            <select
              name="subject"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">
                Select Subject
              </option>

              <option value="Mathematics">
                Mathematics
              </option>

              <option value="Physics">
                Physics
              </option>

              <option value="Chemistry">
                Chemistry
              </option>

              <option value="English">
                English
              </option>

              <option value="ICT">
                ICT
              </option>

            </select>

          </div>

          {/* Teaching Mode */}
          <div>

            <label className="block mb-2 font-medium">
              Teaching Mode
            </label>

            <select
              name="teachingMode"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">
                Select Mode
              </option>

              <option value="Online">
                Online
              </option>

              <option value="Offline">
                Offline
              </option>

              <option value="Both">
                Both
              </option>

            </select>

          </div>

          {/* Availability */}
          <div>

            <label className="block mb-2 font-medium">
              Available Days and Time
            </label>

            <input
              type="text"
              name="availability"
              placeholder="Sun - Thu 5:00 PM - 8:00 PM"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Hourly Fee */}
          <div>

            <label className="block mb-2 font-medium">
              Hourly Fee
            </label>

            <input
              type="number"
              name="hourlyFee"
              placeholder="500"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Total Slot */}
          <div>

            <label className="block mb-2 font-medium">
              Total Slot
            </label>

            <input
              type="number"
              name="totalSlot"
              placeholder="10"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Session Date */}
          <div>

            <label className="block mb-2 font-medium">
              Session Start Date
            </label>

            <input
              type="date"
              name="sessionStartDate"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Institution */}
          <div>

            <label className="block mb-2 font-medium">
              Institution
            </label>

            <input
              type="text"
              name="institution"
              placeholder="Dhaka University"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Location */}
          <div>

            <label className="block mb-2 font-medium">
              Location (Area/City)
            </label>

            <input
              type="text"
              name="location"
              placeholder="Khulna"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Experience */}
          <div className="md:col-span-2">

            <label className="block mb-2 font-medium">
              Experience
            </label>

            <textarea
              name="experience"
              rows={5}
              placeholder="3 years teaching experience..."
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

          </div>

          {/* Button */}
          <div className="md:col-span-2">

            <button
              type="submit"
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
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