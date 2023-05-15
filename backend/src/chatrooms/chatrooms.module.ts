import { Module } from '@nestjs/common';
import { ChatroomsService } from './chatrooms.service';
import { ChatroomsController } from './chatrooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatroom, ChatroomSchema } from './entities/chatroom.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Chatroom.name, schema: ChatroomSchema },
        ]),
    ],
    controllers: [ChatroomsController],
    providers: [ChatroomsService],
})
export class ChatroomsModule {}
