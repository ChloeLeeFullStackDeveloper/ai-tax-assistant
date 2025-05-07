import React, { useEffect, useState } from "react";
import axios from "axios";

interface SuggestionEntry {
  id: string;
  input: {
    income: number;
    rrsp: number;
    tuition: number;
    dependents: number;
    childcare: number;
  };
  taxSummary: {
    taxOwed: number;
    credits: number;
    netPayable: number;
  };
  suggestions: string[];
  timestamp: any; // Firestore timestamp
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<SuggestionEntry[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:3000/ai/history");
        setHistory(res.data.suggestions);
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };
    fetchHistory();
  }, []);

  const handleClear = async () => {
    await axios.delete("http://localhost:3000/ai/history");
    setHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🕒 Tax Suggestion History</h1>
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleClear}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear History
        </button>
        <button
          onClick={() => window.print()}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Export to PDF
        </button>
      </div>

      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul className="space-y-6">
          {history.map((item) => (
            <li
              key={item.id}
              className="bg-white border border-gray-200 p-4 rounded shadow-sm"
            >
              <div className="mb-2">
                <strong className="block text-gray-600">Input:</strong>
                <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
                  {JSON.stringify(item.input, null, 2)}
                </pre>
              </div>

              <div className="mb-2">
                <strong className="block text-gray-600">Tax Summary:</strong>
                <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
                  {JSON.stringify(item.taxSummary, null, 2)}
                </pre>
              </div>

              <div className="mb-2">
                <strong className="block text-gray-600">Suggestions:</strong>
                <ul className="list-disc ml-6 text-sm text-gray-800">
                  {item.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="text-right text-xs text-gray-500">
                {item.timestamp?.toDate
                  ? item.timestamp.toDate().toLocaleString()
                  : new Date(item.timestamp).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage;
