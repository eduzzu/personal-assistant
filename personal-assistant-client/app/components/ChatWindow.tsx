"use client";

import { useAppSelector } from '../state/hooks';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';

export default function ChatWindow() {
  const conversation = useAppSelector((state)=> state.conversations.selectedConversation);

  if (!conversation) return <div className="flex-1 p-4">Select a conversation</div>;

  return (
    <div className="flex flex-col w-full h-screen border-2 border-gray-200 rounded">
      <div className="p-3">
        <ChatHeader />
      </div>

      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin">
        {conversation.messages.map((msg, i) => (
          <div key={i} className={`my-5 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-3 rounded-xl ${msg.type === 'user' ? 'bg-red-700 text-white' : 'bg-white text-red-700'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full pr-4 pl-4">
        <MessageInput />
      </div>
    </div>
  );
}
