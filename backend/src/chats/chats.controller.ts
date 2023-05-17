import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User, IRequestUser } from 'src/shared/decorators/auth-user.decorator';
@Controller('chats')
@UseGuards(AuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async create(@Body() createChatDto: CreateChatDto) {
    const createChatroom = await this.chatsService.create(createChatDto);
    return {
        message: "Chat Room created Successfully!",
        data: createChatroom
    }
  }


  /**
   * 
   * @param user
   * @returns all rooms which have that user in it
   */

  @Get()
  async findAll(@User() user: IRequestUser){
    const userChatrooms = await this.chatsService.findAll(user._id);

    return {
        message: 'all rooms found!',
        data: userChatrooms
    }
  }

  @Get('/findAllRooms')
  async findAllRooms() {
    const rooms = await this.chatsService.findAllRooms();
    return {
        message: 'All Rooms',
        data: rooms
    }
  }
  //return 1 room with corresponding id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}
