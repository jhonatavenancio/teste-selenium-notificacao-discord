import React, { useState } from 'react';
import { useReservation } from '../contexts/ReservationContext';

const ChatInterface: React.FC = () => {
  const { state, dispatch } = useReservation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  if (!state.isConfirmed || !state.showChat) return null;

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-40 border border-gray-200">
      <div className="bg-[#FF5A5F] text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white text-[#FF5A5F] flex items-center justify-center mr-2">
            <span className="font-semibold">
              {state.selectedProperty?.host.charAt(0)}
            </span>
          </div>
          <span className="font-medium">Chat with {state.selectedProperty?.host}</span>
        </div>
        <button 
          onClick={() => dispatch({ type: 'RESET' })}
          className="text-white hover:text-gray-200"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>
      
      <div className="h-64 p-3 overflow-y-auto bg-gray-50">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="mb-2 flex justify-end">
              <div className="bg-blue-500 text-white rounded-lg py-2 px-3 max-w-[80%]">
                {msg}
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            <p>Start a conversation with {state.selectedProperty?.host}</p>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <div className="flex">
          <textarea
            id="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] resize-none"
            rows={1}
          />
          <button
            id="chat-send-button"
            onClick={handleSend}
            className="bg-[#FF5A5F] text-white px-4 rounded-r-md hover:bg-[#FF4349]"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;