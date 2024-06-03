import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Chat } from "src/modules/chats/schemas/chat.schema";
import { User } from "src/modules/users/schemas/user.schema";

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
    @Prop({ 
        type: mongoose.Schema.Types.ObjectId, ref: "Chat",
        required: true
    })
    chat: Chat;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    })
    sender: User;

    @Prop({
        type: String,
        required: true
    })
    body: String;
}

export const MessageSchema = SchemaFactory.createForClass(Message);