/**
 * ChatbotWidget component
 */
import React, { useState, useRef, useEffect } from 'react';
import { HiChatBubbleOvalLeftEllipsis, HiXMark, HiPaperAirplane } from 'react-icons/hi2';
// icons: chat bubble icon, X (close) icon, paper airplane (send) icon

export default function ChatbotWidget() {
  // Is the chat window open or collapsed (just the bubble)?
  const [isOpen, setIsOpen] = useState(false);

  // List of all messages in the conversation (starts with 1 bot greeting)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your EcoLanka Assistant. How can I help you plan your trip today?", isBot: true }
  ]);

  // What the user is currently typing in the input box
  const [inputValue, setInputValue] = useState('');

  // A reference to an empty invisible div at the bottom of the chat
  // used to auto-scroll to the latest message
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Every time messages change OR chat opens, scroll to bottom automatically
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Called when user submits the message form (presses Enter or clicks send)
  const handleSend = (e) => {
    e.preventDefault(); // stop page from reloading (default form behavior)
    if (!inputValue.trim()) return; // ignore empty/whitespace-only messages
    
    // 1. Add the user's own message to the chat immediately
    const userMsg = { id: Date.now(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputValue(''); // clear the input box
    
    // 2. Fake a bot reply after 1 second delay (NOT a real AI call yet — hardcoded response)
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now(), text: "I can help you find eco-friendly destinations or answer questions about our conservation efforts.", isBot: true }
      ]);
    }, 1000);
  };

  return (
    // Fixed position: stays in bottom-right corner even when page scrolls
    // z-50 = high stacking order, so it floats above everything else
    <div className="fixed bottom-6 right-6 z-50">

      {/* ---- STATE 1: Collapsed - just a round floating button ---- */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)} // clicking opens the chat window
          className="relative bg-eco-forest hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105"
        >
          <HiChatBubbleOvalLeftEllipsis className="h-7 w-7" />
          
          {/* small green "online/notification" dot, top-right of the button */}
          {/* the ping animation makes it pulse outward, like a notification alert */}
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 border-2 border-eco-forest"></span>
          </span>
        </button>
      )}

      {/* ---- STATE 2: Expanded - full chat window ---- */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl w-80 h-96 flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5">
          
          {/* Header bar with title + close button */}
          <div className="bg-eco-forest text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiChatBubbleOvalLeftEllipsis className="h-5 w-5" />
              <span className="font-semibold">EcoLanka Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1 rounded transition-colors">
              <HiXMark className="h-5 w-5" /> {/* closes chat window, back to bubble */}
            </button>
          </div>

          {/* Scrollable message list */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gray-300">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  msg.isBot 
                    ? 'bg-white border border-gray-200 text-gray-800 self-start'  // bot message: white bubble, left side
                    : 'bg-eco-ocean text-white self-end'                          // user message: blue bubble, right side
                }`}
              >
                {msg.text}
              </div>
            ))}
            {/* invisible anchor div — scrollIntoView() targets this to auto-scroll down */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input box + send button */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // update state on every keystroke (controlled input)
                placeholder="Type a message..."
                className="w-full pl-3 pr-10 py-2 bg-gray-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-eco-forest focus:bg-white focus:border-transparent outline-none"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()} // send button disabled if input is empty
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-eco-forest disabled:text-gray-400 hover:text-green-700 transition-colors"
              >
                <HiPaperAirplane className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}