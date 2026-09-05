/**
 * ChatbotWidget component
 */
import React, { useState, useRef, useEffect } from 'react';
import { HiChatBubbleOvalLeftEllipsis, HiXMark, HiPaperAirplane } from 'react-icons/hi2';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your EcoLanka Assistant. How can I help you plan your trip today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMsg = { id: Date.now(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now(), text: "I can help you find eco-friendly destinations or answer questions about our conservation efforts.", isBot: true }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Collapsed Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-eco-forest hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105"
        >
          <HiChatBubbleOvalLeftEllipsis className="h-7 w-7" />
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 border-2 border-eco-forest"></span>
          </span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl w-80 h-96 flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-eco-forest text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiChatBubbleOvalLeftEllipsis className="h-5 w-5" />
              <span className="font-semibold">EcoLanka Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1 rounded transition-colors">
              <HiXMark className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gray-300">
            {messages.map(msg => (
              <div key={msg.id} className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.isBot ? 'bg-white border border-gray-200 text-gray-800 self-start' : 'bg-eco-ocean text-white self-end'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="w-full pl-3 pr-10 py-2 bg-gray-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-eco-forest focus:bg-white focus:border-transparent outline-none"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
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
