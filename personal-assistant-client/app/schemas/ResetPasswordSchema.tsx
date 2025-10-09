import { object, string } from "yup";

export const resetPasswordSchema = object({
  email: string().email("Invalid email").required("Email is required."),
});

export const updatePasswordSchema = object({
 password: string()
    .min(8, "Too short")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required."),
});