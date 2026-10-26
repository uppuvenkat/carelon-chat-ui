
import { useRef } from "react";
import { Paperclip, ArrowUp } from "lucide-react";

import "../styles/ChatInput.scss";

function ChatInput({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (disabled) return;

    const message = value.trim();
    if (!message) return;

    onSend(message);
    onChange("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (event) => {
    onChange(event.target.value);

    event.target.style.height = "auto";
    event.target.style.height =
      `${Math.min(event.target.scrollHeight, 160)}px`;
  };

  return (
    <div className="chat-input-area">
      <form
        className="chat-input-box"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask a healthcare-related question..."
          rows={1}
          aria-label="Message"
          disabled={disabled}
        />

        <div className="chat-input-toolbar">
          <button
            type="button"
            className="input-attachment-button"
            title="Attach a file (coming soon)"
            aria-label="Attach a file (coming soon)"
            disabled
          >
            <Paperclip size={19} />
          </button>

          <button
            type="submit"
            className="input-send-button"
            disabled={!value?.trim() || disabled}
            aria-label="Send message"
            title="Send message"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </form>

      {/* <p className="chat-input-disclaimer">
        AI-generated information may require verification.
      </p> */}
    </div>
  );
}

export default ChatInput;
