import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: [
      {
        sender: { type: String, required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        type: { type: String, enum: ['user', 'AI'], required: true },
        taskId: { type: Types.ObjectId, ref: 'Task' },
      },
    ],
    default: [],
  })
  messages: {
    sender: string;
    content: string;
    timestamp: Date;
    type: 'user' | 'AI';
    taskId?: Types.ObjectId;
  }[];

  @Prop({ type: Date, default: Date.now })
  lastActive: Date;

  @Prop({ type: MongooseSchema.Types.Mixed })
  context?: Record<string, any>;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
