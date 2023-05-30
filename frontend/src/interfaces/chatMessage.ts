export interface IChatMessage {
    _id: string,
    chatroom: string,
    senderUser: string,
    messageType?: 'message' | 'attachement' | 'voice',
    message: string
}