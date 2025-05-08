import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Tax Preparation Dashboard</h1>
      <p className="mb-4">Welcome! Choose an option to get started:</p>
      <ul className="list-disc ml-6 space-y-2">
        <li>
          <Link to="/tax-wizard" className="text-blue-600 hover:underline">🧾 Start Tax Form Wizard</Link>
        </li>
        <li>
          <Link to="/assistant" className="text-blue-600 hover:underline">🤖 AI Tax Assistant</Link>
        </li>
        <li>
          <Link to="/history" className="text-blue-600 hover:underline">🕒 View History</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardPage;
