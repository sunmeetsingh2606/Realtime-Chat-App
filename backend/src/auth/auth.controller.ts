import { Body, Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { IRequestUser, User } from 'src/shared/decorators/auth-user.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() userCred: LoginDto){
        const loginData = await this.authService.login(userCred);
        return {
            message: 'Logged in successfully',
            data: loginData
        }
    }
    
    @UseGuards(AuthGuard)
    @Get('authenticate')
    async authenticate(@User() user:IRequestUser){
        const authenticate = await this.authService.authenticate(user._id);
        return {
            message: 'Token verified',
            data: authenticate
        }
    }

    @Post('/loginWithGoogle')
    async loginWithGoogle(@Body() userCred: CreateUserDto ){
        const loginWithGoogle = await this.authService.loginWithGoogle(userCred);
        return {
            message: "Logged in with google",
            data: loginWithGoogle
        }
    }

    @Post('/register')
    async register(@Body() userCred: CreateUserDto){
        const register = await this.authService.register(userCred);
        return {
            message: 'User registered successfully',
            data: register
        }
    }
}
