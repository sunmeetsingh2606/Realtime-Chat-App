import { IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    displayName: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    photoURL: string;
}
