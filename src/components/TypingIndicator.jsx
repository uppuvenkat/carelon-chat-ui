import { HeartPulse } from "lucide-react";
import "../styles/TypingIndicator.scss";

function TypingIndicator() {
  return (
    <div className="message-row assistant-message">
      <div className="message-avatar">
        <HeartPulse size={18} />
      </div>

      <div className="typing-indicator" aria-label="Assistant is typing">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default TypingIndicator;
