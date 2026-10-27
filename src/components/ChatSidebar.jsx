import { useState, useRef, useEffect } from "react";
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

import {
  Popper,
  Paper,
  TextField,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  ClickAwayListener,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import "../styles/ChatSidebar.scss";

const ChatSidebar = ({
  isOpen,
  onToggle,
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
}) => {
  const [isFloatingSearchOpen, setIsFloatingSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const searchButtonRef = useRef(null);
  const floatingSearchInputRef = useRef(null);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(searchText.trim().toLowerCase()),
  );

  useEffect(() => {
    if (isFloatingSearchOpen && !isOpen) {
      floatingSearchInputRef.current?.focus();
    }
  }, [isFloatingSearchOpen, isOpen]);

  // Close the floating panel if the sidebar expands.
  useEffect(() => {
    if (isOpen) {
      setIsFloatingSearchOpen(false);
    }
  }, [isOpen]);

  // Close floating search with Escape.
  useEffect(() => {
    if (!isFloatingSearchOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsFloatingSearchOpen(false);
        setSearchText("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFloatingSearchOpen]);

  const handleSelectConversation = (id) => {
    onSelectConversation(id);
    setIsFloatingSearchOpen(false);
    setSearchText("");
  };

  return (
    <aside className={`chat-sidebar ${isOpen ? "expanded" : "collapsed"}`}>
      {/* Sidebar top section */}
      <div className={`sidebar-top ${!isOpen ? "collapsed-top" : ""}`}>
        {isOpen && (
          <div className="sidebar-brand">
            <HeartPulse className="brand-icon" size={27} />
            <span>Care Assistant</span>
          </div>
        )}

        <button
          type="button"
          className="icon-button sidebar-toggle"
          onClick={onToggle}
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <PanelLeftClose size={21} /> : <PanelLeftOpen size={21} />}
        </button>

        {!isOpen && (
          <HeartPulse className="brand-icon collapsed-brand" size={26} />
        )}
      </div>

      {/* Primary actions */}
      <div className="sidebar-actions">
        <button
          type="button"
          className="sidebar-action new-chat"
          onClick={() => {
            setIsFloatingSearchOpen(false);
            setSearchText("");
            onNewChat();
          }}
          title="New chat"
        >
          <Plus size={20} />
          {isOpen && <span>New chat</span>}
        </button>

        {/* Expanded sidebar: persistent inline search */}
        {isOpen ? (
          <div className="sidebar-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search chats..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              aria-label="Search conversations"
            />

            {searchText && (
              <button
                type="button"
                onClick={() => setSearchText("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        ) : (
          /* Collapsed sidebar: search icon */
          <IconButton
            ref={searchButtonRef}
            aria-label="Search chats"
            title="Search chats"
            aria-expanded={isFloatingSearchOpen}
            onClick={() => {
              setIsFloatingSearchOpen((previous) => !previous);
              setSearchText("");
            }}
            sx={{
              width: 44,
              height: 44,
              mx: "auto",
              my: 1,
              color: "#647782",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#d9f0eb",
                color: "#176b70",
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        )}

        {/* Floating MUI search panel */}
        <Popper
          open={isFloatingSearchOpen && !isOpen}
          anchorEl={searchButtonRef.current}
          placement="right-start"
          sx={{ zIndex: 1300, ml: 1 }}
        >
          <ClickAwayListener
            onClickAway={(event) => {
              if (searchButtonRef.current?.contains(event.target)) return;

              setIsFloatingSearchOpen(false);
              setSearchText("");
            }}
          >
            <Paper
              elevation={6}
              sx={{
                width: 360,
                maxWidth: "calc(100vw - 100px)",
                maxHeight: "min(480px, calc(100vh - 40px))",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: "1px solid #dfe8eb",
                borderRadius: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px 0",
                }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Search chats
                </Typography>

                <IconButton
                  size="small"
                  aria-label="Close search"
                  onClick={() => {
                    setIsFloatingSearchOpen(false);
                    setSearchText("");
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>

              <TextField
                inputRef={floatingSearchInputRef}
                fullWidth
                size="small"
                placeholder="Search conversations..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                inputProps={{ "aria-label": "Search conversations" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: searchText ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label="Clear search"
                        onClick={() => setSearchText("")}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
                sx={{ p: 1.5 }}
              />

              <List dense sx={{ overflowY: "auto", px: 1, pb: 1 }}>
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <ListItemButton
                      key={conversation.id}
                      selected={activeConversationId === conversation.id}
                      onClick={() => handleSelectConversation(conversation.id)}
                      sx={{ borderRadius: 1.5, gap: 1 }}
                    >
                      <SearchIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />

                      <ListItemText
                        primary={conversation.title}
                        primaryTypographyProps={{
                          noWrap: true,
                          fontSize: 13,
                        }}
                      />
                    </ListItemButton>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ p: 2, textAlign: "center" }}
                  >
                    No matching conversations
                  </Typography>
                )}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </div>

      {/* Conversation history */}
      <div className="sidebar-history">
        {isOpen && (
          <p className="sidebar-section-title">Recent conversations</p>
        )}

        {filteredConversations.length > 0
          ? filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                className={`conversation-item ${
                  activeConversationId === conversation.id ? "active" : ""
                }`}
                onClick={() => handleSelectConversation(conversation.id)}
                title={conversation.title}
              >
                <MessageSquare size={17} />
                {isOpen && <span>{conversation.title}</span>}
              </button>
            ))
          : isOpen && (
              <p className="sidebar-empty">No matching conversations</p>
            )}
      </div>

      {/* User section */}
      <div className="sidebar-footer">
        <button
          type="button"
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
