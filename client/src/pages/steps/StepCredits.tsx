import React from "react";

const StepCredits: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tax Credits</h2>
      <div className="space-y-2">
        <label><input type="checkbox" /> Basic Personal Amount</label><br/>
        <label><input type="checkbox" /> Canada Employment Amount</label>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="text-gray-600">Back</button>
        <button onClick={onNext} className="bg-blue-600 text-white px-4 py-2 rounded">Continue to Summary</button>
      </div>
    </div>
  );
};

export default StepCredits;