import React from 'react';
import { TaxSuggestionForm } from '../components/TaxSuggestionForm';
import Chatbot from '../components/Chatbot';

const TaxAssistantPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        🧾 AI-Assisted Canadian Tax Assistant
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <TaxSuggestionForm />
        </div>
        <div>
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default TaxAssistantPage;
