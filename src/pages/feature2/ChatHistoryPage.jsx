/**
 * ChatHistoryPage Component
 */
import React, { useState } from 'react';
// Chat context hook providing access to state and message dispatcher actions
import { useChat } from '../../context/ChatContext';
// Icons for message submission and clearing chat history
import { HiOutlinePaperAirplane, HiOutlineTrash } from 'react-icons/hi2';

export default function ChatHistoryPage() {
  // Extract chat state and actions from the global chat context
  const { messages, sendMessage, clearHistory } = useChat();
  
  // Local state to manage user text input
  const [input, setInput] = useState('');

  /**
   * Dispatches the current user message and resets the input field.
   * Prevents submitting empty or whitespace-only messages.
   */
  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      {/* Header Section: Page title and history reset button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Eco Assistant Chat</h1>
          <p className="text-gray-600">Your personal guide to sustainable travel.</p>
        </div>
        {/* Action button to delete all prior messages */}
        <button 
          onClick={clearHistory}
          className="flex items-center text-red-500 hover:text-red-700 text-sm font-medium bg-red-50 px-3 py-2 rounded-lg"
        >
          <HiOutlineTrash className="mr-1" /> Clear History
        </button>
      </div>

      {/* Main Chat Container: Wraps scrollable thread and input box */}
      <div className="flex-grow bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
        
        {/* Messages Thread: Displays empty placeholder or mapped bubble list */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            /* Empty state: Displayed when no conversation exists */
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>Send a message to start chatting with Eco Assistant.</p>
            </div>
          ) : (
            /* Render message bubbles aligned based on sender role */
            messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Bubble styling dynamically changes for user vs assistant */}
                <div 
                  className={`max-w-[75%] rounded-2xl p-4 ${
                    msg.sender === 'user' 
                      ? 'bg-eco-ocean text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                  {/* Timestamp formatted to HH:MM */}
                  <span 
                    className={`text-[10px] block mt-1 ${
                      msg.sender === 'user' ? 'text-cyan-200' : 'text-gray-400'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Controls: Bottom-docked form for message submission */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about eco-friendly destinations..."
              className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-eco-ocean focus:ring-1 focus:ring-eco-ocean"
            />
            {/* Submit button: Disabled when input field is empty */}
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 top-1.5 p-2 bg-eco-ocean text-white rounded-full disabled:opacity-50 hover:bg-cyan-800 transition-colors"
            >
              <HiOutlinePaperAirplane className="transform -rotate-45 -mt-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}