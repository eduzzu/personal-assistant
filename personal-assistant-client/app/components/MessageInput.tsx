import { useAppDispatch, useAppSelector } from "../state/hooks";
import { updateConversation } from "../state/slices/conversationsSlice";
import { useState } from "react";

export default function MessageInput() {
  const dispatch = useAppDispatch();
  const conversation = useAppSelector(
    (state) => state.conversations.selectedConversation
  );
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_S_API}/conversation/${conversation!._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: message }),
      }
    );
    const updatedConversation = await response.json();

    dispatch(updateConversation(updatedConversation));
    setMessage("");
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 border border-gray-400 rounded-full p-2"
        placeholder="Type a message..."
      />
      <button
        type="submit"
        onClick={handleSend}
        className="bg-red-300 text-white rounded-full pt-2 pb-2 pl-4 pr-4 cursor-pointer"
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
  );
}
