import { Document } from "mongoose";

export interface IUser extends Document {
    readonly login: string;
    readonly passwordHash: string;
    readonly firstName: string;
    readonly secondName: string;
    readonly avatarUrl?: string;
}