
import { useEffect, useRef } from "react";
import {
  HeartPulse,
  BookOpen,
  FileText,
  Search,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import "../styles/ChatWindow.scss";

const suggestedPrompts = [
  {
    id: 1,
    title: "Healthcare knowledge",
    description: "Explore healthcare concepts and terminology.",
    icon: BookOpen,
    prompt: "Help me understand healthcare terminology.",
  },
  {
    id: 2,
    title: "Policies & guidelines",
    description: "Find information about policies and procedures.",
    icon: FileText,
    prompt: "Help me find healthcare policies and guidelines.",
  },
  {
    id: 3,
    title: "Claims information",
    description: "Learn about claims processes and documentation.",
    icon: Search,
    prompt: "Explain the healthcare claims process.",
  },
  {
    id: 4,
    title: "Benefits & coverage",
    description: "Explore benefits, eligibility, and coverage.",
    icon: ClipboardList,
    prompt: "Explain healthcare benefits and coverage.",
  },
];

function ChatWindow({ messages, isTyping, onSelectPrompt }) {

 const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (messages.length > 0) {
    return (
      <section className="chat-window conversation-window">
        <div className="message-list">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </section>
    );
  }
  
  return (
    <section className="chat-window">
      <div className="welcome-content">
        <div className="welcome-icon">
          <HeartPulse size={32} strokeWidth={1.8} />
        </div>

        <p className="welcome-eyebrow">YOUR HEALTHCARE ASSISTANT</p>

        <h1>
          How can I help you <span>today?</span>
        </h1>

        <p className="welcome-description">
          Explore healthcare knowledge, policies, and resources.
          Choose a topic below or start with your own question.
        </p>

        <div className="suggested-prompts">
          {suggestedPrompts.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className="prompt-card"
                onClick={() => onSelectPrompt?.(item.prompt)}
                type="button"
              >
                <div className="prompt-card-top">
                  <span className="prompt-icon">
                    <Icon size={21} strokeWidth={1.8} />
                  </span>

                  <ArrowRight
                    className="prompt-arrow"
                    size={18}
                  />
                </div>

                <span className="prompt-title">{item.title}</span>

                <span className="prompt-description">
                  {item.description}
                </span>
              </button>
            );
          })}
        </div>

        <p className="welcome-note">
          <HeartPulse size={15} />
          Healthcare information and support, all in one place.
        </p>
      </div>
    </section>
  );
}

export default ChatWindow;
