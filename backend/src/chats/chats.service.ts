import { ConflictException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chatroom } from './entities/chatroom.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatroomMessage } from './entities/chatroom-message.entity';

@Injectable()
export class ChatsService {

    constructor(@InjectModel(Chatroom.name) private chatroomModel: Model<Chatroom>, @InjectModel(ChatroomMessage.name) private readonly chatroomMessageModel: Model<ChatroomMessage>){}
    
  async create(createChatDto: CreateChatDto, userId: string) {


    //if chatroom with both users exists and it is not group chat then dont 
    //create new room
    const chatRooms = await this.findOneRoomWithAllUsers( createChatDto.users );
    if(chatRooms && !chatRooms.isGroup) throw new ConflictException('Room already exists');
    
    const newChatRoom = await new this.chatroomModel({
        ...createChatDto,
        users: [...createChatDto.users, userId]
    });
    newChatRoom.save();

    return newChatRoom
    
  }

  async findRoomChatMessages(chatRoomId: string){
    const messages = await this.chatroomMessageModel.find({ chatroom: chatRoomId});
    return messages
  }

  async findAll(id: string) {
    const userChatRooms = await this.chatroomModel.find({ users: { $in: id } }).populate("users", "displayName email photoURL");
    return userChatRooms

  }

  async findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  /**
   * to find a chatroom with both users, basically for verification purposes
   * to see if the chatroom is already created
   */
  async findOneRoomWithAllUsers(id: string[]){
    const chatroom = await this.chatroomModel.findOne({ users: { $all: id}});
    return chatroom;
  }


  async findAllRooms() {
    const rooms = await this.chatroomModel.find({}).populate("users", "displayName");
    return rooms
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
