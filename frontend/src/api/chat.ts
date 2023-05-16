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