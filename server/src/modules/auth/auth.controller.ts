import { Body, Controller, Get, HttpCode, HttpStatus, ParseFilePipeBuilder, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign.in.dto';
import { SignUpDto } from './dto/sign.up.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { avatarsStorage } from 'src/multer.config';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("sign-up")
    @UseInterceptors(FileInterceptor("avatarFile", { storage: avatarsStorage }))
    async signUp(
        @Body() body: SignUpDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: "jpeg" })
                .build({ 
                    fileIsRequired: false, 
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY 
                })
        ) file?: Express.Multer.File,
    ) {
        return await this.authService.signUp(body, file?.filename);
    }

    @Post("sign-in")
    @HttpCode(200)
    async signIn(@Body() body: SignInDto) {
        return await this.authService.signIn(body);
    }

    @Get("me")
    @UseGuards(AuthGuard)
    getMe(@Request() req) {
        return req.user;
    }
}
