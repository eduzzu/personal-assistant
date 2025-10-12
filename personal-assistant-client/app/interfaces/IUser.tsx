export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  role: "USER" | "ADMIN";
}