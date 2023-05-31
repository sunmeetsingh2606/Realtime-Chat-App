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

const fetchUsers = async () => {

    const res = await fetch(`${ import.meta.env.VITE_API_ADDRESS }/users`);
    const data = await res.json();
    return data;
}