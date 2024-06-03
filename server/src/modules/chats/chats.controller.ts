import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getChatByMembers(
        @Request() req,
        @Query("receiver_id") receiverId: string
    ) {
        return await this.chatsService.getByMembers(req.user._id, receiverId)
    }
}
