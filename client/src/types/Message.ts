import { User } from "./User";

export type Message = {
    _id: string;
    chat: string;
    sender: User;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}