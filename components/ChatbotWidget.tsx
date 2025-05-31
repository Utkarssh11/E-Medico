import React, { useState } from 'react';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: "Hello! How can I help you today? Ask about medicines, orders, or prescriptions." }
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = { sender: 'user' as 'user', text: inputValue.trim() };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot response (Gemini API integration would go here)
    setTimeout(() => {
      const botResponse = { sender: 'bot' as 'bot', text: `I received: "${inputValue.trim()}". I'm still learning!` };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary-DEFAULT text-white p-4 rounded-full shadow-xl hover:bg-primary-dark transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 dark:focus:ring-offset-slate-900 z-[1000]"
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
      >
        {isOpen ? (
          // Close Icon (X)
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Chat Icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-3.862 8.25-8.625 8.25S3.75 16.556 3.75 12C3.75 7.444 7.388 3.75 12.375 3.75S21 7.444 21 12z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[500px] bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col overflow-hidden transition-all duration-300 ease-out animate-slide-up z-[999]">
          {/* Header */}
          <div className="p-4 bg-primary-DEFAULT text-white flex justify-between items-center">
            <h3 className="text-lg font-semibold">E-Medico Assistant</h3>
            <button onClick={toggleChat} aria-label="Close chat" className="text-white hover:text-primary-light">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 space-y-3 overflow-y-auto bg-slate-50 dark:bg-slate-700">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-2.5 rounded-lg shadow ${
                  msg.sender === 'user' 
                    ? 'bg-primary-DEFAULT text-white rounded-br-none' 
                    : 'bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-bl-none'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="input-field flex-grow"
              aria-label="Chat message input"
            />
            <button type="submit" className="btn btn-primary p-2.5" aria-label="Send message">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
