import { date, object, string } from "yup";

export const registerSchema = object({
  firstName: string()
    .min(2, "First Name is too short!")
    .max(50, "First Name is too long!")
    .required("First Name is required."),
  lastName: string()
    .min(2, "Last Name is too short!")
    .max(50, "Last Name is too long!")
    .required("Last Name is required."),
  email: string().email("Invalid email").required("Email is required."),
  password: string()
    .min(8, "Password is too short")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required."),
  dateOfBirth: date()
    .required("Birthdate is required.")
    .max(new Date(new Date().getFullYear() - 14, new Date().getMonth(), new Date().getDate()), "You must be at least 14 years old."),
});