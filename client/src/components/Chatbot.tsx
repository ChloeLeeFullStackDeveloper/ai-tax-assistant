import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/ai/chat', {
        messages: newMessages,
      });

      const reply = response.data.reply;
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">💬 AI Tax Assistant</h2>

      <div className="h-96 overflow-y-auto space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-300">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg shadow-sm text-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-100 text-right'
                  : 'bg-gray-200 text-left'
              }`}
            >
              <span className="block font-medium mb-1 text-xs text-gray-600">
                {msg.role === 'user' ? 'You' : 'AI'}
              </span>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
          placeholder="Ask about taxes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
