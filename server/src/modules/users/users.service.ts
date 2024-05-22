import { Inject, Injectable } from '@nestjs/common';
import { USER_MODEL } from './constants';
import { Model } from 'mongoose';
import { IUser, IUserCreate } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_MODEL)
        private readonly userModel: Model<IUser>
    ) {}

    async getOneByLogin(login: string) {
        const user = await this.userModel.findOne({ login });

        return user;
    }

    async getOneById(id: string) {
        const user = await this.userModel.findById(id);

        return user;
    }

    async create(data: IUserCreate) {
        const user = new this.userModel(data);
        
        return user.save();
    }
}
