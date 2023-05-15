import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomMessageDto } from './create-chatroom-message.dto';

export class UpdateChatroomMessageDto extends PartialType(CreateChatroomMessageDto) {}
