import {
  HeartPulse,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  MessageSquare,
  Settings2,
  UserRound,
} from "lucide-react";

import "../styles/ChatSidebar.scss";

const ChatSidebar = ({
  isOpen,
  onToggle,
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
}) => {
  return (
    <aside
      className={`chat-sidebar ${isOpen ? "expanded" : "collapsed"}`}
    >
      {/* Sidebar top section */}
        <div className={`sidebar-top ${!isOpen ? "collapsed-top" : ""}`}>
        {isOpen && (
            <div className="sidebar-brand">
            <HeartPulse className="brand-icon" size={27} />
            <span>Care Assistant</span>
            </div>
        )}

        <button
            className="icon-button sidebar-toggle"
            onClick={onToggle}
            title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
            {isOpen ? (
            <PanelLeftClose size={21} />
            ) : (
            <PanelLeftOpen size={21} />
            )}
        </button>

        {!isOpen && (
            <HeartPulse className="brand-icon collapsed-brand" size={26} />
        )}
        </div>

      {/* Primary actions */}
      <div className="sidebar-actions">
        <button
          className="sidebar-action new-chat"
          onClick={onNewChat}
          title="New chat"
        >
          <Plus size={20} />
          {isOpen && <span>New chat</span>}
        </button>

        <button
          className="sidebar-action"
          onClick={() => window.alert("Search will be implemented next.")}
          title="Search chats"
        >
          <Search size={20} />
          {isOpen && <span>Search chats</span>}
        </button>
      </div>

      {/* Conversation history */}
      <div className="sidebar-history">
        {isOpen && (
          <p className="sidebar-section-title">
            Recent conversations
          </p>
        )}

        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            className={`conversation-item ${
              activeConversationId === conversation.id
                ? "active"
                : ""
            }`}
            onClick={() => onSelectConversation(conversation.id)}
            title={conversation.title}
          >
            <MessageSquare size={18} />
            {isOpen && (
              <span className="conversation-title">
                {conversation.title}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* User section */}
      <div className="sidebar-footer">
        <button
          className="profile-button"
          title="User profile and settings"
        >
          <span className="profile-avatar">
            <UserRound size={20} />
          </span>

          {isOpen && (
            <>
              <span className="profile-label">
                <strong>User profile</strong>
                <small>Settings & preferences</small>
              </span>
              <Settings2 size={19} className="settings-icon" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default ChatSidebar;
