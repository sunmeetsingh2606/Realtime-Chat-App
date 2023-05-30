import { OnModuleInit } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatroomMessage } from './entities/chatroom-message.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class ChatsGateway implements OnModuleInit {


    constructor(@InjectModel(ChatroomMessage.name) private readonly chatroomMessageModel: Model<ChatroomMessage>){}

    @WebSocketServer()
    private server:Server;

    @SubscribeMessage('message')
    async handleMessage(@MessageBody() message: ChatroomMessage, @ConnectedSocket() socket: Socket) {
        
        const newMessage = await new this.chatroomMessageModel(message);
        await newMessage.save();
        const messages = await this.chatroomMessageModel.find({ chatroom: newMessage.chatroom })

        console.log({newMessage, messages},'from', socket.id);
        this.server.emit('message', messages);
    }

    onModuleInit() {
        this.server.on('connection', (socket) => { 
            console.log(socket.id, 'connected');
        })
    }
}

