import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign.in.dto';
import { SignUpDto } from './dto/sign.up.dto';
import { IUser } from '../users/interfaces/user.interface';
import * as bcrypt from "bcrypt";
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}
    
    async signUp(body: SignUpDto) {
        const { login, password, firstName, secondName } = body;

        const existedUser = await this.userService.getOneByLogin(login);

        if (existedUser) {
            throw new BadRequestException("User with this login is already exists");
        }

        const hash = await bcrypt.hash(password, 10);
        const createUserData = {
            login,
            passwordHash: hash,
            firstName,
            secondName
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
    
    async generateToken(user: IUser) {
        const { _id } = user;
        const token = await this.jwtService.signAsync({ userId: _id });

        return token;
    }
}
