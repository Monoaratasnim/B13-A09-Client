"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Card,
 
} from "@heroui/react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();

  // EMAIL SIGNUP
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { data, error } = await authClient.signUp.email({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      image: formData.get("image") || "",
    });

    if (data) {
      toast.success("Account created successfully!");
      router.push("/login");
    }

    if (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  // GOOGLE SIGNUP
  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-800">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-green-600 to-emerald-700 text-white p-12 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Join EduQueue Today
            </h1>

            <p className="text-green-50 text-lg leading-8 mb-8">
              Connect with expert tutors, schedule learning sessions,
              and grow your skills with a smarter online learning
              experience.
            </p>

            <div className="space-y-5">

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <p>Verified Expert Tutors</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <p>Easy Session Booking</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <p>Flexible Learning Schedule</p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-5 sm:p-8 lg:p-12">

          <Card className="w-full shadow-none border-none bg-transparent">
           

              {/* MOBILE LOGO */}
              <div className="lg:hidden text-center mb-8">

                <h1 className="text-4xl font-bold text-green-600">
                  EduQueue
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Smart Tutor Booking Platform
                </p>

              </div>

              {/* HEADER */}
              <div className="mb-8">

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                  Create Account
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Start your learning journey with trusted tutors.
                </p>

              </div>

              {/* FORM */}
              <Form
                onSubmit={onSubmit}
                className="flex flex-col gap-5"
              >

                {/* NAME */}
                <TextField
                  isRequired
                  name="name"
                  type="text"
                  validate={(value) => {
                    if (value.length < 2) {
                      return "Name must be at least 2 characters";
                    }
                    return null;
                  }}
                >
                  <Label className="dark:text-gray-200">
                    Full Name
                  </Label>

                  <Input
                    placeholder="John Doe"
                    className="dark:text-white"
                  />

                  <FieldError />
                </TextField>

                {/* EMAIL */}
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  validate={(value) => {
                    if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        value
                      )
                    ) {
                      return "Please enter a valid email";
                    }
                    return null;
                  }}
                >
                  <Label className="dark:text-gray-200">
                    Email Address
                  </Label>

                  <Input
                    placeholder="john@example.com"
                    className="dark:text-white"
                  />

                  <FieldError />
                </TextField>

                {/* IMAGE URL */}
                <TextField
                  isRequired
                  name="image"
                  type="url"
                  validate={(value) => {
                    if (
                      !/^(https?:\/\/).+/i.test(value)
                    ) {
                      return "Please enter a valid image URL";
                    }
                    return null;
                  }}
                >
                  <Label className="dark:text-gray-200">
                    Profile Image URL
                  </Label>

                  <Input
                    placeholder="https://example.com/profile.jpg"
                    className="dark:text-white"
                  />

                  <FieldError />
                </TextField>

                {/* PASSWORD */}
                <TextField
                  isRequired
                  minLength={8}
                  name="password"
                  type="password"
                  validate={(value) => {
                    if (value.length < 8) {
                      return "Password must be at least 8 characters";
                    }

                    if (!/[A-Z]/.test(value)) {
                      return "Must contain 1 uppercase letter";
                    }

                    if (!/[0-9]/.test(value)) {
                      return "Must contain 1 number";
                    }

                    return null;
                  }}
                >
                  <Label className="dark:text-gray-200">
                    Password
                  </Label>

                  <Input
                    placeholder="Enter your password"
                    className="dark:text-white"
                  />

                  <Description className="text-xs">
                    Minimum 8 characters, 1 uppercase & 1 number
                  </Description>

                  <FieldError />
                </TextField>

                {/* CREATE BUTTON */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 rounded-xl text-base transition-all duration-300 shadow-lg hover:scale-[1.01]"
                >
                  Create Account
                </Button>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 w-full py-2">

                  <div className="flex-1 h-[1px] bg-gray-300 dark:bg-slate-700"></div>

                  <span className="text-sm text-gray-500">
                    OR
                  </span>

                  <div className="flex-1 h-[1px] bg-gray-300 dark:bg-slate-700"></div>

                </div>

                {/* GOOGLE */}
                <Button
                  type="button"
                  variant="bordered"
                  onPress={handleGoogleSignup}
                  className="w-full py-6 rounded-xl font-medium border-gray-300 dark:border-slate-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
                >
                  Continue with Google
                </Button>

              </Form>

              {/* LOGIN */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">

                Already have an account?{" "}

                <Link
                  href="/login"
                  className="text-green-600 hover:underline font-semibold"
                >
                  Login
                </Link>

              </p>

         
          </Card>

        </div>
      </div>
    </section>
  );
};

export default SignUpPage;