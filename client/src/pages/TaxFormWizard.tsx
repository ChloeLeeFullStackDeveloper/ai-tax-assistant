import React, { useState } from "react";
import StepIncomeInfo from "./steps/StepIncomeInfo";
import StepDeductions from "./steps/StepDeductions";
import StepCredits from "./steps/StepCredits";
import StepSummary from "./steps/StepSummary";

const TaxFormWizard: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    <StepIncomeInfo onNext={() => setStep(1)} />,
    <StepDeductions onBack={() => setStep(0)} onNext={() => setStep(2)} />,
    <StepCredits onBack={() => setStep(1)} onNext={() => setStep(3)} />,
    <StepSummary />,
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🧾 AI-Assisted Tax Form</h1>
      {steps[step]}
    </div>
  );
};

export default TaxFormWizard;
