
import { useState, useRef } from "react";
import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

import "./styles/global.scss";

const initialConversations = [
  { id: "1", title: "Healthcare policies" },
  { id: "2", title: "Claims information" },
  { id: "3", title: "Benefits and coverage" },
];

function getMockResponse(text) {
  const query = text.toLowerCase();

  if (query.includes("claim")) {
    return "Healthcare claims involve submitting and reviewing requests for payment of covered medical services. The process typically includes claim submission, eligibility verification, claim review, and payment or denial. Specific requirements depend on the health plan.";
  }

  if (query.includes("benefit") || query.includes("coverage")) {
    return "Healthcare benefits describe the medical services covered by a health plan. Coverage may include doctor visits, hospital services, preventive care, and prescription medications. Please check the applicable plan documents for exact coverage and eligibility details.";
  }

  if (query.includes("policy") || query.includes("guideline")) {
    return "Healthcare policies and guidelines help standardize processes, clarify responsibilities, and support compliance. To identify the applicable policy, you would typically need the policy name, business area, or relevant procedure.";
  }

  return "Thanks for your question. I'm currently a demo assistant, so I can show sample responses but cannot retrieve verified Carelon information yet. Once a backend or AI service is connected, this interface can provide responses based on approved information sources.";
}


function generateConversationTitle(text) {
  const cleanedText = text.trim().replace(/\s+/g, " ");

  if (!cleanedText) {
    return "New conversation";
  }

  const words = cleanedText.split(" ");
  const title = words.slice(0, 7).join(" ");

  return title.length > 50
    ? `${title.slice(0, 47)}...`
    : title;
}


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState(
    initialConversations
  );
  const [activeConversationId, setActiveConversationId] =
    useState("1");
 const [message, setMessage] = useState('');
 const [messages, setMessages] = useState([]);
 const [messagesByConversation, setMessagesByConversation] = useState({});
 const [typingConversationId, setTypingConversationId] = useState(null);
 const [isTyping, setIsTyping] = useState(false);
 const isTypingRef = useRef(false);
 const responseTimerRef = useRef(null);

  // const handleNewChat = () => {
  //   const newConversation = {
  //     id: crypto.randomUUID(),
  //     title: "New conversation",
  //   };

  //   setConversations((previous) => [
  //     newConversation,
  //     ...previous,
  //   ]);

  //   setActiveConversationId(newConversation.id);
  //   setMessage("");
  // };

//  const handleSend = (text) => {
//     const newMessage = {
//       id: crypto.randomUUID(),
//       role: "user",
//       content: text,
//     };

//     setMessages((previous) => [...previous, newMessage]);
//   };

//  const handleSend = (text) => {
//   // Prevent another message while the assistant is responding
//   if (isTypingRef.current) return;

//   isTypingRef.current = true;
//   setIsTyping(true);

//   const userMessage = {
//     id: crypto.randomUUID(),
//     role: "user",
//     content: text,
//   };

//   setMessages((previous) => [...previous, userMessage]);

//   responseTimerRef.current = setTimeout(() => {
//     const assistantMessage = {
//       id: crypto.randomUUID(),
//       role: "assistant",
//       content: getMockResponse(text),
//     };

//     setMessages((previous) => [...previous, assistantMessage]);

//     isTypingRef.current = false;
//     setIsTyping(false);
//     responseTimerRef.current = null;
//   }, 1500);
// };

const handleNewChat = () => {
  const newConversation = {
    id: crypto.randomUUID(),
    title: "New conversation",
  };

  setConversations((previous) => [
    newConversation,
    ...previous,
  ]);

  setMessagesByConversation((previous) => ({
    ...previous,
    [newConversation.id]: [],
  }));

  setActiveConversationId(newConversation.id);
  setMessage("");
};



const handleSend = (text) => {
  if (isTypingRef.current || !activeConversationId) return;

  const conversationId = activeConversationId;

  // Generate a title from the first message only.
  setConversations((previous) =>
    previous.map((conversation) => {
      if (conversation.id !== conversationId) {
        return conversation;
      }

      if (conversation.title === "New conversation") {
        return {
          ...conversation,
          title: generateConversationTitle(text),
        };
      }

      return conversation;
    })
  );

  isTypingRef.current = true;
  setIsTyping(true);
  setTypingConversationId(conversationId);

  const userMessage = {
    id: crypto.randomUUID(),
    role: "user",
    content: text,
  };

  setMessagesByConversation((previous) => ({
    ...previous,
    [conversationId]: [
      ...(previous[conversationId] || []),
      userMessage,
    ],
  }));

  responseTimerRef.current = setTimeout(() => {
    const assistantMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: getMockResponse(text),
    };

    setMessagesByConversation((previous) => ({
      ...previous,
      [conversationId]: [
        ...(previous[conversationId] || []),
        assistantMessage,
      ],
    }));

    isTypingRef.current = false;
    setIsTyping(false);
    setTypingConversationId(null);
    responseTimerRef.current = null;
  }, 1500);
};


  return (
    <div className="app-layout">
      {/* <ChatSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((previous) => !previous)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={(id) => {
          setActiveConversationId(id);
          setMessage("");
        }}
      /> */}
      
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
        {/* <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onSelectPrompt={setMessage}
        /> */}
        
      <ChatWindow
        messages={messagesByConversation[activeConversationId] || []}
        isTyping={typingConversationId === activeConversationId}
        onSelectPrompt={setMessage}
      />

        <ChatInput
          value={message}
          onChange={setMessage}
          onSend={handleSend}
          disabled={isTyping}
        />
      </main>
    </div>
  );
}

export default App;
