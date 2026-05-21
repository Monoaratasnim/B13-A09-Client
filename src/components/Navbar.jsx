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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  };

  const linkClass = (path) =>
    `text-sm font-medium transition hover:text-green-500 ${
      pathname === path
        ? "text-green-500"
        : "text-slate-700 dark:text-slate-200"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP BAR */}
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="flex flex-col leading-tight min-w-fit">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
              EduQueue
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
              Tutor Booking System
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/tutors" className={linkClass("/tutors")}>Tutors</Link>

            {!user ? (
              <>
                <Link href="/services" className={linkClass("/services")}>Services</Link>
                <Link href="/about" className={linkClass("/about")}>About</Link>
                <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
              </>
            ) : (
              <>
                <Link href="/add-tutor" className={linkClass("/add-tutor")}>Add Tutor</Link>
                <Link href="/my-tutors" className={linkClass("/my-tutors")}>My Tutors</Link>
                <Link href="/booked-sessions" className={linkClass("/booked-sessions")}>
                  My Booked Sessions
                </Link>
              </>
            )}
          </div>

          {/* RIGHT SIDE (DESKTOP) */}
          <div className="hidden md:flex items-center gap-3">

            {/* THEME */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full border border-slate-300 dark:border-slate-700"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* AUTH */}
            {isPending ? (
              <div className="w-20 h-9 animate-pulse bg-gray-200 dark:bg-slate-800 rounded-full" />
            ) : user ? (
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)}>
                  <img
                    src={
                      user?.image ||
                      `https://ui-avatars.com/api/?name=${user?.name || "User"}`
                    }
                    className="w-9 h-9 rounded-full border-2 border-green-500"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border rounded-xl shadow-xl overflow-hidden">

                    <div className="p-3 border-b dark:border-slate-700">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <Link href="/profile" className="flex gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                      <UserCircle size={16} /> Profile
                    </Link>

                    <Link href="/my-tutors" className="flex gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut size={16} /> Logout
                    </button>

                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <button className="px-4 py-2 text-sm border border-green-600 text-green-600 rounded-lg">
                    Login
                  </button>
                </Link>

                <Link href="/signup">
                  <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 space-y-3 border-t dark:border-slate-800 bg-white dark:bg-slate-950">

          <div className="flex flex-col gap-3">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/tutors" onClick={() => setMenuOpen(false)}>Tutors</Link>

            {!user ? (
              <>
                <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
                <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              </>
            ) : (
              <>
                <Link href="/add-tutor" onClick={() => setMenuOpen(false)}>Add Tutor</Link>
                <Link href="/my-tutors" onClick={() => setMenuOpen(false)}>My Tutors</Link>
                <Link href="/booked-sessions" onClick={() => setMenuOpen(false)}>My Booked Sessions</Link>
              </>
            )}
          </div>

          {/* MOBILE AUTH */}
          <div className="pt-3 border-t dark:border-slate-800">
            {isPending ? null : user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login">
                  <button className="w-full border py-2 rounded-lg">
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

        </div>
      )}
    </nav>
  );
}