import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name)
        private readonly messageModel: Model<Message>
    ) {}

    async get(chatId: string) {
        const messages = await this.messageModel.find({ chat: chatId });

        return messages;
    }

    async create(chatId: string, senderId: string, body: string) {
        const message = new this.messageModel({
            chat: chatId,
            sender: senderId,
            body
        });

        return message.save();
    }
}
