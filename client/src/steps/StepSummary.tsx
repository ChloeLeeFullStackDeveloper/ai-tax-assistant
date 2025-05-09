import React from "react";
import { useNavigate } from "react-router-dom";

const StepSummary: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    const report = {
      timestamp: new Date().toISOString(),
      income: 30800,
      deductions: 0,
      credits: 2071.2,
      federalTax: 4620,
      provincialTax: 1555.4,
      balanceOwing: 4104.2,
    };

    const history = JSON.parse(localStorage.getItem("taxHistory") || "[]");
    history.push(report);
    localStorage.setItem("taxHistory", JSON.stringify(history));

    navigate("/tax-report");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Summary & Suggestions</h2>
      <div className="flex justify-between">
        <button className="text-gray-600">Back</button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StepSummary;
