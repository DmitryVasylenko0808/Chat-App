import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schemas/chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatsService {
    constructor(
        @InjectModel(Chat.name) 
        private readonly chatModel: Model<Chat>
    ) {}

    async get(userId: string) {
        const chats = await this.chatModel
            .find({
                members: { $in: [userId] }
            })
            .populate("members", "-passwordHash");

        return chats;
    }

    async getByMembers(firstMemberId: string, secondMemberId: string) {
        const chat = await this.chatModel.findOne({
            members: { 
                $all: [firstMemberId, secondMemberId] 
            } 
        });

        return chat;
    }

    async getById(chatId: string) {
        const chat = await this.chatModel
            .findById(chatId)
            .populate("members", "-passwordHash");

        return chat;
    }

    async create(firstUserId: string, secondUserId: string) {
        const chat = new this.chatModel({
            members: [firstUserId, secondUserId]
        });

        return chat.save();
    }
}
