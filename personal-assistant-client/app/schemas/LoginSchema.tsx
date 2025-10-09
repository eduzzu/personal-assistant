import { object, string } from "yup";

export const loginSchema = object({
  email: string().email("Invalid email.").required("Email is required."),
  password: string()
    .min(8, "Password is too short")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required."),
});