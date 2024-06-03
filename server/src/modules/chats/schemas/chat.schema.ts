import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/modules/users/schemas/user.schema";

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    members: User[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);