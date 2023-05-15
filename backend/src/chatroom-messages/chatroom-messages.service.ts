import { Injectable } from '@nestjs/common';
import { CreateChatroomMessageDto } from './dto/create-chatroom-message.dto';
import { UpdateChatroomMessageDto } from './dto/update-chatroom-message.dto';

@Injectable()
export class ChatroomMessagesService {
  create(createChatroomMessageDto: CreateChatroomMessageDto) {
    return 'This action adds a new chatroomMessage';
  }

  findAll() {
    return `This action returns all chatroomMessages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatroomMessage`;
  }

  update(id: number, updateChatroomMessageDto: UpdateChatroomMessageDto) {
    return `This action updates a #${id} chatroomMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroomMessage`;
  }
}
