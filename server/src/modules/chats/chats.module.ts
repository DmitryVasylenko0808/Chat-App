import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { ChatsGateway } from './chats.gateway';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessagesService } from './messages.service';
import { ChatsController } from './chats.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema }, 
      { name: Message.name, schema: MessageSchema }
    ])
  ],
  providers: [ChatsService, MessagesService, ChatsGateway],
  controllers: [ChatsController]
})
export class ChatsModule {}
