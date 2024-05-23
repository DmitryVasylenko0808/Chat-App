import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { WsAuthGuard } from '../auth/ws-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get("search")
    @UseGuards(WsAuthGuard)
    async search(@Query() query: { value: string }) {
        return await this.userService.search(query.value);
    }
}
