"use client";

import ChatWindow from "../components/ChatWindow";
import ConversationsList from "../components/ConversationsList";
import NewConversation from "../components/NewConversation";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { closeSidebar, toggleSidebar } from "../state/slices/uiSlice";

export default function Home() {
  const sidebarOpen = useAppSelector((s) => s.uiSlice.sidebarOpen);
  const conversation = useAppSelector((s) => s.conversations.selectedConversation);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full h-screen flex overflow-hidden bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      <aside
        className={`
          fixed z-40 inset-y-0 left-0 w-72 bg-white border-r shadow-lg transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-none
        `}
      >
        <ConversationsList />
      </aside>

      <main className="flex-1 flex flex-col md:pl-0">
        <div className="md:hidden p-3 border-b bg-white flex items-center justify-between">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Open conversations"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="text-lg font-semibold text-blue-400">Conversations</div>

          <div style={{ width: 40 }} />
        </div>

        <div className="flex-1 flex">
          {conversation ? <ChatWindow /> : <NewConversation />}
        </div>
      </main>
    </div>
  );
}
