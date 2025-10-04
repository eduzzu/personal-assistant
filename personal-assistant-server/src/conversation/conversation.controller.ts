import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationsService: ConversationService) {}

  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  async getConversations(@Req() req: any) {
    const userId = req.user.id;
    return this.conversationsService.getConversations(userId);
  }

  @Get(':conversationId')
  @UseGuards(AuthGuard('jwt'))
  async getConversation(
    @Param('conversationId') conversationId: string,
  ) {
    return this.conversationsService.getConversation(conversationId);
  }

@Post('new')
@UseGuards(AuthGuard('jwt'))
async addMessageNewConversation(
  @Req() req,
  @Body('content') content: string,
) {
  return this.conversationsService.createConversationWithFirstMessage(
    req.user.id,
    content,
  );
}

@Post(':conversationId')
@UseGuards(AuthGuard('jwt'))
async addMessageToConversation(
  @Param('conversationId') conversationId: string,
  @Req() req,
  @Body('content') content: string,
) {
  return this.conversationsService.addMessageWithAi(
    conversationId,
    req.user.id,
    content,
  );
}

  @Delete(':conversationId/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteConversation(
    @Req() req,
    @Param('conversationId') conversationId: string,
  ) {
    const userId = req.user.id;
    return this.conversationsService.deleteConversation(userId, conversationId);
  }
}
