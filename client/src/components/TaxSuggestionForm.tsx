import React, { useState } from "react";
import axios from "axios";
import SuggestionsResult from "./SuggestionsResult";

export const TaxSuggestionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    income: "",
    rrsp: "",
    tuition: "",
    dependents: "",
    childcare: "",
  });

  const [result, setResult] = useState<{
    suggestions: string[];
    taxSummary: { taxOwed: number; credits: number; netPayable: number };
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/suggestions", {
        income: Number(formData.income),
        rrsp: Number(formData.rrsp),
        tuition: Number(formData.tuition),
        dependents: Number(formData.dependents),
        childcare: Number(formData.childcare),
      });
      setResult({
        suggestions: response.data.suggestions,
        taxSummary: response.data.taxSummary,
      });
    } catch (error) {
      alert("Failed to get suggestions.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">AI Tax Suggestion</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["income", "rrsp", "tuition", "dependents", "childcare"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            <input
              type="number"
              name={field}
              className="border px-2 py-1 w-full"
              value={(formData as any)[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Loading..." : "Get Suggestions"}
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <SuggestionsResult
            suggestions={result.suggestions}
            taxSummary={result.taxSummary}
          />
        </div>
      )}
    </div>
  );
};
