"use client";

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

import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

const SignUpPage = () => {
  const router = useRouter();

  useEffect(() => {
    document.title = "Sign Up | EduQueue";
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const image = formData.get("image") || "";
    const password = formData.get("password");

    try {
      const res = await signUp.email({
        name,
        email,
        password,
        image,
      });

      if (res.error) {
        toast.error(res.error.message || "Signup failed");
        return;
      }

      toast.success("Account created successfully 🎉");
      router.push("/login");

    } catch {
      toast.error("Server error");
    }
  };

 const handleGoogleSignup = async () => {
  try {
    await signIn.social({
      provider: "google",
      callbackURL: "/login",
    });
  } catch (err) {
    console.log(err);
    toast.error("Google login failed!");
  }
};

  const validatePassword = (value) => {
    if (value.length < 6) return "Min 6 characters required";
    if (!/[A-Z]/.test(value)) return "Must contain 1 uppercase letter";
    if (!/[a-z]/.test(value)) return "Must contain 1 lowercase letter";
    return null;
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

      <Card className="w-full max-w-xl p-8 sm:p-10 shadow-2xl rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-2">
          Create Account
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
          Join EduQueue and start your learning journey
        </p>

        <Form onSubmit={onSubmit} className="flex flex-col gap-5">

          {/* NAME */}
          <TextField name="name" isRequired>
            <Label className="dark:text-gray-200">Name</Label>
            <Input className="dark:bg-slate-800 dark:text-white" placeholder="John Doe" />
            <FieldError />
          </TextField>

          {/* EMAIL */}
          <TextField name="email" type="email" isRequired>
            <Label className="dark:text-gray-200">Email</Label>
            <Input className="dark:bg-slate-800 dark:text-white" placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* IMAGE */}
          <TextField name="image">
            <Label className="dark:text-gray-200">Photo URL</Label>
            <Input className="dark:bg-slate-800 dark:text-white" placeholder="https://example.com/photo.jpg" />
            <FieldError />
          </TextField>

          {/* PASSWORD */}
          <TextField
            name="password"
            type="password"
            isRequired
            validate={validatePassword}
          >
            <Label className="dark:text-gray-200">Password</Label>
            <Input className="dark:bg-slate-800 dark:text-white" placeholder="Enter password" />
            <Description className="text-xs text-gray-500 dark:text-gray-400">
              Min 6 chars, 1 uppercase, 1 lowercase
            </Description>
            <FieldError />
          </TextField>

          {/* CREATE BUTTON (CENTERED LOOK) */}
          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              className="w-full sm:w-2/3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Create Account
            </Button>
          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-700" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-700" />
          </div>

          {/* GOOGLE BUTTON (CENTERED MID) */}
          <div className="flex justify-center">
            <Button
              type="button"
              variant="bordered"
              onPress={handleGoogleSignup}
              className="w-full sm:w-2/3 border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              Continue with Google
            </Button>
          </div>

        </Form>

        {/* LOGIN LINK */}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 dark:text-green-400 font-semibold hover:underline">
            Login
          </Link>
        </p>

      </Card>
    </section>
  );
};

export default SignUpPage;