"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  Sun,
  Moon,
  UserCircle,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  // LOGOUT
  const handleLogout = async () => {
    await authClient.signOut();

    toast.success("Logout successful");

    router.push("/login");
    router.refresh();
  };

  // NAV LINK STYLE
  const navLinkClass = (path) =>
    `relative transition-all duration-300 hover:text-green-600 whitespace-nowrap ${
      pathname === path
        ? "text-green-600 font-semibold"
        : "text-slate-700 dark:text-slate-200"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* MAIN NAVBAR */}
        <div className="grid grid-cols-3 items-center h-16">

          {/* LEFT LOGO */}
          <div className="justify-self-start">
            <Link href="/">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-green-600">
                  MediQueue
                </h1>

                <p className="text-[11px] text-gray-500 dark:text-gray-400 -mt-1">
                  Tutor Booking Platform
                </p>
              </div>
            </Link>
          </div>

          {/* CENTER NAV */}
          <div className="hidden md:flex items-center justify-center gap-5 text-[15px] font-medium whitespace-nowrap">

            <Link href="/" className={navLinkClass("/")}>
              Home
            </Link>

            <Link href="/tutors" className={navLinkClass("/tutors")}>
              Tutors
            </Link>

            {/* BEFORE LOGIN */}
            {!user && (
              <>
                <Link
                  href="/services"
                  className={navLinkClass("/services")}
                >
                  Services
                </Link>

                <Link
                  href="/about"
                  className={navLinkClass("/about")}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className={navLinkClass("/contact")}
                >
                  Contact
                </Link>
              </>
            )}

            {/* AFTER LOGIN */}
            {user && (
              <>
                <Link
                  href="/add-tutor"
                  className={navLinkClass("/add-tutor")}
                >
                  Add Tutor
                </Link>

                <Link
                  href="/my-tutors"
                  className={navLinkClass("/my-tutors")}
                >
                  My Tutors
                </Link>

                <Link
                  href="/booked-sessions"
                  className={navLinkClass("/booked-sessions")}
                >
                  Booked Sessions
                </Link>
              </>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4 justify-self-end">

            {/* THEME TOGGLE */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="p-2 rounded-full border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              >
                {theme === "dark" ? (
                  <Sun
                    size={18}
                    className="text-yellow-400"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="text-slate-700"
                  />
                )}
              </button>
            )}

            {/* USER */}
            {user ? (
              <div className="relative">

                {/* PROFILE BUTTON */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={
                      user?.image ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-green-500 object-cover shadow-sm"
                  />
                </button>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">

                    {/* USER INFO */}
                    <div className="px-4 py-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">

                      <h3 className="font-semibold text-slate-800 dark:text-white">
                        {user?.name || "User"}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user?.email}
                      </p>

                    </div>

                    {/* PROFILE */}
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                    >
                      <UserCircle size={18} />
                      Profile
                    </Link>

                    {/* DASHBOARD */}
                    <Link
                      href="/my-tutors"
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>

                    {/* LOGOUT */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">

                <Link href="/login">
                  <button className="px-5 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-slate-800 transition font-medium">
                    Login
                  </button>
                </Link>

                <Link href="/signup">
                  <button className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition font-medium shadow-sm">
                    Register
                  </button>
                </Link>

              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden justify-self-end">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-slate-700 dark:text-white"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 px-4 py-5 space-y-5">

          {/* LINKS */}
          <div className="flex flex-col gap-4 font-medium">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass("/")}
            >
              Home
            </Link>

            <Link
              href="/tutors"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass("/tutors")}
            >
              Tutors
            </Link>

            {!user && (
              <>
                <Link
                  href="/services"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass("/services")}
                >
                  Services
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass("/about")}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass("/contact")}
                >
                  Contact
                </Link>
              </>
            )}

            {user && (
              <>
                <Link
                  href="/add-tutor"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass("/add-tutor")}
                >
                  Add Tutor
                </Link>

                <Link
                  href="/my-tutors"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass("/my-tutors")}
                >
                  My Tutors
                </Link>

                <Link
                  href="/booked-sessions"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass("/booked-sessions")}
                >
                  Booked Sessions
                </Link>
              </>
            )}
          </div>

          {/* THEME */}
          {mounted && (
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-slate-700 py-2 rounded-lg text-slate-700 dark:text-slate-200"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={18} />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} />
                  Dark Mode
                </>
              )}
            </button>
          )}

          {/* MOBILE USER */}
          {user ? (
            <div className="border-t border-gray-200 dark:border-slate-700 pt-4 space-y-4">

              <div className="flex items-center gap-3">

                <img
                  src={
                    user?.image ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                />

                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white">
                    {user?.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>

              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="flex flex-col gap-3">

              <Link href="/login">
                <button className="w-full border border-green-600 text-green-600 py-2 rounded-lg">
                  Login
                </button>
              </Link>

              <Link href="/signup">
                <button className="w-full bg-green-600 text-white py-2 rounded-lg">
                  Register
                </button>
              </Link>

            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;