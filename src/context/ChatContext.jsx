import { createContext, useContext, useState, useCallback } from 'react';
import { chatResponses, defaultResponse } from '../data/chatResponses';

/**
 * Chat Context
 * Provides global chatbot state (open/closed, messages) so the widget
 * persists across navigation without losing conversation history.
 */
const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! 🌿 I\'m your EcoLanka assistant. Ask me about destinations, wildlife, guides, or conservation campaigns!',
      timestamp: new Date().toISOString(),
    },
  ]);

  /** Toggle chatbot open/closed */
  const toggleChat = () => setIsOpen((prev) => !prev);

  /** Open the chatbot */
  const openChat = () => setIsOpen(true);

  /** Close the chatbot */
  const closeChat = () => setIsOpen(false);

  /**
   * Send a user message and get a canned bot reply.
   * Matches message text against keyword lists in chatResponses.
   */
  const sendMessage = useCallback((text) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    // Find a matching response based on keywords
    const lowerText = text.toLowerCase();
    const match = chatResponses.find((r) =>
      r.keywords.some((kw) => lowerText.includes(kw))
    );

    const botMsg = {
      id: Date.now() + 1,
      sender: 'bot',
      text: match ? match.response : defaultResponse,
      timestamp: new Date().toISOString(),
    };

    // Add both messages (user + bot reply) with a small delay feel
    setMessages((prev) => [...prev, userMsg, botMsg]);
  }, []);

  /** Clear chat history and reset to welcome message */
  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: 'Chat cleared! 🌿 How can I help you explore Sri Lanka?',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <ChatContext.Provider
      value={{ isOpen, messages, toggleChat, openChat, closeChat, sendMessage, clearChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}

/**
 * Hook to access chat context.
 * @returns {{ isOpen, messages, toggleChat, openChat, closeChat, sendMessage, clearChat }}
 */
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

export default ChatContext;
