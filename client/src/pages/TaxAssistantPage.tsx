import React, { useState } from 'react';
import axios from 'axios';
import Chatbot from '../components/Chatbot';

const TaxAssistantPage: React.FC = () => {
  const [formData, setFormData] = useState({
    income: '',
    rrsp: '',
    tuition: '',
    dependents: '',
    childcare: '',
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [taxSummary, setTaxSummary] = useState<{
    taxOwed: number;
    credits: number;
    netPayable: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/ai/suggestions', {
        income: Number(formData.income),
        rrsp: Number(formData.rrsp),
        tuition: Number(formData.tuition),
        dependents: Number(formData.dependents),
        childcare: Number(formData.childcare),
      });

      setSuggestions(res.data.suggestions || []);
      setTaxSummary(res.data.taxSummary || null);
    } catch (err) {
      alert('Failed to get suggestions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🧾 AI Tax Assistant</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md mb-6 space-y-4"
      >
        {['income', 'rrsp', 'tuition', 'dependents', 'childcare'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block font-medium capitalize mb-1">
              {field}
            </label>
            <input
              type="number"
              id={field}
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Loading...' : 'Get Suggestions'}
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="bg-green-50 border border-green-300 rounded p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">📌 AI Suggestions:</h2>
          <ul className="list-disc list-inside space-y-1">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {taxSummary && (
        <div className="bg-yellow-50 border border-yellow-300 rounded p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">📊 Tax Summary</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Tax Owed: ${taxSummary.taxOwed}</li>
            <li>Credits: ${taxSummary.credits}</li>
            <li>Net Payable: ${taxSummary.netPayable}</li>
          </ul>
        </div>
      )}

      <Chatbot />
    </div>
  );
};

export default TaxAssistantPage;
