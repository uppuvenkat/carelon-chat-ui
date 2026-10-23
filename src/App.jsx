
import { useState } from "react";

import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

import "./styles/global.scss";

const initialConversations = [
  { id: "1", title: "Healthcare policies" },
  { id: "2", title: "Claims information" },
  { id: "3", title: "Benefits and coverage" },
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState(
    initialConversations
  );
  const [activeConversationId, setActiveConversationId] =
    useState("1");
 const [message, setMessage] = useState('');
 const [messages, setMessages] = useState([]);

  const handleNewChat = () => {
    const newConversation = {
      id: crypto.randomUUID(),
      title: "New conversation",
    };

    setConversations((previous) => [
      newConversation,
      ...previous,
    ]);

    setActiveConversationId(newConversation.id);
    setMessage("");
  };

 const handleSend = (text) => {
    const newMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((previous) => [...previous, newMessage]);
  };

  return (
    <div className="app-layout">
      <ChatSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((previous) => !previous)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={(id) => {
          setActiveConversationId(id);
          setMessage("");
        }}
      />

      <main className="main-content">
        <ChatWindow
          messages={messages}
          onSelectPrompt={setMessage}
        />

        <ChatInput
          value={message}
          onChange={setMessage}
          onSend={handleSend}
        />
      </main>
    </div>
  );
}

export default App;
