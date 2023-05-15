import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto):Promise<any> {
        const user = await this.userModel.findOne({email: createUserDto.email});
        if(user){
            return { user };
        }
        const newUser = await new this.userModel(createUserDto);
        newUser.save();

        return {
            user: newUser,

        }
    }

    async findAll() {
        const users = await this.userModel.find();
        return users;
    }

    async findOne(email: string):Promise<CreateUserDto>{

        const user = await this.userModel.findOne({ email });
        if(user){
            return user
        }
        return null
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
