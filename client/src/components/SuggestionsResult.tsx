import React from 'react';

interface SuggestionProps {
  suggestions: string[];
  taxSummary: {
    taxOwed: number;
    credits: number;
    netPayable: number;
  };
}

const SuggestionsResult: React.FC<SuggestionProps> = ({ suggestions, taxSummary }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">📋 Tax Summary</h2>
      <div className="bg-gray-100 rounded p-4 mb-4">
        <p className="text-gray-800"><strong>Tax Owed:</strong> ${taxSummary.taxOwed.toFixed(2)}</p>
        <p className="text-gray-800"><strong>Credits:</strong> ${taxSummary.credits.toFixed(2)}</p>
        <p className="text-gray-800"><strong>Net Payable:</strong> ${taxSummary.netPayable.toFixed(2)}</p>
      </div>

      <h3 className="text-xl font-semibold mb-2">🧠 AI & Rule-Based Suggestions</h3>
      <ul className="list-disc list-inside space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="text-gray-700 bg-blue-50 rounded px-3 py-2">
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsResult;
