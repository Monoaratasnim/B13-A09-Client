import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/providers/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "MediQueue",
  description: "Tutor Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable}`}
    >
      <body className="font-[family-name:var(--font-inter)]">
        <ThemeProvider>
          <Navbar />
          {children}
               <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}