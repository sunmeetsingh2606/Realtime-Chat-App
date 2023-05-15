import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() userCred: { email: string, password: string}){
        return await this.authService.login(userCred);
    }
    
    @Get('authenticate')
    async authenticate(@Query('token') token: string){
        return await this.authService.authenticate(token);
    }

    @Post('/loginWithGoogle')
    async googleLogin(@Body() userCred: CreateUserDto ){
        return await this.authService.loginWithGoogle(userCred);
    }

    @Post('/register')
    async register(@Body() userCred: CreateUserDto):Promise<any>{
        return await this.authService.register(userCred);
    }
}
