export interface IChatMessage {
    chatroom: string,
    senderUser: string,
    messageType?: 'message' | 'attachement' | 'voice',
    message: string
}