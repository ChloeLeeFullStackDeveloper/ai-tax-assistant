import React from "react";

const StepIncomeInfo: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Income Information</h2>
      <div className="space-y-2">
        <input type="number" placeholder="Employment Income" className="border w-full p-2" />
        <input type="number" placeholder="Self-Employment Income" className="border w-full p-2" />
        <input type="number" placeholder="Investment Income" className="border w-full p-2" />
        <input type="number" placeholder="Rental Income" className="border w-full p-2" />
        <input type="number" placeholder="Other Income" className="border w-full p-2" />
      </div>
      <button
        onClick={onNext}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Continue to Deductions
      </button>
    </div>
  );
};

export default StepIncomeInfo;