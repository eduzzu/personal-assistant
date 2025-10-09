import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Conversation,
  ConversationDocument,
} from 'src/schemas/conversation.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { GroqService } from 'src/services/groq.service';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    private groqService: GroqService,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  getConversations = async (userId: string): Promise<Conversation[]> => {
    const objectId = new Types.ObjectId(userId);

    const conversations = await this.conversationModel
      .find({ user: objectId })
      .sort({ lastActive: -1 })
      .exec();

    return conversations;
  };

  getConversation = async (conversationId: string): Promise<Conversation> => {
    const existingConversation = await this.conversationModel.findOne({
      _id: conversationId,
    });
    if (!existingConversation)
      throw new NotFoundException('Conversation not found.');
    return existingConversation;
  };
  deleteConversation = async (
    userId: string,
    conversationId: string,
  ): Promise<Conversation> => {
    const conversation = await this.conversationModel.findOne({
      _id: conversationId,
    });
    if (!conversation) throw new NotFoundException('Conversation not found.');
    await conversation.deleteOne();
    return conversation;
  };

  addMessageWithAi = async (
    conversationId: string | null,
    userId: string,
    userMessage: string,
  ): Promise<ConversationDocument> => {
    const session = await this.conversationModel.db.startSession();
    session.startTransaction();
    try {
      const conversation = await this.conversationModel.findOne({
        _id: conversationId,
      });
      if (!conversation) {
        throw new NotFoundException('Conversation not found.');
      }
      conversation.messages.push({
        sender: userId,
        content: userMessage,
        timestamp: new Date(),
        type: 'user',
      });

      const contextMessages = conversation.messages.slice(-10).map((msg) => ({
        role: msg.type === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.content,
      }));

      const aiResponse = await this.groqService.getAIResponse(contextMessages);

      conversation.messages.push({
        sender: 'AI',
        content: aiResponse!,
        timestamp: new Date(),
        type: 'AI',
      });
      conversation.lastActive = new Date();
      const savedConversation = await conversation.save({ session });

      await session.commitTransaction();
      session.endSession();
      return savedConversation;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };

  createConversationWithFirstMessage = async (
    userId: string,
    userMessage: string,
  ): Promise<ConversationDocument> => {
    const session = await this.conversationModel.db.startSession();
    session.startTransaction();

    try {
      const user = await this.userModel.findById(userId).session(session);
      if (!user) throw new Error('User not found');

      const conversation = new this.conversationModel({
        user: user._id,
        name: `Conversation ${new Date()}`,
        messages: [
          {
            sender: userId,
            content: userMessage,
            timestamp: new Date(),
            type: 'user',
          },
        ],
        lastActive: new Date(),
      });

      const savedConversation = await conversation.save({ session });

      const aiResponse = await this.groqService.getAIResponse([
        { role: 'user', content: userMessage },
      ]);

      if (aiResponse) {
        savedConversation.messages.push({
          sender: 'AI',
          content: aiResponse,
          timestamp: new Date(),
          type: 'AI',
        });
        await savedConversation.save({ session });
      }

      user?.conversations!.push(savedConversation);
      await user.save({ session });

      await session.commitTransaction();
      session.endSession();

      return savedConversation;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
}
