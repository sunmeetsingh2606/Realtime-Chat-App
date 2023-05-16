import { BadRequestException, ConflictException, Injectable, NotFoundException, Query, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Body } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { decode, sign } from 'jsonwebtoken';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { response } from 'express';
import { LoginDto } from './dto/login.dto';

const hashSalts = 10;

@Injectable()
export class AuthService {

    //to check for error handling
    constructor(private readonly usersService: UsersService){}

    async login(loginCreds: LoginDto){

        const user = await this.usersService.findOne(loginCreds.email);
        if (!user) {
            throw new NotFoundException('User not found!');
        }
        const token = sign({ user }, process.env.JWT_SECRET);

        const match = await compare(loginCreds.password, user.password);
        if (!match) throw new UnauthorizedException('Incorrect Password!');

        //removing password from the response user
        //const { password, ...responseUser } = user; this line was causing that problem
        // delete user.password;
        return { user, token }
    }

    async authenticate(token:string ){

        if(!token) throw new BadRequestException('token is required!')
        const decoded = decode(token) as { user:CreateUserDto };

        if(decoded){
            return { user: decoded.user }
        } else {
           throw new UnauthorizedException('Invalid token!')
        }
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
