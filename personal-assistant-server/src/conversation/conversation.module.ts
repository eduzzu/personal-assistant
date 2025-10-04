import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from 'src/schemas/conversation.schema';
import { AuthModule } from 'src/auth/auth.module';
import { GroqService } from 'src/services/groq.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Conversation.name, schema: ConversationSchema}]), AuthModule],
  providers: [ConversationService, GroqService],
  controllers: [ConversationController],
  exports: [ConversationService]
})
export class ConversationModule {}
