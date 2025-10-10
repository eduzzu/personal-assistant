import ChatWindow from "../components/ChatWindow";
import ConversationsList from "../components/ConversationsList";

export default function Home() {
  return (
     <div className="w-full h-screen flex overflow-y-hidden">
        <ConversationsList />
        <ChatWindow />
    </div>
  );
}