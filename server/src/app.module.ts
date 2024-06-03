import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ChatsModule } from './modules/chats/chats.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/chat_app"), 
    AuthModule,
    UsersModule,
    ChatsModule
  ]
})
export class AppModule {}
