"use client";

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import { useAppDispatch } from "../state/hooks";
import { addConversation, setSelectedConversation } from "../state/slices/conversationsSlice";
import { useRouter } from "next/navigation";

export default function NewConversation() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [tempMessage, setTempMessage] = useState("");

  const handleSendFirstMessage = async () => {
    if (!tempMessage.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_S_API}/conversation/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: tempMessage }),
      });

      const newConversation = await res.json();

      dispatch(addConversation(newConversation));
      dispatch(setSelectedConversation(newConversation));

    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full border-2 border-gray-200 rounded">
      <div className="p-3 border-b border-gray-200">
        <ChatHeader />
      </div>

      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin">
        <p className="text-blue-400 font-bold text-center mt-60 text-2xl">How can I help you?</p>
      </div>

      <div className="border-t border-gray-200 px-4 py-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={tempMessage}
            onChange={(e) => setTempMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSendFirstMessage()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-400 rounded-full p-2"
          />
          <button
            type="submit"
            onClick={handleSendFirstMessage}
            className="bg-red-300 text-white p-2 rounded-full pt-2 pb-2 pl-4 pr-4"
          >
            <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
