import { UserRound, HeartPulse } from "lucide-react";
import "../styles/MessageBubble.scss";

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`message-row ${
        isUser ? "user-message" : "assistant-message"
      }`}
    >
      {!isUser && (
        <div className="message-avatar">
          <HeartPulse size={18} />
        </div>
      )}

      <div className="message-content">
        {message.content}
      </div>

      {isUser && (
        <div className="message-avatar user-avatar">
          <UserRound size={18} />
        </div>
      )}
    </div>
  );
}

export default MessageBubble;