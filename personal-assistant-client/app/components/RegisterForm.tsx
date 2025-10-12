"use client";

import { Formik, type FormikHelpers } from "formik";
import Link from "next/link";
import { registerSchema } from "../schemas/RegisterSchema";
import { useState } from "react";
import { IRegister } from "../interfaces/IRegister";
import Image from "next/image";

export default function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const initialRegisterValues: IRegister = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: new Date(),
  };

  const register = async (
    values: IRegister,
    onSubmitProps: FormikHelpers<IRegister>
  ) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_S_API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }
      const savedUser = await response.json();
      onSubmitProps.resetForm();
      if (savedUser) {
        <Link href="/" />;
      }
    } catch (error: unknown) {
      alert("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  const handleSubmitRegisterForm = async (
    values: IRegister,
    onSubmitProps: FormikHelpers<IRegister>
  ) => {
    await register(values, onSubmitProps);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Formik
      initialValues={initialRegisterValues}
      onSubmit={handleSubmitRegisterForm}
      validationSchema={registerSchema}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        resetForm,
        touched,
        errors,
      }) => (
        <div className="w-11/12 md:w-4/12 border-1 border-gray-200 rounded-2xl flex justify-center items-center bg-gray-50 p-8">
          <form
            onSubmit={handleSubmit}
            className="grid w-full grid-cols-1 gap-6"
          >
            <div className="flex justify-center items-center gap-1">
              <Image
                src="/personal-assistant-logo.png"
                width={30}
                height={30}
                alt="Personal-Assistant Logo"
                className="border-2 border-gray-300 rounded-full"
              />
              <h1 className="text-center text-xl">Personal-Assistant</h1>
            </div>
            <h1 className="text-center text-xl">
              Welcome to Personal-Assistant
            </h1>
            <fieldset>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded-2xl outline-red-700"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email && (
                <div className="text-red-700 text-sm mt-1">{errors.email}</div>
              )}
            </fieldset>
            <fieldset>
              <div className="relative">
                <input
                  className="w-full p-2 border-2 border-gray-300 rounded-2xl outline-red-700"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-gray-500"
                  tabIndex={-1}
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="text-red-700 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </fieldset>

            <fieldset>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded-2xl outline-red-700"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              {touched.firstName && errors.email && (
                <div className="text-red-700 text-sm mt-1">{errors.email}</div>
              )}
            </fieldset>

            <fieldset>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded-2xl outline-red-700"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              {touched.lastName && errors.lastName && (
                <div className="text-red-700 text-sm mt-1">
                  {errors.lastName}
                </div>
              )}
            </fieldset>

            <fieldset>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded-2xl outline-red-700"
                type="date"
                name="birthDate"
                placeholder="Date of Birth"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.birthDate.toString()}
              />
              {touched.birthDate && errors.birthDate && (
                <div className="text-red-700 text-sm mt-1"></div>
              )}
            </fieldset>

            <button
              type="submit"
              className="w-full bg-blue-400 text-white p-2 rounded-2xl cursor-pointer"
            >
              Register
            </button>
            <div className="flex justify-between">
              <p className="text-sm text-right cursor-pointer text-blue-400">
                <Link href="/">Already have an account? Sign In.</Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
}
