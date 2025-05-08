import React from "react";

const StepDeductions: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Deductions</h2>
      <div className="space-y-2">
        <input type="number" placeholder="RRSP Contributions" className="border w-full p-2" />
        <input type="number" placeholder="Childcare Expenses" className="border w-full p-2" />
        <input type="number" placeholder="Tuition Fees" className="border w-full p-2" />
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="text-gray-600">Back</button>
        <button onClick={onNext} className="bg-blue-600 text-white px-4 py-2 rounded">Continue to Credits</button>
      </div>
    </div>
  );
};

export default StepDeductions;