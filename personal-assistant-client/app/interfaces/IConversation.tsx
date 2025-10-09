export interface IMessage {
  sender: string;
  content: string;
  timestamp: Date;
  type: 'user' | 'AI';
  taskId?: string;
}

export interface IConversation {
  _id: string;
  user: string;
  name: string;
  messages: IMessage[];
  lastActive: Date;
  context?: Record<string, any>;
}