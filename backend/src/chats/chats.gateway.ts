import { OnModuleInit } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class ChatsGateway implements OnModuleInit {
    private messages: string[] = [];


    @WebSocketServer()
    private server:Server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string, @ConnectedSocket() socket: Socket) {
        
        console.log({message},'from', socket.id);
        this.messages.push(message);

        this.server.emit('message', this.messages);
    }

    onModuleInit() {
        this.server.on('connection', (socket) => { 
            console.log(socket.id, 'connected');
        })
    }
}

