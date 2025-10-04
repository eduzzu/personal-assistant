import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Conversation } from './conversation.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User{

    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true, select: false})
    password: string;

    @Prop({required: true})
    birthDate: Date

    @Prop({required: true, default: 'USER'})
    role: 'USER' | 'ADMIN';

    @Prop({type: [{type: Types.ObjectId, ref: Conversation.name}]})
    conversations?: Conversation[]

};

export const UserSchema = SchemaFactory.createForClass(User);