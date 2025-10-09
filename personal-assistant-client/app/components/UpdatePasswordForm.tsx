"use client";

import { Formik, type FormikHelpers } from "formik";
import { updatePasswordSchema } from "../schemas/ResetPasswordSchema";
import { useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import Image from "next/image";


export default function UpdatePasswordForm() {
  const [request, setRequest] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const sendRequest = async (
    values: { password: string },
    onSubmitProps: FormikHelpers<{ password: string }>
  ) => {
    try {
      const savedRequestResponse = await fetch(`${process.env.NEXT_PUBLIC_S_API}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        token: token,
        newPassword: values.password,
      }),
      });
      const savedRequest = await savedRequestResponse.json();
      if (!savedRequestResponse.ok) {
        throw new Error(savedRequest.message || "Failed to send the request");
      }
      onSubmitProps.resetForm();
    } catch (error) {
      console.error("Failed to send the request:", error);
    }
  };

  const handleUpdatePasswordFormSubmit = async (
    values: { password: string },
    onSubmitProps: FormikHelpers<{ password: string }>
  ) => {
    await sendRequest(values, onSubmitProps);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Formik
      initialValues={{ password: "" }}
      onSubmit={handleUpdatePasswordFormSubmit}
      validationSchema={updatePasswordSchema}
    >
      {({ handleSubmit, handleChange, handleBlur, values , touched, errors}) => (
        <div className="w-4/12 border-1 border-gray-200 rounded-2xl flex justify-center items-center bg-gray-50 p-8">
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
            <h1 className="text-center text-xl">Enter your new password</h1>
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
              {touched.password && errors.password && <div className="text-red-700 text-sm mt-1">{errors.password}</div>}
            </fieldset>{" "}
            <button
              type="submit"
              className="w-full bg-red-700 text-white p-2 rounded-2xl cursor-pointer"
              onClick={() => {setRequest(true) 
                setTimeout(() => {redirect("/");}, 2000);
                 }}
            >
              Send
            </button>
            {request && (
              <p className="text-green-600 text-center mt-2">
                Password updated successfully! You will be redirected to the login page shortly.
              </p>
            )}
          </form>
        </div>
      )}
    </Formik>
  );
}