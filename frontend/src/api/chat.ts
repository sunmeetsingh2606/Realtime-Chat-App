import { groupChatRoom } from "../interfaces/chatRoom";
import { requestWithToken } from "./requestWithToken";

export const findAllChatRooms = async (token:string) => {

    const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}/chats`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}

export const findAllChatRoomMessages = async (roomId: string) => {

    const token = localStorage.getItem("token");

    console.log({roomId});
    const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}/chats/messages/${roomId}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}


export const createNewChatRoom = async (userId: string) => {
    const data = await requestWithToken(`${import.meta.env.VITE_API_ADDRESS}/chats`, {
        method: "POST",
        headers: {
            'content-type':"application/json"
        },
        body: JSON.stringify({ users: [userId] })
    });
    return data;
}

export const createNewGroupChatRoom = async (users: groupChatRoom) => {
    const data = await requestWithToken(`${import.meta.env.VITE_API_ADDRESS}/chats`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(users)
    });
    return data;
}

export const fetchUsers = async () => {

    const res = await fetch(`${ import.meta.env.VITE_API_ADDRESS }/users`);
    const data = await res.json();
    return data;
}