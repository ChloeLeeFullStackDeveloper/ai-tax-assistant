import React, { useEffect, useState } from 'react';

type TaxReport = {
  timestamp: string;
  income: number;
  deductions: number;
  credits: number;
  federalTax: number;
  provincialTax: number;
  balanceOwing: number;
};

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<TaxReport[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('taxHistory');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('taxHistory');
    setHistory([]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🕓 Tax Suggestion History</h1>
      <button onClick={clearHistory} className="bg-gray-300 px-4 py-2 rounded mb-4">
        Clear History
      </button>

      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((entry, i) => (
            <li key={i} className="border p-4 rounded shadow">
              <p><strong>Date:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
              <p><strong>Income:</strong> ${entry.income.toFixed(2)}</p>
              <p><strong>Credits:</strong> ${entry.credits.toFixed(2)}</p>
              <p><strong>Federal Tax:</strong> ${entry.federalTax.toFixed(2)}</p>
              <p><strong>Provincial Tax:</strong> ${entry.provincialTax.toFixed(2)}</p>
              <p><strong>Balance:</strong> ${entry.balanceOwing.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage;
