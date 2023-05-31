import { User } from "src/users/entities/user.entity"
import { ArrayMinSize, IsBoolean, IsObject, IsOptional, ValidateIf, IsArray, ValidateNested } from "class-validator"

export class CreateChatDto {

    @IsOptional()
    @IsBoolean()
    isGroup: boolean
    
    @ValidateIf( chatroom => chatroom.isGroup === true)
    groupName: string

    @ArrayMinSize(1)
    users: string[]
}
