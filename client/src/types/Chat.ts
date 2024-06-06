import { User } from "./User";

export type Chat = {
    _id: string;
    members: User[];
}