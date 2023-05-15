import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatroomMessagesService } from './chatroom-messages.service';
import { CreateChatroomMessageDto } from './dto/create-chatroom-message.dto';
import { UpdateChatroomMessageDto } from './dto/update-chatroom-message.dto';

@Controller('chatroom-messages')
export class ChatroomMessagesController {
  constructor(private readonly chatroomMessagesService: ChatroomMessagesService) {}

  @Post()
  create(@Body() createChatroomMessageDto: CreateChatroomMessageDto) {
    return this.chatroomMessagesService.create(createChatroomMessageDto);
  }

  @Get()
  findAll() {
    return this.chatroomMessagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatroomMessagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatroomMessageDto: UpdateChatroomMessageDto) {
    return this.chatroomMessagesService.update(+id, updateChatroomMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatroomMessagesService.remove(+id);
  }
}
