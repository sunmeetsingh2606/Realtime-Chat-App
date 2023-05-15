import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true })
    displayName: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, default: null })
    photoURL: string;

    @Prop({ type: Date, default: null })
    deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
