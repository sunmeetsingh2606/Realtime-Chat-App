import { Injectable, Query } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Body } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { decode, sign } from 'jsonwebtoken';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { response } from 'express';

const hashSalts = 10;

@Injectable()
export class AuthService {

    //to check for error handling
    constructor(private readonly usersService: UsersService){}

    async login(@Body() loginCreds: { email: string, password: string }){
       try {
        const user = await this.usersService.findOne(loginCreds.email);
        const token = sign({ user }, process.env.JWT_SECRET);
        if(user){
            const match = await compare(loginCreds.password, user.password);
            if(!match) return { message: 'Incorrect Password' };

            //removing password from the response user
            delete user.password;
            return { 
                message: 'Logged in successfully',
                data: { user, token }
            }
        }
        return { message: "user doesnt exist" }
       } catch (err){
        console.error({ err });
        return {
            message: 'There was some error',
            data: err
        }
       }
    }

    async authenticate(@Query('token') token:string ){
        const decoded = decode(token) as { user:CreateUserDto };

        if(decoded){
            return {
                message: "Token verified",
                data: { user: decoded.user }
            }
        } else {
            return { message: 'invalid token... Access denied'}
        }
    }

    async loginWithGoogle(@Body() userCred: CreateUserDto) {
        try {
            if (userCred.email) {
                let user = await this.usersService.findOne(userCred.email);
                if (!user) {
                    user = await this.usersService.create(userCred);
                }
                const token = sign({ user }, process.env.JWT_SECRET);
                return {
                    message: 'signed in successfully',
                    data: { user, token }
                };
            }
        } catch (err){
            console.error({ err });
            return {
                message: 'There was some error',
                data: err
            }
        }
    }

    async register(@Body() userCred: CreateUserDto){
        try {
            let user = await this.usersService.findOne(userCred.email);
            console.log({userCred, user});
            if (!user) {

                const hashedPassword = await hash(userCred.password, hashSalts);
                user = await this.usersService.create({...userCred, password: hashedPassword});

                return {
                    message: 'user registered successfully',
                    data: user
                }
            } else {
                return { message: 'User already registered'}
            }

        } catch(err) {
            return {
                message: 'there was some error',
                data: err,
            }
        }
    }
}
