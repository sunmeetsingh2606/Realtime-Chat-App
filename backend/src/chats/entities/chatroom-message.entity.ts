import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Chatroom } from 'src/chats/entities/chatroom.entity';
import { User } from 'src/users/entities/user.entity';

export type ChatroomMessageDocument = HydratedDocument<ChatroomMessage>;

@Schema({ timestamps: true })
export class ChatroomMessage {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom' })
    chatroom: Chatroom;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    senderUser: User;

    @Prop({
        type: String,
        required: true,
        enum: ['message', 'attachment', 'voice'],
        default: 'message',
    })
    messageType: string;

    @Prop({ type: String, required: true })
    message: string;
}

export const ChatroomMessageSchema =
    SchemaFactory.createForClass(ChatroomMessage);
