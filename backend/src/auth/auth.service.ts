import { BadRequestException, ConflictException, Injectable, NotFoundException, Query, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Body } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { verify, sign } from 'jsonwebtoken';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { response } from 'express';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

const hashSalts = 10;

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private readonly config: ConfigService){}

    async login(loginCreds: LoginDto){

        const user = await this.usersService.findOne(loginCreds.email);
        if (!user) {
            throw new NotFoundException('User not found!');
        }
        const token = sign({ user: { _id: user._id } }, process.env.JWT_SECRET);

        const match = await compare(loginCreds.password, user.password);
        if (!match) throw new UnauthorizedException('Incorrect Password!');

        return { user, token }
    }

    async authenticate(id: string ){

        const user = await this.usersService.findOneById(id);
        return user
        
    }

    async loginWithGoogle(userCred: CreateUserDto) {
        let user = await this.usersService.findOne(userCred.email);
        if (!user) {
            user = await this.usersService.create(userCred);
        }
        const token = sign({ user }, process.env.JWT_SECRET);
        return { user, token }
    }

    async register(userCred: CreateUserDto){

        let user = await this.usersService.findOne(userCred.email);

        if(user) throw new ConflictException('user already registerd!')

        const hashedPassword = await hash(userCred.password, hashSalts);
        user = await this.usersService.create({ ...userCred, password: hashedPassword });

    }
}
