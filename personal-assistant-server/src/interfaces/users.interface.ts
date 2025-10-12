import { Conversation } from "src/schemas/conversation.schema";

export interface IUser {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    role: "USER" | "ADMIN";
    conversations?: Conversation[];
}