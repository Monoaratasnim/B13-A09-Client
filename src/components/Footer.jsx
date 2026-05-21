import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 mt-20">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              EduQueue
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-7">
              Tutor booking platform where students can find tutors,
              book sessions, and manage learning easily and efficiently.
            </p>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Learning Services
            </h3>

            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>
                <Link href="/tutors" className="hover:text-green-600">
                  Find Tutors
                </Link>
              </li>

              <li>
                <Link href="/add-tutor" className="hover:text-green-600">
                  Become a Tutor
                </Link>
              </li>

              <li>
                <Link href="/booked-sessions" className="hover:text-green-600">
                  Booked Sessions
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-green-600">
                  Online Learning
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Contact
            </h3>

            <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <p>support@eduqueue.com</p>
              <p>+880 1854325678</p>
              <p>Chattogram, Bangladesh</p>
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <a
                href="https://facebook.com"
                target="_blank"
                className="p-3 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-green-600 hover:text-white transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                className="p-3 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-green-600 hover:text-white transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                className="p-3 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-green-600 hover:text-white transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                className="p-3 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-green-600 hover:text-white transition"
              >
                <FaYoutube />
              </a>

            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-200 dark:border-slate-700 mt-10 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} EduQueue – Tutor Booking System. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;