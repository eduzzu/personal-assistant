"use client";

import { useEffect, useState } from "react";
import { IConversation } from "../interfaces/IConversation";
import Conversation from "./Conversation";

export default function ConversationsList() {
    const [conversations, setConversations] = useState([]);

    const getConversations = async () => {
        try{
            const conversationsResponse = await fetch(`${process.env.NEXT_PUBLIC_S_API}/conversation/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
                
            });
            setConversations(await conversationsResponse.json());

        } catch(error) {
            console.error("Failed to fetch conversations:", error);
        }
    }
    useEffect(() => {
        getConversations();
    }, []);
    if(conversations.length === 0) {
        return <p>No conversations found.</p>
    }

    //TODO: start new conversation method

  return (
    <div className="w-1/4 flex flex-col items-start h-screen p-3 bg-white text-red-700 border-2 border-gray-300 gap-1 overflow-y-auto scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-gray-200">
        <h2 className="w-full font-bold p-2 hover:bg-red-700 hover:text-white cursor-pointer rounded-xl">New Conversation</h2>
        <h2 className="w-full p-2 font-bold">Conversations</h2>
        <div className="w-full p-1 cursor-pointer rounded-xl">{conversations.map((c: IConversation) => {
           return <Conversation conversation={c} key={c._id} />
        })}</div>
    </div>
  );
}