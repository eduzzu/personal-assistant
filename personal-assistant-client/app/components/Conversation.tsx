"use client";

import { setSelectedConversation } from "../state/slices/conversationsSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";

export default function Conversation({ conversation }: { conversation: any }) {
  const dispatch = useAppDispatch();
  const selectedConversation = useAppSelector(
    (state) => state.conversations.selectedConversation
  );

  const handleClick = () => {
    dispatch(setSelectedConversation(conversation));
  };

  return (
    <div 
    className="w-full p-1 cursor-pointer rounded-xl"
    onClick={handleClick}
    >
      <p
        key={conversation._id}
        className={ selectedConversation?._id === conversation._id ? `w-full bg-red-700 text-white p-2 rounded-xl` : `w-full hover:bg-red-700 hover:text-white p-2 rounded-xl`}
      >
        {conversation.name.slice(12, 37)}
      </p>
    </div>
  );
}
