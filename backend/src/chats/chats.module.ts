import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatroom, ChatroomSchema } from './entities/chatroom.entity';
import {
    ChatroomMessage,
    ChatroomMessageSchema,
} from './entities/chatroom-message.entity';
import { ChatsGateway } from './chats.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Chatroom.name, schema: ChatroomSchema },
            { name: ChatroomMessage.name, schema: ChatroomMessageSchema },
        ]),
    ],
    controllers: [ChatsController],
    providers: [ChatsService, ChatsGateway],
})

export class ChatsModule  {}
