"use client"
import { authClient } from "@/lib/auth-client";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { Card } from '@heroui/react';
import toast from "react-hot-toast";
import { redirect } from "next/navigation";


const SignUpPage = () => {
   const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const { data, error } = await authClient.signUp.email({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    image: formData.get("image") || ""
  });

  if (data) {
    toast.success("Account created successfully!");
    redirect("/login");
  }

  if (error) {
    toast.error(error.message || "Something went wrong!");
  }
};
    return (
        <div className="flex flex-col flex-1 max-w-7xl items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-6">Create your account</h1>
           <p className="text-gray-600 dark:text-gray-400">Start your learning journey with trusted tutors in one place.</p>
            <Card className="border  w-full max-w-md mt-6 mb-10 p-6">
                <Form onSubmit = {onSubmit} className="flex w-96 flex-col gap-4">
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
        <Label>Name</Label>
        <Input placeholder="Enter your name" />
        <FieldError />
      </TextField><TextField
                isRequired
                name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
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
                name="image"
        type="url"
        validate={(value) => {
          if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(value)) {
            return "Please enter a valid URL";
          }
          return null;
        }}
      >
        <Label>Image URL</Label>
        <Input placeholder="Image URL" />
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
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button className="w-full bg-blue-500 text-white hover:bg-blue-600" type="submit">
     
        Create Account
        </Button>
       
      </div>
    </Form>
        </Card>
        </div>
    );
};

export default SignUpPage;