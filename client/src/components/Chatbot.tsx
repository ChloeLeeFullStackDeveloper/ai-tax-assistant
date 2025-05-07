import React, { useState } from 'react';
import axios from 'axios';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:3000/ai/chat', {
        messages: newMessages,
      });

      const reply = response.data.reply;
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">💬 AI Tax Assistant</h2>

      <div className="border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 p-2 rounded-md max-w-[80%] ${
              msg.role === 'user' ? 'ml-auto bg-blue-100 text-right' : 'mr-auto bg-gray-100 text-left'
            }`}
          >
            <p className="text-sm text-gray-800">
              <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
            </p>
          </div>
        ))}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
          placeholder="Ask about taxes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
