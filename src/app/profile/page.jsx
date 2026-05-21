"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
    useEffect(() => {
      document.title = "Profile | EduQueue";
    }, []);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      const timer = setTimeout(() => {
        router.push("/login");
        toast.error("Please login first");
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [session, router]);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-600 dark:text-green-400">
        Loading profile...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 p-6 text-center">

        {/* PROFILE IMAGE */}
        <img
          src={user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="profile"
          className="w-24 h-24 mx-auto rounded-full border-4 border-green-500 object-cover"
        />

        {/* NAME */}
        <h1 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
          {user?.name || "User"}
        </h1>

        {/* EMAIL */}
        <p className="text-gray-500 dark:text-gray-400 break-all">
          {user?.email}
        </p>

        {/* ROLE BADGE (optional future use) */}
        <div className="mt-3">
          <span className="px-3 py-1 text-sm bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full">
            Active User
          </span>
        </div>

        {/* INFO BOX */}
        <div className="mt-6 text-left space-y-3 text-sm">

          <div className="flex justify-between border-b pb-2 dark:border-slate-700">
            <span className="text-gray-500">User ID</span>
            <span className="text-gray-700 dark:text-gray-200">
              {user?.id || "N/A"}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2 dark:border-slate-700">
            <span className="text-gray-500">Account Type</span>
            <span className="text-gray-700 dark:text-gray-200">
              Student / Tutor
            </span>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex flex-col gap-3">

          <button
            onClick={() => router.push("/my-tutors")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            My Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}