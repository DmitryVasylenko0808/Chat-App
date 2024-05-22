import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign.in.dto';
import { SignUpDto } from './dto/sign.up.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("sign-up")
    async signUp(@Body() body: SignUpDto) {
        return await this.authService.signUp(body);
    }

    @Post("sign-in")
    async signIn(@Body() body: SignInDto) {
        return await this.authService.signIn(body);
    }
}
