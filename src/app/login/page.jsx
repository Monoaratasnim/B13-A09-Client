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

const LoginPage = () => {

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    console.log(data, error);

    if (data) {
      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }

    if (error) {
      toast.error(error.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col flex-1 max-w-7xl items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-6">
        Login to your account
      </h1>

      <p className="text-gray-600 dark:text-gray-400">
        Continue your learning journey with trusted tutors in one place.
      </p>

      <Card className="border w-full max-w-md mt-6 mb-10 p-6">

        <Form
          onSubmit={onSubmit}
          className="flex w-full flex-col gap-4"
        >

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label>Email</Label>

            <Input placeholder="john@example.com" />

            <FieldError />
          </TextField>

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
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label>Password</Label>

            <Input placeholder="Enter your password" />

            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>

            <FieldError />
          </TextField>

          <Button
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            type="submit"
          >
            Login
          </Button>

        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;