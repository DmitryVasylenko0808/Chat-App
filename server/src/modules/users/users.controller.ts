import { Controller, Get, Query, UseGuards, Request, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get(":id/details")
    @UseGuards(AuthGuard)
    async getById(@Param("id") id: string) {
        return await this.userService.getOneById(id);
    }

    @Get("search")
    @UseGuards(AuthGuard)
    async search(
        @Request() req,
        @Query() query: { value: string }
    ) {
        return await this.userService.search(query.value, req.user.login);
    }
}
