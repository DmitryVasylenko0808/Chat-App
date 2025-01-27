import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign.in.dto';
import { SignUpDto } from './dto/sign.up.dto';
import { UsersService } from '../users/users.service';
import { User, UserDocument } from '../users/schemas/user.schema';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}
    
    async signUp(body: SignUpDto, fileName?: string) {
        const { login, password, firstName, secondName } = body;

        const existedUser = await this.userService.getOneByLogin(login);

        if (existedUser) {
            throw new BadRequestException("User with this login is already exists");
        }

        const hash = await bcrypt.hash(password, 10);
        const createUserData: User = {
            login,
            passwordHash: hash,
            firstName,
            secondName,
            avatarUrl: fileName
        };
        const user = await this.userService.create(createUserData);

        const token = await this.generateToken(user);

        return { token };
    }

    async signIn(body: SignInDto) {
        const { login, password } = body;

        const user = await this.userService.getOneByLogin(login);

        if (!user) {
            throw new BadRequestException("Invalid login or password");
        }

        const isValidPass = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPass) {
            throw new BadRequestException("Invalid login or password");
        }

        const token = await this.generateToken(user);

        return { token };
    }
    
    private async generateToken(user: UserDocument) {
        const { passwordHash, _id, login, firstName, secondName, avatarUrl } = user;

        const token = await this.jwtService.signAsync({
            _id,
            login,
            firstName,
            secondName,
            avatarUrl
        });

        return token;
    }
}
