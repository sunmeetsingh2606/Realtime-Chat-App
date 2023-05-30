import { io } from 'socket.io-client';
import { IChatMessage } from '../interfaces/chatMessage';

const socket = io(`${import.meta.env.VITE_API_ADDRESS}`);

export function listenToMessages(callbackFunction: (messages: IChatMessage[]) => void){
    socket.on('message', (data) => {
        callbackFunction(data);
    });

}

export function sendMessage(message: any) {
    socket.emit('message', message);
}