"use client";

import { useAppSelector } from '../state/hooks';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import NewConversation from './NewConversation';

export default function ChatWindow() {
  const conversation = useAppSelector((state)=> state.conversations.selectedConversation);

  if (!conversation) return <NewConversation />

  return (
    <div className="flex flex-col w-full scroll-auto h-screen border-2 border-gray-200 rounded pb-12 lg:pb-0 ">
      <div className="p-3">
        <ChatHeader />
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {conversation.messages.map((msg, i) => (
          <div key={i} className={`my-5 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-3 rounded-xl ${msg.type === 'user' ? 'bg-blue-400 text-white' : 'bg-red-300 text-white'}`}>
              {msg.content}
            </span>
          </div>
        ))}
        
      </div>

      <div className="w-full flex-shrink-0 px-4 py-2">
        <MessageInput />
      </div>
    </div>
  );
}
