"use client";

import { useState, useEffect } from "react";
import { Button, Avatar } from "@heroui/react";
import Link from "next/link";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully!");
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md border-b dark:border-slate-700 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-600">
            MediQueue
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-200">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/tutors">Tutors</Link></li>

          {!user && (
            <>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </>
          )}

          {user && (
            <>
              <li><Link href="/add-tutors">Add Tutors</Link></li>
              <li><Link href="/my-tutors">My Tutors</Link></li>
              <li><Link href="/booked-sessions">My Booked Sessions</Link></li>
            </>
          )}
        </ul>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">

          {/* THEME TOGGLE */}
          {mounted && (
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="p-2 rounded-full border dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          {/* AUTH */}
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <Avatar.Image
                  referrerPolicy="no-referrer"
                  alt={user.name}
                  src={user?.image}
                />
                <Avatar.Fallback>
                  {user.name?.charAt(0)}
                </Avatar.Fallback>
              </Avatar>

              <Button
                onPress={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                  Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden dark:text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-5 bg-white dark:bg-slate-900">

          <ul className="flex flex-col gap-4 font-medium text-gray-700 dark:text-gray-200">
            <li>
              <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            </li>
            <li>
              <Link href="/tutors" onClick={() => setOpen(false)}>Tutors</Link>
            </li>

            {!user && (
              <>
                <li>
                  <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
                </li>
                <li>
                  <Link href="/about" onClick={() => setOpen(false)}>About</Link>
                </li>
                <li>
                  <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li>
                  <Link href="/add-tutors" onClick={() => setOpen(false)}>Add Tutors</Link>
                </li>
                <li>
                  <Link href="/my-tutors" onClick={() => setOpen(false)}>My Tutors</Link>
                </li>
                <li>
                  <Link href="/booked-sessions" onClick={() => setOpen(false)}>My Booked Sessions</Link>
                </li>
              </>
            )}
          </ul>

          <div className="flex flex-col gap-3 mt-5">

            {/* THEME */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="flex items-center justify-center gap-2 border py-2 rounded-lg"
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={18} /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={18} /> Dark Mode
                  </>
                )}
              </button>
            )}

            {/* AUTH MOBILE */}
            {user ? (
              <div className="flex flex-col items-center gap-3">

                <Avatar>
                  <Avatar.Image
                    referrerPolicy="no-referrer"
                    alt={user.name}
                    src={user?.image}
                  />
                  <Avatar.Fallback>
                    {user.name?.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>

                <Button
                  onPress={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold w-full"
                >
                  Logout
                </Button>

              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login">
                  <Button className="bg-blue-500 text-white w-full">
                    Login
                  </Button>
                </Link>

                <Link href="/signup">
                  <Button className="bg-green-500 text-white w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;