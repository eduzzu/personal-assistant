"use client";

import { Formik, type FormikHelpers } from "formik"
import { resetPasswordSchema } from "../schemas/ResetPasswordSchema";
import { useState } from "react";
import Image from "next/image";

export default function ResetPasswordRequestForm() {
  const [request, setRequest] = useState(false);

  const sendRequest = async(
    values: { email: string },
    onSubmitProps: FormikHelpers<{ email: string }>
  ) => {
    try {
     const savedRequestResponse = await fetch(
        `${process.env.NEXT_PUBLIC_S_API}/auth/request-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const savedRequest = await savedRequestResponse.json();
      if(!savedRequestResponse.ok) {
        throw new Error(savedRequest.message || "Failed to send the request");
      }
      onSubmitProps.resetForm();
    } catch (error) {
      console.error("Failed to send the request:", error);
    }
  };

  const handleRequestResetPasswordFormSubmit = async (
    values: { email: string },
    onSubmitProps: FormikHelpers<{ email: string }>
  ) => {
    await sendRequest(values, onSubmitProps);
  };
  
  return (
    <Formik
          initialValues={{ email: "" }}
          onSubmit={handleRequestResetPasswordFormSubmit}
          validationSchema={resetPasswordSchema}
        >
          {({ handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
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
                <h1 className="text-center text-xl">Enter your email</h1>
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
              {touched.email && errors.email && <div className="text-red-700 text-sm mt-1">{errors.email}</div>}
            </fieldset>
            <button
              type="submit"
              className="w-full bg-red-700 text-white p-2 rounded-2xl cursor-pointer"
              onClick={() => values.email ? setRequest(true) : setRequest(false)}
            >
              Send
            </button>
            {request && (
              <p className="text-black text-center mt-2">
                If a user with this email exists, you will receive an email shortly!
              </p>
            )}
              </form>
            </div>
          )}
        </Formik>
  );
}