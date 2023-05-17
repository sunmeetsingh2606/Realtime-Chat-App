import { io } from 'socket.io-client';

const socket = io(`${import.meta.env.VITE_API_ADDRESS}`);

export function listenToMessages(fun: (messages: any) => void){
    socket.on('message', (data) => {
        
        fun(data);

    });

}

export function sendMessage(message:string) {
    socket.emit('message', message);
}