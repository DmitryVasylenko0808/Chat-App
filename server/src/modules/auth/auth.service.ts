import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign.in.dto';
import { SignUpDto } from './dto/sign.up.dto';
import { Model } from 'mongoose';
import { IUser } from '../users/interfaces/user.interface';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        @Inject("USER_MODEL")
        private readonly userModel: Model<IUser>,
        private readonly jwtService: JwtService
    ) {}
    
    async signUp(body: SignUpDto) {
        const { login, password, firstName, secondName } = body

        const existedUser = await this.userModel.findOne({ login });

        if (existedUser) {
            throw new BadRequestException("User with this login is already exists");
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            login,
            passwordHash: hash,
            firstName,
            secondName
        });
        await user.save();

        const token = await this.generateToken(user);

        return { token };
    }

    async signIn(body: SignInDto) {
        const { login, password } = body;

        const user = await this.userModel.findOne({ login });

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
