import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type ChatroomDocument = HydratedDocument<Chatroom>;

@Schema({ timestamps: true })
export class Chatroom {
    @Prop({ type: Boolean, default: false })
    isGroup: boolean;

    @Prop({ type: String, default: null })
    groupName: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[];
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);
