"use client";

import { useEffect } from "react";
import { IConversation } from "../interfaces/IConversation";
import { setConversations } from "../state/slices/conversationsSlice";
import { setSelectedConversation } from "../state/slices/conversationsSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { closeSidebar } from "../state/slices/uiSlice";

export default function ConversationsList() {
  const convos = useAppSelector((s) => s.conversations.conversations);
  const dispatch = useAppDispatch();
  const selectedConversation = useAppSelector(
    (s) => s.conversations.selectedConversation
  );

  const getConversations = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_S_API}/conversation/all`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      dispatch(setConversations(data));
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  useEffect(() => {
    getConversations();
    const interval = setInterval(() => {
      getConversations();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (convo: IConversation) => {
    dispatch(setSelectedConversation(convo));
    dispatch(closeSidebar());
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 pb-2">
        <h3
          className="text-sm font-semibold cursor-pointer text-red-300"
          onClick={() => dispatch(setSelectedConversation(null))}
        >
          New Conversation
        </h3>
      </div>
      <div className="p-4 pt-2 border-b border-gray-400 text-blue-400">
        <h3 className="text-sm font-semibold">Conversations</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {convos.map((c: IConversation) => (
          <button
            key={c._id}
            onClick={() => handleClick(c)}
            className={`w-full text-left p-3 cursor-pointer transition ${
              selectedConversation?._id === c._id
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="text-sm font-medium text-blue-400">{c.name}</div>
            <div className="text-xs text-red-300">
              {c.messages?.[0]?.content?.slice(0, 40)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
