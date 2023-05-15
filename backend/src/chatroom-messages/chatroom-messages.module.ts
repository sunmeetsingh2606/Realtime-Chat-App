import { Module } from '@nestjs/common';
import { ChatroomMessagesService } from './chatroom-messages.service';
import { ChatroomMessagesController } from './chatroom-messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
    ChatroomMessage,
    ChatroomMessageSchema,
} from './entities/chatroom-message.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ChatroomMessage.name, schema: ChatroomMessageSchema },
        ]),
    ],
    controllers: [ChatroomMessagesController],
    providers: [ChatroomMessagesService],
})
export class ChatroomMessagesModule {}
