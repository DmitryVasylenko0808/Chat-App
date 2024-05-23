import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User> 
    ) {}

    async getOneByLogin(login: string) {
        const user = await this.userModel.findOne({ login });

        return user;
    }

    async getOneById(id: string) {
        const user = await this.userModel.findById(id);

        return user;
    }

    async create(data: User) {
        const user = new this.userModel(data);
        
        return user.save();
    }
}
