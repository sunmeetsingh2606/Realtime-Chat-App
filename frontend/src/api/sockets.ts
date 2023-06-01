import { io } from 'socket.io-client';
import { IChatMessage, sendMessage } from '../interfaces/chatMessage';


const socket = io(`${import.meta.env.VITE_API_ADDRESS}`);

export function listenToMessages(callbackFunction: (messages: IChatMessage[]) => void){
    socket.on('message', (data) => {
        callbackFunction(data);
    });

}


export function sendMessage(message: sendMessage) {
    socket.emit('message', message);
}